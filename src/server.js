import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {env} from "./utils/env.js";
import * as contactServices from "./services/contacts.js";

export const startServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/contacts', async (req, res) => {
        const data = await contactServices.getAllContacts();

        res.json({
            status: 200,
            message: "Successfully found contacts",
            data,
        });
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
        const {contactId} = req.params;

        try {
            const contact = await contactServices.getContactById(contactId);

            if (!contact) {
                return res.status(404).json({
                    message: 'Contact not found'
                });
            }

            res.json({
                status: 200,
                message: `Contact with ${contactId} successfully find`,
                contact,
            });
        } catch (error) {
            next(error);
        }
    });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });

    const port = Number(env("PORT", 3000));

    app.listen(port, () => console.log(`Server running on port ${port}`));
};