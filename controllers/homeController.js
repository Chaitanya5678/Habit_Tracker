const Habit = require("../models/habit");
const State = require("../models/state");

module.exports.home = async function (req, res) {
  
  try {
    let habits = await Habit.find({ user: req.user._id }).populate("states");

    //Generating dates array of past week

    const dates = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().slice(0, 10));
    }


    // Creating a default state for every habit on every date
    
    for (habit of habits) {
      for (date of dates) {
        if (habit.states.findIndex((item) => item.date === date) == -1) {
          let state = await State.create({
            date: date,
            status: "Not done",
          });

          await habit.states.push(state);
          await habit.save();
        }
      }
    }

    return res.render("home", {
      title: "Habit Tracker | Home",
      habits: habits,
      dates: dates
    });

  } catch (err) {
    console.log("There is an error ", err);
    return;
  }

};