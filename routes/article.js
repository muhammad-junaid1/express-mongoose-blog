const express = require("express");
const router = express.Router();
const articleControllers = require("../controllers/article.js");

// All routes
router.get("/", (req, res) => {
  res.redirect("/");
});
router.get("/new", articleControllers.newArticleForm);
router.get("/:slug", articleControllers.getArticle);
router.get("/edit/:id", articleControllers.editArticle);
router.post("/", articleControllers.postArticle);
router.delete("/:id", articleControllers.deleteArticle);
router.put("/:id", articleControllers.updateArticle);

module.exports = router;
