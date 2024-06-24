const express=require('express');
const db=require('./models/mysql');
const connectMongoDB=require('./models/mongodb');
const {Product,Cart}=require('./models/product')
const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');
const multer=require('multer');
const path=require('path');
const session=require('express-session');
const flash=require('connect-flash');
const RedisStore=require('connect-redis').default;
const redis=require('redis');



const app=express();
app.set('view engine','ejs');
app.use(express.static('public'));
connectMongoDB();

//Middleware for parsing URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// redis
const redisClient=redis.createClient({
    password: 'elbFF5fG9zKquoGFWWH1wER5dTFeLxoN',
    socket: {
        host: 'redis-10278.c14.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 10278
    }
});

(async()=>{
    await redisClient.connect();
})();
redisClient.on('connect',()=>{
    console.log('redis client connected');
});
redisClient.on('error',(err)=>{
    console.log('Could not connect redis',err);
});

//Setting up sessions middleware
app.use(session({
    store: new RedisStore({client:redisClient}),
    secret: 'Ni_Neville',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 2*60*60*1000
    }
}));
// Middleware to check user session
function ensureLoggedIn(req,res,next){
    if(req.session.userId){
        next();
    }else{
        // Send error message
        req.flash('error','Kindly log in to proceed');
        res.redirect('/login'); //Redirect to log in if not logged in
    }
}
//Setting up flash middleware
app.use(flash());

//Making flash messages available in all templates
app.use((req,res,next)=>{
    res.locals.successMessage=req.flash('success');
    res.locals.errorMessage=req.flash('error');
    next();
})

// Listening on port 3000
app.listen(3000,()=>{
    console.log('Server running on port 3000');
    
})

//Multer configuration for handling file uploads
const storage=multer.memoryStorage();
const upload=multer({storage:storage});
//Setting up Nodemailer transporter
const transporter=nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,//Use 'true' for port 465, 'false' for all other ports
    auth: {
        user: 'nevillekhabuchi@gmail.com',//Sender's gmail address
        pass: 'dgem nunl zzzp egda'//App password from gmail account
    }
});

//Rendering the home page
app.get('/',(req,res)=>{
    res.render('main',{title:'Nevoline Agrovet'})
});
//Rendering the about page
app.get('/about',(req,res)=>{
    res.render('about',{title:'Nevoline Agrovet/About'});
});
// Rendering the ourServices page
app.get('/ourServices',(req,res)=>{
    res.render('ourServices',{title:'Nevoline Agrovet/ourServices'});
})
// Rendering the ourProducts page
app.get('/ourProducts',(req,res)=>{
    res.render('ourProducts',{title:'Nevoline Agrovet/ourProducts'});
})
//Rendering the signup page
app.get('/signup',(req,res)=>{
    res.render('signup',{title:'Sign up'});
});
//Posting the signup page form details
app.post('/signup',(req,res)=>{
    const{username,phoneNumber,email,password}=req.body;
    //Checking whether the input fields are filled
    if(!username||!phoneNumber||!email||!password || phoneNumber.length!=10){
        // Send error message
        req.flash('error','Fill in all the fieldss');
        res.redirect('/signup');
        return;
    }
    const query1=`SELECT * FROM signup WHERE PHONE_NUMBER=?`;
    const query2=`INSERT INTO signup(USERNAME,PHONE_NUMBER,EMAIL_ADDRESS,PASSWORD) VALUES(?,?,?,?)`;
    //Checking whether the person has already signed up
    db.query(query1,[phoneNumber],(error1,result1)=>{
        if(error1){
            console.log('Error checking the phone number',error1);
            // Send error message 
            req.flash('error','Error while registering');
            return;
        }
        if(result1.length===0){
            db.query(query2,[username,phoneNumber,email,password],(error2,result2)=>{
                if(error2){
                    console.log('Error inserting the details in the database',error2);
                    req.flash('error','Error while registering');
                }
                else{
                    const mailOptions={
                        from: {
                            name: 'NEVOLINE AGROVET',
                            address: 'nevillekhabuchi@gmil.com'
                        },
                        to: email,
                        subject: 'SUCCESSFUL SIGN UP TO NEVOLINE AGROVET',
                        html: `<p>
                                Welcome <b>${username}</b> to NEVOLINE AGROVET, where farming meets innovation!<br>
                                We're here to empower farmers with cutting-edge  solutions for every 
                                aspect of their farming.<br> From crop management to livestock care, we're 
                                dedicated to helping you thrive in agriculture.<br> Step in a world of tailored 
                                solutions and expert guidance.<br><br> Let's cultivate success together.
                                    </p>`
                    }
                    //Send email
                    transporter.sendMail(mailOptions,(error,info)=>{
                        if(error){
                            console.log('Error sending email: ',error);
                            return;
                        }
                        else{
                            console.log('Email sent: ',info.response);
                        }
                    });
                    req.flash('success','Sign up successful');
                    res.redirect('/login');
                }
            })
        }
        else{

            req.flash('error', 'Already registered,log in');
            res.redirect('/login');
        }
    })
})
//Rendering the login page
app.get('/login',(req,res)=>{
    res.render('login',{title:'Log in Page'});
});
//Posting the log in page form details
app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    //Making sure both the fields are filled
    if(!username||!password){
       //Send error message
       req.flash('error','Kindly fill in the fields')
       res.redirect('/login');
       return;
    }
    if(username==='MOLLY'&&password==='NEVILLE'){
        req.session.user=username;
        res.redirect('/admin');
    }
    else{
        //Check if the provided credentials match any regular user
        //Query to check whether the user details match with the registered details
        const query=`SELECT USER_ID FROM signup WHERE USERNAME=? AND PASSWORD=?`;
        db.query(query,[username,password],(error,result)=>{
            if(error){
                console.log('Cannot fetch details from the database',error);
                return;
            }
            else{
                if(result.length>0){
                    // const user=result[0];
                    req.session.userId=result[0].USER_ID;
                    res.redirect('/shop');
                }
                else{
                    req.flash('error','Invalid credentials')
                    res.redirect('/login');
                    return;
                }
            }
        })
    }
})
// Rendering the shop page after a customer logs in successfully
app.get('/shop',ensureLoggedIn, async(req,res)=>{
    try{
        // Query the database to fetch product details
        const productFeeds=await Product.find({productCategory:'Feeds'});
        const productDrugs=await Product.find({productCategory:'Drugs'});
        const productSeeds=await Product.find({productCategory:'Seeds'});

        const userId=req.session.userId;
        const cart=await Cart.findOne({userId:userId}).populate('products').exec();
        const cartItemCount=cart ? cart.products.length : 0;
        
            res.render('shop',{title: 'Nevoline Online Shop',Feeds:productFeeds,Drugs:productDrugs,Seeds:productSeeds,cartItemCount: cartItemCount,userId: userId});
    }
    catch(err){
        console.error('Error fetching details from the database',err);
        res.send(err);
    }
})

// Handling the route to add a product to cart
app.post('/add-to-cart',ensureLoggedIn,async(req,res)=>{
    const userId=req.session.userId;
    const {productId}=req.body;

    try{
        const product=await Product.findById(productId);
        let cart=await Cart.findOne({userId});

        if(cart){
            cart.products.push(product);
        }else{
            cart=new Cart({
                userId: userId,
                products: [product]
            });
        }

        await cart.save();
        res.send({success: true});
    }catch(err){
        console.error('Error adding to cart',err);
    }

})

//Rendering the admin page
app.get('/admin',async(req,res)=>{
    // res.render('admin',{title:'Admin page'});
    if(req.session.user){
    try{
        const productCounts=await Product.aggregate([
            {$group:{_id:'$productCategory',count:{$sum:1}}}
        ]);
        const categoryCounts=productCounts.reduce((acc,item)=>{
            acc[item._id]=item.count;
            return acc;
        },{});
        
        res.render('admin',{title:'Admin page',categoryCounts});
    }catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }}else{
        console.log('You must be logged in')
    }
});

//Rendering the adminFeeds page which entails getting items from mongodb database
app.get('/adminFeeds',async(req,res)=>{
    try{
           //Query the database to fetch product details
           const products=await Product.find({productCategory: 'Feeds'});
           res.render('adminFeeds',{title:'Admin Feeds',Feeds:products});
        }catch(error){
        console.error('Error fetching items from the database',error);
        res.send('Something went wrong while opening the admin feeds page');
    }
})

//Posting the new added Feed from the adminFeeds form
app.post('/addFeed',upload.single('productImage'),async(req,res)=>{
    try{
        const {productName,productPrice,productQuantity,productCategory}=req.body;
        const productImage=req.file.buffer.toString('base64');
    
        // Validate form inputs
        if(!productImage||!productName||!productPrice||!productQuantity||!productCategory){
            // Send error message
            req.flash('error','Kindly fill all the fields');
            return;
        }
        else{
            const newProduct=new Product({
                productImage,
                productName,
                productPrice,
                productQuantity,
                productCategory
            });
            await newProduct.save();
            req.flash('success','Product added successfully');
            res.redirect('/adminFeeds');
        }
    }catch(err){
        console.error('Error while adding the product',err);
        req.flash('error','Error while adding the product');
        res.redirect('/adminFeeds');
    }
});

//Route to handle form submission of the editted product and update the product on the adminFeeds page
app.post('/feeds/:id/edit',upload.single('productImage'),async(req,res)=>{
    const {productName,productPrice,productQuantity,productCategory}=req.body;
    const updateData={productName,productPrice,productQuantity,productCategory};

    if(req.file){
        updateData.productImage=req.file.buffer.toString('base64');
    }

    try{
        await Product.findByIdAndUpdate(req.params.id,updateData);
        //Send success message
        req.flash('success','Product updated Successfully');
        //Redirect to the route that renders the adminFeeds page
        res.redirect('/adminFeeds');
    }
    catch(err){
        //Send error message
        console.error(err);
        req.flash('error','Failed to update the product');
        res.redirect('/adminFeeds');
    }
});

// Route to handle product deletion
app.get('/feed/:id/delete',async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        // Send success message
        req.flash('success','Product deleted Successfully');
        res.redirect('/adminFeeds');
    }
    catch(err){
        // Send error message
        req.flash('error','Failed to update the product');
        res.redirect('/adminFeeds');
    }
})

// Rendering the adminDrugs page
app.get('/adminDrugs',async(req,res)=>{
    try{
        //Query the database to fetch drug details
        const products=await Product.find({productCategory: 'Drugs'});
        res.render('adminDrugs',{title:'Admin Drugs',Drugs:products});
        }catch(error){
         console.error('Error fetching Drugs from the database',error);
            res.send('Something went wrong while opening the admin drugs page');
        }
});
// Route to handle addDrug from the adminDrugs page
app.post('/addDrug',upload.single('productImage'),async(req,res)=>{
    try{
        const {productName,productPrice,productQuantity,productCategory}=req.body;
        const productImage=req.file.buffer.toString('base64');
    
        // Validate form inputs
        if(!productImage||!productName||!productPrice||!productQuantity||!productCategory){
            // Send error message
            req.flash('error','Kindly fill all the fields');
            return;
        }
        else{
            const newProduct=new Product({
                productImage,
                productName,
                productPrice,
                productQuantity,
                productCategory
            });
            await newProduct.save();
            req.flash('success','Product added successfully');
            res.redirect('/adminDrugs');
        }
    }catch(err){
        console.error('Error while adding the product',err);
        req.flash('error','Error while adding the product');
        res.redirect('/adminDrugs');
    }
});
//Route to handle form submission of the editted product and update the product on the adminDrugs page
app.post('/drugs/:id/edit',upload.single('productImage'),async(req,res)=>{
    const {productName,productPrice,productQuantity,productCategory}=req.body;
    const updateData={productName,productPrice,productQuantity,productCategory};

    if(req.file){
        updateData.productImage=req.file.buffer.toString('base64');
    }

    try{
        await Product.findByIdAndUpdate(req.params.id,updateData);
        //Send success message
        req.flash('success','Product updated Successfully');
        //Redirect to the route that renders the adminFeeds page
        res.redirect('/adminDrugs');
    }
    catch(err){
        //Send error message
        console.error(err);
        req.flash('error','Failed to update the product');
        res.redirect('/adminDrugs');
    }
});
// Route to handle drug deletion in the adminDrugs page
app.get('/drug/:id/delete',async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        // Send success message
        req.flash('success','Product deleted Successfully');
        res.redirect('/adminDrugs');
    }
    catch(err){
        // Send error message
        req.flash('error','Failed to update the product');
        res.redirect('/adminDrugs');
    }
})

// Rendering the adminMachinery page
app.get('/adminMachinery',async(req,res)=>{
    try{
        //Query the database to fetch drug details
        const products=await Product.find({productCategory: 'Machinery'});
        res.render('adminMachinery',{title:'Admin Machinery',Machineries:products});
        }catch(error){
         console.error('Error fetching Machineries from the database',error);
            res.send('Something went wrong while opening the adminMachinery page');
        }
});
// Route to handle addMachinery from the adminMachinery page
app.post('/addMachinery',upload.single('productImage'),async(req,res)=>{
    try{
        const {productName,productPrice,productQuantity,productCategory}=req.body;
        const productImage=req.file.buffer.toString('base64');
    
        // Validate form inputs
        if(!productImage||!productName||!productPrice||!productQuantity||!productCategory){
            // Send error message
            req.flash('error','Kindly fill all the fields');
            return;
        }
        else{
            const newProduct=new Product({
                productImage,
                productName,
                productPrice,
                productQuantity,
                productCategory
            });
            await newProduct.save();
            req.flash('success','Product added successfully');
            res.redirect('/adminMachinery');
        }
    }catch(err){
        console.error('Error while adding the product',err);
        req.flash('error','Error while adding the product');
        res.redirect('/adminMachinery');
    }
});
//Route to handle form submission of the editted product and update the product on the adminDrugs page
app.post('/machineries/:id/edit',upload.single('productImage'),async(req,res)=>{
    const {productName,productPrice,productQuantity,productCategory}=req.body;
    const updateData={productName,productPrice,productQuantity,productCategory};

    if(req.file){
        updateData.productImage=req.file.buffer.toString('base64');
    }

    try{
        await Product.findByIdAndUpdate(req.params.id,updateData);
        //Send success message
        req.flash('success','Product updated Successfully');
        //Redirect to the route that renders the adminFeeds page
        res.redirect('/adminMachinery');
    }
    catch(err){
        //Send error message
        console.error(err);
        req.flash('error','Failed to update the product');
        res.redirect('/adminMachinery');
    }
});
// Route to handle drug deletion in the adminDrugs page
app.get('/machinery/:id/delete',async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        // Send success message
        req.flash('success','Product deleted Successfully');
        res.redirect('/adminMachinery');
    }
    catch(err){
        // Send error message
        req.flash('error','Failed to update the product');
        res.redirect('/adminMachinery');
    }
})

// Rendering the adminSeeds page
app.get('/adminSeeds',async(req,res)=>{
    try{
        //Query the database to fetch drug details
        const products=await Product.find({productCategory: 'Seed'});
        res.render('adminSeeds',{title:'Admin Seeds',Seeds:products});
        }catch(error){
         console.error('Error fetching seeds from the database',error);
            res.send('Something went wrong while opening the adminSeeds page');
        }
});
// Route to handle addSeed from the adminSeed page
app.post('/addSeed',upload.single('productImage'),async(req,res)=>{
    try{
        const {productName,productPrice,productQuantity,productCategory}=req.body;
        const productImage=req.file.buffer.toString('base64');
    
        // Validate form inputs
        if(!productImage||!productName||!productPrice||!productQuantity||!productCategory){
            // Send error message
            req.flash('error','Kindly fill all the fields');
            return;
        }
        else{
            const newProduct=new Product({
                productImage,
                productName,
                productPrice,
                productQuantity,
                productCategory
            });
            await newProduct.save();
            req.flash('success','Product added successfully');
            res.redirect('/adminSeeds');
        }
    }catch(err){
        console.error('Error while adding the product',err);
        req.flash('error','Error while adding the product');
        res.redirect('/adminSeeds');
    }
});
//Route to handle form submission of the editted product and update the product on the adminDrugs page
app.post('/seeds/:id/edit',upload.single('productImage'),async(req,res)=>{
    const {productName,productPrice,productQuantity,productCategory}=req.body;
    const updateData={productName,productPrice,productQuantity,productCategory};

    if(req.file){
        updateData.productImage=req.file.buffer.toString('base64');
    }

    try{
        await Product.findByIdAndUpdate(req.params.id,updateData);
        //Send success message
        req.flash('success','Product updated Successfully');
        //Redirect to the route that renders the adminFeeds page
        res.redirect('/adminSeeds');
    }
    catch(err){
        //Send error message
        console.error(err);
        req.flash('error','Failed to update the product');
        res.redirect('/adminSeeds');
    }
});
// Route to handle drug deletion in the adminDrugs page
app.get('/seed/:id/delete',async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        // Send success message
        req.flash('success','Product deleted Successfully');
        res.redirect('/adminSeeds');
    }
    catch(err){
        // Send error message
        req.flash('error','Failed to update the product');
        res.redirect('/adminSeeds');
    }
})
