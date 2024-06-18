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

    return <div>
        Create Transaction
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
            createTransaction(transaction)
        }}>Create</button>
    </div>
}