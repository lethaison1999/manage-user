import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/image/logo-app.png';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userActions';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userAccount);
  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  };
  useEffect(() => {
    if (user && user.auth === false) {
      navigate('/login');
      toast.success('Đăng xuất thành công...');
    }
  }, [user]);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logoApp}
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top logo-img"
          />
          <span> Thai Son Dev</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Trang chủ
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Quản lý người dùng
            </NavLink>
          </Nav>
          <Nav>
            {user && user.email ? <span className="nav-link">Xin chào {user.email} !</span> : ''}
            <NavDropdown title="Cài đặt">
              {user && user.auth === true ? (
                <NavDropdown.Item onClick={() => handleLogout()}>Đăng xuất</NavDropdown.Item>
              ) : (
                <NavLink className="dropdown-item" to="/login">
                  Đăng nhập
                </NavLink>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
