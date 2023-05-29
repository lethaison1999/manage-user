import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalEditUser = ({ show, handleClose, dataEditUser, handleEditModalFromUser }) => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleUpdateUser = async () => {
    let res = await updateUser(name, job);
    if (res) {
      handleEditModalFromUser({
        first_name: name,
        id: dataEditUser.id,
        last_name: job,
      });
      toast.success('Chỉnh sửa người dùng thành công...');
      setName('');
      setJob('');
      handleClose();
    }
  };
  useEffect(() => {
    if (show) {
      setName(dataEditUser.first_name);
      setJob(dataEditUser.last_name);
    }
  }, [dataEditUser, show]);
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Họ</label>
                <input
                  type="text"
                  className="form-control"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleUpdateUser()}>
            Cập nhật
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
