const express=require('express');
const mysql=require('mysql');
const dotenv=require('dotenv');
const session=require('express-session');

dotenv.config({path:'./important.env'});

const app=express();
app.set('view engine','ejs');
app.use(express.static('public'));
//Parse URL-encoded bodies as sent by HTML 
app.use(express.urlencoded({extended:true}));

//Connecting to the database
const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    // port: process.env.PORT
});
//Checking for connection errors
db.connect((error)=>{
    if(error){
        console.log('Error connecting to the database',error)
    }else{
        console.log('Mysql connected successfully');
        app.listen(3000,()=>{
            console.log("Server running on port 3000");
        })
    }
})
//Rendering the home page
app.get('/',(req,res)=>{
    res.render('main',{title:'Landing page'})
});
//Rendering the signup page
app.get('/signup',(req,res)=>{
    res.render('signup',{title:'Sign up',errorMessage:null});
});
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
                    res.send('Sign up successful');
                }
            })
        }
    })
})
app.use((req,res) => {
    res.send("Page error");
})
