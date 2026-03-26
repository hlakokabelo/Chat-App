import React from "react";

interface ContactCardProps {
  name: string;
  phone: string;
  profileUrl: string;
  mediaCount: number;
  mediaPreviews: string[];
}

const ContactCard: React.FC<ContactCardProps> = ({
  name,
  phone,
  profileUrl,
  mediaCount,
  mediaPreviews,
}) => {
  return (
    <div className="max-w-sm p-4 border rounded-lg shadow-md bg-white">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img
          src={profileUrl}
          alt={name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-500">{phone}</p>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-4">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Search
        </button>
      </div>

      {/* Media Section */}
      <div className="mt-6">
        <p className="text-gray-600 mb-2">Media, links and docs ({mediaCount})</p>
        <div className="flex gap-2">
          {mediaPreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`media-${index}`}
              className="w-16 h-16 object-cover rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;