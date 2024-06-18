'use client'

import Link from "next/link";
export interface ITransactionData {
  id: string;
  price: string;
  type: string;
  description: string;
}

async function getTransaction() {
  try {
    const response = await fetch("https://666fd7280900b5f872486532.mockapi.io/transaction", {
      headers: {
        'Cache-Control': 'no-store',
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      alert("cannot fetch transactions")
    }
    const result = await response.json();
    console.log("response- request", result[0])
    return result
  } catch (e) {
    console.error("error - getTransaction", e)
    return []
  }
}

async function deleteTransaction(id: string) {
  try {
    const response = await fetch(`https://666fd7280900b5f872486532.mockapi.io/transaction/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      alert("cannot fetch transactions")
    }
    alert("delete transactions success")
  } catch (e) {
    console.error('error - deleteTransaction', e)
  }
}

export default async function Home() {
  const transactionList: ITransactionData[] = await getTransaction()
  // console.log("transactionList", transactionList)
  return (
    <div>
      Transaction List: <Link href={"/transaction"} > <button>Create</button></Link>
      {
        transactionList.map((tx, index) => (
          <div key={index}>
            {tx.id} {tx.type} {tx.price}

            <Link href={`/transaction/${tx.id}`}>
              <button className="edit-button">Edit</button>
            </Link>
            <button className="delete-button" onClick={() => {
              deleteTransaction(tx.id)
            }}>Delete</button>
          </div>
        ))
      }
    </div>
  );
}
