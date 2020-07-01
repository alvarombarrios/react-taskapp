import React, { useState, useEffect } from 'react';
import {TaskRow} from "./components/TaskRow";
import {TaskBanner} from "./components/TaskBanner";
import {TaskCreator} from "./components/TaskCreator";
import {VisibilityControl} from "./components/VisibilityControl";

function App() {
  
  const [userName, setUserName ] = useState("fazt");
  const [taskItems, setTaskItems ] = useState([
    { name:'task one', done: false},
    { name:'task two', done: false},
    { name:'task three', done: true},
    { name:'task for', done: false}
  ]);
  const [showCompleted, SetShowCompleted ] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if(data != null){
      setTaskItems(JSON.parse(data));
    }else{
      setUserName("Fatz example");
      setTaskItems([
        { name:'task one local', done: false},
        { name:'task two local', done: false},
        { name:'task three local', done: true},
        { name:'task for local', done: false}
      ]);
      SetShowCompleted(true);
    }
  },[])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems) );
  },[taskItems]);

  const createNewTask = taskName => {
    if(!taskItems.find(t => t.name === taskName))
    {
      setTaskItems([...taskItems,{name:taskName, done:false}]);
    }
  }

  const toggleTask = task =>
    setTaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t)) )
  
  const taskTableRows = (doneValue) => 
    taskItems
    .filter(task => task.done === doneValue)
    .map(task => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
    ))
  
  

  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <TaskCreator callback={createNewTask} />
      <table className="table table-striped table-bordered">
        <thead>
        <tr>
          <th>Description</th>
          <th>Done</th>
        </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>
      <div className="bg-sencondary-text-white text-center p2">
        <VisibilityControl 
          description="completed task"
          isChecked={showCompleted}
          callback={checked => SetShowCompleted(checked)}
        />
      </div>

      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }

    </div>
  );
}

export default App;
