const Router = require('koa-router');
const User = require('../models/User');
const Org = require('../models/Org');
//const Organization = require('../models/Organization');
const jwt = require('jsonwebtoken');

const router = new Router();

// router.post('/signup', async (ctx) => {
//   const { username, password } = ctx.request.body;
//   const user = new User({ orgName, firstName, lastName, email, password });
//   await user.save();
//   ctx.body = { message: 'User registered successfully' };
// });

router.post('/login', async (ctx) => {
    console.log("TESTTTTTTTTTTT")
    const { username, password } = ctx.request.body;
    try {
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        ctx.status = 400;
        ctx.body = { message: 'Invalid username or password' };
        return;
      }
      const token = user.generateAuthToken();
      ctx.body = { token };
    } catch (err) {
      ctx.status = 500;
      ctx.body = { message: 'Server error' };
    }
  });
  
/*
TODO GET ORG AND USERS SET UP TOGETHER
*/
router.post('/signup', async (ctx) => {
  const { orgName, firstName, lastName, email, password} = ctx.request.body;
  const username = "@" + email;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("existingUser");
      ctx.status = 400;
      ctx.body = { message: 'Email already exists' };
      return;
    }
    if (!username) {
      ctx.status = 400;
      ctx.body = { message: 'Username is required' };
      return;
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      console.log("existingUsername");
      ctx.status = 400;
      ctx.body = { message: 'Username already exists' };
      return;
    }
    const adminEmail = email;
    const org = new Org({ orgName, adminEmail });
    const orgId = org._id
    await org.save();
    const user = new User({ orgName, orgId, firstName, lastName, email, password, username });
    await user.save();
    ctx.status = 201;
    ctx.body = { message: 'User registered successfully' };
  } catch (err) {
    console.log("Error:", err);
    ctx.status = 500;
    ctx.body = { message: 'Server error' };
  }
});

router.get('/api/getUser/:id', async (ctx) => {
  const { id } = ctx.params; // Get the ID from the URL parameters

  try {
    const user = await User.findById(id); // Find the document by _id
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'Organization not found' };
      return;
    }
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

router.get('/api/getOrg/:id', async (ctx) => {
  const { id } = ctx.params; // Get the ID from the URL parameters

  try {
    const organization = await Org.findById(id); // Find the document by _id
    if (!organization) {
      ctx.status = 404;
      ctx.body = { error: 'Organization not found' };
      return;
    }
    ctx.status = 200;
    ctx.body = organization;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

module.exports = router;
