import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './Users';

export interface RecurringTransactionsAttributes {
  id: number;
  user_id: number;
  type: string;
  amount: number;
  frequency: string;
  start_date: string;
  end_date?: string;
  description?: string;
  created_at?: Date;
}

export type RecurringTransactionsPk = "id";
export type RecurringTransactionsId = RecurringTransactions[RecurringTransactionsPk];
export type RecurringTransactionsOptionalAttributes = "id" | "end_date" | "description" | "created_at";
export type RecurringTransactionsCreationAttributes = Optional<RecurringTransactionsAttributes, RecurringTransactionsOptionalAttributes>;

export class RecurringTransactions extends Model<RecurringTransactionsAttributes, RecurringTransactionsCreationAttributes> implements RecurringTransactionsAttributes {
  id!: number;
  user_id!: number;
  type!: string;
  amount!: number;
  frequency!: string;
  start_date!: string;
  end_date?: string;
  description?: string;
  created_at?: Date;

  // RecurringTransactions belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof RecurringTransactions {
    return RecurringTransactions.init({
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
      type: DataTypes.STRING(20),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    frequency: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'recurring_transactions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "recurring_transactions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
