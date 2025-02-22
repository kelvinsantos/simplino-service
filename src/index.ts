import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import log4js from "log4js";
import config from "config";
import path from "path";
import swaggerUi from "swagger-ui-express";
// import swaggerDocument from './swagger.json';
import { MongoMemoryServer } from 'mongodb-memory-server';

import userRoutes from "./routes/user-routes"
import establishmentRoutes from "./routes/establishment-routes"
import queueRoutes from "./routes/queue-routes"

// configure logger
log4js.configure(config.get("log4js"));

if (process.env.NODE_ENV === "test") {
  const mongoServer = new MongoMemoryServer();
  mongoServer.getUri().then((mongoUri) => {
    const mongooseOpts = {
      // options for mongoose 4.11.3 and above
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    };
    mongoose.connect(mongoUri, mongooseOpts);
  
    mongoose.connection.on('error', (e) => {
      if (e.message.code === 'ETIMEDOUT') {
        console.log(e);
        mongoose.connect(mongoUri, mongooseOpts);
      }
      console.log(e);
    });
  
    mongoose.connection.once('open', () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
  });
} else {
  // configure database
  let databaseUrl = "mongodb://" + config.get("mongo.host") + "/" + config.get("mongo.databaseName");
  if (process.env.NODE_ENV === "production") {
    databaseUrl = process.env.MONGODB_URI;
  }

  // tslint:disable-next-line:no-console
  console.log("Try to connect to database: " + databaseUrl);
  mongoose.Promise = global.Promise;
  mongoose
    .connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err: Error) => {
      // tslint:disable-next-line:no-console
      console.log("Could not connect to database:", err);
    });
  mongoose.set('useCreateIndex', true);
}

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.PORT || config.get("server.port");

const app = express();

// JSON Setup
app.use(
  bodyParser.json({
    limit: "5mb"
  })
); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true })); // support encoded bodies
app.use(
  cors({
    origin: [
      /localhost/
    ],
    credentials: true,
    exposedHeaders: ["Content-Disposition"]
  })
);

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
} );

// initialize all api routes
app.use("/api", [
  userRoutes, 
  establishmentRoutes, 
  queueRoutes
]);

app.use(express.static(path.join(__dirname, 'public')));

let options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: `${config.get("simplinoApiBaseUrl")}/api-docs/user.yml`,
        name: 'User'
      },
      {
        url: `${config.get("simplinoApiBaseUrl")}/api-docs/establishment.yml`,
        name: 'Establishment'
      },
      {
        url: `${config.get("simplinoApiBaseUrl")}/api-docs/queue.yml`,
        name: 'Queue'
      }
    ]
  }
};

//Show swagger documentation only for local development instance
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, options));

// swaggerUI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log( `server started at http://localhost:${ port }` );
});