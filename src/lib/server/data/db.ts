import { env } from '$env/dynamic/private';
import type { user } from '../s_types';

enum dbTypes {
	MONGODB,
	NEDB
}

const defaultType = dbTypes.MONGODB;

export const getTech = (): dbTypes => {
	switch (env.DB_TECH?.toUpperCase() ?? '') {
		case 'NEDB':
			return dbTypes.NEDB;
		case 'MONGODB':
			return dbTypes.MONGODB;
		default:
			return defaultType;
	}
};

export const createUser = async (db: any, user: user) => {
	if (!user) return false;

	if (getTech() === dbTypes.NEDB) {
		return await db.insert(user);
	}
	return await db.collection(env.MONGO_COLL).insertOne(user);
};

export const findUser = async (
	db: any,
	id?: string | null,
	email?: string
): Promise<user | null> => {
	if (!id && !email) return null;

	const query = id ? { _id: id } : { email };

	if (getTech() === dbTypes.NEDB) {
		return await db.findOne(query);
	}
	return await db.collection(env.MONGO_COLL).findOne(query);
};

export const deleteUser = async (db: any, id?: string, email?: string) => {
	if (!id && !email) return false;

	const query = id ? { _id: id } : { email };

	if (getTech() === dbTypes.NEDB) {
		return await db.remove(query);
	}
	return await db.collection(env.MONGO_COLL).deleteOne(query);
};

export const getAllUsers = async (db: any) => {
	if (getTech() === dbTypes.NEDB) {
		return await db.find({});
	}
	return await db.collection(env.MONGO_COLL).find().toArray();
};
