import React from 'react';

const TxnHistory = () => {
  const transactions = [
    {
      id: 1,
      type: 'Payment',
      amount: '-$50',
      date: 'May 28, 2023',
      receiver: 'Marcus Toussaint',
      avatar: "/img/marcus.jpg"
    },
    {
      id: 2,
      type: 'Transfer',
      amount: '-$100',
      date: 'May 27, 2023',
      receiver: 'Alex van Anders',
      avatar: "/img/alex.jpg"
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
      avatar: "/img/alex.jpg"
    },
    {
      id: 5,
      type: 'Transfer',
      amount: '+800',
      date: 'May 27, 2023',
      receiver: 'Michelle Ge',
      avatar: "/img/Michelle.jpg"
    },
    {
      id: 6,
      type: 'Payment',
      amount: '-$100',
      date: 'May 27, 2023',
      receiver: 'Javier Reyes',
      avatar: "/img/javier.jpg"
    },
    {
      id: 7,
      type: 'Payment',
      amount: '+$100',
      date: 'May 27, 2023',
      receiver: 'Jes Sorrel Concierge',
      avatar: "/img/jes.jpg"
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


  if (transactions.length === 0) {
    return (
    <div className="mt-4">
    <h6 className="text-start text-muted mx-3">Transactions</h6>
    <div className="mt-2 transactions">
      <div className="list-group-item d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="text-center">
          <i className="fa-solid fa-border-none"></i>
          <p>No transactions yet..</p>
        </div>
      </div>
    </div>
  </div>
    );
  }


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
                  <img className="rounded-circle avatar" src={transaction.avatar} />
                ) : (
                  <img className="rounded-circle avatar" src={transaction.avatar} width="42" height="42"/>
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
