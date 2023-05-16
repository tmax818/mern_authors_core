import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Main from "./views/Main";
import AuthorForm from "./components/AuthorForm";
import axios from "axios";
import Update from "./views/Update";


function App() {

  return (
    <div className="App">
        <h1>Favorite Authors</h1>
        <Routes>
          <Route element={<Main />} path={"/"}/>
          <Route element={<AuthorForm />} path={"/new"}/>
          <Route element={<Update />} path={"/edit/:id"}/>
        </Routes>
    </div>
  );
}

export default App;
