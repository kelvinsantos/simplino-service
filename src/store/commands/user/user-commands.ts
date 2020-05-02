import log4js from "log4js";
const logger = log4js.getLogger("info");

// import schemas
import User from "../../../schemas/user"

// import types
import { UserRequest } from "../../../types/user/user-types"

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
        password: requestParams.password,
        is_deleted: false,
      });
      newUser.save()
      return newUser._id;
    } catch (error) {
      logger.error("There is something wrong while inserting user.", error);
      return Promise.reject(error);
    }
  }
  public async updateUser(requestParams: UserRequest) {
    logger.info("Called updateUser with request parameters:", requestParams);
    try {
      const updatedUser = User.findOneAndUpdate({ email: requestParams.email }, {
        first_name: requestParams.first_name,
        last_name: requestParams.last_name
      }, { upsert: true, new: true });
      return updatedUser;
    } catch (error) {
      logger.error("There is something wrong while updating user.", error);
      return Promise.reject(error);
    }
  }
  public async deleteUser(requestParams: UserRequest) {
    logger.info("Called deleteUser with request parameters:", requestParams);
    try {
      return await User.updateOne({ email: requestParams.email, is_deleted: { $ne: true } }, { "$set": { "is_deleted": true } })
    } catch (error) {
      logger.error("There is something wrong while deleting user.", error);
      return Promise.reject(error);
    }
  }
}

export = UserCommands;