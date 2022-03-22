import React from 'react';
import ReactDOM from 'react-dom';

import { useAppSelector } from '@/hooks/hooks';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  handleOk: () => void;
  handleCancel: () => void;
}

const modalContainer = document.getElementById('modal');

const Modal = ({ title, children, handleOk, handleCancel }: ModalProps) => {
  const showModal = useAppSelector(({ app }) => app.showModal);

  const shouldShowModal = modalContainer && showModal;
  if (!shouldShowModal) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal bg-opacity-50 bg-dark d-block " tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                aria-label="Close"
                className="btn-close"
                onClick={handleCancel}
                type="button"
              />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleOk}
                type="button"
              >
                Approve
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    modalContainer
  );
};

export default Modal;
