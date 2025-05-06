import models from "../database/database_connection"; 
import { Transactions } from "../models/Transactions"; 

class TransactionsRepository {

    async getAll(): Promise<Transactions[]> {
    try {
      return await models.Transactions.findAll();
    } catch (error) {
      throw new Error(`Error retrieving transactions: ${error instanceof Error ? error.message : error}`);
    }
  }

  async getById(id: number): Promise<Transactions | null> {
    try {
      return await models.Transactions.findByPk(id);
    } catch (error) {
      throw new Error(`Error retrieving transaction by ID: ${error instanceof Error ? error.message : error}`);
    }
  }

  async create(transaction: Partial<Transactions>): Promise<Transactions> {
    try {
      return await models.Transactions.create(transaction);
    } catch (error) {
      throw new Error(`Error creating transaction: ${error instanceof Error ? error.message : error}`);
    }
  }

  async update(id: number, transactionData: Partial<Transactions>): Promise<Transactions | null> {
    try {
      const transaction = await this.getById(id);
      if (!transaction) {
        throw new Error(`Transaction with ID ${id} not found`);
      }
      return await transaction.update(transactionData);
    } catch (error) {
      throw new Error(`Error updating transaction: ${error instanceof Error ? error.message : error}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const transaction = await this.getById(id);
      if (!transaction) {
        throw new Error(`Transaction with ID ${id} not found`);
      }
      await transaction.destroy();
    } catch (error) {
      throw new Error(`Error deleting transaction: ${error instanceof Error ? error.message : error}`);
    }
  }
}

export default new TransactionsRepository();
