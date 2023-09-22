import Contact from "components/Contact/Contact";
import css from "./ContactList.module.css";

const ContactList = ({ contacts, filteredContacts, deleteContacts }) => {
  return (
    <ul className={css.list}>
      {(filteredContacts ?? contacts).map((contact) => (
        <Contact
          contacts={contact}
          key={contact.id}
          deleteContacts={deleteContacts}
        />
      ))}
    </ul>
  );
};

export default ContactList;
