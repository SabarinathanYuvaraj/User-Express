import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    phone_No: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
