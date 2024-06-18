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

    return <div>
        EditTransaction
        ID: {transaction.id}
        <div>
            Type: <input type="text" name="type" value={transaction.type} onChange={handlerChange}></input>
        </div>
        <div>
            Price: <input type="text" name="price" value={transaction.price} onChange={handlerChange}></input>
        </div>
        <div>
            Description:
            <textarea style={
                {
                    width: '300px',
                    height: '200px',
                    margin: '5px',
                    resize: 'vertical'
                }} name="description" value={transaction.description} onChange={handlerChange}>
            </textarea>
        </div>
        <button onClick={() => {
            updateTransaction(transaction.id, transaction)
        }}>update</button>
    </div>
}