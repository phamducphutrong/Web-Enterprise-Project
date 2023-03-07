import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/auth/LoginForm';
import Homepage from './components/homepage/Homepage';
import Category from './components/category/Category';
import CreateIdea from "./components/idea/CreateIdea";
import Profile from './components/profile/Profile';
import Account from "./components/admin/account/Account";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/createIdea" element={<CreateIdea />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;