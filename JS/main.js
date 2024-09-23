const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

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

    // Tạo div chứa các nút trạng thái
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("status-buttons");

    const greenButton = document.createElement("button");
    greenButton.classList.add("green-btn");
    greenButton.innerHTML = "O";
    greenButton.style.backgroundColor = "lightgreen"; // Gắn màu cho nút

    statusDiv.appendChild(greenButton);

    const blueButton = document.createElement("button");
    blueButton.classList.add("blue-btn");
    blueButton.style.backgroundColor = "lightblue"; // Gắn màu cho nút

    blueButton.innerHTML = "O";

    statusDiv.appendChild(blueButton);

    const yellowButton = document.createElement("button");
    yellowButton.classList.add("yellow-btn");
    yellowButton.style.backgroundColor = "lightyellow"; // Gắn màu cho nút

    yellowButton.innerHTML = "O";

    statusDiv.appendChild(yellowButton);

    todoDiv.appendChild(statusDiv); // Thêm div trạng thái vào to-do item

    greenButton.addEventListener("click", () => {
      alert("Task marked as completed!");
      todoDiv.style.backgroundColor = "lightgreen"; // Đổi màu của todo
      updateLocalTodoColor(todoInput.value, "lightgreen"); // Lưu màu vào localStorage
    });

    blueButton.addEventListener("click", () => {
      alert("Blue button clicked!");
      todoDiv.style.backgroundColor = "lightblue"; // Đổi màu của todo
      updateLocalTodoColor(todoInput.value, "lightblue"); // Lưu màu vào localStorage
    });

    yellowButton.addEventListener("click", () => {
      alert("Yellow button clicked!");
      todoDiv.style.backgroundColor = "lightyellow"; // Đổi màu của todo
      updateLocalTodoColor(todoInput.value, "lightyellow"); // Lưu màu vào localStorage
    });

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

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // Lưu thông tin của todo bao gồm cả trạng thái màu
  todos.push({
    text: todo.text,
    time: todo.time,
    color: todo.color || "", // Lưu màu nếu có, nếu chưa chọn thì để trống
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

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

    // Khôi phục màu sắc
    if (todo.color) {
      todoDiv.style.backgroundColor = todo.color;
    }

    // Tạo lại các nút trạng thái
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("status-buttons");

    const greenButton = document.createElement("button");
    greenButton.classList.add("green-btn");
    greenButton.innerHTML = "O";
    greenButton.style.backgroundColor = "lightgreen"; // Gắn màu cho nút

    statusDiv.appendChild(greenButton);

    const blueButton = document.createElement("button");
    blueButton.classList.add("blue-btn");
    blueButton.innerHTML = "O";
    blueButton.style.backgroundColor = "lightblue"; // Gắn màu cho nút

    statusDiv.appendChild(blueButton);

    const yellowButton = document.createElement("button");
    yellowButton.classList.add("yellow-btn");
    yellowButton.innerHTML = "O";
    yellowButton.style.backgroundColor = "lightyellow"; // Gắn màu cho nút

    statusDiv.appendChild(yellowButton);

    todoDiv.appendChild(statusDiv); // Thêm div trạng thái vào to-do item

    greenButton.addEventListener("click", () => {
      alert("Task marked as completed!");
      todoDiv.style.backgroundColor = "lightgreen"; // Đổi màu của todo
      updateLocalTodoColor(todo.text, "lightgreen"); // Lưu màu vào localStorage
    });

    blueButton.addEventListener("click", () => {
      alert("Blue button clicked!");
      todoDiv.style.backgroundColor = "lightblue"; // Đổi màu của todo
      updateLocalTodoColor(todo.text, "lightblue"); // Lưu màu vào localStorage
    });

    yellowButton.addEventListener("click", () => {
      alert("Yellow button clicked!");
      todoDiv.style.backgroundColor = "lightyellow"; // Đổi màu của todo
      updateLocalTodoColor(todo.text, "lightyellow"); // Lưu màu vào localStorage
    });

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

function filterTodo(e) {
  const todos = todoList.children;
  // Sử dụng children thay vì childNodes
  Array.from(todos).forEach(function (todo) {
    // Chuyển NodeList thành mảng để dùng forEach
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
function updateLocalTodoColor(todoText, color) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    if (todo.text === todoText) {
      todo.color = color; // Cập nhật màu mới
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
