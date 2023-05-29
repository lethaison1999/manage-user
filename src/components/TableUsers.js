import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { fetchAllUsers } from '../services/UserService';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _, { debounce } from 'lodash';
import ModalConfirm from './ModalConfirm';
import { CSVLink, CSVDownload } from 'react-csv';
import { toast } from 'react-toastify';
import Papa from 'papaparse';

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataDeleteUser, setDataDeleteUser] = useState({});

  const [sortBy, setSortBy] = useState('asc');
  const [sortField, setSortField] = useState('id');

  const [dataExport, setDataExport] = useState([]);
  // const [search, setSearch] = useState('');

  const handleClose = () => {
    setShowModal(false);
    setShowModalEdit(false);
    setShowModalDelete(false);
  };
  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };
  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUsers(res.data);
    }
  };
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };
  const handleEditUser = (user) => {
    setDataEditUser(user);
    setShowModalEdit(true);
  };
  const handleDeleteUser = (user) => {
    setDataDeleteUser(user);
    setShowModalDelete(true);
  };
  const handleEditModalFromUser = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    cloneListUsers[index].last_name = user.last_name;
    setListUsers(cloneListUsers);
  };
  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);

    setListUsers(cloneListUsers);
  };
  const handleSortBy = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
  };
  const handleSearch = debounce((e) => {
    // setSearch(e.target.value);
    let search = e.target.value;
    if (search) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) => item.email.includes(search));
      setListUsers(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 300);

  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(['Id', 'Email', 'First name', 'Last name']);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
    }
    setDataExport(result);
    done();
  };
  const handleChangeImport = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type !== 'text/csv') {
        toast.error('Vui lòng chỉ chấp nhận tệp csv...');
        return;
      } else {
        Papa.parse(file, {
          // header: true,
          complete: function (results) {
            let rawCSV = results.data;
            if (rawCSV.length > 0) {
              if (rawCSV[0] && rawCSV[0].length === 3) {
                if (
                  rawCSV[0][0] !== 'email' ||
                  rawCSV[0][1] !== 'first_name' ||
                  rawCSV[0][2] !== 'last_name'
                ) {
                  toast.error('Tệp CSV tiêu đề sai định dạng...');
                } else {
                  let result = [];
                  rawCSV.map((item, index) => {
                    if (index > 0 && item.length === 3) {
                      let obj = {};
                      obj.email = item[0];
                      obj.first_name = item[1];
                      obj.last_name = item[2];
                      result.push(obj);
                    }
                  });
                  setListUsers(result);
                }
              } else {
                toast.error('Tệp CSV sai định dạng...');
              }
            } else {
              toast.error('Dữ liệu không tồn tại...');
            }
          },
        });
      }
      // console.log('check file: ', file);
    }
  };
  return (
    <>
      <div className="my-3 add-new d-sm-flex">
        <span>
          <b>Danh sách người dùng: </b>
        </span>
        <div className="import-export mt-sm-0 mt-2">
          <label htmlFor="text" className="btn btn-secondary ">
            <i className="fa-solid fa-file-import"></i>Import
          </label>
          <input type="file" id="text" hidden onChange={(e) => handleChangeImport(e)} />
          <CSVLink
            data={dataExport}
            filename={'users.csv'}
            className="btn btn-primary"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-file-arrow-down "></i>
            Export
          </CSVLink>
          <button type="button" className="btn btn-success " onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-circle-plus "></i>
            Thêm mới
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-4 my-3 ">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm..."
          // value={search}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSortBy('desc', 'id')}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSortBy('asc', 'id')}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span> Họ</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSortBy('desc', 'first_name')}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSortBy('asc', 'first_name')}
                  ></i>
                </span>
              </div>
            </th>
            <th>Tên</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`user${index + 1}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning mx-2"
                      onClick={() => handleEditUser(item)}
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger "
                      onClick={() => handleDeleteUser(item)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< "
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={showModal}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={showModalEdit}
        handleClose={handleClose}
        dataEditUser={dataEditUser}
        handleEditModalFromUser={handleEditModalFromUser}
      />
      <ModalConfirm
        show={showModalDelete}
        handleClose={handleClose}
        dataDeleteUser={dataDeleteUser}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};

export default TableUsers;
