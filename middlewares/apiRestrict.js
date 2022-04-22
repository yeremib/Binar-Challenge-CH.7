// middlewares/restrict.js
const passport = require("../lib/jwtPassport");

module.exports = passport.authenticate("jwt", {
  session: false,
});