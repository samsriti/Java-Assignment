import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from './pages/Registration';
import LoginPage from './pages/LoginPage';
import InventoryForm from './pages/InventoryForm';
import InventoryTable from './pages/InventoryTable';
import MedicineView from './pages/MedicineView';
import ChangePassword from './pages/ChangePassword';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position='top-center' />
        <Routes> 
          <Route exact path="/registration" Component={Registration}> </Route>
          <Route exact path='/' Component={LoginPage}> </Route>
          <Route exact path='/add' Component={InventoryForm}> </Route>
          <Route exact path='/getAll' Component={InventoryTable}> </Route>
          <Route exact path='/getByID/:id' Component={MedicineView}> </Route>
          <Route exact path='/update/:id' Component={InventoryForm}> </Route>
          <Route exact path='/changePassword' Component={ChangePassword}> </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
