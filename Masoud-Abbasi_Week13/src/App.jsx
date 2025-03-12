import { useState,useEffect } from "react";
import Header from "./Header.jsx";
import TabMenu from "./TabMenu.jsx";
import allContent from "./content.js";
import "./App.css"

function App() {
  const [tabNumber, setTabNumber] = useState("0");
  useEffect(() => {
    const storedValue = localStorage.getItem("TabNumber") || "0";
    setTabNumber(storedValue);
  });

  return (
    <>
      <Header />
      <TabMenu setTabNumber={setTabNumber} />
      <main>
        <h2>{allContent[tabNumber].title}</h2>
        <p>{allContent[tabNumber].content}</p>
      </main>
    </>
  );
}

export default App;
