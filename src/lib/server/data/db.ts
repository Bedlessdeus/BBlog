import { env } from "$env/dynamic/private";
import type { user } from "../s_types";

enum dbTypes {
    MONGODB,
    NEDB
}

const defaultType = dbTypes.MONGODB;

export const getTech = () : dbTypes => {
    switch (env.DB_TECH?.toUpperCase()?? "") {
        case "NEDB": return dbTypes.NEDB;
        case "MONGODB": return dbTypes.MONGODB;
        default: return defaultType; 
    }
}

export const updateUserFE = async (db : any, email : string, password : string | null = null, api_key : string | null = null, data_src : string | null = null) => {
    let toUpdate: any = { $set: {} }
    if(password) toUpdate.$set.password = password;
    if(api_key) toUpdate.$set.api_key = api_key;
    if(data_src) toUpdate.$set.data_src = data_src;

    if(getTech())
        return await db.collection("users").updateOne({ email: email }, toUpdate);
    return await db.update({ email: email }, toUpdate);
}

export const updateUserID = async (db : any, id : any, email : string | null = null, password : string | null = null, api_key : string | null = null, data_src : string | null = null) => {
    let toUpdate: any = { $set: {} }
    if(email) toUpdate.$set.email = email;
    if(password) toUpdate.$set.password = password;
    if(api_key) toUpdate.$set.api_key = api_key;
    if(data_src) toUpdate.$set.data_src = data_src;

    if(getTech())
        return await db.collection(env.MONGO_COLL).updateOne({ _id: id }, toUpdate);
    return await db.update({ _id: id }, toUpdate);
}

export const addUser = async (db : any, user : user) => {
    if(!user) return false;
    switch(getTech()) {
        case dbTypes.NEDB:
            return await db.insert(user);
        default:
            return await db.collection(env.MONGO_COLL).insertOne(user);
    }
}

export const getUser = async (db : any, id? : string | null, email? : string) : Promise<user | null> => {
    if(!id && !email) return null;
    switch(getTech()) {
        case dbTypes.NEDB:
            return await db.findOne(id? { _id: id } : {email: email});
        default:
            return await db.collection(env.MONGO_COLL).findOne(id? { _id: id } : {email: email});
    }
}

export const delUser = async (db : any, id? : string, email? : string) => {
    if(!id && !email) return false;
    switch(getTech()) {
        case dbTypes.NEDB:
            return await db.remove(id? { _id: id } : {email: email});
        default:
            return await db.collection(env.MONGO_COLL).deleteOne(id? { _id: id } : {email: email});
    }
}

export const listUsers = async (db : any) => {
    switch(getTech()) {
        case dbTypes.NEDB:
            return await db.find({});
        default:
            return await db.collection(env.MONGO_COLL).find().toArray();
    }
}