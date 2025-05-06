import { Router,Request,Response } from "express";
import UsersRepository from "../Repositories/UsersRepository"

const usersRouter = Router();

usersRouter.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await UsersRepository.getAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({
            msg: 'An error occurred retrieving the users',
            debug: error instanceof Error ? error.message : error,
        });
    }
});


export default usersRouter;