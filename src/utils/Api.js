<<<<<<< HEAD
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.gcunningham.crabdance.com"
    : "http://localhost:3001";
=======
const baseUrl = 
"http://localhost:3001";
"https://api.gcunningham.crabdance.com"
>>>>>>> a6c7464e8f8a1a16083f7c7866522bda5cde0b15

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}
const allowedOrigins = [
  "https://gcunningham.crabdance.com",
  "http://gcunningham.crabdance.com",
  "https://www.gcunningham.crabdance.com",
  "http://www.gcunningham.crabdance.com",
<<<<<<< HEAD
];
=======
  ]:
>>>>>>> a6c7464e8f8a1a16083f7c7866522bda5cde0b15
const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const getClothingItems = async () => {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": allowedOrigins,
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const addItem = async (name, imageUrl, weather) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": allowedOrigins,
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

const deleteItem = async (_id) => {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": allowedOrigins,
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const addCardLike = (_id) => {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const removeCardLike = (_id) => {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export {
  getClothingItems,
  addItem,
  deleteItem,
  removeCardLike,
  addCardLike,
  handleServerResponse,
};
