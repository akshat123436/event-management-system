const catchAsyncFunction = require("../utils/catchAsyncFunction");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const async = require("async");
module.exports.createEvent = catchAsyncFunction(async (req, res, next) => {
  const { title, detail, date } = req.body;
  const owner = req.user;
  const newdate = Date.parse(date);

  console.log(newdate);
  const event = new Event({ title, detail, date: newdate, owner });
  //   for (let invitees of req.body.invitees) {
  //     const inviteeObject = await User.findOne({ email: invitees });
  //     inviteeObject.invitedTo.push(event);
  //     event.invitees.push(inviteeObject);
  //     await inviteeObject.save();
  //     console.log(inviteeObject);
  //   }
  async.forEachLimit(req.body.invitees, 3, async (value, index, callback) => {
    const inviteeObject = await User.findOne({ email: value });
    inviteeObject.invitedTo.push(event);
    event.invitees.push(inviteeObject); 
    await inviteeObject.save();
    console.log(value);
  });
  await event.save();
  console.log("event saved");
  owner.event.push(event);
  await owner.save();
  res
    .status(200)
    .json({ success: true, message: "Event was created successfully" });
});
