import { NextApiRequest, NextApiResponse } from 'next'
import { Transaction } from '@/models/Transaction'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const transactions = await Transaction.find()
    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error })
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { amount, date, description } = req.body
    try {
      const newTransaction = new Transaction({ amount, date, description })
      await newTransaction.save()
      res.status(201).json({ message: 'Transaction added', transaction: newTransaction })
    } catch (error) {
      res.status(500).json({ message: 'Error adding transaction', error })
    }
  }

  
  export async function PUT(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    const { amount, date, description } = req.body
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { amount, date, description },
        { new: true }
      )
      res.status(200).json({ message: 'Transaction updated', transaction: updatedTransaction })
    } catch (error) {
      res.status(500).json({ message: 'Error updating transaction', error })
    }
  }

  
  export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    try {
      await Transaction.findByIdAndDelete(id)
      res.status(200).json({ message: 'Transaction deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Error deleting transaction', error })
    }
  }
  