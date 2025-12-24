import { Schema, model, models } from "mongoose";

const TestingRoomSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		location: {
			type: String,
			required: true,
		},
		testName: {
			type: String,
			required: true,
		},
		testDate: {
			type: String,
			required: true,
		},
		capacity: {
			type: Number,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps : true
	}
)

const TestingRoom = models.TestingRoom || model("TestingRoom", TestingRoomSchema);

export default TestingRoom;
