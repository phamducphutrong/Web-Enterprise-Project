import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthContextProvider from "./contexts/AuthContext";
import CategoryContextProvider from "./contexts/CategoryContext";
import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import Homepage from './components/homepage/Homepage';
import Category from './components/category/Category';

function App() {
  return (
    // <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route index element={<LoginForm />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/category" element={<Category />} />
          </Route>
        </Routes>
      </Router>
    // </AuthContextProvider>
  );
}

export default App;