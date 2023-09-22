import { useEffect, useState } from "react";
import css from "./App.module.css";
import { nanoid } from "nanoid";
import ContactForm from "components/ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "components/Filter/Filter";
import contactslist from "components/contactslist.json";

const App = () => {
  const [contacts, setContacts] = useState(contactslist);
  const [filter, setFilter] = useState("");

  //  const [prevContacts, setPrevContacts] = useState(contactslist); // Добавляем переменную для хранения предыдущего состояния

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(storedContacts);

    if (parsedContacts <= 0) return;
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    if (contacts !== contactslist) {
      console.log(contacts);
      console.log(contactslist);
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  const createContacts = (dataForm) => {
    const isAlreadyExist = contacts.find((el) => el.name === dataForm.name);
    if (isAlreadyExist) return alert("Already Exist");

    const newContact = {
      ...dataForm,
      id: nanoid(),
    };
    setContacts((prev) => [newContact, ...prev]);
  };

  const handleFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const deleteContacts = (id) => {
    setContacts((prev) => prev.filter((el) => el.id !== id));
  };

  console.log(contacts);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className={css.h1}>Phonebook</h1>
      <ContactForm createContacts={createContacts} />

      <h2 className={css.h2}>Contacts</h2>
      <Filter handleFilter={handleFilter} />

      <ContactList
        contacts={contacts}
        deleteContacts={deleteContacts}
        filteredContacts={filteredContacts}
      />
    </div>
  );
};

export default App;
