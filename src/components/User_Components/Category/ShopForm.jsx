export default function ShopForm({ shopData, handleInputChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Shop ID"
        name="shopId"
        value={shopData.shopId}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Shop Name"
        name="shopName"
        value={shopData.shopName}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Shop Number"
        name="shopNumber"
        type="number"
        value={shopData.shopNumber}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Floor"
        name="floor"
        type="number"
        value={shopData.floor}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Category"
        name="category"
        value={shopData.category}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Owner Name"
        name="ownerDetails.ownerName"
        value={shopData.ownerDetails.ownerName}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Occupation"
        name="ownerDetails.occupation"
        value={shopData.ownerDetails.occupation}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Mobile Number"
        name="contactDetails.mobileNumber"
        type="tel"
        value={shopData.contactDetails.mobileNumber}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Email"
        name="contactDetails.email"
        type="email"
        value={shopData.contactDetails.email}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Instagram ID"
        name="contactDetails.instagramId"
        value={shopData.contactDetails.instagramId}
        onChange={handleInputChange}
      />
    </div>
  );
}

function InputField({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}
