const saveData = (step, values) => {
  localStorage.setItem("step", `${step}`);
  localStorage.setItem("values", JSON.stringify(values));
};

const getData = ([
  nameInput,
  lastNameInput,
  cardNumberInput,
  monthInput,
  yearInput,
  cvv2Input,
]) => {
  const step = localStorage.getItem("step") || 0;
  const values = JSON.parse(localStorage.getItem("values")) || {
    name: "",
    lastName: "",
    cardNumber: "",
    month: "",
    year: "",
    cvv2: "",
  };

  nameInput.value = values.name;
  lastNameInput.value = values.lastName;
  cardNumberInput.value = `${values.cardNumber}`;
  monthInput.value = values.month;
  yearInput.value = values.year;
  cvv2Input.value = values.cvv2;
  return { step, values };
};

export { saveData, getData };
