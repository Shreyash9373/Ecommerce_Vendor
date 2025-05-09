import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiPlus, FiX, FiUpload, FiTag, FiLoader } from "react-icons/fi"; // Added FiLoader for submitting state

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get productId from route params
  const productId = id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [oldImages, setOldImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [attributes, setAttributes] = useState({});
  const [dimensions, setDimensions] = useState({});
  const [attrKey, setAttrKey] = useState("");
  const [attrValue, setAttrValue] = useState("");
  const [dimKey, setDimKey] = useState("");
  const [dimValue, setDimValue] = useState("");

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addAttribute = () => {
    if (attrKey.trim() && attrValue.trim()) {
      setAttributes({ ...attributes, [attrKey]: attrValue });
      setAttrKey("");
      setAttrValue("");
    }
  };

  const addDimension = () => {
    if (dimKey.trim() && dimValue.trim()) {
      setDimensions({ ...dimensions, [dimKey]: Number(dimValue) });
      setDimKey("");
      setDimValue("");
    }
  };

  useEffect(() => {
    // console.log("Id: ", productId);

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/product/get-product/${productId}`,
          { withCredentials: true }
        );
        const product = response.data.data.product;
        // console.log("Fetched Product: ", product);
        // Ensure product data exists before resetting the form
        if (product) {
          reset({
            name: product.name || "",
            description: product.description || "",
            category: product.category || "",
            subCategory: product.subCategory || "",
            brand: product.brand || "",
            price: product.price || "",
            discount: product.discount || "",
            stock: product.stock || "",
            weight: product.weight || "",
          });
          setOldImages(product.images || []); // Ensure it's an array

          // Update additional states
          setTags(product.tags || []);
          setAttributes(product.attributes || {});
          setDimensions(product.dimensions || {});
        }
      } catch (error) {
        toast.error("Failed to fetch product details");
        // console.error(error);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [id, reset]);

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    // Allow only numbers and empty string for dimensions
    if (/^\d*$/.test(value)) {
      setDimensions((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    // console.log("Submit data: ", data);
    setIsSubmitting(true); // Disable button & show "Submitting..."

    // Append form fields
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    formData.append("brand", data.brand);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("stock", data.stock);
    formData.append("weight", data.weight);
    // formData.append("attributes", attributes);

    // Convert attributes, dimensions, and tags into JSON strings
    const formattedDimensions = {};
    Object.keys(dimensions).forEach((key) => {
      formattedDimensions[key] = Number(dimensions[key]); // Convert all dimension values to numbers
    });

    formData.append("attributes", JSON.stringify(attributes));
    formData.append("dimensions", JSON.stringify(formattedDimensions)); // Use user-defined keys
    formData.append("tags", JSON.stringify(tags));

    // Append images (multiple files)
    if (data.images && data.images.length > 0) {
      // Append new images
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    } else {
      // Append old images (so backend knows not to delete them)
      oldImages.forEach((img) => {
        formData.append("oldImages", img);
      });
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/product/update-Product/${productId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      // console.log("Response", response.data);

      if (response.data) {
        toast.success(response.data.message || "Product added successfully");
      }

      // Reset form fields and state
      reset();
      setTags([]);
      setAttributes({});
      setDimensions({});
      navigate("/view-products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      // console.log(error);
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
          {/* --- Basic Information Section --- */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-lg font-semibold px-2 text-gray-700">Basic Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name", { required: "Product name is required" })}
                  placeholder="e.g., Wireless Noise Cancelling Headphones"
                  className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
              </div>

              {/* Brand */}
              <div>
                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  id="brand"
                  {...register("brand", { required: "Brand is required" })}
                  placeholder="e.g., Sony"
                  className={`w-full px-4 py-2 border ${errors.brand ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out`}
                />
                {errors.brand && (
                  <p className="mt-1 text-xs text-red-600">{errors.brand.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                {...register("description", { required: "Description is required" })}
                placeholder="Detailed description of the product..."
                className={`w-full px-4 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out resize-none`} // Added resize-none
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
              )}
            </div>
          </fieldset>

          {/* --- Categorization Section --- */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-lg font-semibold px-2 text-gray-700">Categorization</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  {...register("category", { required: "Category is required" })}
                  className={`w-full px-4 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out bg-white`} // Added bg-white for consistency
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                  <option value="home">Garden</option>
                  <option value="sports">Sports</option>
                  <option value="sports">Outdoors</option>

                  {/* Add more categories as needed */}
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-600">{errors.category.message}</p>
                )}
              </div>

              {/* Sub-Category */}
              <div>
                <label
                  htmlFor="subCategory"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Sub-Category
                </label>
                <select
                  id="subCategory"
                  {...register("subCategory", { required: "Subcategory is required" })}
                  className={`w-full px-4 py-2 border ${errors.subCategory ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out bg-white`}
                >
                  <option value="">Select Subcategory</option>
                  {/* Ideally, options should dynamically change based on selected category */}
                  <option value="headphones">Headphones</option>
                  <option value="mobiles">Mobiles</option>
                  <option value="laptops">Laptops</option>
                  <option value="clothing">Clothing</option>
                  <option value="shoes">Shoes</option>
                  <option value="watches">Watches</option>
                  {/* Add more subcategories */}
                </select>
                {errors.subCategory && (
                  <p className="mt-1 text-xs text-red-600">{errors.subCategory.message}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* --- Pricing & Stock Section --- */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-lg font-semibold px-2 text-gray-700">Pricing & Stock</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01" // Allow decimals
                  min="0" // Prevent negative prices
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                  placeholder="e.g., 199.99"
                  className={`w-full px-4 py-2 border ${errors.price ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out`}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>
                )}
              </div>

              {/* Discount */}
              <div>
                <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-700">
                  Discount (%)
                </label>
                <input
                  id="discount"
                  type="number"
                  min="0" // Prevent negative discount
                  max="100" // Max 100%
                  {...register("discount", {
                    required: "Discount is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Discount cannot be negative" },
                    max: { value: 100, message: "Discount cannot exceed 100%" },
                  })}
                  placeholder="e.g., 10"
                  className={`w-full px-4 py-2 border ${errors.discount ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out`}
                />
                {errors.discount && (
                  <p className="mt-1 text-xs text-red-600">{errors.discount.message}</p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-700">
                  Stock Quantity
                </label>
                <input
                  id="stock"
                  type="number"
                  min="0" // Prevent negative stock
                  step="1" // Whole numbers only
                  {...register("stock", {
                    required: "Stock quantity is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Stock cannot be negative" },
                    validate: (value) => Number.isInteger(value) || "Stock must be a whole number",
                  })}
                  placeholder="e.g., 50"
                  className={`w-full px-4 py-2 border ${errors.stock ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out`}
                />
                {errors.stock && (
                  <p className="mt-1 text-xs text-red-600">{errors.stock.message}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* --- Physical Properties Section --- */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-lg font-semibold px-2 text-gray-700">
              Physical Properties
            </legend>
            {/* Weight */}
            <div className="mb-6">
              <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-700">
                Weight (grams)
              </label>
              <input
                id="weight"
                type="number"
                step="any" // Allow decimal weights
                min="0"
                {...register("weight", {
                  required: "Weight is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Weight cannot be negative" },
                })}
                placeholder="e.g., 250"
                className={`w-full md:w-1/3 px-4 py-2 border ${errors.weight ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out`}
              />
              {errors.weight && (
                <p className="mt-1 text-xs text-red-600">{errors.weight.message}</p>
              )}
            </div>

            {/* Dimensions */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Dimensions (cm)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="text" // Use text to allow empty string, validate as number
                  name="width"
                  value={dimensions.width}
                  onChange={handleDimensionChange}
                  placeholder="Width"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out"
                />
                <input
                  type="text"
                  name="height"
                  value={dimensions.height}
                  onChange={handleDimensionChange}
                  placeholder="Height"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out"
                />
                <input
                  type="text"
                  name="depth"
                  value={dimensions.depth}
                  onChange={handleDimensionChange}
                  placeholder="Depth"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out"
                />
              </div>
              {/* Optional: Add validation messages for dimensions if needed */}
            </div>
          </fieldset>

          {/* --- Attributes Section --- */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-lg font-semibold px-2 text-gray-700">Attributes</legend>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="attrKey" className="block mb-1 text-xs font-medium text-gray-600">
                  Attribute Name
                </label>
                <input
                  id="attrKey"
                  type="text"
                  value={attrKey}
                  onChange={(e) => setAttrKey(e.target.value)}
                  placeholder="e.g., Color"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="attrValue" className="block mb-1 text-xs font-medium text-gray-600">
                  Attribute Value
                </label>
                <input
                  id="attrValue"
                  type="text"
                  value={attrValue}
                  onChange={(e) => setAttrValue(e.target.value)}
                  placeholder="e.g., Black"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out"
                />
              </div>
              <button
                type="button"
                onClick={addAttribute}
                className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-150 ease-in-out h-10 mt-2 md:mt-0" // Match height
              >
                <FiPlus size={18} /> Add
              </button>
            </div>
            {/* Display Added Attributes */}
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(attributes).map(([key, value]) => (
                <span
                  key={key}
                  className="flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm border border-gray-300"
                >
                  <strong>{key}:</strong> {value}
                  <button
                    type="button"
                    onClick={() => removeAttribute(key)}
                    className="ml-1 text-red-500 hover:text-red-700"
                    aria-label={`Remove attribute ${key}`}
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))}
            </div>
          </fieldset>

          {/* --- Tags Section --- */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-lg font-semibold px-2 text-gray-700">Tags</legend>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-grow">
                <label htmlFor="tagInput" className="block mb-1 text-xs font-medium text-gray-600">
                  Add Tag
                </label>
                <input
                  id="tagInput"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }} // Add tag on Enter key
                  placeholder="e.g., wireless, audio, tech"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out"
                />
              </div>
              <button
                type="button"
                onClick={addTag}
                className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-150 ease-in-out h-10 mt-2 md:mt-0" // Match height
              >
                <FiTag size={16} /> Add
              </button>
            </div>
            {/* Display Added Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-300"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-1 text-red-500 hover:text-red-700"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))}
            </div>
          </fieldset>

          {/* Show Existing Images */}
          <div>
            <h1>Existing Images</h1>
            <div>
              {oldImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border rounded-md">
                  {oldImages.map((img, index) => (
                    <div key={index} className="relative rounded-md shadow-md overflow-hidden">
                      <img
                        src={img} // Assuming `oldImages` contains direct URLs
                        alt={`Product ${index}`}
                        className="w-full h-32 object-contain"
                      />
                      {/* Optional: Add a subtle overlay or border for better visual separation */}
                      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    </div>
                  ))}
                </div>
              )}
              {oldImages.length === 0 && <p className="text-gray-500 mt-2">No existing images.</p>}
            </div>
          </div>

          {/* Images */}

          {/* --- Images Section --- */}
          <fieldset className="border border-gray-300 rounded-lg p-4 mt-6">
            <legend className="text-lg font-semibold px-2 text-gray-700 flex items-center gap-2">
              <FiUpload /> Images
            </legend>
            <div>
              <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-700">
                Upload Product Images (Multiple)
              </label>
              <input
                id="images"
                type="file"
                {...register("images", {
                  validate: (files) => files.length > 0 || "At least one image is required", // Basic validation
                })}
                className={`block w-full text-sm text-gray-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-blue-50 file:text-blue-700
                              hover:file:bg-blue-100 ${errors.images ? "border border-red-500 rounded-lg p-1" : ""} `} // Style the file input
                multiple
                accept="image/png, image/jpeg, image/webp" // Specify accepted file types
              />
              {errors.images && (
                <p className="mt-1 text-xs text-red-600">{errors.images.message}</p>
              )}
              {/* TODO: Add image preview functionality here if desired */}
            </div>
          </fieldset>

          {/* --- Submission Button --- */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting} // Disable button when submitting
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              } transition duration-150 ease-in-out`}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin -ml-1 mr-2 h-5 w-5" /> {/* Loading spinner */}
                  Submitting...
                </>
              ) : (
                "Update Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
