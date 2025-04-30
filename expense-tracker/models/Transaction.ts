import mongoose, { Schema, Document, model, models } from 'mongoose'

export interface ITransaction extends Document {
  amount: number
  date: Date
  description: string
}

const TransactionSchema = new Schema<ITransaction>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
})

export const Transaction =
  models.Transaction || model<ITransaction>('Transaction', TransactionSchema)
