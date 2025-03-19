import { type Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		cookies.set('token', '', { expires: new Date(0), path: '/' });
		return { success: true };
	}
} satisfies Actions;
