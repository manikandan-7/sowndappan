var schedule = require("node-schedule");
const { mail } = require("../services/mail_services");

var scheduleMail = (payload, SERVICE_NO) => {
  let { date, time } = payload;
  let reqDate = date.split("/");
  console.log(new Date(2020, 0, 4, 18, 56, 0));
  var newDate = new Date(parseInt(reqDate[2]), parseInt(reqDate[1]) - 1, parseInt(reqDate[0]), time, 0, 0);
  schedule.scheduleJob(newDate, function() {
    mail(payload, SERVICE_NO).catch(console.error);
  });
};
module.exports = scheduleMail;
