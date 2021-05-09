const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');

router.get('/register',(req,res) => {
    res.render('auth/signup');
})

router.post('/register',async(req,res) => {
    try{
        const user = new User({username: req.body.username, email: req.body.email});
        const newUser = await User.register(user,req.body.password);
        req.flash('success','User Registered Successfully');
        // console.log(newUser);
        res.redirect('/login');
    }
    catch(e){
        console.log(e);
        req.flash('error','Something went Wrong. Please Try Again');
        res.redirect('/register');
    }
})


router.get('/login',(req,res) => {
    res.render('auth/login');
})

router.post('/login',
  passport.authenticate('local', {
                                   failureRedirect: '/login',
                                   failureFlash: true 
                                }),(req,res) => {
                                    req.flash('success',`Welcome Back ${req.user.username}`);
                                    res.redirect('/blogs');
                                }
);

router.get('/logout',(req,res) => {
    req.logOut();
    req.flash('success','Logged Out Successfully');
    res.redirect('/login');
})





module.exports = router;