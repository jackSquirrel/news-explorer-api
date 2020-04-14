const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');
const { getArticlesValid, createArticleValid, deleteArticleValid } = require('../constants/validation');

router.get('/', getArticlesValid, getArticles);
router.post('/', createArticleValid, createArticle);
router.delete('/:articleId', deleteArticleValid, deleteArticle);

module.exports = router;
