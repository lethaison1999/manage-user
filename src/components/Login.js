import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginRedux } from '../redux/actions/userActions';

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const isLoading = useSelector((state) => state.user.isLoading);
  const userAccount = useSelector((state) => state.user.userAccount);

  const handleLoginSubmit = async (e) => {
    if (!email || !password) {
      toast.error('Email và mật khẩu không được để trống...');
      return;
    }
    dispatch(handleLoginRedux(email, password));
  };
  const handleBack = () => {
    navigate('/');
  };
  const handleEnter = (e) => {
    if (e && e.key === 'Enter') {
      handleLoginSubmit();
    }
  };
  useEffect(() => {
    if (userAccount && userAccount.auth === true) {
      navigate('/');
    }
  }, [userAccount]);
  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title  text-center">Đăng nhập</div>
      <div className="text ">Email hoặc tên người dùng ( eve.holt@reqres.in )</div>
      <input
        type="text"
        placeholder="Email hoặc tên người dùng..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="input-icon">
        <input
          type={isShowPassword === true ? 'text' : 'password'}
          placeholder="Mật khẩu..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
        />

        <i
          className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
      </div>
      <button
        className={email && password ? 'active' : ''}
        disabled={email && password ? false : true}
        onClick={(e) => handleLoginSubmit(e)}
      >
        {isLoading && <i className="fas fa-circle-notch fa-spin"></i>} &nbsp; Đăng nhập
      </button>
      <div className="back text-center " onClick={() => handleBack()}>
        <i className="fa-solid fa-arrow-left"></i>
        Trở về
      </div>
    </div>
  );
};

export default Login;
