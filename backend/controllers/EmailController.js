import { SendEmailService } from "../services/EmailService.js";

export const sendEmailController = async (request, response) => {
    try {
        const {email} = request.body;
        if(email){
            const result = await SendEmailService(email);
            return response.status(200).json(result);
        }
        return response.status(404).json({
            status: 'email not found',
            message : 'the email is required'            
        })
    }catch{error}{
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};
