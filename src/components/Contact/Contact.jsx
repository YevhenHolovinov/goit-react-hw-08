import { IoIosContact } from 'react-icons/io';
import { MdPhoneInTalk } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

import css from './Contact.module.css';

export const Contact = ({ id, number, name }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <li className={css.container}>
      <div>
        <div className={css.text}>
          <IoIosContact />
          <span>{name}</span>
        </div>
        <div className={css.text}>
          <MdPhoneInTalk />
          <a href={`tel: ` + number}>{number}</a>
        </div>
      </div>
      <button onClick={handleDelete} type="button" aria-label="delete button">
        Delete
      </button>
    </li>
  );
};
