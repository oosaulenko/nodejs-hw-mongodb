import {env} from "../utils/env.js";
import mongoose from "mongoose";

export const initMongoConnection = async () => {
    try {
        const user = env('MONGODB_USER');
        const password = env('MONGODB_PASSWORD');
        const url = env('MONGODB_URL');
        const db = env('MONGODB_DB');

        await mongoose.connect(`mongodb+srv://${user}:${encodeURIComponent(password)}@${url}/${db}?retryWrites=true&w=majority`);

        console.log('Mongo connection successfully established!');
    } catch (e) {
        console.log('Error while setting up mongo connection', e);
        throw e;
    }
};
