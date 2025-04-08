import { useState } from "react";
import Input from "./Input.jsx";
import cities from "./cities.json";

function App() {
  const [hint, setHint] = useState("");
  const handleChange = (e) => {
    const userEnter = e.target.value;
    const findItem = cities.find((item) => item.startsWith(userEnter));
    if (findItem && userEnter != "") {
      setHint(findItem);
    } else {
      setHint("");
    }
  };

  return (
    <>
      <Input handleChange={handleChange} hint={hint} />
    </>
  );
}

export default App;
