import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoutes.jsx";
import Login from "./Auth/Login";
import Navbar from "./Components/Navbar.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";
import AddProduct from "./Pages/AddProduct.jsx";
import ViewProducts from "./Components/ViewProducts.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";

const App = () => {
  const { isAuthenticated, vendor } = useSelector((state) => state.vendor); // Get vendor details
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <ToastContainer />
      {isAuthenticated && <Navbar vendor={vendor} />} {/* Pass vendor details */}
      <div className="flex h-screen">
        {isAuthenticated && <Sidebar isOpen={isSidebarOpen} toggleSidebar={setIsSidebarOpen} />}

        <div className={`flex-1 transition-all p-6 ${isAuthenticated ? "md:ml-64" : ""}`}>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/view-products" element={<ViewProducts />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
