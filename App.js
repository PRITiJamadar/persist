import React, { useEffect, useState } from 'react';
import './App.css';
import ChatWindow from './ChatWindow';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Navbar from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/About';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import Contact from './pages/contact';

function App() {
  const [isDarkMode, setIsDarkMode] = useState("dark-theme");
  const toggleTheme = () => {
    if (isDarkMode === "dark-theme") {
      setIsDarkMode("light-theme")
    } else {
      setIsDarkMode("dark-theme")
    }
  }

  useEffect(() => {
    document.body.className = isDarkMode;
  }, [isDarkMode]);


  return (
    <Provider store={store}>
      <div className="App">

        <button className="togglebtn" onClick={toggleTheme}>Toggle theme</button>
        <Router>
          <Navbar />
      <Routes>
         <Route path='/'  element={<Home />} />
           
         <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/sign-up' element={<SignUp />} />
       </Routes>
     </Router>
        <ChatWindow></ChatWindow>
        
      </div>
    </Provider>
  );
}

export default App;
