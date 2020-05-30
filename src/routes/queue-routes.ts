import * as express from "express";
const router = express.Router();

// import utilities
import RouterUtil from "../utils/router-utils";

// import middlewares
import AuthMiddleware from "../middlewares/auth-middleware";

// import handlers
import QueueHandler from "../handlers/queue-handler";

const routerUtil = new RouterUtil(router);

const queueHandler = new QueueHandler();
const authMiddleware = new AuthMiddleware();
router.route("/queue/:id").get(authMiddleware.validateToken, queueHandler.get);
// routerUtil.buildGetRoute("/queue/:id", queueHandler.get);
routerUtil.buildPostRoute("/queue", queueHandler.insert);
routerUtil.buildPutRoute("/queue/:id", queueHandler.update);
routerUtil.buildDeleteRoute("/queue/:id", queueHandler.delete);

export default router;