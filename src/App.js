import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Dashbord from './components/dashbord';
import About from './components/about';
import Todo from './components/todo';
import NoPage from './components/noPage';
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
    <Header></Header>
    <br />
      <Routes>
        <Route exact path="/" element={<Dashbord/>}>
         <Route exact path="/todo" element={<Todo/>}/>
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
