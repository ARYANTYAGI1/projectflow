const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Project Manager', 'Team Member'], required: true },
  userType: { type: Number, enum: [1,2,3], default: 3 },
  status: { type: String, enum: ['Active', 'InActive'], default: 'Active'},
  resetCode: { type: String },
  resetCodeExpires: { type: Date },
},{ timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
