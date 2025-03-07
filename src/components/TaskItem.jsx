function TaskItem({
  todos,
  completed,
  handleCheckBox,
  deleteTodo,
  moveTodoUp,
  moveTodoDown,
  editableIndex,
  handleBlur,
  handleEdit,
  refs,
  handleEditKeyDown
}) {
  
  return (
    <>
      {todos.map((todo, index) => (
        <tr key={index}>
          {/* Numerical order */}
          <th scope="row" className="todo-tasks col-1 align-middle borderTaskRight" >{index + 1}</th>
          
          {/* Task */}
          <td className="todo-tasks text-start col-6 align-middle borderTaskRight" >
            <input
              type="checkbox"
              className="todo-checkbox mx-2 align-middle"
              checked={completed[index]}
              aria-label={completed[index] ? "checkbox checked, task completed" : "checkbox, press to complete task"}
              onChange={() => handleCheckBox(index)}
            />
            <span
              ref={(el) => (refs.current[index] = el)}
              className={completed[index] ? "text strikeThrough py-1" : "text py-1"}
              contentEditable={editableIndex === index}
              suppressContentEditableWarning={true}
              aria-label={editableIndex === index ? "Edit task" : "Task"}
              onBlur={(e) => handleBlur(e, index)}
              onKeyDown={(e) => handleEditKeyDown(e, index)}
            >
              {todo}
            </span>
          </td>
          
          {/* Action buttons */}
          <td className="todo-tasks col-4 col-sm-3 py-1 align-middle">

            <button
              type="button"
              className="button-task-1 btn btn-success"
              onClick={() => handleEdit(index)}
              aria-label="Edit task"
            >
              <img src="/interface.png" alt="Delete" width="20px" />
            </button>
            <button
              type="button"
              className="button-task-2 btn btn-secondary ms-1"
              onClick={() => moveTodoUp(index)}
              aria-label="Move task up"
            >
              <img src="/arrow-up.png" alt="Move Up" width="20px" />
            </button>
            <button
              type="button"
              className="button-task-2 btn btn-secondary ms-1"
              onClick={() => moveTodoDown(index)}
              aria-label="Move task down"
            >
              <img src="/arrow-down.png" alt="Move Down" width="20px" />
            </button>
            <button
              type="button"
              className="button-task-3 btn btn-danger  ms-1"
              onClick={() => deleteTodo(index)}
              aria-label="Delete task"
            >
              <img src="/pencil-eraser.png" alt="Edit" width="20px" />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default TaskItem;
// 🦖