import mongoose from "mongoose"
const Schema = mongoose.Schema

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  option: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  }
})

export default mongoose.model("lists", listSchema)