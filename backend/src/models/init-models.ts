import type { Sequelize } from "sequelize";
import { RecurringTransactions as _RecurringTransactions } from "./RecurringTransactions";
import type { RecurringTransactionsAttributes, RecurringTransactionsCreationAttributes } from "./RecurringTransactions";
import { Transactions as _Transactions } from "./Transactions";
import type { TransactionsAttributes, TransactionsCreationAttributes } from "./Transactions";
import { Users as _Users } from "./Users";
import type { UsersAttributes, UsersCreationAttributes } from "./Users";

export {
  _RecurringTransactions as RecurringTransactions,
  _Transactions as Transactions,
  _Users as Users,
};

export type {
  RecurringTransactionsAttributes,
  RecurringTransactionsCreationAttributes,
  TransactionsAttributes,
  TransactionsCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const RecurringTransactions = _RecurringTransactions.initModel(sequelize);
  const Transactions = _Transactions.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  RecurringTransactions.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(RecurringTransactions, { as: "recurring_transactions", foreignKey: "user_id"});
  Transactions.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Transactions, { as: "transactions", foreignKey: "user_id"});

  return {
    RecurringTransactions: RecurringTransactions,
    Transactions: Transactions,
    Users: Users,
  };
}
