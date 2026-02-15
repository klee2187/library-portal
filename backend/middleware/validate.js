const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    age: 'required|integer|min:0',
    email: 'required|email',
    phoneNum: 'required|string',
    address: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
      author: 'required|string',
      genre: 'required|string',
      year: 'required|integer|min:0',
      publishedBy: 'required|string',
      ageGroup: 'required|string',
      themes: 'required|array',
      'themes.*': 'string',
      setting: 'required|string',
      'seriesInfo.series': 'required|string',
      'seriesInfo.bookNumber': 'required|integer|min:0'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
};

module.exports = {
  saveUser, saveBook
};