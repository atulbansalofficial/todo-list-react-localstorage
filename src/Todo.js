import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

const GetLocalItems = () => {
  let list = localStorage.getItem("list");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(GetLocalItems());

  const addItem = () => {
    if (!inputData) {
      alert("Please Enter item...");
    } else {
      setItem([...item, inputData]);
      setInputData("");
    }
  };
  const deleteItem = (id) => {
    console.log(id);
    const updateditem = item.filter((__, index) => index != id);
    console.log(updateditem);
    setItem(updateditem);
  };
  const removeAll = () => {
    setItem([]);
  };

  //add data to localstorage

  useEffect(() => {
 

    localStorage.setItem("list", JSON.stringify(item));
  }, [item]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={logo} alt="todologo" style={{ width: "144px" }} />
          </figure>
        </div>
        <div
          className="addItems"
          style={{ backgroundColor: "#5C5858", padding: "10px" }}
        >
          <input
            type="text"
            placeholder="✍ Add items..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <i
            className="fa fa-plus add-btn"
            title="Add Item"
            style={{ marginLeft: "10px", color: "white" }}
            onClick={addItem}
          ></i>
        </div>
        <div className="showItem">
          {item.map((element, index) => {
            return (
              <div className="eachItem" key={index}>
                <h3>
                  {element}
                  <i
                    className="far fa-trash-alt add-btn"
                    title="Delete Item"
                    style={{ marginLeft: "10px", color: "white" }}
                    onClick={() => deleteItem(index)}
                  ></i>
                </h3>
              </div>
            );
          })}
        </div>
        <div className="showItem">
          <button onClick={removeAll}>clear All</button>
        </div>
      </div>
    </>
  );
}

export default Todo;
