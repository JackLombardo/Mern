const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  orgId: {type: String, required: true },
  firstName: { type: String, required: true},
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true }
  // org_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true,
  // },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
  

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, 'your_jwt_secret');
  return token;
};

module.exports = mongoose.model('User', userSchema);
