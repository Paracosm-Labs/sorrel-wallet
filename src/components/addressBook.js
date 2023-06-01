import React from 'react';

const AddressBook = () => {
  const dummyContacts = [
    { name: 'Alex van Anders', avatar: 'https://i.pravatar.cc/42?img=1' },
    { name: 'Javier Reyes', avatar: 'https://i.pravatar.cc/42?img=2' },
    { name: 'Michelle Ge', avatar: 'https://i.pravatar.cc/42?img=3' },
    { name: 'Marcus Toussaint', avatar: 'https://i.pravatar.cc/42?img=4' },
  ];

  return (
    <div>

      <div className="mt-3 d-flex address-book">
          <div className="align-items-center m-2">
          <button className="btn btn-sm h-100 kbtn-outline-secondary">
            <i className="fa-solid fa-qrcode"></i>
            <small>Scan QR</small>
          </button>
          </div>
          <div className="align-items-center m-2">
          <button className="btn btn-sm h-100 kbtn-outline-secondary">
            <i className="fa-solid fa-address-book"></i>
            <small>My Contacts</small>
          </button>
          </div>
        {dummyContacts.map((contact, index) => (
          <div key={index} className="align-items-cente m-2">
          <button className="btn btn-sm h-100 kbtn-outline-secondary">
            <img src={contact.avatar} alt={contact.name} className="rounded-circle" width="50" height="50" />
            <small className="text-muted">{contact.name}</small>
          </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AddressBook;
