import { createToken, verifyPassword } from '$lib/server/crypt';
import { getUser, addUser } from '$lib/server/data/db';
import { validateMail, validatePassword } from '$lib/server/data/validator';
import { genBasicResponse } from '$lib/server/netutil';
import { fail, json, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

export const load: PageServerLoad = async ({ params }) => {
	return { page: params.page };
}

export const actions = {
    login: async ({ cookies, request, locals }) => {
		console.log("Login Call");
        const data = await request.formData();
        console.log(data);
        let email = data.get('email')?.toString() ?? '';
        let password = data.get('password')?.toString() ?? '';

        const mailValid = validateMail(email);
        console.log(mailValid);
        if (!mailValid.success) return fail(400, mailValid);

        const passValid = validatePassword(password);
        console.log(passValid);
        if (!passValid.success) return fail(400, passValid);

        const db = locals.db;
        const user = await getUser(db, null, email);

        if (!user || !(await verifyPassword(password, user.password))) {
            return fail(401, genBasicResponse(false, 'Invalid Credentials', 401));
        }

        const token = createToken(user._id.toString());
        cookies.set('token', token, { httpOnly: true, secure: true, path: '/' });
        console.log('Redirect');
        return { success: true };
    },
    register: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		let email = data.get('email')?.toString() ?? '';
		let password = data.get('password')?.toString() ?? '';

		const dataBase = locals.db;

		if (env.ALLOW_REG === null || env.ALLOW_REG.toLowerCase() !== 'true') {
			return fail(400, genBasicResponse(false, 'Registration is disabled'));
		}

		if (!dataBase) {
			return fail(500, genBasicResponse(false, 'Database not connected', 500));
		}

		const mailValid = validateMail(email);
		console.log(mailValid);
		if (!mailValid.success) return fail(400, mailValid);

		const passValid = validatePassword(password);
		console.log(passValid);
		if (!passValid.success) return fail(400, passValid);

		const db = locals.db;
		const user = await getUser(db, null, email);

		console.log(`Is null ${user === null}`);
		if (user !== null) {
			console.log(user);
			console.log(genBasicResponse(false, 'User already exists'));
			return fail(400, genBasicResponse(false, 'User already exists'));
		}

		let createdUser = await addUser(db, {
			_id: uuid(),
			email: email,
			password: await bcrypt.hash(password, 10)
		});

		cookies.set('token', createToken(createdUser._id.toString()), {
			httpOnly: true,
			secure: true,
			path: '/'
		});

		console.log(createdUser);

		console.log(genBasicResponse(true, 'Successfully registered'));
		return { success: true };
	}
} satisfies Actions;
