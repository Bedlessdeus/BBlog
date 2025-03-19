import { env } from '$env/dynamic/public';

export const validatePassword = (password: string | null): { success: boolean; value: string } => {
	if (!password || password.trim() === '')
		return genResponse(false, 'Password Cannot be null or Empty');
	if (password.includes(' ')) return genResponse(false, 'Password Cannot include spaces');
	if (password.length <= Number(env.PUBLIC_PASS_MIN))
		return genResponse(false, `Password must be at least ${env.PUBLIC_PASS_MIN} characters`);
	if (password.length > Number(env.PUBLIC_PASS_MAX))
		return genResponse(false, `Password must be shorter than ${env.PUBLIC_PASS_MAX}`);
	return genResponse(true, 'Password is valid');
};

export const validateMail = (mail: string | null): { success: boolean; value: string } => {
	console.log(mail);
	if (!mail || mail.trim() === '') return genResponse(false, 'E-Mail Cannot be null or Empty');
	if (mail.includes(' ')) return genResponse(false, 'E-Mail cannot include spaces');
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))
		return genResponse(false, 'E-Mail format is invalid, must be user@domain.com');
	return genResponse(true, 'E-Mail is valid');
};

export const validateInput = (
	validator: (value: string | null) => { success: boolean; value: string },
	e: Event
) => {
	if (!e.target) return genResponse(false, 'Input cannot be null');
	let valid = validator(e.target.value);
	e.target.classList.remove(valid.success ? 'invalid' : 'valid');
	e.target.classList.add(valid.success ? 'valid' : 'invalid');
	return valid;
};

const genResponse = (success: boolean, value: string) => {
	return {
		success: success,
		value: value
	};
};
