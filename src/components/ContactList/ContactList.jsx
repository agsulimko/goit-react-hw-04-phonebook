// import { useState } from 'react';
 import Contact from 'components/Contact/Contact';
import css from './ContactList.module.css'
//   import contacts from 'components/contacts.json';


const ContactList =({contacts,filteredContacts, deleteContacts} ) => {


    // state = { contacts}

    // const { filteredContacts, deleteContacts } = this.props;
        
      
            return (
            
        
                <ul className={css.list}>
                    {(filteredContacts ?? contacts).map((contact) => (
                        < Contact
                            contacts={contact}
                            key={contact.id}
                            deleteContacts={deleteContacts}
                            
                        />))}
                </ul>)
        }
    
    

export default ContactList;



















