const express=require('express');
const mysql=require('mysql');
const dotenv=require('dotenv');
const nodemailer=require('nodemailer');
const session=require('express-session');

dotenv.config({path:'./important.env'});

const app=express();
app.set('view engine','ejs');
app.use(express.static('public'));
//Middleware for parsing URL-encoded form data
app.use(express.urlencoded({extended:true}));

//Setting up MySQL connection
const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    //port: process.env.PORT
});
//Connect to MySQL
db.connect((error)=>{
    if(error){
        console.log('Error connecting to the database',error)
    }else{
        console.log('Mysql connected successfully');
        app.listen(3000,()=>{
            console.log("Server running on port 3000");
        })
    }
});
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
//Rendering the login page
app.get('/login',(req,res)=>{
    res.render('login',{title:'Log in Page'});
})
//Posting the signup page details
app.post('/signup',(req,res)=>{
    const{username,phoneNumber,email,password}=req.body;
    //Checking whether the input fields are filled
    if(!username||!phoneNumber||!email||!password || phoneNumber.length!=10){
        const errorMessage='Fill in your details correctly';
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
