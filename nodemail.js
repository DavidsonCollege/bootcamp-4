'use strict';
const nodemailer = require('nodemailer');
const env = require('dotenv').config()
const mongoose = require("mongoose");
const User = require("mongoose").model("User");
const Todo = require("mongoose").model("Todo");
const CronJob = require("cron").CronJob;

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

require("./models");
const url = process.env.DB_DATABASE;
mongoose.connect(url);


let cron = new CronJob({
  cronTime:  "00 36 19 * * 0-6",
  onTick: sendEmails,
  start: false,
  timeZone: "America/New_York"
});

job.start();
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.SMTP,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD // generated ethereal password
  }
});

function sendEmail() {
  User.find({}, (err, users) => {
    users.forEach((user) => {
      Todo.find({userId: user._id}, (err, todos) => {
        let arrComplete = [];
        let arrIncomplete = [];
        todos.forEach((todo) => {
          let curDate = Date.parse(todo.completedOn);
          if (curDate === NaN) {
            arrIncomplete.push(todo);
          } else {
            if (date > Date.now() - (60 * 60 * 24 * 7 * 1000)) {
              arrComplete.push(todo);
            }
          }
        });
        let text = `Hello, ${user.userName},\n\nCongratulations! You have completed ${arrComplete.length} tasks this week. You have ${uncompleted.length} tasks left:\n\n`;
        for (let i = 1; i <= arrIncomplete.length; i++) {
          text += `${i}. ${arrIncomplete[i-1].description}\n`;
        }
        const mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Todo List Notification",
          text: text
        };
        transporter.sendMail(mailOptions, (err, info) => {
          console.log("Message Sent");
        });
      });
    });
  });
}
