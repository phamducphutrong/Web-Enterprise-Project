import style from './App.module.css';
import Category from './components/category/Category';
function App() {
  return (
    <div className="App">
      <div className={style.Category}>Hello</div>
      <Category/>
    </div>
  );
}

export default App;