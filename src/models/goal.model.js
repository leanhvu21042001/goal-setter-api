import mongoose from 'mongoose';

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    text: {
      type: String,
      require: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Goal', goalSchema);
