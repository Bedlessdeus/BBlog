import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param: string): param is ('login' | 'register') => {
    return param.toLowerCase() === 'login' || param.toLowerCase() === 'register'; 
}) satisfies ParamMatcher;