import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
const bcrypt = require("bcrypt")


/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to verify user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const verifyUser = async (req, res, next) => {
  try {
    const user = await UserService.verifyUser(req.body);

    if (user) {
      res.status(200).json({
        code: 200,
        data: user,
        message: 'User verified successfully'
      });
    } else {
      res.status(401).json({
        code: 401,
        message: 'user not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to verify user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const verifyEmail = async (req, res, next) => {
  try {
    const user = await UserService.verifyEmail(req.body.email);

    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (isMatch) {
        res.status(200).json({
          code: 200,
          data: user,
          message: 'Email verified successfully'
        });
      } else {
        res.status(401).json({
          code: 401,
          message: 'Entered wrong password'
        });
      }
    } else {
      res.status(404).json({
        code: 404,
        message: 'User not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateUser = async (req, res, next) => {
  try {
    const data = await UserService.updateUser(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
