const catchAsyncFunction = require("../utils/catchAsyncFunction");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
module.exports.createEvent = catchAsyncFunction(async (req, res, next) => {
  const { title, detail, date } = req.body;
  const owner = req.user;
  const newdate = Date.parse(date);

  console.log(newdate);
  const event = new Event({ title, detail, date: newdate, owner });
  for (let invitees of req.body.invitees) {
    const inviteeObject = await User.findOne({ email: invitees });
    event.invitees.push(inviteeObject);
  }

  await event.save();
  owner.event.push(event);
  await owner.save();
  res
    .status(200)
    .json({ success: true, message: "Event was created successfully" });
});
