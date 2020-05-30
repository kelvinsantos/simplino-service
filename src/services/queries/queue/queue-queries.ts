import log4js from "log4js";
const logger = log4js.getLogger("queue-services");

// import schemas
import Queue from "../../../schemas/queue"

// import types
import { QueueRequest } from "../../../types/queue-types"

// import utils
import AuthUtils from "../../../utils/auth-utils";

/**
 * @module queue-queries.ts
 * @description Module used for calling queue queries.
 * @author Kelvin John Santos
 * @version 1.0
 * @since May 29, 2020
 */
class QueueQueries {
  public async getQueue(requestParams: QueueRequest) {
    logger.info("Called getQueue with request parameters:", requestParams);
    try {
      const queue = await Queue.findOne({ _id: requestParams.id, is_deleted: { $ne: true } }).populate(["user", "establishment"]);
      return queue;
    } catch (error) {
      logger.debug("There is something wrong while getting queue.", error);
      return Promise.reject(error);
    }
  }
}

export = QueueQueries;