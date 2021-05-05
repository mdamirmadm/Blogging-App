const mongoose = require('mongoose');
const Blog = require('./models/blog');


const blogs = [
    {
        img:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        title: "Nature",
        desc: "Nature, in the broadest sense, is the natural, physical, material world or universe. 'Nature' can refer to the phenomena of the physical world, and also to life in general. ... Within the various uses of the word today, 'nature' often refers to geology and wildlife.",
        author: "Md.Amir"
    },
    {
        img:"https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        title: "Mountains",
        desc: "Nature, in the broadest sense, is the natural, physical, material world or universe. 'Nature' can refer to the phenomena of the physical world, and also to life in general. ... Within the various uses of the word today, 'nature' often refers to geology and wildlife.",
        author: "Asad"
    },
    {
        img:"https://images.unsplash.com/photo-1540206395-68808572332f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        title: "Oceans",
        desc: "Nature, in the broadest sense, is the natural, physical, material world or universe. 'Nature' can refer to the phenomena of the physical world, and also to life in general. ... Within the various uses of the word today, 'nature' often refers to geology and wildlife.",
        author: "Ajaz"
    },
    {
        img:"https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        title: "Forests",
        desc: "Nature, in the broadest sense, is the natural, physical, material world or universe. 'Nature' can refer to the phenomena of the physical world, and also to life in general. ... Within the various uses of the word today, 'nature' often refers to geology and wildlife.",
        author: "Arshad Ali"
    }
]


const seedDB = async function(){
    await Blog.insertMany(blogs)
    .then(() => {
        console.log("DB seeded");
    })
    .catch(e => {
        console.log("Some Error while seeding DB");
        console.log(e.message);
    })
};

module.exports = seedDB;
