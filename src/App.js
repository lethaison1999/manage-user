import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import AppRoute from './routes/AppRoute';
import { useDispatch } from 'react-redux';
import { handleRefresh } from './redux/actions/userActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(handleRefresh());
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoute />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
