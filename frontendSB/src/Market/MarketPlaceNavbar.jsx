import React from "react";

// You can replace these images with actual URLs or import image assets like you did before.
import medCategory1 from "../images/med.jpg";
// import medCategory2 from "../images/medCategory2.jpg";
// import medCategory3 from "../images/medCategory3.jpg";
// import medCategory4 from "../images/medCategory4.jpg";

function MarketPlaceNavbar(props) {
  // Array of categories with their images and names
  const categories = [
    {
      id: 1,
      name: "Medicines",
      imageUrl: medCategory1,
    },
    {
      id: 2,
      name: "Vitamins",
      imageUrl: medCategory1,
    },
    {
      id: 3,
      name: "Cold & Flu",
      imageUrl: medCategory1,
    },
    {
      id: 4,
      name: "Skin Care",
      imageUrl: medCategory1,
    },
  ];

  return (
    <div className="marketplace-navbar-container py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-6">
        Medicine Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card relative w-full h-40 sm:h-52 lg:h-64 bg-cover bg-center rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
            style={{ backgroundImage: `url(${category.imageUrl})` }}
          >
            <div className="category-info absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-center">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketPlaceNavbar;
