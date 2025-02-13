export default function ShopForm({ shopData, handleInputChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Shop ID"
        name="shopId"
        placeholder="S101"
        value={shopData.shopId}
        onChange={handleInputChange}
      />
      <InputField
        label="Shop Name"
        name="shopName"
        placeholder="Trendy Outfits"
        value={shopData.shopName}
        onChange={handleInputChange}
      />
      <InputField
        label="Shop Number"
        name="shopNumber"
        placeholder="101"
        type="number"
        value={shopData.shopNumber}
        onChange={handleInputChange}
      />
      <InputField
        label="Floor"
        name="floor"
        placeholder="1"
        type="number"
        value={shopData.floor}
        onChange={handleInputChange}
      />
      <InputField
        label="Category"
        name="category"
        placeholder="Clothing"
        value={shopData.category}
        onChange={handleInputChange}
      />
      <InputField
        label="Owner Name"
        name="ownerDetails.ownerName"
        placeholder="Alice Johnson"
        value={shopData.ownerDetails.ownerName}
        onChange={handleInputChange}
      />
      <InputField
        label="Occupation"
        name="ownerDetails.occupation"
        placeholder="Business Owner"
        value={shopData.ownerDetails.occupation}
        onChange={handleInputChange}
      />
      <InputField
        label="Mobile Number"
        name="contactDetails.mobileNumber"
        placeholder="1234567890"
        type="tel"
        value={shopData.contactDetails.mobileNumber}
        onChange={handleInputChange}
      />
      <InputField
        label="Email"
        name="contactDetails.email"
        placeholder="alice@trendyoutfits.com"
        type="email"
        value={shopData.contactDetails.email}
        onChange={handleInputChange}
      />
      <InputField
        label="Instagram ID"
        name="contactDetails.instagramId"
        placeholder="@trendyoutfits"
        value={shopData.contactDetails.instagramId}
        onChange={handleInputChange}
      />
    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-zinc-200">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="mt-1 block pl-2 w-full h-9 rounded-md text-zinc-200 bg-transparent border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}
