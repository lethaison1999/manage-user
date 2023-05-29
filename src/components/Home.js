import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <div>API sử dụng từ trang Website: https://reqres.in/ để tạo nên website</div>
      <div>Các chức năng chính trong Website</div>
      <ul>
        <li>1. Đăng nhập</li>
        <li>2. Đăng xuất</li>
        <li>3. Thêm mới người dùng</li>
        <li>4. Sửa người dùng</li>
        <li>5. Xóa người dùng</li>
        <li>6. Hiển thị các danh sách người dùng</li>
        <li>7. Tìm kiếm người dùng theo ID</li>
        <li>8. Sắp xếp theo Họ và tên</li>
        <li>9. Phân trang</li>
        <li>10. Import người dùng từ file .csv</li>
        <li>11. Export người dùng từ file .csv</li>
        <li>12. Phân quyền</li>
      </ul>
    </div>
  );
};

export default Home;
