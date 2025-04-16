const BASE_URL = "http://localhost:3001/contacts";

const getContacts = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Error - Get");
  }
  const mainData = await res.json();
  return mainData;
};

const addContact = async (data) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Error - Get");
  }
  const mainData = await res.json();
  return mainData;
};

const deleteContact = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
		console.log(res);
    throw new Error("Error - Get");
  }
  const mainData = await res.json();
  return mainData;
};

const changeContact = async (data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!res.ok) {
    throw new Error("Error - Get");
  }
  const mainData = await res.json();
  return mainData;
};

export { getContacts, addContact, deleteContact, changeContact };
