import { Schema, model, models } from "mongoose";

const CoordinatorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    }, 
    role: {
      type: String,
      enum: ["admin", "coordinator", "teacher"],
      default: "coordinator",
    },
  },
  {
    timestamps : true
  }
)

const Coordinator = models.Coordinator || model("Coordinator", CoordinatorSchema);

export default Coordinator;
// {
//   _id: ObjectId,
//   email: String,
//   passwordHash: String,
//   role: "admin"
// }
