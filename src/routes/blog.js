/* eslint-disable no-undef */
const express = require('express');
const upload = require('../middleware/multer.js');
const router = express.Router();
const {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    filterByTag,
} = require('../controllers/blog.js');
const { tokenAuth } = require('../middleware/tokenAuth.js');

router
    .post('/', tokenAuth, upload.single('file'), createBlog)
    .get('/', getBlogs)
    .get('/:id', getBlog)
    .put('/:id', tokenAuth, updateBlog)
    .delete('/:id', tokenAuth, deleteBlog)
    .get('/findTag/:tag', filterByTag);

module.exports = router;
