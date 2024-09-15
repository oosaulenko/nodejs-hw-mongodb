import {ContactCollection} from "../db/models/contacts.js";

export const getAllContacts = async () => {
    return ContactCollection.find();
}

export const getContactById = async (id) => {
    return ContactCollection.findById(id);
};