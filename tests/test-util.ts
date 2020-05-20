// Load schemas
import User from "../src/schemas/user";

class TestUtil {
  /**
   * @param {boolean} cleanDatabase - it will clean the database if true
   */
  static initDatabase(cleanDatabase: Boolean) {
    // Empty the database
    if (cleanDatabase === true) {
      return TestUtil.cleanDatabase().then(() => {
        return Promise.resolve();
      });
    }
  }

  /**
   * Clean the database
   */
  static cleanDatabase() {
    return Promise.all([
      User.remove({}).exec()
    ]);
  }

  /**
   * Delay execution of the next promise
   * @param {Number} delay - delay to wait in milliseconds
   * @return {Promise} a thenable resolved promise
   */
  static delayPromise(delay: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }

  /**
   * Higher order function that wrap an async function in try/catch and returns mocha's done
   * @param {Function} fn - function to wrap
   * @return {Function}
   */
  static testAsync(fn: any) {
    return (done: any) => {
      fn.call().then(() => {
        done();
      }).catch((err: Error) => {
        done(err);
      });
    };
  }
}

export = TestUtil;