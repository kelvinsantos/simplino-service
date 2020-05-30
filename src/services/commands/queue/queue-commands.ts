import log4js from "log4js";
const logger = log4js.getLogger("queue-services");

// import schemas
import Queue from "../../../schemas/queue"

// import types
import { QueueRequest } from "../../../types/queue-types"

// import utils
import AuthUtils from "../../../utils/auth-utils";

/**
 * @module queue-commands.ts
 * @description Module used for calling queue commands.
 * @author Kelvin John Santos
 * @version 1.0
 * @since May 29, 2020
 */
class QueueCommands {
  public async insertQueue(requestParams: QueueRequest) {
    logger.info("Called insertQueue with request parameters:", requestParams);
    try {
      const newQueue = new Queue({
        user: requestParams.user,
        establishment: requestParams.establishment,
        position_in_queue: requestParams.position_in_queue,
        waiting_time: requestParams.waiting_time,
        coordinates: requestParams.coordinates,
        status: requestParams.status,
        is_deleted: false
      });
      newQueue.save();
      return newQueue._id;
    } catch (error) {
      logger.debug("There is something wrong while inserting queue.", error);
      return Promise.reject(error);
    }
  }
  public async updateQueue(requestParams: any) {
    logger.info("Called updateQueue with request parameters:", requestParams);
    try {
      // PATCH update - update only the fields which are supplied on request body
      let query: any = {$set: {}};
      for (let key in requestParams) {
        if (requestParams[key])
          query.$set[key] = requestParams[key];
      }

      const updatedQueue = Queue.findOneAndUpdate({ _id: requestParams.id }, query, { upsert: true, new: true });
      return updatedQueue;
    } catch (error) {
      logger.debug("There is something wrong while updating queue.", error);
      return Promise.reject(error);
    }
  }
  public async deleteQueue(requestParams: QueueRequest) {
    logger.info("Called deleteQueue with request parameters:", requestParams);
    try {
      return await Queue.updateOne({ _id: requestParams.id, is_deleted: { $ne: true } }, { "$set": { "is_deleted": true } })
    } catch (error) {
      logger.debug("There is something wrong while deleting queue.", error);
      return Promise.reject(error);
    }
  }
}

export = QueueCommands;