/* eslint-disable no-undef */
const supertest = require('supertest');
const { expect } = require('chai');
const { token } = require('./users.test.js');

const request = supertest('https://helpful-fox-wear.cyclic.cloud/api');

describe('GET /blogs', function () {
    it('returns all blogs', async function () {
        this.timeout(5000);
        const response = await request.get('/blogs');

        expect(response.status).to.eql(200);
    });
});

describe("Fetch a User's Post (GET /blogs)", function () {
    it('returns a specific blog based on ID', async function () {
        const blogId = '651694a7505e4a81c4e4f731';

        // Send the request with the Authorization header containing the token
        const response = await request
            .get('/blogs')
            .set('Authorization', `Bearer ${token}`); // Include the token in the header

        // Find the specific blog with the matching ID
        const specificBlog = response.body.blogs.find(
            (blog) => blog.id === blogId,
        );

        // Add error handling
        if (!specificBlog) {
            throw new Error(`Blog with ID ${blogId} not found`);
        }

        // Assert the response as needed
        expect(response.status).to.eql(200);

        // Assert specific blog properties
        expect(specificBlog.title).to.equal('This is amazing');
        expect(specificBlog.content).to.equal('Tech money');
    });
});
