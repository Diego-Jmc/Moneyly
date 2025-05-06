import { Router, Request, Response } from "express";
import transactionsRepository from "../Repositories/transactionsRepository";

const transactionsRouter = Router();

transactionsRouter.get('/transactions', async (req: Request, res: Response) => {
    try {
        const transactions = await transactionsRepository.getAll();
        res.status(200).send(transactions)
    } catch (error) {
        res.status(500).send({
            msg: 'An error occurred retrieving the users',
            debug: error instanceof Error ? error.message : error,
        });
    }

    return;
})

transactionsRouter.get('/transactions/:id', async (req: Request, res: Response) => {

    try {

        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).send({ msg: 'Invalid transaction ID' });
            return;
        }

        const foundTransaction = await transactionsRepository.getById(id);

        if (foundTransaction != null) {
            res.status(200).send(foundTransaction);
        } else {
            res.status(40).send();
        }

    } catch (error) {
        res.status(500).send({
            msg: 'An error occurred',
            debug: error instanceof Error ? error.message : error,
        });
    }

    return;
})

transactionsRouter.post('/transactions', async (req: Request, res: Response) => {

    try {
        const result = await transactionsRepository.create(req.body);
        res.status(200).send('transaction created!' + result);

    } catch (error) {
        res.status(500).send({
            msg: 'An error occurred',
            debug: error instanceof Error ? error.message : error,
        });
    }

    return;
})

transactionsRouter.delete('/transactions/:id', async (req: Request, res: Response) => {
    try {

        const id: number = Number(req.params.id);
        console.log('aca')
        if (isNaN(id)) {
            res.status(400).send({ msg: 'Invalid transaction ID' });
            return;
        }

        await transactionsRepository.delete(id);
        res.status(200).send(`the transaction with id ${id} was deleted`);

    } catch (error) {
        res.status(500).send({
            msg: 'An error occurred',
            debug: error instanceof Error ? error.message : error,
        });
    }

    return;
})

export default transactionsRouter;