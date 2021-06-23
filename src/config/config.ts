import dotenv from 'dotenv';

dotenv.config();

const MAILGUN_API = process.env.MAILGUN_API || "5d51165fe0af923af47a8a3203fabb6f-2a9a428a-8ff8b469";
const RESETLINK = process.env.RESETLINK || "gouravverma";

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || "50min";
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    server: SERVER,
    mailgun_api : MAILGUN_API,
    passkey : RESETLINK
};

export default config;