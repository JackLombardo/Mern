const Router = require('koa-router');
const authenticate = require('../middleware/auth');

const router = new Router();

router.use(authenticate);

router.get('/protected-data', async (ctx) => {
  ctx.body = { data: 'This is protected data' };
});

module.exports = router;
