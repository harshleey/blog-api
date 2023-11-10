/* eslint-disable no-undef */
const { StatusCodes } = require('http-status-codes');
const { database } = require('../libs/prisma.js');
const { asyncWrapper } = require('../middleware/async-wrapper.js');
const slugify = require('slugify');
const cloudinary = require('../middleware/cloudinary.js');

const createBlog = asyncWrapper(async (req, res) => {
    const { title, tags, content } = req.body;
    const { id: userId } = req.user;

    // Generate a slug
    const newSlug = slugify(title, {
        replacement: '-', // Replace spaces with dashes
        lower: true, // Convert to lowercase
    });

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const blog = await database.blog.create({
        data: {
            image: result.secure_url,
            title,
            slug: newSlug,
            tags,
            content,
            cloudinaryId: result.public_id,
            userId,
        },
    });
    res.status(StatusCodes.CREATED).json({ blog, errors: null });
});

const getBlogs = asyncWrapper(async (req, res) => {
    const blogs = await database.blog.findMany();
    res.status(StatusCodes.OK).json({ blogs, errors: null });
});

const getBlog = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const blogs = await database.blog.findUnique({
        where: { id },
    });
    res.status(StatusCodes.OK).json({ blogs, errors: null });
});

const updateBlog = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { image, title, tags, content } = req.body;
    const { id: userId } = req.user;

    // Update slug
    const updateSlug = slugify(title, {
        replacement: '-',
        lower: true,
    });

    const blog = await database.blog.update({
        data: {
            image,
            title,
            slug: updateSlug,
            tags,
            content,
        },
        where: { id, userId },
    });
    res.status(StatusCodes.OK).json({ blog, errors: null });
});

const deleteBlog = asyncWrapper(async (req, res) => {
    const { id: userId } = req.user;
    const { id } = req.params;

    const blog = await database.blog.findUnique({
        where: { id },
    });

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(blog.cloudinaryId);

    // Delete from database
    const delBlog = await database.blog
        .delete({ where: { id, userId } })
        .catch((error) => error.meta);
    res.status(StatusCodes.NO_CONTENT).json({
        blog: delBlog ? delBlog : null,
        errors: delBlog?.cause ? delBlog.cause : null,
    });
});

const filterByTag = asyncWrapper(async (req, res) => {
    const { tag } = req.params;
    const blogs = await database.blog.findMany({
        where: {
            tags: {
                has: tag,
            },
        },
    });
    res.status(StatusCodes.OK).json({ blogs, errors: null });
});

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    filterByTag,
};
