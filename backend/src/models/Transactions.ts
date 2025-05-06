import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './Users';

export interface TransactionsAttributes {
  id: number;
  user_id: number;
  type: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
}

export type TransactionsPk = "id";
export type TransactionsId = Transactions[TransactionsPk];
export type TransactionsOptionalAttributes = "id" | "description" | "date";
export type TransactionsCreationAttributes = Optional<TransactionsAttributes, TransactionsOptionalAttributes>;

export class Transactions extends Model<TransactionsAttributes, TransactionsCreationAttributes> implements TransactionsAttributes {
  id!: number;
  user_id!: number;
  type!: string;
  amount!: number;
  category!: string;
  description?: string;
  date!: string;

  // Transactions belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Transactions {
    return Transactions.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    }
  }, {
    sequelize,
    tableName: 'transactions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "transactions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
