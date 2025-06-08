import css from './App.module.css';
import { ContactList } from '../ContactList/ContactList';
import { SearchBox } from '../SearchBox/SearchBox';
import { ContactForm } from '../ContactForm/ContactForm';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contactsOps';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className={css.container}>
      <h1>Phone book</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};
