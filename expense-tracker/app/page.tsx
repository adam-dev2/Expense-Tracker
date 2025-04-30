"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [amount, setAmount] = useState<number>(0)
  const [date, setDate] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get('http://localhost:3000/api/transactions') 
        setTransactions(response.data)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    }
    fetchTransactions()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newTransaction = { amount, date, description }
      const response = await axios.post('http://localhost:3000/api/transactions', newTransaction)
      console.log(response.data)

      setTransactions((prev) => [...prev, response.data.transaction])
      setAmount(0)
      setDate('')
      setDescription('')
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const handleEdit = async (id: string) => {
    const updatedTransaction = { amount, date, description }
    try {
      const response = await axios.put(`http://localhost:3000/api/transactions/${id}`, updatedTransaction)
      console.log('Updated transaction:', response.data)
      
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction._id === id ? response.data.transaction : transaction
        )
      )
    } catch (error) {
      console.error('Error updating transaction:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/transactions/${id}`)
      console.log('Transaction deleted')

      setTransactions((prev) => prev.filter((transaction) => transaction._id !== id))
    } catch (error) {
      console.error('Error deleting transaction:', error)
    }
  }

  return (
    <div>
      <h1>Transaction Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Transaction</button>
      </form>

      <h2>Existing Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.date}</p>
            <p>Description: {transaction.description}</p>
            <button onClick={() => handleEdit(transaction._id)}>Edit</button>
            <button onClick={() => handleDelete(transaction._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
