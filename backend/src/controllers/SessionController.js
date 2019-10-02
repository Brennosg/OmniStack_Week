//index, show, store, update, destroy (padroes MVC)
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    // const { email } = req.body;
    const email = req.body.email;

    let user = await User.findOne({ email: email });

    if(!user)
        user = await User.create({ email });
    
    // const user = await User.create({ email });

    return res.json(user);
  }
};
