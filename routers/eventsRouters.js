import {Router} from 'express';

import eventsController from '../controllers/eventsController.js';
import eventsSchema from '../schemas/eventsSchema.js';

import validate from '../middlewares/validate.js';
import authenticate from '../middlewares/auth.js';

import fileUpload from "../middlewares/fileUpload.js";

const router = Router();

//apis

router.post(
    '/create',
    fileUpload.array('images', 5),
    authenticate,
    validate(eventsSchema.createEvent, 'body'),
    eventsController.createEvents
);

router.get('/list',
    authenticate,
    validate(eventsSchema.getEvents, 'query'),
    eventsController.getEvents
)
router.post(
    '/single/subscribe',
    validate(eventsSchema.subscribeEvent, 'body'),
    eventsController.subscribeEvent
);
router.put(
    '/update/:id',
    fileUpload.array('images', 5),
    authenticate,
    eventsController.updateEvent
);

export default router;