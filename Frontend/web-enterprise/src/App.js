import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import Homepage from './components/homepage/Homepage';
import Category from './components/category/Category';

function App() {
  return (

      <Router>
        <Routes>
          {/* <Route exact path="/" element={<Layout />}> */}
            {/*<Route path="/" element={<LoginForm />} /*/}
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/category" element={<Category />} />
          {/* </Route> */}
        </Routes>
      </Router>
  );
}

export default App;