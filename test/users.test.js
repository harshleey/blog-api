import supertest from "supertest";
const request = supertest("https://helpful-fox-wear.cyclic.cloud");
import { expect } from "chai";
import { database } from "../src/libs/prisma.js";

describe("User Registration", function () {
  it("registers a new user", async function () {
    this.timeout(5000);
    const userData = {
      username: "newusersss",
      password: "password12345",
    };

    // Check if the user already exists in the database
    const existingUser = await database.user.findFirst({
      where: { username: userData.username },
    });
    if (existingUser) {
      // User already exists, handle the case accordingly
      throw new Error(`User with username ${userData.username} already exists`);
    }

    // If the user doesn't exist, proceed with registration
    const response = await request
      .post("/api/users/register")
      .set("Content-Type", "application/json")
      .send(userData);

    expect(response.status).to.eql(201);
    expect(response.body.token).to.be.a("string");
  });
});

let token = "";

describe("User Login", function () {
  it("logs in an existing user and retrieves the token", async function () {
    this.timeout(5000);
    const loginData = {
      username: "newusersss",
      password: "password12345",
    };
    const response = await request
      .post("/api/users/login")
      .set("Content-Type", "application/json")
      .send(loginData);

    expect(response.status).to.eql(200);

    // Retrieve the token from the response body
    token = response.body.token;

    expect(token).to.be.a("string");
  });
});

export { token };
