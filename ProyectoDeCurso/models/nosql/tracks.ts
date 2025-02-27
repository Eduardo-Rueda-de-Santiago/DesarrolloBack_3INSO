import { Schema, model, Types } from "mongoose";
import mongooseDelete from "mongoose-delete";

const TracksScheme = new Schema(
	{
		name: {
			type: String
		},
		album: {
			type: String
		},
		cover: {
			type: String,
			validate: {
				validator: (req) => {
					return true; //TODO crear patrón
				},
				message: "ERROR_URL",
			}
		},
		artist: {
			name: {
				type: String,
			},
			nickname: {
				type: String
			},
			nationality: {
				type: String
			}
		},
		duration: {
			start: {
				type: Number
			},
			end: {
				type: Number
			}
		},
		mediaId: {
			type: Types.ObjectId // Estructura (string) especial de mongo
		}
	},
	{
		timestamp: true, // TODO createdAt, updatedAt
		versionKey: false
	}
)
const TracksModel = model('Track', TracksScheme);

TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" })

export default TracksModel;