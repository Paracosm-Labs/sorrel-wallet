import React from 'react';

const TxnHistory = () => {
  const transactions = [
    {
      id: 1,
      type: 'Payment',
      amount: '-$50',
      date: 'May 28, 2023',
      receiver: 'Jane Smith',
      avatar: "https://i.pravatar.cc/42?img=1"
    },
    {
      id: 2,
      type: 'Transfer',
      amount: '-$100',
      date: 'May 27, 2023',
      receiver: 'John Doe Cash',
      avatar: "https://i.pravatar.cc/42?img=14"
    },
    {
      id: 3,
      type: 'Subscription',
      amount: '-$100',
      date: 'May 27, 2023',
      receiver: 'Food Basket',
      avatar: "https://i.pravatar.cc/42?img=42"
    },
    {
      id: 4,
      type: 'Transfer',
      amount: '+$300',
      date: 'May 27, 2023',
      receiver: 'Alex van Anders',
      avatar: "https://i.pravatar.cc/42?img=34"
    },
    {
      id: 5,
      type: 'Payment',
      amount: '-$100',
      date: 'May 27, 2023',
      receiver: 'Amazon P2P',
      avatar: "https://i.pravatar.cc/42?img=40"
    },
    {
      id: 6,
      type: 'Payment',
      amount: '-$100',
      date: 'May 27, 2023',
      receiver: 'cosmicquant@gmail.com',
      avatar: "https://i.pravatar.cc/42?img=30"
    },
    {
      id: 7,
      type: 'Payment',
      amount: '+$100',
      date: 'May 27, 2023',
      receiver: 'Jes Sorrel Concierge',
      avatar: "https://i.pravatar.cc/42?img=44"
    },
    {
      id: 8,
      type: 'Payment',
      amount: '-$100',
      date: 'May 27, 2023',
      receiver: 'Amazon P2P',
      avatar: "https://i.pravatar.cc/42?img=40"
    },
    {
      id: 9,
      type: 'Payment',
      amount: '-$100',
      date: 'May 27, 2023',
      receiver: 'Amazon P2P',
      avatar: "https://i.pravatar.cc/42?img=40"
    }
    // Add more dummy transactions here...
  ];

  return (
    <div className="mt-4">
    <h6 className="text-start text-muted mx-3">Transactions</h6>
    <div className="mt-2 transactions">
      
      <ul className="list-group">
        {transactions.map(transaction => (
          <li key={transaction.id} className="list-group-item d-flex justify-content-between ">
            <div className="d-flex">
              <div className="p-2 mr-3">
                {transaction.type === 'Payment' || 'Subscription' ? (
                  <img className="rounded-circle" src={transaction.avatar} />
                ) : (
                  <img className="rounded-circle" src={transaction.avatar} />
                )}
              </div>
              <div>
                <p className="mb-1 text-start">{transaction.receiver}<br/>
                  <small className="mb-0 text-start">{transaction.date}</small>
                </p>
                
              </div>
            </div>
            <div>
              <p className="mb-1 text-end">{transaction.amount}</p>
              <p className="badge bg-secondary p-1 mb-0 text-end">{transaction.type}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TxnHistory;
