'use client'
import { ITransactionData } from "@/app/page";
import { useState } from "react";

async function createTransaction(transactionData: ITransactionData) {
    const response = await fetch(`https://666fd7280900b5f872486532.mockapi.io/transaction`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        }
    );
    if (!response.ok) {
        alert("cannot update transactions")
    }
    alert("create Success")
}

export default function Page(param: { params: { id: string } }) {

    const [transaction, setTransaction] = useState<ITransactionData>({ id: '', description: '', price: '', type: '' })

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setTransaction((prevState) => (
            {
                ...prevState,
                [name]: value
            }))
    }

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Create Transaction</h1>
            <div className="mb-4">
                Type: <input className="input-text focus:shadow-outline" type="text" name="type" value={transaction.type} onChange={handlerChange}></input>
            </div>
            <div className="mb-4">
                Price: <input className="input-text focus:shadow-outline" type="text" name="price" value={transaction.price} onChange={handlerChange}></input>
            </div>
            <div className="mb-4">
                Description:
                <textarea className="input-text focus:shadow-outline" name="description" value={transaction.description} onChange={handlerChange}>
                </textarea>
            </div>
            <button className="btn-create" onClick={() => {
                createTransaction(transaction)
            }}>Create</button>
        </div>)
}