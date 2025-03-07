import React, { useEffect, useState } from 'react';
import { Popup } from 'semantic-ui-react';
import addButtIcon from '../../public/arrow-add-1.png'
import splitButtIcon from '../../public/split.png'
import checkButtIcon from '../../public/check.png'
import removeButtIcon from '../../public/remove.png'

function SubmitForm({
  newTodo,
  updateInput,
  addTodo,
  handleInputKeyDown,
  handleDeleteCompleted,
  handleDeleteAll,
  handleSorting
}) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect if the user is on a touch device
  useEffect(() => {
    console.log("useEffect from submit form");
    
    const mediaQuery = window.matchMedia(
      '(max-width: 992px) and (hover: none) and (pointer: coarse)'
    );

    const handleMediaQueryChange = (e) => setIsTouchDevice(e.matches);

    setIsTouchDevice(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  // Handle input change for the task input field
  function handleInputChange(e) {
    updateInput(e.target.value);
  }

  return (
    <>
      <div className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
        <div className="col-12 col-lg-7">
          <div data-mdb-input-init className="form-Tasks">
            <input
              type="text"
              id="input"
              className="form-control"
              placeholder="Enter a task here"
              value={newTodo}
              onChange={handleInputChange}
              onKeyDown={(e) => handleInputKeyDown(e)}
            />
          </div>
        </div>

        {/* Add Task Button */}
        <div className="col-3">
          {isTouchDevice ? (
            <button
              type="button"
              className="button-input-1 add-button btn btn-success"
              aria-label="add task"
              onClick={addTodo}
            >
              <img
                src={addButtIcon}
                alt="Add task"
                width="20px"
              />
            </button>
          ) : (
            <Popup
              trigger={
                <button
                  type="button"
                  className="button-input-1 add-button btn btn-success"
                  aria-label="add task"
                  onClick={addTodo}
                >
                  <img
                    src={addButtIcon}
                    alt="Add task"
                    width="20px"
                  />
                </button>
              }
              content="Click to add your new task"
              on="hover"
              position="top center"
            />
          )}
        </div>

        {/* Sort Completed Tasks Button */}
        <div className="col-3">
          {isTouchDevice ? (
            <button
              type="button"
              className="button-input-2 sort-completed-button btn btn-secondary"
              aria-label="Move completed tasks to the top"
              onClick={handleSorting}
            >
              <img src={splitButtIcon} alt="Sort tasks" width="20px" />
            </button>
          ) : (
            <Popup
              trigger={
                <button
                  type="button"
                  className="button-input-2 sort-completed-button btn btn-secondary"
                  aria-label="Move completed tasks to the top"
                  onClick={handleSorting}
                >
                  <img
                    src={splitButtIcon}
                    alt="Sort tasks"
                    width="20px"
                  />
                </button>
              }
              content="Move completed tasks to the top"
              on="hover"
              position="top center"
            />
          )}
        </div>

        {/* Delete Completed Tasks Button */}
        <div className="col-3">
          {isTouchDevice ? (
            <button
              type="button"
              className="button-input-3 delete-completed-button btn btn-danger"
              aria-label="Delete completed tasks"
              onClick={handleDeleteCompleted}
            >
              <img
                src={checkButtIcon}
                alt="Delete completed tasks"
                width="20px"
              />
            </button>
          ) : (
            <Popup
              trigger={
                <button
                  type="button"
                  className="button-input-3 delete-completed-button btn btn-danger"
                  aria-label="Delete completed tasks"
                  onClick={handleDeleteCompleted}
                >
                  <img
                    src={checkButtIcon}
                    alt="Delete completed tasks"
                    width="20px"
                  />
                </button>
              }
              content="Delete completed tasks"
              on="hover"
              position="top right"
            />
          )}
        </div>

        {/* Delete All Tasks Button */}
        <div className="col-3">
          {isTouchDevice ? (
            <button
              type="button"
              className="button-input-4 delete-all-button btn btn-warning"
              aria-label="Delete all tasks"
              onClick={handleDeleteAll}
            >
              <img
                src={removeButtIcon}
                alt="Delete all tasks"
                width="20px"
              />
            </button>
          ) : (
            <Popup
              trigger={
                <button
                  type="button"
                  className="button-input-4 delete-all-button btn btn-warning"
                  aria-label="Delete all tasks"
                  onClick={handleDeleteAll}
                >
                  <img
                    src={removeButtIcon}
                    alt="Delete all tasks"
                    width="20px"
                  />
                </button>
              }
              content="Delete ALL tasks!!!"
              on="hover"
              position="top center"
            />
          )}
        </div>

        {/* Button Labels */}
        <span className="button-label col-3">AddΤask</span>
        <span className="button-label col-3">TopDone</span>
        <span className="button-label col-3">DelDone</span>
        <span className="button-label col-3">DelAll</span>
      </div>
    </>
  );
}

export default SubmitForm;
// 🦖