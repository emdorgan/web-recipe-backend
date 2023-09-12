import * as Koa from 'koa';
import * as HttpStatus from 'http-status-codes';

const compression = require('compression')
const cors = require('cors')
const app:Koa = new Koa();


app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

// test route
app.use(async (ctx:Koa.Context) => {
  ctx.body = 'Hello world';
  console.log('Hello world!')
});

// Middleware
app.use(cors())
app.use(compression())

app.on('error', console.error);

export default app;