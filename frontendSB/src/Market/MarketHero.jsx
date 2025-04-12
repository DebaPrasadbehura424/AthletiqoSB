import React, { useState, useEffect } from "react";
import med from "../images/med.jpg";
import save from "../images/save.jpg";
import order from "../images/order.jpg";

function MarketHero() {
  const cards = [
    {
      id: 1,
      title: "Types of Medicines",
      description:
        "Explore a wide range of medicines, from pain relief to vitamins. We have everything you need to stay healthy.",
      imageUrl: med,
      bgColor: "bg-blue-800",
    },
    {
      id: 2,
      title: "Affordable Prices",
      description:
        "Get high-quality medicines at affordable prices. Our prices ensure that you don't compromise on your health.",
      imageUrl: save,
      bgColor: "bg-green-800",
    },
    {
      id: 3,
      title: "Fast Delivery",
      description:
        "Order now and get your medicines delivered quickly and safely right to your doorstep.",
      imageUrl: order,
      bgColor: "bg-teal-800",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoSwipe = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000);

    return () => clearInterval(autoSwipe);
  }, [cards.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="market-hero-container py-10 px-5">
      <div className="desktop-cards hidden lg:flex justify-between space-x-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card w-1/3 h-80 bg-cover bg-center rounded-lg shadow-lg ${card.bgColor}`}
            style={{ backgroundImage: `url(${card.imageUrl})` }}
          >
            <div className="card-content p-6 bg-transparent rounded-lg text-black font-bold text-center">
              <h3 className="text-2xl font-bold">{card.title}</h3>
              <p className="mt-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mobile-scroller lg:hidden relative">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card w-full h-[35vh] bg-cover bg-center rounded-lg shadow-lg ${
              index === currentIndex ? "block" : "hidden"
            }`}
            style={{ backgroundImage: `url(${card.imageUrl})` }}
          >
            <div className="card-content p-5 bg-transparent rounded-lg text-black font-bold text-center">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-2">{card.description}</p>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2   p-2 rounded-lg "
        >
          ◀️
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2  p-2 rounded-lg "
        >
          ▶️
        </button>
      </div>
    </div>
  );
}

export default MarketHero;
