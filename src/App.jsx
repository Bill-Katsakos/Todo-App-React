import { useState, useRef, useEffect } from 'react';
import SubmitForm from './components/SubmitForm';
import TaskList from './components/TaskList';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-custom.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [completed, setCompleted] = useState(() => {
    const savedCompleted = localStorage.getItem('completed');
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });

  const [newTodo, setNewTodo] = useState(""); 
  const [editableIndex, setEditableIndex] = useState(null); 
  const refs = useRef([]); 

  //todos and completed in local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('completed', JSON.stringify(completed));
  }, [todos, completed]);

  // Handle when a todo loses focus after editing
  function handleBlur(e, index) {
    const updatedTodos = [...todos];
    updatedTodos[index] = e.target.textContent;
    setTodos(updatedTodos);
    setEditableIndex(null);
  }

  // Start editing a todo item
  function handleEdit(index) {
    setEditableIndex(index);
    setTimeout(() => {
      refs.current[index].focus();
    }, 0);
  }

  // Handle pressing Enter while editing a todo
  function handleEditKeyDown(e, index) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleBlur(e, index);
    }
  }

  // Handle pressing Enter while typing a new todo
  function handleInputKeyDown(e) {
    if (e.key === "Enter") {
      addTodo();
    }
  }

  // Update the input value for a new todo
  function updateInput(input) {
    setNewTodo(input);
  }

  // Add a new todo to the list
  function addTodo() {
    if (newTodo.trim() !== "") {
      setTodos((t) => [...t, newTodo]);
      setCompleted((c) => [...c, false]);
      setNewTodo("");
    } else {
      setNewTodo("");
    }
  }

  // Toggle the completed status of a todo
  function handleCheckBox(index) {
    setCompleted((c) => {
      const updated = [...c];
      updated[index] = !updated[index];
      return updated;
    });
  }

  // Delete a specific todo
  function deleteTodo(index) {
    const userDeletion = window.confirm('Are you sure you want to delete this task?');
    if (userDeletion) {
      const updatedCompleted = completed.filter((_, i) => i !== index);
      const updatedTodo = todos.filter((_, i) => i !== index);
      setTodos(updatedTodo);
      setCompleted(updatedCompleted);
    }
  }

  // Delete all completed todos
  function handleDeleteCompleted() {
    const userDeletion = window.confirm('Are you sure you want to delete all completed tasks?');
    if (userDeletion) {
      let delTodos = [...todos];
      let updatedCompleted = [...completed];

      for (let i = todos.length - 1; i >= 0; i--) {
        if (completed[i]) {
          updatedCompleted.splice(i, 1);
          delTodos.splice(i, 1);
        }
      }

      setCompleted(updatedCompleted);
      setTodos(delTodos);
    }
  }

  // Delete all todos, skipping the ones already completed
  function handleDeleteAll() {
    const userDeletion = window.confirm('Are you sure you want to delete all the tasks? 🤔');
    if (userDeletion) {
      const userDeletionAgain = window.confirm('One more chance… are you absoooolutely sure you want a fresh start??? 😎');
      if (userDeletionAgain) {
        let updatedCompleted = [...completed];
        
        // The tasks that are not completed are filtered
        const incompleteTasks = completed
          .map((item, index) => !item ? index : null)
          .filter(index => index !== null);
        
        incompleteTasks.forEach((index, i) => {
          setTimeout(() => {
            updatedCompleted[index] = true;
            setCompleted([...updatedCompleted]);

            // If it is the last uncompleted task
            if (i === incompleteTasks.length - 1) {
              setTimeout(() => {
                setCompleted([]);
                setTodos([]);
              }, 130);
            }
          }, i * 130); // Τhe new index i for the time interval
        });
      }
    }
  }

  // Move a todo up in the list
  function moveTodoUp(index) {
    if (index > 0) {
      const updatedTodo = [...todos];
      const updated = [...completed];

      [updatedTodo[index], updatedTodo[index - 1]] = [updatedTodo[index - 1], updatedTodo[index]];
      setTodos(updatedTodo);

      [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
      setCompleted(updated);
    }
  }

  // Move a todo down in the list
  function moveTodoDown(index) {
    if (index < todos.length - 1) {
      const updatedTodo = [...todos];
      const updated = [...completed];

      [updatedTodo[index], updatedTodo[index + 1]] = [updatedTodo[index + 1], updatedTodo[index]];
      setTodos(updatedTodo);

      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      setCompleted(updated);
    }
  }

  // Sort todos by completed status
  function handleSorting() {
    const completedTodos = todos.filter((_, i) => completed[i]);
    const uncompletedTodos = todos.filter((_, i) => !completed[i]);

    const completedTasks = completed.filter((task) => task);
    const uncompletedTasks = completed.filter((task) => !task);

    const sortedTodos = completedTodos.concat(uncompletedTodos);
    const sortedCompleted = completedTasks.concat(uncompletedTasks);

    setTodos(sortedTodos);
    setCompleted(sortedCompleted);
  }

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-lg-9 col-xl-10">
          <div className="todo-list card rounded-4">
            <div className="card-body p-4 text-center listBody">
              <h1 className="text-center my-3 pb-3">Todo App</h1>
              <SubmitForm
                newTodo={newTodo}
                updateInput={updateInput}
                addTodo={addTodo}
                handleInputKeyDown={handleInputKeyDown}
                handleDeleteCompleted={handleDeleteCompleted}
                handleDeleteAll={handleDeleteAll}
                handleSorting={handleSorting}
              />
              <TaskList
                todos={todos}
                completed={completed}
                handleCheckBox={handleCheckBox}
                deleteTodo={deleteTodo}
                moveTodoUp={moveTodoUp}
                moveTodoDown={moveTodoDown}
                editableIndex={editableIndex}
                handleBlur={handleBlur}
                handleEdit={handleEdit}
                refs={refs}
                handleEditKeyDown={handleEditKeyDown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
// 🦖