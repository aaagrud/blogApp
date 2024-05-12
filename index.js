import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];
let indexToEdit;

app.get("/", (req, res) => {
    res.render("index.ejs", {posts});
});

app.post("/", (req, res) => {
    const indexToDelete = req.body.m;
    if (indexToDelete !== undefined) {
        posts.splice(indexToDelete - 1, 1);
    }
    res.redirect('/');
});

app.post("/edited", (req, res) => {
    const {title, content} = req.body;
    const newPost = {title, content};
    posts[indexToEdit - 1] = newPost;
    res.redirect('/');
})

app.post("/create", (req, res) => {
    const { title, content } = req.body;
    const newPost = { title, content };
    posts.push(newPost);
    res.redirect('/');
});

app.post("/edit", (req, res) => {
    indexToEdit = req.body.m;
    console.log(posts[indexToEdit - 1]);
    const t = posts[indexToEdit - 1].title;
    const c = posts[indexToEdit - 1].content;
    res.render("edit.ejs", {
        title : t,
        content : c
    })
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
});



app.listen(port, () => {
    console.log(`listening at port ${port}`);
});