import React, { useContext } from "react";
import { userContextData } from "../context/UserContext";
import MarketNavar from "./MarketNavber";
import axios from "axios";
import Cookies from "universal-cookie";

function ShowAdd() {
  const { addProduct, setAddProduct } = useContext(userContextData);
  const cookies = new Cookies();
  const userId = cookies.get("userId");

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/shops/shopdel/${userId}/${id}`);

    setAddProduct((prevState) => prevState.filter((item) => item.id !== id));
  };

  const buyItem = (item) => {
    alert(`You bought: ${item.name}`);
  };

  return (
    <>
      <MarketNavar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {addProduct && addProduct.length > 0 ? (
          addProduct.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-2xl border-2 border-gray-300 rounded-lg overflow-hidden "
            >
              <img src={item.imgUrl} alt={item.name} className=" w-full" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Category: {item.category}
                </p>
                <p className="text-xl font-semibold text-gray-800 mt-2">
                  Price: {item.amount}
                </p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => buyItem(item)}
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No item found
          </p>
        )}
      </div>
    </>
  );
}

export default ShowAdd;
