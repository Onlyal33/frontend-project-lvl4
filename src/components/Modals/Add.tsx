import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';
import useEmit from '../../hooks/useEmit';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectChannelNames } from '../../redux/features/channels/selectors';
import useModal from '../../hooks/useModal';
import validationSchema from '../../common/validation';
import { FormikActions } from '../../types';
import { changeCurrentChannel } from '../../redux/features/channels';
import { useProfanityFilter } from '../../contexts/ProfanityFilterContext';

export default function Add() {
  const inputRef = useRef<HTMLInputElement>(null);
  const channelNames = useAppSelector(selectChannelNames, shallowEqual);
  const { t } = useTranslation();
  const { hideModal } = useModal();
  const emit = useEmit('newChannel');
  const dispatch = useAppDispatch();
  const filterProfanity = useProfanityFilter();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema.channel(channelNames),
    onSubmit: async ({ name }: { name: string }, actions: FormikActions) => {
      const res = await emit(
        {
          name: (filterProfanity?.clean(name) ?? name).trim(),
        },
        actions,
        inputRef,
      );

      res && dispatch(changeCurrentChannel(res.data));
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Body as={InputGroup}>
        <Form.Control
          ref={inputRef}
          type="text"
          name="name"
          required
          aria-label="Channel name"
          onChange={(e) => {
            formik.setFieldError(e.target.name, undefined);
            formik.handleChange(e);
          }}
          value={formik.values.name}
          isInvalid={!formik.isValid}
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid">
          {formik.touched.name && formik.errors.name && t(formik.errors.name)}
        </Form.Control.Feedback>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          {t('modal.button.cancel')}
        </Button>
        <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
          {t('modal.button.submit')}
        </Button>
      </Modal.Footer>
    </Form>
  );
}
