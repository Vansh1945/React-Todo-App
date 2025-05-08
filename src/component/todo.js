import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import '../index.css';

const Todo = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [editId, setEditId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!inputData.trim()) return;
    
    if (editId) {
      setItems(items.map(item => 
        item.id === editId ? { ...item, text: inputData } : item
      ));
      setEditId(null);
    } else {
      setItems([...items, {
        id: Date.now().toString(),
        text: inputData,
        completed: false
      }]);
    }
    setInputData('');
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const toggleComplete = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const editItem = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    setInputData(itemToEdit.text);
    setEditId(id);
  };

  const clearAll = () => {
    setItems([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addItem();
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="todo-container">
        <div className="header">
          <h1>Todo App</h1>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="theme-toggle"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        
        <div className="input-container">
          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
          />
          <button onClick={addItem} className="add-btn">
            {editId ? <FiCheck size={20} /> : <FiPlus size={20} />}
          </button>
        </div>

        <div className="todo-list">
          <AnimatePresence>
            {items.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state"
              >
                <p>No tasks yet. Add one above!</p>
              </motion.div>
            )}

            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className={`todo-item ${item.completed ? 'completed' : ''}`}
              >
                <div 
                  className="todo-text"
                  onClick={() => toggleComplete(item.id)}
                >
                  {item.text}
                </div>
                <div className="actions">
                  <button onClick={() => editItem(item.id)} className="edit-btn">
                    <FiEdit2 size={16} />
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="delete-btn">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <div className="footer">
            <p>{items.filter(item => !item.completed).length} tasks remaining</p>
            <button onClick={clearAll} className="clear-btn">
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;