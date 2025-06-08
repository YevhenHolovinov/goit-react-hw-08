import { useSelector } from 'react-redux';

import { Contact } from '../Contact/Contact';

import css from './ContactList.module.css';
import {
  selectError,
  selectFilteredContacts,
  selectLoading,
} from '../../redux/contactsSlice';
import { Loader } from '../Loader/Loader';

export const ContactList = () => {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {loading && <Loader />}
      {!loading &&
        contacts &&
        !error &&
        contacts.map(({ id, number, name }) => (
          <Contact key={id} id={id} number={number} name={name} />
        ))}
      {error && <div>`Error: ${error} `</div>}
    </ul>
  );
};
