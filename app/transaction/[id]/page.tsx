'use client'

import { ITransactionData } from "@/app/page";
import { useEffect, useState } from "react";

async function getTransaction(id: string) {
    const response = await fetch(`https://666fd7280900b5f872486532.mockapi.io/transaction/${id}`);
    if (!response.ok) {
        alert("cannot fetch transactions")
    }
    return response.json()
}

async function updateTransaction(id: string, transactionData: ITransactionData) {
    const response = await fetch(`https://666fd7280900b5f872486532.mockapi.io/transaction/${id}`,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        }
    );
    if (!response.ok) {
        alert("cannot update transactions")
    }
    alert("update Success")
}

export default function Page(param: { params: { id: string } }) {

    const [transaction, setTransaction] = useState<ITransactionData>({ id: '', description: '', price: '', type: '' })

    const initTransaction = async () => {
        try {
            const txId = param.params.id;
            const txData: ITransactionData = await getTransaction(txId)
            setTransaction(txData)
        } catch (e) {
            console.error("initTransaction", e)
        }
    }

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setTransaction((prevState) => (
            {
                ...prevState,
                [name]: value
            }))
    }
    useEffect(() => {
        initTransaction()
    }, [])

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Edit Transaction</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">ID: {transaction.id}</label>
                
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type:</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="type"
                    value={transaction.type}
                    onChange={handlerChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price:</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="price"
                    value={transaction.price}
                    onChange={handlerChange}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="description"
                    value={transaction.description}
                    onChange={handlerChange}
                    style={{ height: '150px' }}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => updateTransaction(transaction.id, transaction)}
                >
                    Update
                </button>
            </div>
        </div>
    );
}