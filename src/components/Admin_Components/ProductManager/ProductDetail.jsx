import { doc, deleteDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { db } from "../../../config/firebase"
import leftArrow from "../../../assets/icons/left_arrow.svg"

const ProductDetail = () => {
  const { productId } = useParams()
  const products = useLocation()
  const navigate = useNavigate()
  const [updateFormOpen, setUpdateFormOpen] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState("")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [deleteError, setDeleteError] = useState("")
  const [isDeleted, setIsDeleted] = useState(false)
  const [productDetails, setProductDetails] = useState(products.state.products.find((product) => product.productId === productId))
  const pId = products.state.products.find((product) => product.productId === productId)?.id

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    features: "",
  })

  useEffect(() => {
    if (productDetails) {
      setFormData({
        name: productDetails.name,
        description: productDetails.description,
        price: productDetails.price.toString(),
        features: productDetails.features,
      })
    }
  }, [productDetails])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateSuccess(false)
    setUpdateError("")

    try {
      const docRef = doc(db, "products", pId)
      await updateDoc(docRef, {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        features: formData.features,
      })
      // Update productDetails with new values
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        ...formData,
        price: Number.parseFloat(formData.price),
      }))
      setUpdateSuccess(true)
      setUpdateFormOpen(false)
    } catch (error) {
      console.error("Error updating document: ", error)
      setUpdateError("Failed to update product. Please try again.")
    }
  }

  const handleDelete = async () => {
    setDeleteSuccess(false)
    setDeleteError("")

    try {
      const docRef = doc(db, "products", pId)
      await deleteDoc(docRef)
      setDeleteSuccess(true)
      setIsDeleted(true)
      // Redirect to product list page after a short delay
      setTimeout(() => {
        navigate(-1) // Adjust this path as needed
      }, 100)
    } catch (error) {
      console.error("Error deleting document: ", error)
      setDeleteError("Failed to delete product. Please try again.")
    } finally {
      setDeleteConfirmOpen(false)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <button
        className="flex items-center gap-2 z-20 sticky top-5 mt-4 text-sm text-white font-medium bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md"
        onClick={() => navigate(-1)}
      >
        <img className="-ml-2 w-5" src={leftArrow} alt="left-arrow" />
        Products
      </button>
      <h1 className="text-3xl font-bold my-3">Product Details</h1>
      <div className="py-2 mt-2">
        {updateSuccess && <div className="mt-4 bg-green-500 text-white p-2 rounded">Product updated successfully!</div>}
        {updateError && <div className="mt-4 bg-red-500 text-white p-2 rounded">{updateError}</div>}
        {deleteSuccess && <div className="mt-4 bg-green-500 text-white p-2 rounded">Product deleted successfully! Redirecting...</div>}
        {deleteError && <div className="mt-4 bg-red-500 text-white p-2 rounded">{deleteError}</div>}
        {!isDeleted && (
          <div className="bg-gray-800 shadow rounded-2xl p-4">
            <img
              src={productDetails.image || "/placeholder.svg"}
              alt={productDetails.name}
              className="w-full md:h-96 object-cover mb-4 rounded-2xl"
            />
            <h1 className="text-2xl md:text-4xl font-bold mb-4 capitalize">{productDetails.name}</h1>
            <p className="md:text-xl mb-2">
              <strong>Description:</strong> {productDetails.description}
            </p>
            <p className="md:text-xl mb-2">
              <strong>Price:</strong> ${productDetails.price}
            </p>
            <p className="md:text-xl mb-2">
              <strong>Features:</strong> {productDetails.features}
            </p>
            {/* Edit and Delete Buttons */}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => setUpdateFormOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 font-medium rounded hover:bg-blue-600 active:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteConfirmOpen(true)}
                className="bg-red-500 text-white px-4 py-2 font-medium rounded hover:bg-red-600 active:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        )}
        {/* Edit Product Form */}
        {updateFormOpen && (
          <div className="container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto md:w-[500px]">
            <form onSubmit={handleSubmit} className="mt-4 bg-gray-700 w-full p-4 rounded">
              <h2 className="text-2xl font-bold mb-2">Edit Product</h2>
              <div className="mb-4">
                <label className="block text-white mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-zinc-900 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-1">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full text-zinc-900 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-1">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full text-zinc-900 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-1">Features:</label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  className="w-full text-zinc-900 p-2 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setUpdateFormOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Delete Confirmation Dialog */}
        {deleteConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-4">Are you sure you want to delete this product?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-zinc-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {/* {updateSuccess && <div className="mt-4 bg-green-500 text-white p-2 rounded">Product updated successfully!</div>}
        {updateError && <div className="mt-4 bg-red-500 text-white p-2 rounded">{updateError}</div>}
        {deleteSuccess && <div className="mt-4 bg-green-500 text-white p-2 rounded">Product deleted successfully! Redirecting...</div>}
        {deleteError && <div className="mt-4 bg-red-500 text-white p-2 rounded">{deleteError}</div>} */}
      </div>
    </div>

  )
}

export default ProductDetail

