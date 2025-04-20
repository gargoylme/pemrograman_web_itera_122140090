import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookProvider } from "./context/BookContext.jsx";
import Home from "./pages/Home/Home.jsx";
import Stats from "./pages/Stats/Stats.jsx";

const App = () => (
  <BookProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  </BookProvider>
);

export default App;
