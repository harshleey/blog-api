/* eslint-disable no-undef */
const { PrismaClient } = require('@prisma/client');
const database = new PrismaClient();
module.exports = { database };
