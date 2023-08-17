import './App.css';
//import Header from './components/header';
//import Footer from './components/footer';
import Register from './components/register';
import Dashbord from './components/dashbord';
import About from './components/about';
import Todo from './components/todo';
import NoPage from './components/noPage';
import Profile from './components/profile'
import LoginForm from './components/login';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';
import Layout from './components/layout';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
//import todo from './components/todo';


function App() {
  const isAuthenticated = async () => {
    const token = await localStorage.getItem('token');
    return token !== null;
  };
  return (
    <>
      <Router>
        <br />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
          <Route
            exact path="/dashboard"
            element={isAuthenticated() ? <Layout>
              <Dashbord />
            </Layout> : <Navigate to="/" replace />}
          >
            <Route exact path="/dashboard/todo" element={<Todo />} />
          </Route>
          <Route exact path="/profile" element={isAuthenticated() ? <Layout>
            <Profile />
          </Layout> : <Navigate to="/" replace />} />
          <Route exact path="/about" element={isAuthenticated() ? <Layout>
            <About />
          </Layout> : <Navigate to="/" replace />} />
          <Route exact path='*' element={<NoPage />} />
        </Routes>
        <br />
        {/* <Footer /> */}
      </Router>

    </>

  );
}

export default App;
