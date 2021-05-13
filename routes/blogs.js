const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const {isLoggedIn} = require('../middleware');
const upload = require('../handlers/multer');
const cloudinary = require('../handlers/cloudinary');
const { closeDelimiter } = require('ejs');
const Like = require('../models/like');


//Getting all the blogs
router.get('/blogs', async(req,res) => {
    try{
        const blogs = await Blog.find({});
        res.render('blogs/blogs',{ blogs });
    }
    catch(e){
        console.log('Something went Wrong!');
        req.flash('error','There was some error while getting the posts.');
        res.redirect('/error');
    }
    
})


//Getting a form to create new blog
router.get('/blogs/new',isLoggedIn, (req,res) => {
    try{
        res.render('blogs/new');
    }
    catch(e){
        console.log(e.message);
        res.flash('error','Some error occurred while getting the form.');
        res.redirect('/blogs');
    }
   
})

//Posting a new Blog
router.post('/blogs',isLoggedIn,upload.single('img'), async(req,res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        const blog = new Blog({
            img: result.secure_url,
            cloudinary_id: result.public_id,
            title: req.body.title,
            author: req.body.author,
            user: req.user.username,
            desc: req.body.desc
        });   
        await Blog.create(blog);
        req.flash('success','New Blog Added Successfully.');
        res.redirect('/blogs');
    }
    catch(e){
        console.log("Could not post blog");
        console.log(e);
        req.flash('error','Blog could not be posted due to some Error.')
        res.redirect('/blogs');
    }
    
})



//Showing a particular blog
router.get('/blogs/:id',isLoggedIn, async(req,res) => {

    try{
        Blog.findById(req.params.id).populate([{
            path: 'comments',
            model: 'Comment'
        }, {
            path: 'likes',
            model: 'Like'
        }]).exec(function(err,blog){
            if(err){
                console.log(err);
            }
            return res.render('blogs/show', { blog });
        }); 
        
    }
    catch(e){
        console.log("Something Went Wrong!");
        console.log(e);
        req.flash('error','No blog found');
        res.redirect('/blogs');
    }
   
})

//Getting a form for editing
router.get('/blogs/:id/edit', isLoggedIn, async(req,res) => {

    try{
        const blog = await Blog.findById(req.params.id);

        res.render('blogs/edit',{ blog });
    }
    catch(e){
        console.log("Something Went Wrong!");
        req.flash('error','Some Error Occurred while geeting the Form.');
        res.redirect(`blogs/${req.params.id}`);
    }
   
})


//Patch request for Updating a Post
router.patch('/blogs/:id',isLoggedIn,upload.single('img'), async(req,res) => {

    try{          
        if(req.file){
            let blog_id = await Blog.findById(req.params.id);
            await cloudinary.uploader.destroy(blog_id.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path);
            var blog = {
                title: req.body.title,
                img: result.secure_url,
                cloudinary_id: result.public_id,
                author: req.body.author,
                desc: req.body.desc
            }
        }else{
            var blog = {
                title: req.body.title,
                author: req.body.author,
                desc: req.body.desc
            }
        }

        await Blog.findByIdAndUpdate(req.params.id,blog);  
        req.flash('success','Post edited successfully');
        res.redirect(`/blogs/${req.params.id}`);
    }
    catch(e){
        console.log('Something went wrong');
        console.log(e);
        req.flash('error','Post could not be updated due to some error');
        res.redirect(`/blogs/${req.params.id}`);
    }
   
})

//Deleting a Post
router.delete('/blogs/:id',isLoggedIn, async(req,res) => {

    try{
        const blog = await Blog.findById(req.params.id);
        await cloudinary.uploader.destroy(blog.cloudinary_id);
        await Blog.findByIdAndDelete(req.params.id);
        req.flash('success','Post Deleted Successfully!');
        res.redirect('/blogs');
    }
    catch(e){
        console.log('Something went wrong');
        console.log(e);
        req.flash('error','Post could not be Deleted due to some error');
        res.redirect(`/blogs/${req.params.id}`);
    }
   
})


//posting a comment
router.post('/blogs/:id/comment',isLoggedIn, async(req,res) => {

    const blog = await Blog.findById(req.params.id);
    const comment = new Comment({
        user: req.user.username,
        ...req.body
    });
    blog.comments.push(comment);

    await comment.save();
    await blog.save();
    
    res.redirect(`/blogs/${req.params.id}`);
})

router.get('/error',(req,res) => {

    res.render('blogs/error');
})

router.post('/blogs/:id/like',isLoggedIn, async(req,res) => {
        const blog = await Blog.findById(req.params.id);
        const like = new Like({
            user: req.user.username
        })
    
        blog.likes.push(like);
    
        await like.save();
        await blog.save();
        
        res.redirect(`/blogs/${req.params.id}`);
    
//     // catch(e){
//     //     console.log(e);
//     //     req.flash('error','Some error occurred');
//     //     res.redirect(`/blogs/${req.params.id}`);
//     // }
   
})

router.delete('/blogs/:id/dislike/:likeId',async(req,res) => {
    const {id,likeId} = req.params;
    await Blog.findByIdAndUpdate(id,{$pull:{likes: likeId}});
    // console.log('Disliked successfully');
    res.redirect(`/blogs/${id}`);
})



module.exports = router;