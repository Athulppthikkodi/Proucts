import './App.css'
import EditProduct from './components/EditProduct'
import ProductAdd from './components/ProductAdd'
import ProductsTable from './components/ProductsTable'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<ProductAdd/>} />
          <Route path="/productTable" element={<ProductsTable />} />
          <Route path='/update/:id' element={<EditProduct/>} />    
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
