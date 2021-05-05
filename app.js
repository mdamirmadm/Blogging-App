const { urlencoded } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const blogRouter = require('./routes/blogs');
const seedDB = require('./seed');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/blogApp', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
.then(() => {
    console.log("DB Connected");
})
.catch(e => {
    console.log("OH NO ERROR!!!")
    console.log(e.message);
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(urlencoded({extended:true}));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: "weneedsomebettersecret",
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig));
app.use(flash());

app.use((req,res,next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// seedDB();


app.get('/', (req,res) => {
    res.send("LANDING PAGE");
})

app.use(blogRouter);






app.listen(3000, () => {
    console.log("Server running at port 3000");
})