const { user, token } = require("../models");
const randomstring = require("randomstring");
const bycrpt = require("bcrypt");

/**
 * Login Controller
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }

  const getUser = await user.findOne({ where: { email: email } });
  if (getUser === null) {
    res.status(401).send({
      message: "Invalid Credential",
    });
    return;
  }

  bycrpt.compare(password, getUser.password, async (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Server Error",
      });
      return;
    }
    if (result) {
      console.log(getUser.toJSON());
      const newToken = await token.create({
        userId: getUser.id,
        token: randomstring.generate(),
      });
      res.send({
        message: "Login Success",
        token: newToken.token,
      });
    } else {
      res.status(401).send({
        message: "Invalid Credential",
      });
    }
    return;
  });
}

async function register(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  if (!email || !password || !name) {
    res.status(400).send({
      message: "Invalid Request",
    });
  }

  const checkPastUser = await user.findOne({ where: { email: email } });
  if (checkPastUser) {
    res.status(400).send({
      message: "Email Already USed",
    });
    return;
  }

  const newUser = await user.create({
    email,
    name,
    password,
  });

  if (newUser.name) {
    res.send({
      message: "Create User Succesful",
    });
  } else {
    res.status(400).send({
      message: "Failed to create User",
    });
  }
}

module.exports = { login, register };
