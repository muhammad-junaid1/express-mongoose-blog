// Require Modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const PORT = process.env.PORT || 8000;
if(process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Register partials
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "./views/partials/"));

// Configure template engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Connect to database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  })
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => console.log(error));

// Routes
app.get("/", async (req, res) => {
  const Article = require("./models/article");
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    if (articles.length == 0) {
      res.render("layouts/index", { title: "Homepage", isEmpty: true });
    } else {
      res.render("layouts/index", { title: "Homepage", articles });
    }
  } catch (error) {
    res.send(error);
  }
});
const articleRouter = require("./routes/article.js");
app.use("/articles", articleRouter);

// Render 404 Error page
app.use((req, res) => {
  res.send(
    "<h1 style='text-align: center; color: red'>Page Not Found - 404</h1>"
  );
});
