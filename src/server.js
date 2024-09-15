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

    app.get('/contacts/:contactId', async (req, res) => {
        const {contactId} = req.params;
        const data = await contactServices.getContactById(contactId);

        if(!data) {
            return res.status(404).json({
                message: `Contact with id=${contactId} not found`
            });
        }

        res.json({
            status: 200,
            message: `Contact with ${contactId} successfully find`,
            data,
        });
    });

    app.use((req, res)=> {
        res.status(404).json({
            message: `${req.url} not found`
        });
    });

    app.use((error, req, res)=> {
        res.status(500).json({
            message: error.message,
        });
    });

    const port = Number(env("PORT", 3000));

    app.listen(port, ()=> console.log(`Server running on port ${port}`));
};