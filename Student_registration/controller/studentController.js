import { loginService, profileReadService, registerService, UpdateStudentProfileService } from "../service/studentService.js";

export const register = async (req, res) => {
    let result = await registerService(req)
    return res.json(result);
}
export const login = async (req, res) => {
    let result = await loginService(req)
    return res.json(result);
}
export const profileRead = async (req, res) => {
    let result = await profileReadService(req)
    return res.json(result);
}
export const ProfileUpdate = async (req, res) => {
    let result = await UpdateStudentProfileService(req)
    return res.json(result);
}