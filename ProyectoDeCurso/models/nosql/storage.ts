import { Schema, model, Types } from "mongoose";

const StorageScheme = new Schema(
	{
		url: {
			type: String
		},
		filename: {
			type: String
		},

	},
	{
		timestamp: true, // TODO createdAt, updatedAt
		versionKey: false
	}
)
const StorageModel = model('Storage', StorageScheme);

export default StorageModel;
