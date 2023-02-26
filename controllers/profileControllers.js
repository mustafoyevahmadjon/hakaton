const User = require("../models/user")

//@route      GET /profile/:name
//@desc       Get profile page
//@access     Private


const getProfilePage = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.user._id }).lean()
        if (!user) throw new Error(`${user.name} bunday foydalanuvchi mavjud emas`)
        const isMe = user._id == req.session.user._id.toString()
        console.log(user);
        // console.log(isMe);
        res.render("user/profile", {
            title: `${user.name}`,
            user,
            isMe,
            isAuth: req.session.isLogged,
            url: process.env.URL,
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProfilePage
}