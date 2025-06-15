import { where } from "sequelize";
import db from "../models/index";
import bcrypt, { hash } from "bcryptjs";
import { raw } from "body-parser";
import e from "express";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errorCode = 0;
            (userData.errMessage = ""), delete user.password;
            userData.user = user;
          } else {
            userData.errorCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errorCode = 2;
          userData.errMessage = `User's not found~`;
        }
      } else {
        userData.errorCode = 1;
        userData.errMessage = `Your's Email isn't exist in your system.Pls try other email! `;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(e);
    }
  });
};

let getAllUsers = async (userId) => {
  try {
    if (userId === "ALL") {
      let users = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      return users;
    }

    if (userId) {
      let user = await db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ["password"],
        },
      });
      return user ? [user] : [];
    }

    return [];
  } catch (e) {
    throw e;
  }
};

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist???
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errorCode: 1,
          message: 'Your email is already in used'
        })
      }

      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      })

      resolve({
        errorCode: 0,
        message: 'OK'
      })

    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!"
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false
      });

      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();

        resolve({
          errCode: 0,
          message: "Update successful!"
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "User not found!"
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userId } });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "User not found!"
        });
      }

      await db.User.destroy({ where: { id: userId } });

      resolve({
        errCode: 0,
        message: "Delete successful!"
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  updateUserData:updateUserData,
  deleteUser: deleteUser
  
};
