const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// // Hàm lấy thời gian hiện tại
// function showCurrentTime() {
//   const now = new Date();
//   let timenow = now; // Gán biến now cho timenow (nếu thực sự cần)
//   const hours = timenow.getHours();
//   const minutes = timenow.getMinutes();
//   const seconds = timenow.getSeconds();

//   // Định dạng lại nếu giá trị nhỏ hơn 10 thì thêm số 0
//   const formattedTime =
//     (hours < 10 ? "0" : "") +
//     hours +
//     ":" +
//     (minutes < 10 ? "0" : "") +
//     minutes +
//     ":" +
//     (seconds < 10 ? "0" : "") +
//     seconds;

//   // Hiển thị thời gian vào thẻ p với id là currentTime

//   document.getElementById("currentTime").textContent = formattedTime;
// }
// //  gọi hàm
// showCurrentTime();

function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  console.log(todoDiv);
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  console.log(todoInput.value);
  console.log(newTodo);

  if (todoInput.value != "") {
    console.log("chay if");

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Lấy ngày tháng năm và giờ phút giây hiện tại
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0 nên cần +1
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Định dạng ngày tháng và thời gian
    const formattedTime =
      (day < 10 ? "0" : "") +
      day +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      year +
      " " +
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds;

    // Tạo phần tử hiển thị thời gian và ngày tháng
    const timeSpan = document.createElement("span");
    timeSpan.innerText = " (Created at: " + formattedTime + ")";
    todoDiv.appendChild(timeSpan);

    // Lưu cả nội dung và thời gian vào localStorage
    saveLocalTodos({ text: todoInput.value, time: formattedTime });

    //ADDING TO LOCAL STORAGE

    // saveLocalTodos(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "ok";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "X";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
  } else if (todoInput.value == "") {
    alert("mời nhạpa thông tin");
    console.log("chay else");
  }
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("slide");

    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // Lưu cả text và time dưới dạng đối tượng
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// function getLocalTodos() {
//   let todos;
//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }
//   todos.forEach(function (todo) {
//     const todoDiv = document.createElement("div");
//     todoDiv.classList.add("todo");
//     const newTodo = document.createElement("li");
//     newTodo.innerText = todo;
//     newTodo.classList.add("todo-item");
//     todoDiv.appendChild(newTodo);

//     // // Hiển thị thời gian tạo to-do
//     // const timeSpan = document.createElement("span");
//     // timeSpan.innerText = " (Created at: " + todo.time + ")";
//     // todoDiv.appendChild(timeSpan);

//     const completedButton = document.createElement("button");
//     completedButton.innerHTML = "ok";

//     completedButton.classList.add("complete-btn");
//     todoDiv.appendChild(completedButton);

//     const trashButton = document.createElement("button");
//     trashButton.innerHTML = "X";

//     trashButton.classList.add("trash-btn");
//     todoDiv.appendChild(trashButton);

//     todoList.appendChild(todoDiv);
//   });
// }

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo.text; // Nội dung công việc
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Hiển thị thời gian tạo to-do
    const timeSpan = document.createElement("span");
    timeSpan.innerText = " (Created at: " + todo.time + ")";
    todoDiv.appendChild(timeSpan);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "ok";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "X";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
