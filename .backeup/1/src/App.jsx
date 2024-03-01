import './App.css';
import Home from './pages/Home';
import Nav from './components/Nav';
import CategoryList from './pages/CategoryList';
import ProductList from './pages/ProductList.jsx';
import CategoryView from './pages/CategoryView';
import CategoryAdd from './pages/CategoryAdd';
import CategoryEdit from './pages/CategoryEdit';
import ProductAdd from './pages/ProductAdd';
import ProductEdit from './pages/ProductEdit';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="nav">
          <Nav />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />

          

          <Route path="/category/list/" element={<CategoryList />} />
          <Route path='/category/add/' element={<CategoryAdd />} />
          <Route path='/category/:category_id/view' element={<CategoryView />} />
          <Route path="/category/:category_id/edit" element={<CategoryEdit />} />




          <Route path='/product/list/' element={<ProductList />} />
          <Route path='/product/add/' element={<ProductAdd />} />
          <Route path="/product/:product_id/edit" element={<ProductEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
