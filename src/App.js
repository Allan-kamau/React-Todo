import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import _ from "lodash";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(function () {
    refreshList();
  });

  const refreshList = () => {
    axios.get("http://localhost:8000/api/todos/");
    // .then((res) => setTasks(res.data))
    // .catch((err) => console.log(err));
  };

  function addTodo(todo) {
    setTodos([todo, ...todos]);
  }
  function toggleComplete(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.div === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  }
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>ToDo lIsT aPp</p>

        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
        <DragDropContext onDragEnd={(e) => console.log(e)}>
          {_.map(todos, (data, key) => {
            return (
              <div className={"column"}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.dropplableProps}
                        className={"droppable-col"}
                      ></div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;

// import React, { useState } from "react";
// // import logo from "./logo.svg";
// import "./App.css";
// import TodoForm from "./components/TodoForm";
// import TodoList from "./components/TodoList";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import _, { initial } from "lodash";

// function App() {
//   const [todos, setTodos] = useState({});

//   function addTodo(todo) {
//     setTodos([todo, ...todos]);
//   }
//   function toggleComplete(id) {
//     setTodos(
//       todos.map((todo) => {
//         if (todo.div === id) {
//           return {
//             ...todo,
//             completed: !todo.completed,
//           };
//         }
//         return todo;
//       })
//     );
//   }
//   function removeTodo(id) {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   }
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>ToDo lIsT aPp</p>

//         <TodoForm addTodo={addTodo} />
//         <TodoList
//           todos={todos}
//           toggleComplete={toggleComplete}
//           removeTodo={removeTodo}
//         />
//         <DragDropContext onDragEnd={(e) => console.log(e)}>
//           {_.map(todos, (data, key) => {
//             return (
//               <div className={"column"}>
//                 <h3>{data.title}</h3>
//                 <Droppable droppableId={key}>
//                   {(provided) => {
//                     return (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.dropplableProps}
//                         className={"droppable-col"}
//                       ></div>
//                     );
//                   }}
//                 </Droppable>
//               </div>
//             );
//           })}
//         </DragDropContext>
//       </header>
//     </div>
//   );
// }

// export default App;
