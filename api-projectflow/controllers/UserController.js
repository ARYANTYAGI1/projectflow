const User = require('../models/User');
const CommonHelper = require('../helpers/Common');
const MailHelper = require('../helpers/mail')
const bcrypt = require('bcryptjs');
const { registerValidationSchema } = require('../validations/userValidation');


module.exports = {
  register: async (req, res) => {
    const { error } = registerValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { name, email, password } = req.body;
    try {
      const checkUser = await User.findOne({email:email});
      if(checkUser) return res.status(400).send({ success:false, message: 'User Already Exsits', data: null });
      const user = new User({
        name: name,
        email: email,
        password: password,
        role: "Admin",
        status: "Active"
      })
      const savedUser =await user.save();
      console.log(savedUser)
      return res.status(200).send({
        success: true,
        message: "Admin Created Successfully",
        data: user._id
      });
    } catch (error) {
      res.status(500).send({ success:false, message: 'Internal Server Error', data: error.message });
    }
  },
  createUser: async(req, res)=>{
    try {
        const { name, email, password,  role} = req.body;
        const admin = req.user.role;
        if(!admin==='Admin') return res.status(400).send({ success:false, message: 'You have not access to perform this opertaion', data: null });
        const checkUser = await User.findOne({email:email});
        if(checkUser) return res.status(400).send({ success:false, message: 'User Already Exsits', data: null });
        const user = new User({
          name: name,
          email: email,
          password: password,
          role: role,
          status: "Active"
        });
        const savedUser = await user.save();
        console.log(savedUser);
        const loginUrl = 'http://yourdomain.com/login';
        const emailContext = {
          name: user.name,
          email: user.email,
          password: password,
          role: user.role,
          loginUrl: loginUrl
        };
        await MailHelper.sendEmail(user.email, user.name, 'Welcome to ProjectFlow', 'welcomeEmail', emailContext);
        return res.status(200).send({
          success: true,
          message: "User Created Successfully",
          data: user._id
        });
    } catch (error) {
      res.status(500).send({ success:false, message: 'Internal Server Error', data: error.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = CommonHelper.generateToken(user)
        res.send({ success: true, message: 'Login Success', data: { user: user._id, token: token}});
      } else {
        res.status(400).send({ success: false, message: 'Invalid credentials', data: null });
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ success:false, message: 'Internal Server Error', data: error.message });
    }
  },
};
