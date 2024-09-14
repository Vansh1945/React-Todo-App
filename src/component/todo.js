import React, { useState, useEffect } from 'react';
import img1 from './img/img2.png';
import "../index.css";

const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItems()); // Initialize from local storage
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Please enter an item");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData('');
      setIsEditItem(null);
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: inputData };
      setItems([...items, allInputData]);
      setInputData('');
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((elem) => elem.id !== id);  // Use id to filter
    setItems(updatedItems);
  };

  const editItem = (id) => {
    const newEditItem = items.find((elem) => elem.id === id);
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items));  // Save to local storage on items update
  }, [items]);

  return (
    <div>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={img1} alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>
            ) : (
              <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((elem) => (
              <div className="eachItem" key={elem.id}>
                <h3>{elem.name}</h3>
                <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
              </div>
            ))}
          </div>

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
