export { applyMiddleware, applyRoutes };

import { default as bodyParser } from 'body-parser';

const applyMiddleware = (app, middleware) => {
  middleware.forEach(mw => {
    app.use(mw);
  });
};

const applyRoutes = (app, routes) => {
  app.use('/api', routes)
};
