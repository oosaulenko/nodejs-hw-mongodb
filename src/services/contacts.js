import {ContactCollection} from "../db/models/contacts.js";
import calculatePaginationData from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
    perPage,
    page,
    sortBy = "_id",
    sortOrder = SORT_ORDER[0],
}) => {
    const skip = (page - 1) * perPage;
    const contactQuery = ContactCollection.find();
    const data = await contactQuery.sort({[sortBy]: sortOrder}).skip(skip).limit(perPage);
    const count = await ContactCollection.find().countDocuments();
    const paginationData = calculatePaginationData({count, perPage, page});

    return {
        page,
        perPage,
        data,
        totalItems: count,
        ...paginationData,
    };
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

export const updateContact = async (filter, data, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
        new: true,
        includeResultMetadata: true,
        ...options,
    });

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};