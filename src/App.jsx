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
import ViewProducts from "./Pages/ViewProducts.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import EditProduct from "./Pages/EditProduct.jsx";
import ScrolltoTop from "./Components/ScrollToTop.jsx";
import Profile from "./Pages/Profile.jsx";
import ManageOrder from "./Pages/ManageOrder.jsx";

const App = () => {
  const { isAuthenticated, vendor } = useSelector((state) => state.vendor); // Get vendor details
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          maxWidth: "300px",
          borderRadius: "4px",
          fontSize: "0.875rem",
          padding: "8px",
          color: "#050505",
          fontFamily: "sans-serif",
        }}
      />
      <ScrolltoTop />
      {isAuthenticated && <Navbar vendor={vendor} />} {/* Pass vendor details */}
      <div className="flex h-screen">
        {isAuthenticated && <Sidebar isOpen={isSidebarOpen} toggleSidebar={setIsSidebarOpen} />}

        <div className={`flex-1 transition-all p-6 ${isAuthenticated ? "md:ml-64" : ""}`}>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/view-products" element={<ViewProducts />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/manage-orders" element={<ManageOrder />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
