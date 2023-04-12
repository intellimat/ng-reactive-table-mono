const jsonServer = require("json-server");
const cors = require("cors");
const usersValidatorsMiddlewares = require("./validators");
const server = jsonServer.create();
const dbRouter = jsonServer.router("db.json");
const defaultMiddlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

server.use(cors());
server.use(jsonServer.bodyParser);

server.use(usersValidatorsMiddlewares.patch);
server.use(usersValidatorsMiddlewares.put);
server.use(usersValidatorsMiddlewares.post);

server.use(defaultMiddlewares);
server.use(dbRouter);

server.listen(PORT, () => {
  console.log("JSON Server is running on port " + PORT);
});
