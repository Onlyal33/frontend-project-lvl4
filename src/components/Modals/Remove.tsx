import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { FormikActions } from '../../types';
import useModal from '../../hooks/useModal';
import { useAppSelector } from '../../redux/hooks';
import { selectModalItem } from '../../redux/features/modals/selectors';
import useEmit from '../../hooks/useEmit';

export default function Remove() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();
  const { hideModal } = useModal();
  const item = useAppSelector(selectModalItem);
  const emit = useEmit('removeChannel');

  const formik = useFormik({
    initialValues: { id: item?.id ?? '' },
    onSubmit: ({ id }: { id: string }, actions: FormikActions) => {
      emit(
        {
          id,
        },
        actions,
        buttonRef,
      );
    },
  });

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Body>
        <div>
          {t('modal.removeText1')}
          {item?.name}
          {t('modal.removeText2')}
        </div>
        <Form.Text className="text-danger">{formik.errors.id}</Form.Text>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          {t('modal.button.cancel')}
        </Button>
        <Button
          variant={'danger'}
          type="submit"
          disabled={formik.isSubmitting}
          ref={buttonRef}
        >
          {t('modal.button.submit')}
        </Button>
      </Modal.Footer>
    </Form>
  );
}
