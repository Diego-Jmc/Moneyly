import models from "../database/database_connection"; 
import { Users } from "../models/Users"; 

class UsersRepository {
  async getAll(): Promise<Users[]> {
    try {
      return await models.Users.findAll();
    } catch (error) {
      throw new Error(`Error retrieving users `);
    }
  }

  async getById(id: number): Promise<Users | null> {
    try {
      return await models.Users.findByPk(id);
    } catch (error) {
      throw new Error(`Error retrieving user by ID: ${id}`);
    }
  }

  async create(user: Partial<Users>): Promise<Users> {
    try {
      return await models.Users.create(user);
    } catch (error) {
      throw new Error(`Error creating user`);
    }
  }

  async update(id: number, userData: Partial<Users>): Promise<Users | null> {
    try {
      const user = await this.getById(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return await user.update(userData);
    } catch (error) {
      throw new Error(`Error updating user: ${id}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const user = await this.getById(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      await user.destroy();
    } catch (error) {
      throw new Error(`Error deleting user: ${id} `);
    }
  }
}

export default new UsersRepository();
