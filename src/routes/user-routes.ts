import * as express from "express";
const router = express.Router();

// import utilities
import RouterUtil from "../utils/router-utils";

// import middlewares
import AuthMiddleware from "../middlewares/auth-middleware";

// import handlers
import UserHandler from "../handlers/user/user-handler";

const routerUtil = new RouterUtil(router);

const userHandler = new UserHandler();
const authMiddleware = new AuthMiddleware();
router.route("/user/:id").get(authMiddleware.validateToken, userHandler.get);
// routerUtil.buildGetRoute("/user/:id", userHandler.get);
routerUtil.buildPostRoute("/user", userHandler.insert);
routerUtil.buildPutRoute("/user/:id", userHandler.update);
routerUtil.buildDeleteRoute("/user/:id", userHandler.delete);

export default router;