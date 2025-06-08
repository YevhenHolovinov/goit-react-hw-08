import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

import css from './ContactForm.module.css';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, `The "Name" is too Short!`)
    .max(50, `The "Name" is too Long!`)
    .required('The "Name" is Required field!'),
  number: Yup.string()
    .min(3, `The "Number" is too Short!`)
    .max(50, `The "Number" is too Long!`)
    .required('The "Number" is Required field!'),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      {({ isSubmitting }) => (
        <Form className={css.formContact}>
          <label className={css.formLabel} htmlFor={nameFieldId}>
            Name
          </label>
          <div className={css.formInputWrapper}>
            <Field
              className={css.formInput}
              type="text"
              name="name"
              id={nameFieldId}
            />
            <ErrorMessage
              className={css.formErrorMessage}
              name="name"
              component="div"
            />
          </div>

          <label className={css.formLabel} htmlFor={numberFieldId}>
            Number
          </label>
          <div className={css.formInputWrapper}>
            <Field
              className={css.formInput}
              type="tel"
              inputMode="tel"
              name="number"
              id={numberFieldId}
            />
            <ErrorMessage
              className={css.formErrorMessage}
              name="number"
              component="div"
            />
          </div>

          <button
            className={css.formButton}
            type="submit"
            disabled={isSubmitting}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};
