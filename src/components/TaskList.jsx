import TaskItem from "./TaskItem";

function TaskList({
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
    <table className="text-center table mb-4">
      <thead>
        <tr>
          <th scope="col" className="todo-tasks borderTaskRight">#</th>
          <th scope="col" className="todo-tasks borderTaskRight">Tasks</th>
          <th scope="col" className="todo-tasks">Actions</th>
        </tr>
      </thead>
      <tbody>
        <TaskItem
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
      </tbody>
    </table>
  );
}

export default TaskList;
// 🦖