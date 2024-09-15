import * as contactServices from "../services/contacts.js";
import createHttpError from "http-errors";
import {updateContact} from "../services/contacts.js";

export const getContactsController = async (req, res, next) => {
    const contacts = await contactServices.getAllContacts();

    res.json({
        status: 200,
        message: "Successfully found contacts",
        contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const {contactId} = req.params;
    const contact = await contactServices.getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: `Contact with ${contactId} successfully find`,
        contact,
    });
};

export const createContactController = async (req, res) => {
    const contact = await contactServices.createContact(req.body);

    res.json({
        status: 201,
        message: "Successfully created a contact!",
        contact,
    });
};

export const deleteContactController = async (req, res) => {
    const {contactId} = req.params;

    const contact = await contactServices.deleteContact(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
    const {contactId} = req.params;

    const result = await updateContact(contactId, req.body);

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully patched a contact!`,
        data: result.contact,
    });
};