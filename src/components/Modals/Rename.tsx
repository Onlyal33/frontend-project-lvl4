import { useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';
import validationSchema from '../../common/validation';
import { selectFiletredChannelNames } from '../../redux/features/channels/selectors';
import { useAppSelector } from '../../redux/hooks';
import { selectModalItem } from '../../redux/features/modals/selectors';
import useModal from '../../hooks/useModal';
import useEmit from '../../hooks/useEmit';
import { FormikActions } from '../../types';
import { useProfanityFilter } from '../../contexts/ProfanityFilterContext';

export default function Rename() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const item = useAppSelector(selectModalItem);
  const filteredChannelNames = useAppSelector(
    (state) => selectFiletredChannelNames(state, item?.id ?? ''),
    shallowEqual,
  );
  const { hideModal } = useModal();
  const emit = useEmit('renameChannel');
  const filterProfanity = useProfanityFilter();

  const formik = useFormik({
    initialValues: {
      name: item?.name ?? '',
    },
    validationSchema: validationSchema.channel(filteredChannelNames),
    onSubmit: async ({ name }: { name: string }, actions: FormikActions) => {
      await emit(
        { id: item?.id ?? '', name: filterProfanity?.clean(name) ?? name },
        actions,
        inputRef,
      );
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Body as={InputGroup}>
        <Form.Control
          ref={inputRef}
          type="text"
          name="name"
          aria-label="Channel name"
          required
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
