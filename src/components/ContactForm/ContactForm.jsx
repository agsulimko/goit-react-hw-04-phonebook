import { useState } from "react";
import css from "./ContactForm.module.css";

const ContactForm = ({ createContacts }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleInputChange = ({ target: { value, name } }) => {
    if (name === "name") setName(value);
    else setNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createContacts({ name, number });
    setName("");
    setNumber("");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        {" "}
        Name
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInputChange}
          className={css.input}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          type="tel"
          name="number"
          placeholder="Enter number XXX-XX-XX"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInputChange}
          className={css.input}
        />
      </label>
      <button className={css.btnAdd} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
