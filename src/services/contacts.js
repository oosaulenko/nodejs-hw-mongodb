import {ContactCollection} from "../db/models/contacts.js";

export const getAllContacts = async () => {
    return ContactCollection.find();
}

export const getContactById = async (id) => {
    return ContactCollection.findById(id);
};

export const createContact = async (payload) => {
    return ContactCollection.create(payload);
};

export const deleteContact = async (contactId) => {
    return ContactCollection.findOneAndDelete({
        _id: contactId,
    });
};

export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};