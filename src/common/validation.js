import * as yup from 'yup';
import i18n from '../app/i18n.js';

const validationSchemas = {
  message: () => yup.object().shape({
    message: yup.string()
      .trim(),
  }),
  channel: (names) => yup.object().shape({
    name: yup.string()
      .trim()
      .required(i18n.t('validation.required'))
      .notOneOf(names, i18n.t('validation.exist')),
  }),
  signup: () => yup.object().shape({
    username: yup.string()
      .min(3, i18n.t('validation.length.login'))
      .max(20, i18n.t('validation.length.login'))
      .required(i18n.t('validation.required'))
      .trim(),
    password: yup.string()
      .min(6, i18n.t('validation.length.password'))
      .required(i18n.t('validation.required'))
      .trim(),
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], i18n.t('validation.match'))
      .trim(),
  }),
};

export default (schema) => validationSchemas[schema];
