import log4js from "log4js";
const logger = log4js.getLogger("user-services");

// import schemas
import User from "../../../schemas/user"

// import types
import { UserRequest } from "../../../types/user-types"

// import utils
import AuthUtils from "../../../utils/auth-utils";

/**
 * @module user-commands.ts
 * @description Module used for calling user commands.
 * @author Kelvin John Santos
 * @version 1.0
 * @since May 02, 2020
 */
class UserCommands {
  public async insertUser(requestParams: UserRequest) {
    logger.info("Called insertUser with request parameters:", requestParams);
    try {
      const newUser = new User({
        email: requestParams.email,
        first_name: requestParams.first_name,
        last_name: requestParams.last_name,
        mobile_number: requestParams.mobile_number,
        password: await new AuthUtils().hashPassword(requestParams.password),
        is_deleted: false,
      });
      newUser.save();
      return newUser._id;
    } catch (error) {
      logger.debug("There is something wrong while inserting user.", error);
      return Promise.reject(error);
    }
  }
  public async updateUser(requestParams: any) {
    logger.info("Called updateUser with request parameters:", requestParams);
    try {
      // PATCH update - update only the fields which are supplied on request body
      let query: any = {$set: {}};
      for (let key in requestParams) {
        if (requestParams[key])
          query.$set[key] = requestParams[key];
      }

      const updatedUser = User.findOneAndUpdate({ _id: requestParams.id }, query, { upsert: true, new: true });
      return updatedUser;
    } catch (error) {
      logger.debug("There is something wrong while updating user.", error);
      return Promise.reject(error);
    }
  }
  public async deleteUser(requestParams: UserRequest) {
    logger.info("Called deleteUser with request parameters:", requestParams);
    try {
      return await User.updateOne({ _id: requestParams.id, is_deleted: { $ne: true } }, { "$set": { "is_deleted": true } })
    } catch (error) {
      logger.debug("There is something wrong while deleting user.", error);
      return Promise.reject(error);
    }
  }
}

export = UserCommands;