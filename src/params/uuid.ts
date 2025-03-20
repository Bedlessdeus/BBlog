import type { ParamMatcher } from "@sveltejs/kit";

let reg = /^[a-zA-Z0-9]{8}(-[a-zA-Z0-9]{4}){3}-[a-zA-Z0-9]{12}$/;

export const match = ((param: string): boolean => {
    return reg.test(param.toLowerCase());
}) satisfies ParamMatcher;