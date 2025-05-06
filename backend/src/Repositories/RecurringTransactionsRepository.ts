import models from "../database/database_connection"; 
import { RecurringTransactions } from "../models/RecurringTransactions"; 

class RecurringTransactionsRepository {

    async getAll(): Promise<RecurringTransactions[]> {
    try {
      return await models.RecurringTransactions.findAll();
    } catch (error) {
      throw new Error(
        `Error retrieving recurring transactions: ${error instanceof Error ? error.message : error}`
      );
    }
  }

  async getById(id: number): Promise<RecurringTransactions | null> {
    try {
      return await models.RecurringTransactions.findByPk(id);
    } catch (error) {
      throw new Error(
        `Error retrieving recurring transaction by ID: ${error instanceof Error ? error.message : error}`
      );
    }
  }

  async create(transaction: Partial<RecurringTransactions>): Promise<RecurringTransactions> {
    try {
      return await models.RecurringTransactions.create(transaction);
    } catch (error) {
      throw new Error(
        `Error creating recurring transaction: ${error instanceof Error ? error.message : error}`
      );
    }
  }

  async update(
    id: number,
    transactionData: Partial<RecurringTransactions>
  ): Promise<RecurringTransactions | null> {
    try {
      const transaction = await this.getById(id);
      if (!transaction) {
        throw new Error(`Recurring transaction with ID ${id} not found`);
      }
      return await transaction.update(transactionData);
    } catch (error) {
      throw new Error(
        `Error updating recurring transaction: ${error instanceof Error ? error.message : error}`
      );
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const transaction = await this.getById(id);
      if (!transaction) {
        throw new Error(`Recurring transaction with ID ${id} not found`);
      }
      await transaction.destroy();
    } catch (error) {
      throw new Error(
        `Error deleting recurring transaction: ${error instanceof Error ? error.message : error}`
      );
    }
  }
}

export default new RecurringTransactionsRepository();
