const State = require("../models/state");

module.exports.toggle = async function (req, res) {

  try
  {
    let state = await State.findById(req.params.id);

    if(state.status == 'Not done')
    {
      state.status = "Done";
    }
    else if(state.status == 'Done')
    {
      state.status = "Not done";
    }

    state.save();
    
    req.flash("success", "Toggled Successfully!");

  }catch(err)
  {
    console.log("Error ", err);
    req.flash("error", err);
  }

  return res.redirect("back");
};
