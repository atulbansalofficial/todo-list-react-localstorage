import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

const GetLocalItems = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(GetLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  //add item
  
  const addItem = () => {
    if (!inputData) {
      alert("Please Enter item...");
    } else if (inputData && !toggleSubmit) {
      setItem(
        item.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, name: inputData };
          }
          return element;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem("null");
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      console.log(allInputData);

      setItem([...item, allInputData]);
      setInputData("");
    }
  };
  //delete item
  const deleteItem = (index) => {
    console.log(index);

    const updateditem = item.filter((element) => index !== element.id);

    setItem(updateditem);
  };

  //edit item

  const editItem = (id) => {
    let newEditItem = item.find((element) => {
      return element.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);

    setIsEditItem(id);
  };
  // clear all list
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

          {toggleSubmit ? (
            <i
              className="fa fa-plus add-btn"
              title="Add Item"
              style={{ marginLeft: "10px", color: "white" }}
              onClick={addItem}
            ></i>
          ) : (
            <i
              className="fa fa-edit add-btn"
              title="update Item"
              style={{ marginLeft: "10px", color: "white" }}
              onClick={addItem}
            ></i>
          )}
        </div>
        <div className="showItem">
          {item.map((element) => {
            return (
              <div
                className="eachItem"
                style={{ background: "#7F8545" }}
                key={element.id}
              >
                <h3 style={{ color: "white" }}>
                  {element.name}
                  <i
                    className="far fa-edit add-btn"
                    title="Edit Item"
                    style={{
                      marginLeft: "10px",
                      color: "green",
                      cursor: "pointer",
                    }}
                    onClick={() => editItem(element.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    title="Delete Item"
                    style={{
                      marginLeft: "10px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteItem(element.id)}
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
