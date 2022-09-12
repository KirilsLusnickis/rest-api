import userModel from "../models/userModel.js";



export const checkAdmin = async (req, res) => {
    const processingUser = await userModel.findById(req.params.id);
    const createdUserState = res.locals.createdUserState;
    if(processingUser.isAdmin !== createdUserState.isAdmin) {  
    res.clearCookie('session_token');
    }
    res.status(200).json(processingUser);

}