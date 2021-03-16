import * as yup from 'yup';

const validationSchemas = {
  message: () => yup.object().shape({
    message: yup.string()
      .trim()
      .required('Please enter some text here'),
  }),
  channel: (names) => yup.object().shape({
    name: yup.string()
      .trim()
      .required('Please enter some text here')
      .notOneOf(names, 'Channel already exists'),
  }),
};

export default (schema) => validationSchemas[schema];
