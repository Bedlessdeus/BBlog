import { env } from "$env/dynamic/private";

export const validatePassword = (password: string | null) : {success: boolean, value: string} => {
    if(!password || password.trim() === "") return genBasicResponse(false, "Password Cannot be null or Empty");
    if(password.includes(" ")) return genBasicResponse(false, "Password Cannot include spaces");
    if(password.length <= Number(env.PASS_MIN)) return genBasicResponse(false, `Password must be at least ${env.PASS_MIN} characters`);
    if(password.length > Number(env.PASS_MAX)) return genBasicResponse(false, `Password must be shorter than ${env.PASS_MAX}`);
    return genBasicResponse(true, "Password is valid");
}

export const validateMail = (mail: string | null) : {success: boolean, value: string} => {
    console.log(mail);
    if(!mail || mail.trim() === "") return genBasicResponse(false, "E-Mail Cannot be null or Empty");
    if(mail.includes(" ")) return genBasicResponse(false, "E-Mail cannot include spaces");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return genBasicResponse(false, "E-Mail format is invalid, must be user@domain.com");
    return genBasicResponse(true, "E-Mail is valid");
}

export const genBasicResponse = (success: boolean, value: string, errorCode?: number): { success: boolean; value: string; status: number; } => {
    return { success, value, status: errorCode?? success? 200 : 400 };
}