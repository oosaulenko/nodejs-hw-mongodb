import ContactCollection from "../db/models/contacts.js";

export const getAllContacts = async () => {
    const data = await ContactCollection.find();
    return data;
}

export const getContactById = async (id) => {
    const data = await ContactCollection.findById(id);
    return data;
};