import mongoose from "mongoose";
import { EncodeToken } from './../utility/tokenUtility.js';
import StudentsModel from "../model/studentModel.js";

const ObjectId = mongoose.Types.ObjectId;

export const registerService = async (req) => {
    try {
        let reqBody = req.body;
        let data = await StudentsModel.create(reqBody);
        return { status: "success", data: data };


    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}
export const loginService = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await StudentsModel.aggregate([
            { $match: reqBody },
            { $project: { _id: 1, email: 1 } },
        ]);

        if (data.length > 0) {
            let token = EncodeToken(data[0]["email"]);

          
            let options = {
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true,
                sameSite: "none",
                secure: true,
            };

            res.cookie("Token", token, options);
            return { status: "success", token: token, data: data[0] };
        } else {
            return { status: "unauthorized", data: data };
        }
    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}
export const profileReadService = async (req) => {
    let email = req.headers.email;
    try {
        let MatchStage = {
            $match: {
                email,
            }
        };

        let project = {
            $project: {
                email: 1,
                firstName: 1,
                lastName: 1,
                img: 1,
                phone: 1,
            }
        }


        let data = await StudentsModel.aggregate([
            MatchStage,
            project
        ]);


        return { status: "success", data: data[0] };
    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}


export const UpdateStudentProfileService= async (req) => {
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await StudentsModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
        return {status:"success", message:"Profile Save Success"}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }

}


