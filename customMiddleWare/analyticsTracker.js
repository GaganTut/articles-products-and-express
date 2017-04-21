/*jshint esversion: 6*/
const fs = require('fs');

module.exports = (req, res, next) => {
  let currentLog = `[${req.method}] [${req.path}] [${new Date()}]\n`;

  fs.appendFile('./logs/analytics.log', currentLog, (err) => {
    if (err) {
      console.log('BROKEN');
    }
  });
  next();
};