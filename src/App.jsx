import './App.scss';

// components
import Menu from './components/Menu';

// pages
import Dashboard from './pages/Dashboard';
import Category from './pages/Category';
import CategoryProduct from './pages/CategoryProduct';

// Roter
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        
        <div className="Menu">
          <Menu/>
        </div>

        <div className='content-body'>
        
          <Routes>

            <Route path="/" element={<Dashboard />} />
            <Route path="/category/" element={<Category />} />
            <Route path='/category/:category_id/products/' element={<CategoryProduct />} />
          </Routes>
          
        </div>

      </Router>
      
    </div>
  );
}

export default App;
