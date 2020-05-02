import * as express from "express";
const router = express.Router();

// import utilities
import RouterUtil from "../utils/router-utils";

// import handlers
import UserHandler from "../handlers/user/user-handler";

const routerUtil = new RouterUtil(router);

const userHandler = new UserHandler();
routerUtil.buildGetRoute("/user/:email", userHandler.get);
routerUtil.buildPostRoute("/user", userHandler.insert);
routerUtil.buildPutRoute("/user/:email", userHandler.update);
routerUtil.buildDeleteRoute("/user/:email", userHandler.delete);

export default router;