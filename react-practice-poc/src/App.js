import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './App.css';

function App() {
  return (
    <div className="App min-h-screen">
      <Router>
        <Header />
        <Routes>
          <Route path='/employeeList' element={<EmployeeList />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
