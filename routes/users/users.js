var express = require("express");
var router = express.Router();
// const bcrypt = require("bcryptjs");
// const User = require("./model/User");
const {
  getAllUsers,
  signup,
  login,
  deleteUserByEmail,
  deleteUserByID,
  updateUserByID,
  updateUserByEmail,
} = require("./controller/userController");

const { checkSignupInputIsEmpty } = require("./lib/checkSignup");
const { checkSignupDataType } = require("./lib/checkSignupDataType");
const {
  checkLoginEmptyMiddleware,
  checkEmailFormat,
} = require("./lib/checkLogin");
/* GET users listing. */
router.get("/create-user", function (req, res) {
  res.render("sign-up");
  // res.render("sign-up", { error: null, success: null });
});

router.get("/login", function (req, res) {
  res.render("login", { error: null });
});

router.get("/home", function (req, res) {
  res.render("home", { user: null });
  // res.render("sign-up", { error: null, success: null });
});

router.get("/get-all-users", getAllUsers);

//v4 async and await
router.post(
  "/create-user",
  checkSignupInputIsEmpty,
  checkSignupDataType,
  signup
);

//login
router.post("/login", checkLoginEmptyMiddleware, checkEmailFormat, login);

//delete user by id
router.delete("/delete-user-by-id/:id", deleteUserByID);

//delete user by email
router.delete("/delete-user-by-email", deleteUserByEmail);

//update user by id
router.put("/update-user-by-id/:id", updateUserByID);

//update user by email
// router.put("/update-user-by-email/:email", userController.updateUserByEmail);
router.put("/update-user-by-email/", updateUserByEmail);

module.exports = router;
