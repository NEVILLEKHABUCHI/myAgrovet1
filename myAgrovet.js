const express=require('express');
const mysql=require('mysql');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');
const multer=require('multer');
const path=require('path');
const session=require('express-session');
const flash=require('connect-flash');

dotenv.config({path:'./important.env'});

const app=express();
app.set('view engine','ejs');
app.use(express.static('public'));

//Middleware for parsing URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Setting up sessions middleware
app.use(session({
    secret: 'Ni_Neville',
    resave: false,
    saveUninitialized: true
}));
//Setting up flash middleware
app.use(flash());

//Making flash messages available in all templates
app.use((req,res,next)=>{
    res.locals.successMessage=req.flash('success');
    res.locals.errorMessage=req.flash('error');
    next();
})

//Setting up MySQL connection
const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    // port: process.env.PORT
});
//Connect to MySQL
db.connect((error)=>{
    if(error){
        console.log('Error connecting to the database',error);
        return;
    }else{
        console.log('Mysql connected successfully');
        app.listen(3000,()=>{
            console.log("Server running on port 3000");
        })
    }
});
//Connecting to MongoDB
const dbUrl='mongodb+srv://Nevoline_agrovet:Khabuchi@cluster0.3wznhua.mongodb.net/Nevoline_Agrovet?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbUrl).then(()=>{
    console.log('Connected to mongodb successfully');
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
    res.render('main',{title:'Landing page'})
});
//Rendering the signup page
app.get('/signup',(req,res)=>{
    res.render('signup',{title:'Sign up',errorMessage:null});
});
//Posting the signup page form details
app.post('/signup',(req,res)=>{
    const{username,phoneNumber,email,password}=req.body;
    //Checking whether the input fields are filled
    if(!username||!phoneNumber||!email||!password || phoneNumber.length!=10){
        const errorMessage='Fill in your details correctly';
        console.log(errorMessage);
        return res.render('signup',{title:'Sign up',errorMessage});
    }
    const query1=`SELECT * FROM signup WHERE PHONE_NUMBER=?`;
    const query2=`INSERT INTO signup(USERNAME,PHONE_NUMBER,EMAIL_ADDRESS,PASSWORD) VALUES(?,?,?,?)`;
    //Checking whether the person has already signed up
    db.query(query1,[phoneNumber],(error1,result1)=>{
        if(error1){
            console.log('Error checking the phone number',error1);
            return;
        }
        if(result1.length===0){
            db.query(query2,[username,phoneNumber,email,password],(error2,result2)=>{
                if(error2){
                    console.log('Error inserting the details in the database',error2);
                    return;
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
                    res.send('Sign up successfull');
                }
            })
        }
        else{
            const errorMessage="Already registered";
            return res.render('signup',{title:'Sign up',errorMessage});
        }
    })
})
//Rendering the login page
app.get('/login',(req,res)=>{
    res.render('login',{title:'Log in Page',errorMessage:null});
});
//Posting the log in page form details
app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    //Making sure both the fields are filled
    if(!username||!password){
        const errorMessage='Kindly fill in your details';
        return res.render('login',{title:'Log in Page', errorMessage});
    }
    if(username==='MOLLY'&&password==='NEVILLE'){
        res.redirect('/admin');
    }
    else{
        //Check if the provided credentials match any regular user
        //Query to check whether the user details match with the registered details
        const query=`SELECT * FROM signup WHERE USERNAME=? AND PASSWORD=?`;
        db.query(query,[username,password],(error,result)=>{
            if(error){
                console.log('Cannot fetch details from the database',error);
                return;
            }
            else{
                if(result.length>0){
                    const user=result[0];
                    res.send('Log in successful');
                }
                else{
                    const errorMessage="Invalid credentials";
                    return res.render('login',{title:'Log in Page', errorMessage});
                }
            }
        })
    }
})
//Rendering the admin page
app.get('/admin',(req,res)=>{
    res.render('admin',{title:'Admin page'});
});
//Product schema for the products collection in mongoDB
const productSchema=new mongoose.Schema({
    productImage:String,
    productName:String,
    productPrice:Number,
    productQuantity:Number,
    productCategory:String//Store image data as Base64 string
});
const Product=mongoose.model('products',productSchema);

//Rendering the adminFeeds page which entails getting items from mongodb database
app.get('/adminFeeds',async(req,res)=>{
    try{
           //Query the database to fetch product details
           const products=await Product.find({});
           res.render('adminFeeds',{title:'Admin Feeds',Feeds:products});
        }catch(error){
        console.error('Error fetching items from the database',error);
        res.send('Something went wrong while opening the admin feeds page');
    }
})

//Posting the new added item from the adminFeeds form
app.post('/addProduct',upload.single('productImage'),async(req,res)=>{
    try{
        //Convert image buffer to Base64 string
        const base64Image=req.file.buffer.toString('base64');
        //Create new product object
        const newProduct=new Product({
            productImage:base64Image,//Store image as Base64 string
            productName:req.body.productName,
            productPrice:req.body.productPrice,
            productQuantity:req.body.productQuantity,
            productCategory:req.body.productCategory
        });
        //Save product to database
        await newProduct.save();
        //Set succcess message
        req.flash('success','Product added successfully');
        res.redirect('/adminFeeds');
    }catch(err){
        console.error(err);
        //Set error message
        req.flash('error','Failed to add product');
        res.redirect('/adminFeeds');
    }
});

//Route to handle form submission of the editted product and update the product
app.post('/products/:id/edit',upload.single('productImage'),async(req,res)=>{
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

//Route to handle delete operation for a specific product
app.post('/deleteProduct',async(req,res)=>{
    try{
        const productId=req.body.productId;
        //Delete the product from the database using the product ID
        await Product.findByIdAndDelete(productId);
        //Send success message
        req.flash('success','Product Deleted successfully');
        //Redirect to the route that renders the adminFeeds page
        res.redirect('/adminFeeds');
    }catch(err){
        console.error('Error deleting product:',err);
        //Send error message
        req.flash('error','Failed to delete the product');
        res.redirect('/adminFeeds');
    }
})
