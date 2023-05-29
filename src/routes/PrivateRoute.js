import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
  const user = useSelector((state) => state.user.userAccount);
  if (user && !user.auth) {
    return (
      <>
        <div className="alert alert-danger" role="alert">
          Bạn không có quyền truy cập trang này,vui lòng đăng nhập để có quyền truy cập
        </div>
      </>
    );
  }

  return <>{props.children}</>;
};
export default PrivateRoute;
