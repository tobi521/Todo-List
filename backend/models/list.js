const mongoose = require("mongoose")
const Schema = mongoose.Schema

const listSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  check: {
    type: Boolean,
    default: false,
    required: true
  }
})

export default mongoose.model("List", listSchema)