'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function Home() {
  // console.log("transactionList", transactionList)
  const [transactionList, setTransactionList] = useState<ITransactionData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getTransaction();
      setTransactionList(responseData)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-1xl font-bold">
        Transaction List: <Link href={"/transaction"} >
          <button className="btn-create" style={{ margin: 5 }}>Create</button></Link>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          transactionList.length < 1 ?
            <p className="col-span-full text-center text-gray-500">No transactions available.</p>
            :
            transactionList.map((tx, index) => (
              <Link className={`hover:bg-gray-200 ${tx.type === 'expense' ? 'bg-red-100' : 'bg-green-100'}`} href={`/transaction/${tx.id}`}>
                <div key={index} className="bg-background p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">{tx.type}</span>
                    <span className="text-gray-700">BATH {tx.price}</span>
                  </div>
                  <div>
                    <span className="text-md">{`${tx.description.slice(0, 20)}....`}</span>
                  </div>
                  <button className="btn-remove" onClick={() => {
                    deleteTransaction(tx.id)
                  }}>Delete</button>
                </div>
              </Link>
            ))
        }
      </div>
    </div>
  );
}
