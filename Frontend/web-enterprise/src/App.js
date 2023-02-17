import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/auth/LoginForm';
import Homepage from './components/homepage/Homepage';
import Category from './components/category/Category';

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/category" element={<Category />} />
        </Routes>
      </Router>
  );
}

export default App;