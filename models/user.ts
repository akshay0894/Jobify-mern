import mongoose from "mongoose";
import { Role } from "../utils/constants";

export interface User {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: Role;
  avatar: string;
  avatarPublicId: string;
}

const UserSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.user,
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserModel = mongoose.model<User>("User", UserSchema);
export default UserModel;
