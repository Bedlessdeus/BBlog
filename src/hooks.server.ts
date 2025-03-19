import { env } from "$env/dynamic/private";
import { verifyToken } from "$lib/server/crypt";
import { type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { MongoClient } from "mongodb";
import Datastore from "nedb-promises";


const publicPaths = [
    "/login",
    "/register"
];

let db : any;
let client : MongoClient;

export const handleAuth: Handle = async ({ event, resolve }) => {
    if (publicPaths.includes(event.url.pathname)) {
        return resolve(event);
    }

    const token = event.cookies.get("token");

    if (!token) {
        return new Response(null, { status: 302, headers: { Location: "/login" } });
    }

    const userId = verifyToken(token);
    if (!userId) {
        return new Response(null, { status: 302, headers: { Location: "/login" } });
    }

    event.locals.user = { id: userId };
    return resolve(event);
};

const handleMongo: Handle = async ({event, resolve}) => {
    if (!db) {
        client = new MongoClient(env.MONGO_URI ?? "");
        console.log("Connecting to MongoDB");
        await client.connect();
        db = client.db(env.MONGO_DB);
        console.log("MongoDB Connected");
    }

    event.locals.db = db;

    return resolve(event);
}

const handleNEDB: Handle = async ({event, resolve}) => {
    if (!db) {
        db = Datastore.create({ filename: (env.NEDB_PATH && env.NEDB_PATH.trim() !== "" ? env.NEDB_PATH : "./database/users.db"), autoload: true });
    }

    event.locals.db = db;

    return resolve(event);
}

const handleDB: Handle = async ({event, resolve}) => {
    if(env.DB_TECH?.toLowerCase() == "nedb" ) return handleNEDB({event, resolve});
    return handleMongo({event, resolve});
}

export const handle: Handle = sequence(handleAuth, handleDB);