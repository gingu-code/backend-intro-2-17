const { matches, isStrongPassword } = require("validator");

const { checkForSymbol, checkIsEmail } = require("./authMethods");

function checkIfHaveNumber(target) {
  if (matches(target, /[0-9]/g)) {
    return true;
  } else {
    return false;
  }
}

function checkSignupDataType(req, res, next) {
  let errorObj = {};

  const { firstName, lastName, email, password } = req.body;

  // if (matches(firstName, /[0-9]|[!@#$%^&*()\[\],.?":;{}|<>]/g)) {
  //   errorObj.firstName =
  //     "First Name cannot contains numbers and special characters";
  // }

  // if (matches(lastName, /[0-9]|[!@#$%^&*()\[\],.?":;{}|<>]/g)) {
  //   errorObj.lastName =
  //     "Last Name cannot contains numbers and special characters";
  // }

  if (checkIfHaveNumber(firstName)) {
    errorObj.firstName = "First Name cannot contains numbers";
  }

  if (checkIfHaveNumber(lastName)) {
    errorObj.lastName = "Last Name cannot contains numbers";
  }

  if (checkForSymbol(firstName)) {
    errorObj.firstName = "First Name cannot contains special characters";
  }

  if (checkForSymbol(lastName)) {
    errorObj.lastName = "Last Name cannot contains  special characters";
  }

  //Uncomment this during production or further testing
  // if (!isStrongPassword(password)) {
  //   errorObj.password =
  //     "password must minimum 8 characters and must contain an uppercase, a lower case, a number and special character !@#$%^&*()<>{}";
  // }

  if (!checkIsEmail(email)) {
    errorObj.email = "Email must be in email format!";
  }

  if (Object.keys(errorObj).length > 0) {
    res.render("sign-up", { error: errorObj });
    // res.status(500).json({
    //   message: "Error",
    //   data: errorObj,
    // });
  } else {
    //It means go to the next function
    next();
  }
}

module.exports = {
  checkSignupDataType,
};
