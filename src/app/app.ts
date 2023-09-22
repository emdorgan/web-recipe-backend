import cors = require('@koa/cors');
import { Context } from 'koa';
import * as HttpStatus from 'http-status-codes';
const Router = require('koa-router');
const Koa = require('koa');
const compress = require ('koa-compress');
const app = new Koa();
const router = new Router();


app.use(async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});


// Middleware
app.use(cors())
app.use(compress())

//test route
app.use(async (context:Context) => {
  context.body = 'Hello world';
  console.log('Hello world!')
});


app.use(router.routes());

app.on('error', console.error);

export default app;