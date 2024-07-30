const jwt = require('jsonwebtoken');
const jwtSecret = 'your_jwt_secret'; // Your JWT secret key

const authenticate = (ctx, next) => {
  const authHeader = ctx.headers['authorization'];
  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { message: 'No token provided' };
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, jwtSecret);
    return next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { message: 'Invalid token' };
  }
};

module.exports = authenticate;
