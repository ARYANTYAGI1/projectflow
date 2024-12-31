const User = require('../models/User');
const CommonHelper = require('../helpers/Common');
const MailHelper = require('../helpers/mail')
const bcrypt = require('bcryptjs');
const { registerValidationSchema } = require('../validations/userValidation');
const crypto = require('crypto');


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
        status: "Active",
        userType: 1
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
        const { name, email, password, role} = req.body;
        const admin = req.user.role;
        if(!admin==='Admin') return res.status(400).send({ success:false, message: 'You have not access to perform this opertaion', data: null });
        const checkUser = await User.findOne({email:email});
        if(checkUser) return res.status(400).send({ success:false, message: 'User Already Exsits', data: null });
        const user = new User({
          name: name,
          email: email,
          password: password,
          role: role,
          userType: role === 'Project Manager' ? 1 : 2,
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
        res.send({ success: true, message: 'Login Success', token: token, user: user._id, userType: user.userType });
      } else {
        res.status(400).send({ success: false, message: 'Invalid credentials', data: null });
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ success:false, message: 'Internal Server Error', data: error.message });
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) return res.status(404).send({ success:false, message: 'User not found', data: null });
      res.status(200).send({ success: true, message: 'User Profile', data: user });
    } catch (error) {
      res.status(500).send({ success:false, message: 'Internal Server Error', data: error.message });
    }
  },
  getUsersList: async (req, res) => {
    try {
      console.log(req.query);
      var query = {};
      var offset = req.query.page ? (req.query.page - 1) * req.query.limit : 0;
      var limit = req.query.limit ? req.query.limit : 10;
      if (!query.$and) {
          query.$and = [];
      }
      if (req.query.name) {
          var name = req.query.name;
          query.$and.push({ '$or': [{ name: { $regex: new RegExp(name.toLowerCase(), 'i') } }, { email: { $regex: new RegExp(name.toLowerCase(), 'i') } }] });
      }
      if (req.query.userType) {
          query.$and.push({ userType: req.query.userType });
      }
      if (req.query.isActive) {
          query.$and.push({ isActive: req.query.isActive });
      }
      if (!query.$and || !query.$and.length) {
        query = { userType: { $in: [2, 3] } };
      } else {
          query.$and.push({ userType: { $in: [2, 3] } });
      }
      const [totalCount, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
          .sort('-created_at')
          .skip(offset)
          .limit(parseInt(limit))
      ]);
      console.log(users)
      return res.status(200).send({
        success: true,
        message: 'Success',
        data: users,
        totalCount
      })
    } catch (error) {
      console.error(err);
      return res.status(500).send({
        success: false,
        message: 'Something Went Wrong',
        error: err.message
      });
    }
  },
  resetCodeEmail: async (req, res) => {
    try {
      console.log(req.body)
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found', data: null });
        }
        const resetCode = crypto.randomBytes(4).toString('hex').toUpperCase();
        user.resetCode = resetCode;
        await user.save();
        const emailContext = {
            userName: user.name,
            resetCode,
        };

        // Send reset code email
        await MailHelper.sendEmail(
            user.email,
            user.name,
            'Reset Your TaskFlow Password',
            'reset-password',
            emailContext
        );

        return res.status(200).send({ success: true, message: 'Reset code sent successfully', data: null });
    } catch (error) {
      console.log(error)
        return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message });
    }
  },
  verifyResetCode: async (req, res) => {
    try {
        console.log(req.body);
        const { email, code } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found', data: null });
        }
        if (user.resetCode !== code) {
          console.log('Invalid or expired reset code', code, user.resetCode)
            return res.status(400).send({ success: false, message: 'Invalid or expired reset code', data: null });
        }
        user.resetCode = '',
        await user.save();
        return res.status(200).send({ success: true, message: 'Reset code verified successfully', data: user._id }); 
    } catch (error) {
        return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
        const { userId, newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.status(400).send({ success: false, message: 'Passwords do not match', data: null });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found', data: null });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).send({ success: true, message: 'Password reset successfully', data: null });
    } catch (error) {
        return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message });
    }
  }
};
