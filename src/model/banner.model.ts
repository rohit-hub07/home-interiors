import mongoose, { Schema, models } from "mongoose";

const bannerSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "End-to-End Home\nInteriors"
  },
  subtitle: {
    type: String,
    required: true,
    default: "For Your Taste &\nBudget"
  },
  discountText: {
    type: String,
    required: true,
    default: "FLAT 25% OFF"
  },
  discountSubtext: {
    type: String,
    required: true,
    default: "On Modular Interiors"
  },
  validityDate: {
    type: String,
    required: true,
    default: "31st December, 2025"
  },
  termsText: {
    type: String,
    required: true,
    default: "*T&Cs: Offer valid on orders above Rs. 5 Lakh."
  },
  buttonText: {
    type: String,
    required: true,
    default: "Book A FREE\nConsultation 👋" 
  },
  whatsappNumber: {
    type: String,
    required: true,
    default: "919993690392"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Banner = models?.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;
