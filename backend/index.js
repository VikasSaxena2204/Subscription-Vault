const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.rewriter({
  '/api/customers': '/customers',
  '/api/products': '/products',
  '/api/subscriptions': '/subscriptions',
  '/api/subscriptions/:id': '/subscriptions/:id',
  '/api/subscriptions/:id/extend': '/subscriptions/:id',
}));


server.use(router);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});

// module.exports = server;