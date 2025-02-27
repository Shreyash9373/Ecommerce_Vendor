import React from "react";
import ProductForm from "./Pages/Vendor/ProductForm";
import Login from "./Auth/Login";
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <div>
      <ToastContainer/>
      {/* <ProductForm /> */}
      <Login />
    </div>
  );
};

export default App;
