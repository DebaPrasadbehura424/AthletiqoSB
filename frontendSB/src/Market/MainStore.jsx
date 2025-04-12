import React, { useContext, useState } from "react";
import { userContextData } from "../context/UserContext";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import items from "../vedios/Item";

const MainStore = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { addProduct, setAddProduct } = useContext(userContextData);
  const cookies = new Cookies();
  const userId = cookies.get("userId");


  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category ? item.category === category : true;

    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = async (item) => {
    // method 1
    let check = false;
    for (let index = 0; index < addProduct.length; index++) {
      if (addProduct[index].name === item.name) {
        check = true;
        break;
      }
    }
    //method 2
    // const check = addProduct.some((prodcuts) => prodcuts.name == item.name);
    if (check) {
      alert("alredy aded");
      return;
    }

    await axios
      .post(`http://localhost:5000/shops/shopadd/${userId}`, item)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            text: `item added succesfuly`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setAddProduct((prevState) => [...prevState, item]);
  };

  return (
    <div className="p-10 max-w-screen-xl mx-auto">
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-64 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4 flex justify-end">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 w-64 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          <option value="protein">Protein</option>
          <option value="gym">Gym Material</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {filteredItems && filteredItems.length ? (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-gray-300 rounded-lg ">
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-full  h-60 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                <span className="block text-lg font-bold text-green-600 mb-4">
                  {item.amount}
                </span>
                <div className="flex justify-between">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Item not found </p>
        )}
      </div>
    </div>
  );
};

export default MainStore;
