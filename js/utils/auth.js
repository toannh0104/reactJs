/**
 * Authentication lib
 * @type {Object}
 */
var auth = {
  /**
   * Logs a user in
   * @param  {Function} callback Called after a user was logged in on the remote server
   */
  login(callback) {
    // If there is a token in the localStorage, the user already is
    // authenticated
    if (this.loggedIn()) {
      callback(true);
      return;
    }
    localStorage.token = "LOGGED_OK";
    callback(true);
  },
  /**
   * Logs the current user out
   */
  logout(callback) {
    callback(true);
  },
  /**
   * Checks if anybody is logged in
   * @return {boolean} True if there is a logged in user, false if there isn't
   */
  loggedIn() {
    return !!localStorage.token;
  },
  /**
   * Registers a user in the system
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was registered on the remote server
   */
  register(username, password, callback) {
    this.login(callback);
  },
  onChange() {}
}

module.exports = auth;
