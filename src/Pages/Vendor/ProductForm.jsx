import React from "react";
import { useForm } from "react-hook-form";
import { FaTag, FaDollarSign, FaList, FaBoxes, FaFileImage, FaClipboard } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";

const ProductForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-2xl shadow-lg max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Product</h2>

      <div className="mb-4">
        <label className=" text-gray-600 font-medium mb-1 flex items-center">
          <FaTag className="mr-2" /> Product Name
        </label>
        <input
          type="text"
          {...register("name", { required: "Product name is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label className=" text-gray-600 font-medium mb-1 flex items-center">
          <FaDollarSign className="mr-2" /> Price ($)
        </label>
        <input
          type="number"
          {...register("price", { required: "Price is required", min: 1 })}
          className="w-full p-2 border rounded"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div className="mb-4">
        <label className=" text-gray-600 font-medium mb-1 flex items-center">
          <RiDiscountPercentFill className="mr-2" /> Discount ($)
        </label>
        <input
          type="number"
          {...register("discount", { required: "Discount is required", min: 1 })}
          className="w-full p-2 border rounded"
        />
        {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
      </div>

      <div className="mb-4">
        <label className=" text-gray-600 font-medium mb-1 flex items-center">
          <FaClipboard className="mr-2" /> Description
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div className="mb-4">
        <label className=" text-gray-600 font-medium mb-1 flex items-center">
          <FaList className="mr-2" /> Category
        </label>
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Kitchen</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <div className="mb-4">
        <label className=" text-gray-600 font-medium mb-1 flex items-center">
          <FaBoxes className="mr-2" /> Stock Quantity
        </label>
        <input
          type="number"
          {...register("stock", { required: "Stock quantity is required", min: 1 })}
          className="w-full p-2 border rounded"
        />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
      </div>

      <div className="mb-4">
        <label className=" text-gray-600 font-medium mb-1 flex items-center">
          <FaFileImage className="mr-2" /> Product Images
        </label>
        <input
          type="file"
          {...register("images", { required: "At least one image is required" })}
          multiple
          className="w-full p-2 border rounded"
        />
        {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
