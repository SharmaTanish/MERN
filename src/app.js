const server = require("express");
const app = server();
const path = require("path");
const hbs = require("hbs");

require("./db/conn");

const port = process.env.PORT || 3000; //this is used to allow compoter to use any port available, in case not able to allocate port then allocate 3000 port 

const static_path = path.join(__dirname,"../templates/views");
app.use(server.static(static_path));

app.set("view engine","hbs");

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






/*
NOTES :- (also in file by sir (MERN_PROJECT)(drive))

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
3. change app.get("/") and change static_path to "views"
*/


