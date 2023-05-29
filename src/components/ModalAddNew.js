import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';
import randomEmail from 'random-email';

const ModalAddNew = ({ show, handleClose, handleUpdateTable }) => {
  // const { handleClose } = props;
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleSave = async () => {
    let res = await postCreateUser(name, job);
    if (res && res.id) {
      handleUpdateTable({
        first_name: name,
        id: res.id,
        last_name: job,
        email: randomEmail({ domain: 'example.com' }),
      });
      toast.success('Tạo người dùng thành công...');
      setName('');
      setJob('');
      handleClose();
    } else {
      toast.error('Tạo người dùng thất bại !!!');
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới người dùng</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSave()}>
            Lưu
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
