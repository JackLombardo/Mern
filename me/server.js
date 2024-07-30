const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');


const app = new Koa();
const router = new Router();

const auth = require('./middleware/auth');
const authRoutes = require('./routes/auth');

// Middleware
app.use(bodyParser());

app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());

router.get('/dashboard', auth, async (ctx) => {
  ctx.body = 'Welcome to the Dashboard!';
});

// Routes
router.get('/', async (ctx) => {
  ctx.body = 'Welcome to the Home Page!';
});

router.get('/dashboard', async (ctx) => {
  // Middleware to check authentication
  // Example: if (ctx.request.headers.authorization) { ... }
  ctx.body = 'Welcome to the Dashboard!';
});

app.use(router.routes());
app.use(router.allowedMethods());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
