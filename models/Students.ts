import { Schema, model, models } from "mongoose";

const StudentsSchema = new Schema(
	{
		studentId: {
			type: String,
			required: true,
			unique: true,
			index: true,
		}, 
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		testName: {
			type: String,
			required: true,
		},
		room: {
			type: Schema.Types.ObjectId,
			ref: "TestingRoom",
			required: false,
		},
		checkedIn: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps : true
	}
)

const Students = models.Students || model("Students", StudentsSchema);

export default Students;

// {
//   _id: ObjectId,
//   studentId: String,
//   firstName: String,
//   lastName: String,
//   test: String,
//   roomId: ObjectId,
//   createdAt: Date
// }
