const User = require("../models/user");
const bcrypt = require("bcrypt");
//@route      GET / auth/login
//@desc       Get login page
//@access     Public
const getLoginPage = async (req, res) => {
  if (!req.session.isLogged) {
    res.render("auth/login", {
      title: "Login Page",
      url: process.env.URL,
      loginError: req.flash('loginError'),
      User: req.session.user,
      isLogin: true,
    });
  }
};

//@route      GET / auth/signup
//@desc       Get register page
//@access     Public
const getRegisterPage = async (req, res) => {
  if (!req.session.isLogged) {
    res.render("auth/signup", {
      title: "Sign Up Page",
      url: process.env.URL,
      isRegister: true,
      regError: req.flash('regError'),
      user: req.session.user
    });
  }
};

//@route      POST /auth/signup
//@desc       Register new user to database
//@access     Public
const RegisterNewUser = async (req, res) => {
  try {
    const { email, name, phone, password, password2 } = req.body
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userExist = await User.findOne({ email })

    if (userExist) {
      req.flash('regError', 'Bunday foydalanuvchi bazada bor')
      return res.redirect('/auth/signup')
    }

    if (password !== password2) {
      req.flash('regError', 'Parollar mos tushmayapti')
      return res.redirect('/auth/signup')
    }

    await User.create({
      email,
      name,
      phone,
      password: hashedPassword
    })

    return res.redirect('/auth/login')
  } catch (err) {
    console.log(err)
  }
}

//@route      POST /auth/login
//@desc       Login user to website
//@access     Public

const loginUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email })
    if (userExist) {
      const matchPassword = await bcrypt.compare(req.body.password, userExist.password)
      if (matchPassword) {
        req.session.user = userExist
        req.session.isLogged = true
        req.session.save(err => {
          if (err) throw err
          res.redirect('/profile/' + req.session.user.name)
        })
      } else {
        req.flash('loginError', 'Noto`ri ma`lumot kiritildi')
        res.redirect('/auth/login')
      }
    } else {
      req.flash('loginError', 'Bunday foydalanuvchi mavjud emas')
      res.redirect('/auth/login')
    }
  } catch (err) {
    console.log(err)
  }
}

//@route      GET /auth/logout
//@desc       logout user to website
//@access     Private
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/")
  })
}

module.exports = {
  getLoginPage,
  getRegisterPage,
  RegisterNewUser,
  loginUser,
  logout,
};
