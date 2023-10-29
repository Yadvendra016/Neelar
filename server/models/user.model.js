import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

// for email validation
const emailRegexPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your Email"],
      validate: {
        validator(value) {
          return emailRegexPattern.test(value);
        },
        message: "Please Enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 64,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

//Hash Password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next(); // skip it if the password hasn't been modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.get("password"), salt);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
