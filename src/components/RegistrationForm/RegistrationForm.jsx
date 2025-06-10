import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useId } from 'react';

import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

import css from './RegistrationForm.module.css';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too Short!')
    .max(50, 'Name is too Long!')
    .required('Name is Required field!'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required field!'),
  password: Yup.string()
    .matches(passwordRules, 'Please create a stronger password!')
    .required('Password is required field!'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const RegistrationForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
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

          <label className={css.formLabel} htmlFor={emailFieldId}>
            Email
          </label>
          <div className={css.formInputWrapper}>
            <Field
              className={css.formInput}
              type="email"
              inputMode="email"
              name="email"
              id={emailFieldId}
            />
            <ErrorMessage
              className={css.formErrorMessage}
              name="email"
              component="div"
            />
          </div>

          <label className={css.formLabel} htmlFor={passwordFieldId}>
            Password
          </label>
          <div className={css.formInputWrapper}>
            <Field
              className={css.formInput}
              type="password"
              inputMode="text"
              name="password"
              id={passwordFieldId}
            />
            <ErrorMessage
              className={css.formErrorMessage}
              name="password"
              component="div"
            />
          </div>

          <button
            className={css.formButton}
            type="submit"
            disabled={isSubmitting}
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
