import './App.css';
//import Header from './components/header';
import Footer from './components/footer';
import Dashbord from './components/dashbord';
import About from './components/about';
import Todo from './components/todo';
import NoPage from './components/noPage';
import LoginForm from './components/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
//import todo from './components/todo';


function App() {
  return (
    <>
    <Router>
    <br />
      <Routes>
        <Route exact path="/" element={<LoginForm/>}/>
        <Route exact path="/dashboard" element={<Dashbord/>}>
         <Route exact path="/dashboard/todo" element={<Todo/>}/>
        </Route>  
        <Route exact path="/about" element={<About/>} />
        <Route exact path='*' element={<NoPage/>}/>
           </Routes>
           <br />
      <Footer />
      </Router>

    </>
  
  );
}

export default App;
