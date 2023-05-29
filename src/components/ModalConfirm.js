import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../services/UserService';

const ModalConfirm = ({ show, handleClose, dataDeleteUser, handleDeleteUserFromModal }) => {
  const handleConfirmDelete = async () => {
    let res = await deleteUser(dataDeleteUser.id);
    if (res && +res.statusCode === 204) {
      handleDeleteUserFromModal(dataDeleteUser);
      handleClose();
      toast.success('Xóa người dùng thành công...');
    } else {
      toast.error('Xóa người dùng thất bại...');
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Hành động này không thể được hoàn tác! Bạn có muốn xóa người dùng này?
            <br />
            <b>email: {dataDeleteUser.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleConfirmDelete()}>
            Xác nhận
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
