const Article = require("../models/article");

const newArticleForm = (req, res) => {
  res.render("layouts/new", { title: "Insert an article" });
};

const postArticle = async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    const result = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (error) {
    console.log(error);
    res.render("layouts/new", { title: "Insert an article", article });
  }
};

const getArticle = async (req, res) => {
  const slug = req.params.slug;
  const article = await Article.findOne({ slug: slug });
  if (article == null || article == false || article == {}) {
    res.redirect("/");
  } else {
    res.render("layouts/show", {
      title: article.title,
      article,
      createdAt: article.createdAt.toLocaleDateString(),
    });
  }
};

const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
};

const editArticle = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findById(id);
    res.render("layouts/edit", { title: "Edit", article });
  } catch (error) {
    res.send(error);
  }
};

const updateArticle = async (req, res) => {
  const id = req.params.id;
  try {
    let article = await Article.findById(id);
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  newArticleForm,
  postArticle,
  getArticle,
  deleteArticle,
  editArticle,
  updateArticle,
};
