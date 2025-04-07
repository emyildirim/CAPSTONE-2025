import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import PostJob from './pages/PostJob';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/en" element={<Home />} />
          <Route path="/en/about" element={<About />} />
          <Route path="/en/postjob" element={<PostJob />} />
          <Route path="*" element={<Navigate to="/en" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
