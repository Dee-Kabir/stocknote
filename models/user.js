const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcyrpt = require('bcrypt')
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      require: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    stocks : [
        {type: ObjectId,ref : 'Stock'}
    ]
  },
  { timestamps: true }
);
userSchema.methods.comparePassword = function (password, next) {
    bcyrpt.compare(password, this.password, function(err, match){
        if(err){
            return next(err, false);
        }
        return next(null, match)
    })
}
userSchema.pre('save', function(next) {
    let user = this;
    if(user.isModified('password')) {
        return bcyrpt.hash(user.password,12, function (err,hash) {
            if(err){
                console.log(err)
                return next(err)
            }
            user.password = hash
            return next()
        })
    } else {
        return next()
    }
})

module.exports = mongoose.model("User", userSchema);
