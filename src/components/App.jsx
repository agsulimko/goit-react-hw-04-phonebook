import React, {Component} from 'react';
import css from './App.module.css'


 import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';

import ContactList from './ContactList/ContactList'
 import Filter from 'components/Filter/Filter';

 import contacts from './contacts.json';      
       
      
        
 export default class App extends Component {

 state = {
    contacts,
  //  contacts: initialContacts,
    filter: '',
    name: '',
    number: ''
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    console.log(storedContacts);
    const parsedContacts = JSON.parse(storedContacts);
    console.log('parsedContacts=',parsedContacts);
     console.log(parsedContacts.length);

     if ( parsedContacts.length <= 0) return
  this.setState({ contacts: parsedContacts }) 
    }

 componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      // console.log(this.state.contacts);
      console.log(prevState.contacts);
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }


  
    createContacts = (dataForm) => {
		const isAlreadyExist = this.state.contacts.find(
			(el) => el.name === dataForm.name
		)
		if (isAlreadyExist) return alert('Already Exist')

		const newContact = {...dataForm,id: nanoid(),}
		this.setState((prev) => ({ contacts: [newContact, ...prev.contacts],
    }))
     
	}
 
  
   handleFilter = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  deleteContacts = (id) => {
         	this.setState((prev) => ({
        		contacts: prev.contacts.filter(el => el.id !== id),
        	}))
  }
  
  render() {

    const { contacts, filter } = this.state;

 const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );


    return (

      <div className='container'>
  <h1 className={css.h1}>Phonebook</h1>
        <ContactForm createContacts={this.createContacts}/> 
       

  <h2 className={css.h2}>Contacts</h2>
          <Filter handleFilter ={this.handleFilter} />     
        
        <ContactList contacts={this.state.contacts}
         deleteContacts={this.deleteContacts}
            filteredContacts={filteredContacts}
        />

  
</div>


    )
  }
};