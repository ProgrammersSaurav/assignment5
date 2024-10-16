import mongoose from "mongoose";
const DataSchema = mongoose.Schema(
    {
        email: { type: String, unique: true, required: true, lowercase: true },
        password: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        phone: { type: String },
        img: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const StudentsModel = mongoose.model("students", DataSchema);


export default StudentsModel