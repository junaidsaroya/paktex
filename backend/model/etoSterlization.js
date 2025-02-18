import mongoose from "mongoose";

const etoSterlizationSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true},
    manufactureDate: { type: Date, required: true },
    cycleNumber: { type: String, required: true},
    startDate: { type: Date, required: true },
    startTime: { type: String, required: true},
    endDate: { type: Date, required: true },
    endTime: { type: String, required: true},
    cylinderLotNumber: { type: String, required: true},
    cylinderNumber: { type: String, required: true},
    initialWeight: { type: String, required: true},
    finalWeight: { type: String, required: true},
    gasConsume: { type: String, required: true},
    etoExposureDuration: { type: String, required: true},
    sterlizationTemperature: { type: String, required: true},
    gasExposureTemperature: { type: String, required: true},
    batchNumber: {type: String, required: true},
  },
  { timestamps: true }
);

const ETOSterlization = mongoose.model("ETOSterlization", etoSterlizationSchema);

export default ETOSterlization;
