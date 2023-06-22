const baseUrl = //"https://my-json-server.typicode.com/greg8871/se_project_react";
"http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};
function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const getClothingItems = async () => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: headers,
  });
  return handleServerResponse(res);
};

const addItem = async (name, imageUrl, weather) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
  return handleServerResponse(res);
};

const deleteItem = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: headers,
  });
  return handleServerResponse(res);
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
export { getClothingItems, addItem, deleteItem, removeCardLike, addCardLike };
