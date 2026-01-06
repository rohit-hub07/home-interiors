import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  componentName: {
    type: String,
    required: true,
    unique: true,
    enum: ["home3", "home7", "kitchen-design", "bedroom-interiors", "living-room-interiors"]
  },
  slides: [{
    img: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });

const Slider = mongoose.models.sliders || mongoose.model("sliders", sliderSchema);

export default Slider;
