import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RecurringTransactions, RecurringTransactionsId } from './RecurringTransactions';
import type { Transactions, TransactionsId } from './Transactions';

export interface UsersAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  registration_date?: Date;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "registration_date";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  registration_date?: Date;

  // Users hasMany RecurringTransactions via user_id
  recurring_transactions!: RecurringTransactions[];
  getRecurring_transactions!: Sequelize.HasManyGetAssociationsMixin<RecurringTransactions>;
  setRecurring_transactions!: Sequelize.HasManySetAssociationsMixin<RecurringTransactions, RecurringTransactionsId>;
  addRecurring_transaction!: Sequelize.HasManyAddAssociationMixin<RecurringTransactions, RecurringTransactionsId>;
  addRecurring_transactions!: Sequelize.HasManyAddAssociationsMixin<RecurringTransactions, RecurringTransactionsId>;
  createRecurring_transaction!: Sequelize.HasManyCreateAssociationMixin<RecurringTransactions>;
  removeRecurring_transaction!: Sequelize.HasManyRemoveAssociationMixin<RecurringTransactions, RecurringTransactionsId>;
  removeRecurring_transactions!: Sequelize.HasManyRemoveAssociationsMixin<RecurringTransactions, RecurringTransactionsId>;
  hasRecurring_transaction!: Sequelize.HasManyHasAssociationMixin<RecurringTransactions, RecurringTransactionsId>;
  hasRecurring_transactions!: Sequelize.HasManyHasAssociationsMixin<RecurringTransactions, RecurringTransactionsId>;
  countRecurring_transactions!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany Transactions via user_id
  transactions!: Transactions[];
  getTransactions!: Sequelize.HasManyGetAssociationsMixin<Transactions>;
  setTransactions!: Sequelize.HasManySetAssociationsMixin<Transactions, TransactionsId>;
  addTransaction!: Sequelize.HasManyAddAssociationMixin<Transactions, TransactionsId>;
  addTransactions!: Sequelize.HasManyAddAssociationsMixin<Transactions, TransactionsId>;
  createTransaction!: Sequelize.HasManyCreateAssociationMixin<Transactions>;
  removeTransaction!: Sequelize.HasManyRemoveAssociationMixin<Transactions, TransactionsId>;
  removeTransactions!: Sequelize.HasManyRemoveAssociationsMixin<Transactions, TransactionsId>;
  hasTransaction!: Sequelize.HasManyHasAssociationMixin<Transactions, TransactionsId>;
  hasTransactions!: Sequelize.HasManyHasAssociationsMixin<Transactions, TransactionsId>;
  countTransactions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "users_email_key"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
