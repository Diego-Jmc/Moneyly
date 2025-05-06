import { Router, Request, Response } from "express";
import recurringTransactionsRepository from "../Repositories/RecurringTransactionsRepository";

const recurringTransactionsRouter = Router();

recurringTransactionsRouter.get('/transactions', async (req: Request, res: Response) => {
    try {
        const transactions = await recurringTransactionsRepository.getAll();
        res.status(200).send(transactions)
    } catch (error) {
        res.status(500).send({
            msg: 'An error occurred retrieving the users',
            debug: error instanceof Error ? error.message : error,
        });
    }

    return;
})

recurringTransactionsRouter.get('/transactions/:id', async (req: Request, res: Response) => {

    try {

        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).send({ msg: 'Invalid transaction ID' });
            return;
        }

        const foundTransaction = await recurringTransactionsRepository.getById(id);

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

recurringTransactionsRouter.post('/transactions', async (req: Request, res: Response) => {

    try {
        const result = await recurringTransactionsRepository.create(req.body);
        res.status(200).send('transaction created!' + result);

    } catch (error) {
        res.status(500).send({
            msg: 'An error occurred',
            debug: error instanceof Error ? error.message : error,
        });
    }

    return;
})

recurringTransactionsRouter.delete('/transactions/:id', async (req: Request, res: Response) => {
    try {

        const id: number = Number(req.params.id);
        console.log('aca')
        if (isNaN(id)) {
            res.status(400).send({ msg: 'Invalid transaction ID' });
            return;
        }

        await recurringTransactionsRepository.delete(id);
        res.status(200).send(`the transaction with id ${id} was deleted`);

    } catch (error) {
        res.status(500).send({
            msg: 'An error occurred',
            debug: error instanceof Error ? error.message : error,
        });
    }

    return;
})

export default recurringTransactionsRepository;