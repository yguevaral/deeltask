
import { useState } from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {

  const [itemSelected, setItemSelected] = useState<string | null>(null);

  const handleOnSelectItemAutocomplete = (item: string): void => {
    setItemSelected(item);
  };

  return (
    <>
      <h1>Item Selected: {itemSelected}</h1>
      <AutoComplete
        onSelect={handleOnSelectItemAutocomplete}
      />
    </>
  );
}

export default App;
