import { model, Schema } from "mongoose";

const phoneRegex = /^\d{10,}$/;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
  },
  phone : {
    type : String,
    required : true,
    validate : {
        validator : (value)=>{
            return phoneRegex.test(value);
        },
        message : props => `${props.value} is not a valid phone number. It must be exactly 10 digits long and contain no spaces.`
    }
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'moderator', 'user'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true, // Flag to manage user suspension
  },
}, { timestamps: true });

const User = new model('User',userSchema);
export default User;
