const env = require("dotenv").config();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const CronJob = require("cron").CronJob;

require("./models");

const User = require("mongoose").model("User");
const Todo = require("mongoose").model("Todo");

const url = process.env.MONGO_URL;

mongoose.connect(url);

const transporter = nodemailer.createTransport({
    debug: true,
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

let job = new CronJob({
    cronTime: "00 42 10 * * 1-7",
    onTick: sendEmails,
    start: false,
    timeZone: "America/New_York"
});

job.start();

function sendEmails() {
    User.find({}, (err, users) => {
        users.forEach((user) => {
            Todo.find({userID: user._id}, (err, todos) => {
                let completed = [];
                let uncompleted = [];
                todos.forEach((todo) => {
                    let d = Date.parse(todo.completedOn);
                    if (isNaN(d)) {
                        uncompleted.push(todo);
                    } else {
                        if (d > Date.now() - (60 * 60 * 24 * 7 * 1000)) {
                            completed.push(todo);
                        }
                    }
                });
                let body = `Hello, ${user.userName},\n\nThis week you have completed ${completed.length} tasks. Great job! You still have ${uncompleted.length} tasks to go. They are:\n\n`;
                for (let i = 1; i <= uncompleted.length; i++) {
                    body += `${i}. ${uncompleted[i - 1].description}\n`
                }
                const mailOptions = {
                    from: process.env.SMTP_USER,
                    to: user.email,
                    subject: "Confirmation Email",
                    text: body
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    console.log("Message Sent");
                });
            });
        })
    });
}
