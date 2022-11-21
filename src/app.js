const server = require("express");
const app = server();
const path = require("path");
const hbs = require("hbs");

require("./db/conn");

const port = process.env.PORT || 3000; //this is used to allow compoter to use any port available, in case not able to allocate port then allocate 3000 port 

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
app.use(server.static(static_path));


app.use(server.json());
app.use(server.urlencoded({extended:false}));


const Register = require("./models/register");

app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);//by this we need not to import/export one file to another for use!



app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})

app.get("/",(req,res)=>{
    // res.send("MERN Project");
    res.render("index",{ //means render index.hbs and pass this object as kind of argument/props to index.hbs file
        message:"Greeting!"
    });
})

app.get("/login",(req,res)=>{
    // res.send("MERN Project");
    res.render("login",{ //means render index.hbs and pass this object as kind of argument/props to index.hbs file
        message:"Please login!"
    });
})


app.get("/register",(req,res)=>{
    // res.send("MERN Project");
    res.render("register",{ //means render index.hbs and pass this object as kind of argument/props to index.hbs file
        message:"Please register!"
    });
})

//post request to store in database!
app.post("/register", async (req, res) => {
    try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

                    if(password === cpassword){
                        const registerEmployee = new Register({
                            firstname : req.body.firstname,
                            lastname  : req.body.lastname,
                            email     : req.body.email,
                            gender    : req.body.gender,
                            phone     : req.body.phone,
                            age       : req.body.age,
                            password  : req.body.password,
                            confirmpassword: req.body.confirmpassword
                        })
                        const registered = await registerEmployee.save();
                        res.status(201).render("index");
                    }else{
                        res.send("passwords are not matching")
                    }
                } catch (error) {
                    res.status(400).send(error);
                }
            });








/*
NOTES :- (also in file by sir (MERN_PROJECT)(drive(this file contains major steps not all steps!))

1. This line :- ["dev": "nodemon src/app.js"] added in package.json script, this is shortcut to start server using nodemon package! 
2. npm run dev (here write "dev" since in package.json we write dec as key of nodemon cmd!)

1. npm i mongoose
2. In db folder make a file conn.js and code to connect to mongodb 
3. write line "require("./db/conn")" in app.js for app.js connection with db conn.js (since npm run onlu app.js, all other called by app.js only!)

1. create public/index.html file ("!" for boiler plate code for html)
2. write these 2 lines in app.js for html connection :- a.) const path = require("path"); b.) const static_path = path.join(__dirname,"./public")
3. now app.get('./')  wala path hi aaega, to want html wala output on browser use this line : app.use(server.static(static_path));

1. npm i hbs
2. app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
3. we can use js in hbs by {} like in react but here multiple html pages

1. {{>navbar}} to use navbar in index.hbs

1. add registers
2. collect data, connect db


1. name to input fields same as in register.js
2. <form method="post" action="/register" > in register.hbs
*/


