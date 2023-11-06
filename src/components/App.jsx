import { useEffect, useState } from "react";
import css from "./App.module.css";
import { nanoid } from "nanoid";
import ContactForm from "components/ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "components/Filter/Filter";
import contactslist from "components/contactslist.json";

// import { useLocalStorage } from "hooks/useLocalStorage";

const App = () => {
  // const [contacts, setContacts] = useLocalStorage("contacts", []);
  // ========================================
  //  второй вариант локалстореджа без использования hooks
  const valueLocalStorage = JSON.parse(localStorage.getItem("contacts"));

  const [contacts, setContacts] = useState(
    valueLocalStorage ? valueLocalStorage : contactslist
    // valueLocalStorage.length > 0 ? valueLocalStorage : contactslist
  );

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  // ============================================================
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

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase().trim())
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
