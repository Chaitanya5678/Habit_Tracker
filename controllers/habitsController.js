const Habit = require('../models/habit');
const State = require('../models/state');

module.exports.create = async function(req, res)
{
    try{
        
        await Habit.create({
            name: req.body.name,
            user: req.user._id
        });      

        req.flash('success', 'Habit Created Successfully!');
    }
    catch(err)
    {
        req.flash('error', err);
    }    

    return res.redirect('back');
}

module.exports.destroy = async function(req,res)
{
    try
    {
        let habit = await Habit.findById(req.params.id);

        if(habit.user == req.user.id) 
        {
            habit.remove();
            
            //Deleting states associated with the habit to be destroyed
            
            await State.deleteMany({habit: req.params.id}); 
                        
            req.flash('success', 'Habit Deleted Successfully!');
        }        
    }
    catch(err)
    {
        req.flash('error', err);
    }
    
    return res.redirect('back');
}