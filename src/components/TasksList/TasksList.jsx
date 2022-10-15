import { useState } from "react";
import classes from "./TasksList.module.css";

const TasksList = (props) => {
  const [isSortingUp, setIsSortingUp] = useState(false);

  const prioritizeHandler = (e) => {
    e.preventDefault();
    e.target.className === "fa-solid fa-star"
      ? (e.target.className = "fa-regular fa-star")
      : (e.target.className = "fa-solid fa-star");
  };

  const sortingChangeHandler = () => {
    if (!isSortingUp) {
      setIsSortingUp(true);
      props.onSortingTasks(isSortingUp);
    } else if (isSortingUp) {
      setIsSortingUp(false);
      props.onSortingTasks(isSortingUp);
    }
  };

  return (
    <div className={classes.block}>
      <h2>
        <p className={classes.todo}>ToDo </p>List
      </h2>
      <div className={classes.sortingDiv}>
        <p>Sort by:</p>
        <button onClick={sortingChangeHandler}>
          Date{!isSortingUp ? <i className="fa-solid fa-arrow-up"></i> : ""}
          {isSortingUp ? <i className="fa-solid fa-arrow-down"></i> : ""}
        </button>
      </div>

      <div>
        {
        props.tasks.map((task) => (
          <div
            key={task.id}
            className={
              task.isCompleted === false
                ? classes.listItem
                : classes.listItemCompleted
            }>

              <div className={classes.headTask}>
              <label
              className={
                task.isCompleted === false
                  ? classes.title
                  : classes.titleCompleted
              }>
              {task.title}

              <button 
            className={classes.priorice}
            onClick={(e) => prioritizeHandler(e)}>
              <i
                className={
                  task.isPriority ? "fa-solid fa-star" : "fa-regular fa-star"
                }
              ></i>
            </button>
            </label>

            <button
              className={classes.smallButton}
              onClick={() => {
                props.onDeleteTask(task.id);
              }}
            >
              X
            </button>
              </div>

            <div className={classes.bodyTask}>
            <label
              className={
                task.isCompleted === false
                  ? classes.description
                  : classes.descriptionCompleted
              }
            >
              {task.description}
            </label>

            <label className={classes.containerCheck}>
              <input
                type="checkbox"
                onClick={() => {
                  props.onStatusTask(task.id);
                }}
              />
              <div className={classes.checkmark}></div>
            </label>
            </div>
            
            <div className={classes.footerTask}>
            <label
              className={
                task.isCompleted === false
                  ? classes.date
                  : classes.dateCompleted
              }>
              {task.date}
            </label>
            </div>
            
          </div>
        )) 
        }
      </div>
    </div>
  );
};

export default TasksList;
