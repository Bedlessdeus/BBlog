import { env } from "$env/dynamic/private";
import { HttpsProxyAgent } from "https-proxy-agent";
import { getUser } from "$lib/server/data/db";
import fetch from "node-fetch";

export const proxy_agent = env.PROXY_ENABLED != null && env.PROXY_ENABLED.toLowerCase() == "true" ? new HttpsProxyAgent(`${env.PROXY_PROTOCOL?? "http"}://${env.PROXY_HOST?? "localhost"}:${env.PROXY_PORT?? ""}`) : null;

export const fetchAPI = async (db : any, userID : string, url: string, method: string, body: any, headers?: {}) : Promise<Response> => {
    let user = await getUser(db, userID);
    if(!user) throw new Error("User not found");

    const res = await fetch(url, {
        method: method,
        ...(proxy_agent && { agent: proxy_agent }),
        ...(headers && {headers: headers}),
        body: JSON.stringify(body)
    });

    return await res.json();
}

export const genBasicResponse = (success : boolean, value: string, errorCode? : number) => {
    return {
        success: success,
        value: value,
        status: errorCode?? success? 200 : 400
    }
}