import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data);
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
    if (data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/product/add-Product`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response", response.data);

      if (response.data) {
        toast.success(response.data.message || "Product added successfully");
      }

      // Reset form fields and state
      reset();
      setTags([]);
      setAttributes({});
      setDimensions({});
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div className="w-[95%] md:max-w-lg mx-auto bg-blue-200 p-4">
      <h2 className="text-xl font-bold bg-blue-200 mb-4">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-blue-200 ">
        {/* Name  */}
        <div>
          <label className="block mb-2">Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="border-gray-400 rounded-md border-2 p-2 w-full"
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
        </div>

        {/* Description  */}
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className="border-gray-400 rounded-md border-2 p-2 w-full"
          />
          {errors.description && <p className="text-red-500">Description is required</p>}
        </div>

        {/* Category  */}
        <div>
          <label className="block mb-2">Category</label>
          <select
            {...register("category", { required: true })}
            className="border-gray-400  rounded-md border-2 p-2 w-full"
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
          </select>
          {errors.category && <p className="text-red-500">Category is required</p>}
        </div>

        {/* Sub-Category  */}
        <div>
          <label className="block mb-2">Sub-Category</label>
          <select
            {...register("subCategory", { required: true })}
            className="border-gray-400  rounded-md border-2 p-2 w-full"
          >
            <option value="">Select Subcategory</option>
            <option value="mobiles">Mobiles</option>
            <option value="clothing">Clothing</option>
            <option value="watch">Watches</option>
          </select>
          {errors.subCategory && <p className="text-red-500">Subcategory is required</p>}
        </div>

        {/* Brand  */}
        <div>
          <label className="block mb-2">Brand</label>
          <input
            {...register("brand", { required: true })}
            placeholder="Brand"
            className="border-gray-400 rounded-md border-2 p-2 w-full"
          />
          {errors.brand && <p className="text-red-500">Brand is required</p>}
        </div>

        {/* Price  */}
        <div>
          <label className="block mb-2">Price</label>
          <input
            type="number"
            {...register("price", { required: true, valueAsNumber: true })}
            placeholder="Price"
            className="border-gray-400 rounded-md border-2 p-2 w-full"
          />
          {errors.price && <p className="text-red-500">Price is required</p>}
        </div>

        {/* Discount  */}
        <div>
          <label className="block mb-2">Discount</label>
          <input
            type="number"
            {...register("discount", { required: true, valueAsNumber: true })}
            placeholder="Discount (%)"
            className="border-gray-400 rounded-md border-2 p-2 w-full"
          />
          {errors.discount && <p className="text-red-500">Discount is required</p>}
        </div>

        {/* Stock  */}
        <div>
          <label className="block mb-2">Stock</label>
          <input
            type="number"
            {...register("stock", { required: true, valueAsNumber: true })}
            placeholder="Stock"
            className="border-gray-400 rounded-md border-2 p-2 w-full"
          />
          {errors.stock && <p className="text-red-500">Stock is required</p>}
        </div>

        {/* Weight  */}
        <div>
          <label className="block mb-2">Weight</label>
          <input
            type="number"
            {...register("weight", { required: true, valueAsNumber: true })}
            placeholder="Weight (gm)"
            className="border-gray-400 rounded-md border-2 p-2 w-full"
          />
          {errors.weight && <p className="text-red-500">Weight is required</p>}
        </div>

        {/* Dimensions  */}
        <div>
          <label className="block mb-2">Dimensions</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={dimensions.width || ""}
              onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
              placeholder="Width"
              className="border-gray-400 rounded-md border-2 p-2 w-1/3"
            />
            <input
              type="number"
              value={dimensions.height || ""}
              onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
              placeholder="Height"
              className="border-gray-400 rounded-md border-2 p-2 w-1/3"
            />
            <input
              type="number"
              value={dimensions.depth || ""}
              onChange={(e) => setDimensions({ ...dimensions, depth: Number(e.target.value) })}
              placeholder="Depth"
              className="border-gray-400 rounded-md border-2 p-2 w-1/3"
            />
          </div>
        </div>

        {/* Attributes Section */}
        <div>
          <label className="block mb-2">Attributes</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={attrKey}
              onChange={(e) => setAttrKey(e.target.value)}
              placeholder="Key"
              className="border-gray-400 rounded-md border-2 p-2 w-1/2"
            />
            <input
              type="text"
              value={attrValue}
              onChange={(e) => setAttrValue(e.target.value)}
              placeholder="Value"
              className="border-gray-400 rounded-md border-2 p-2 w-1/2"
            />
            <button
              type="button"
              onClick={addAttribute}
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {Object.entries(attributes).map(([key, value], index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-200 p-2 rounded">
                <span>
                  {key}: {value}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const updatedAttributes = { ...attributes };
                    delete updatedAttributes[key];
                    setAttributes(updatedAttributes);
                  }}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Section */}
        <div>
          <label className="block mb-2">Tags</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter Tag"
              className="border-gray-400 rounded-md border-2 p-2 w-2/3"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded flex items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-2 text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Images  */}
        <div>
          <label className="block mb-2">Images</label>
          <input
            type="file"
            {...register("images", { required: true })}
            className="border-gray-400 rounded-md border-2 p-2 w-full"
            multiple
          />
          {errors.images && <p className="text-red-500">Images are required</p>}
        </div>

        <button
          type="submit"
          className={`${isSubmitting ? "bg-gray-400" : "bg-blue-500"} text-white px-4 py-2 rounded`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
