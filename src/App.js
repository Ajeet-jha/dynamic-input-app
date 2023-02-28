import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

export default function App() {
  const [boxes, setBoxes] = useState([
    {
      id: uuidv4(),
      value: ""
    }
  ]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    const findIndex = boxes.findIndex(({ id }) => id === index);
    let updatedBoxed = [...boxes];
    updatedBoxed[findIndex] = {
      ...updatedBoxed[findIndex],
      value: val
    };
    setBoxes(updatedBoxed);
  };

  const handleAddBox = (index) => {
    const findIndex = boxes.findIndex(({ id }) => id === index);
    let updatedBoxed = [...boxes];
    const isEmptyInput = updatedBoxed.some(({ value }) => value.trim() === "");
    if (isEmptyInput) {
      toast.error(
        `🦄 ${index} is still Empty Either delete this Input or fill it`
      );
      return false;
    }
    updatedBoxed.splice(findIndex + 1, 0, {
      id: uuidv4(),
      value: ""
    });
    setBoxes(updatedBoxed);
  };

  const handleRemoveBox = (index) => {
    let updatedBoxed = [...boxes];
    updatedBoxed = updatedBoxed.filter(({ id }) => id !== index);
    setBoxes(updatedBoxed);
  };

  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {boxes.map(({ id, value }) => (
        <div key={id}>
          <input onChange={(e) => handleChange(e, id)} />
          <button onClick={() => handleAddBox(id)}>+</button>
          {boxes.length > 1 && (
            <button onClick={() => handleRemoveBox(id)}>-</button>
          )}
        </div>
      ))}
    </div>
  );
}
