import * as yup from 'yup';

const validationSchema = {
  channel: (names: string[]) =>
    yup.object().shape({
      name: yup
        .string()
        .trim()
        .required('validation.required')
        .notOneOf(names, 'validation.exist'),
    }),
  message: yup.object().shape({
    message: yup.string().trim().required('Required'),
  }),
  signup: yup.object().shape({
    username: yup
      .string()
      .min(3, 'validation.length.login')
      .max(20, 'validation.length.login')
      .required('validation.required')
      .trim(),
    password: yup
      .string()
      .min(6, 'validation.length.password')
      .required('validation.required')
      .trim(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'validation.match')
      .trim(),
  }),
};

export default validationSchema;
