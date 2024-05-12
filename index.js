import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

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

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/create", (req, res) => {
    const { title, content } = req.body;
    const newPost = { title, content };
    posts.push(newPost);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`listening at port ${port}`);
});