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
router.get("/", async function (req, res, next) {
  res.send("something");
});

//v1
// router.post("/create-user", function (req, res) {
//   const createdUser = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   createdUser.save(function (err, userCreated) {
//     if (err) {
//       res.status(400).json({
//         message: "ERROR",
//         errMessage: err.message,
//       });
//     } else {
//       res.status(200).json({
//         message: "User Created",
//         user: userCreated,
//       });
//     }
//   });
// });

//v2 callback
// router.post("/create-user", function (req, res) {
//   userController.signup(req.body, function (err, createdUser) {
//     if (err) {
//       res.status(400).json({
//         message: "ERROR",
//         errMessage: err.message,
//         user: createdUser,
//       });
//     } else {
//       res.status(200).json({
//         message: "User Created",
//         user: createdUser,
//       });
//     }
//   });
// });

//v3 promises
// router.post("/create-user", function (req, res) {
//   userController
//     .signup(req.body)
//     .then((createdUser) => {
//       res.status(200).json({
//         message: "User Created",
//         user: createdUser,
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         message: "ERROR",
//         errMessage: error.message,
//       });
//     });
// });

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
