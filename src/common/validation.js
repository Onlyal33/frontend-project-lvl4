import * as yup from 'yup';

const validationSchemas = {
  message: () => yup.object().shape({
    message: yup.string()
      .trim(),
  }),
  channel: (names) => yup.object().shape({
    name: yup.string()
      .trim()
      .required('Please enter some text here')
      .notOneOf(names, 'Channel already exists'),
  }),
  signup: () => yup.object().shape({
    username: yup.string()
      .min(3, 'Minimum length is 3')
      .max(20, 'Maximum length is 20')
      .required('Please enter some text here')
      .trim(),
    password: yup.string()
      .min(6, 'Minimum length is 6')
      .required('Please enter some text here')
      .trim(),
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .trim(),
  }),
};

export default (schema) => validationSchemas[schema];
