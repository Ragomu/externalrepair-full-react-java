import cookieParser from 'cookie-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import moment from 'moment';
import { config, telefunc } from 'telefunc';
import { renderPage } from 'vike/server';
import { root } from './root.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });
const isDebug = process.env.NODE_ENV === 'dev';
const port = process.env.PORT || 3000;
config.disableNamingConvention = true;

startServer();

async function startServer() {
  const app = express();
  app.use(compression());
  await assets(app);
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.text());
  telefuncInit(app);
  vike(app);
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

async function assets(app: Express) {
  if (isDebug) {
    const vite = await import('vite');
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  } else {
    const sirv = (await import('sirv')).default;
    app.use(sirv(`${root}/dist/client`));
  }
}

function telefuncInit(app: Express) {
  app.all('/_telefunc', async (req, res) => {
    const context = {};
    const { body, statusCode, contentType } = await telefunc({
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      context,
    });
    const bodyJson = JSON.parse(body);
    if (typeof bodyJson.ret == 'object' && 'cookies' in bodyJson.ret) {
      const cookies = bodyJson.ret.cookies;
      Object.keys(cookies).map((keyCookie: string) => {
        if (!!cookies[keyCookie]) {
          const dateNow = moment().utcOffset(0, true).valueOf();
          const expiredCookie = Math.abs(
            Math.round(dateNow - cookies[keyCookie].expires_in),
          );
          res.cookie(keyCookie, JSON.stringify(cookies[keyCookie]), {
            maxAge: expiredCookie,
            httpOnly: true,
          });
        } else {
          res.clearCookie(keyCookie);
        }
      });
    }
    delete bodyJson.ret.cookies;
    res.status(statusCode).type(contentType).send(JSON.stringify(bodyJson));
  });
}

function vike(app: Express) {
  app.get('*', async (req: any, res, next) => {
    const userAgent = req.headers['user-agent'];
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      userAgent,
      ...req.cookies,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    } else {
      const { statusCode, headers, earlyHints } = httpResponse;
      if (res.writeEarlyHints)
        res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode);
      httpResponse.pipe(res);
    }
  });
}
