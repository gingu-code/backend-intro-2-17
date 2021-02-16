const { checkIsEmpty, checkIsEmail } = require("./authMethods.js");

function checkLoginEmptyMiddleware(req, res, next) {
  let errorObj = {};

  let checkedEmail = false;

  const { email, password } = req.body;

  if (checkIsEmpty(email)) {
    errorObj.email = "Email cannot be empty";
    checkedEmail = true;
  }

  if (checkIsEmpty(password)) {
    errorObj.password = "Password cannot be empty";
  }

  if (!checkedEmail) {
    if (!checkIsEmail(email)) {
      errorObj.email = "It must be in email format!";
    }
  }

  if (Object.keys(errorObj).length > 0) {
    res.status(500).json({
      message: "Error",
      data: errorObj,
    });
  } else {
    //It means go to the next function
    next();
  }
}

function checkEmailFormat(req, res, next) {
  next();
  // let errorObj = {};
  // const { email } = req.body;
  // if (!checkIsEmail(email)) {
  //   errorObj.email = "It must be in email format!";
  // }

  // if (Object.keys(errorObj).length > 0) {
  //   res.status(500).json({
  //     message: "Error",
  //     data: errorObj,
  //   });
  // } else {
  //   //It means go to the next function
  //   next();
  // }
}

module.exports = {
  checkLoginEmptyMiddleware,
  checkEmailFormat,
};
