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

    // Lấy màu đã chọn
    const selectedColor = "white"; // Hoặc lấy màu mặc định nếu không chọn
    todoDiv.classList.add(selectedColor); // Thêm class màu cho to-do

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
    saveLocalTodos({ text: todoInput.value, color: selectedColor });
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
  // todos.push(todo); // Lưu cả text và color

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
    // todoDiv.classList.add(todo.color); // Khôi phục màu từ localStorage

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

function filterByColor(color) {
  const todos = document.querySelectorAll(".todo"); // Lấy tất cả các to-do từ danh sách

  todos.forEach(function (todo) {
    const todoColor = todo.style.backgroundColor; // Lấy màu nền của to-do
    if (color === "all") {
      todo.style.display = "flex"; // Hiển thị tất cả các to-do
    } else if (todoColor === color) {
      todo.style.display = "flex"; // Hiển thị các to-do có màu đã chọn
    } else {
      todo.style.display = "none"; // Ẩn các to-do không đúng màu
    }
  });
}

// Thêm sự kiện cho các nút màu
document
  .querySelector(".green-btn")
  .addEventListener("click", () => filterByColor("lightgreen"));
document
  .querySelector(".blue-btn")
  .addEventListener("click", () => filterByColor("lightblue"));
document
  .querySelector(".yellow-btn")
  .addEventListener("click", () => filterByColor("lightyellow"));
document
  .querySelector(".white-btn")
  .addEventListener("click", () => filterByColor("all")); // Hiển thị tất cả các to-do

// Hàm tạo và thêm to-do mới với màu sắc
function addTodoItem(text, color) {
  const todoItem = document.createElement("li"); // Tạo thẻ <li> mới
  todoItem.classList.add("todo-item", color); // Thêm class 'todo-item' và class màu sắc
  todoItem.textContent = text; // Nội dung của to-do

  // Thêm to-do vào danh sách
  document.querySelector(".todo-list").appendChild(todoItem);
}
addTodoItem("Task 1 - ALL - white", "white");
addTodoItem("Task 2 - deadline dài - green", "lightgreen");
addTodoItem("Task 3 - deadline ngắn - blue", "lightblue");
addTodoItem("Task 4 - Quan trọng - yellow", "lightyellow");

// Hàm thêm to-do mới với dữ liệu từ input
document
  .querySelector(".todo-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn refresh trang khi submit form

    const todoText = document.querySelector(".todo-input").value; // Lấy nội dung từ input
    const color = "green"; // Hoặc bạn có thể thêm logic để chọn màu cho to-do

    addTodoItem(todoText, color); // Gọi hàm tạo to-do với màu
  });

window.addEventListener("DOMContentLoaded", (event) => {
  filterByColor("all");
});

document.addEventListener("DOMContentLoaded", function () {
  const sortable = new Sortable(todoList, {
    animation: 150, // Hiệu ứng khi kéo thả
    ghostClass: "sortable-ghost", // Lớp CSS cho mục đang được kéo
    onEnd: function (evt) {
      console.log("Dragged and dropped!"); // Thêm dòng này để kiểm tra xem Sortable có hoạt động không
      updateTodoOrder(); // Cập nhật thứ tự sau khi kéo thả
    },
  });
  console.log("Sortable.js initialized"); // Thêm dòng này để kiểm tra quá trình khởi tạo
});

function updateTodoOrder() {
  let todos = [];
  const todoItems = document.querySelectorAll(".todo");

  todoItems.forEach((todoItem) => {
    const text = todoItem.querySelector(".todo-item").innerText;
    const color = todoItem.style.backgroundColor || ""; // Lấy màu sắc
    const time = todoItem
      .querySelector("span")
      .innerText.replace(" (Created at: ", "")
      .replace(")", ""); // Lấy thời gian

    todos.push({
      text: text,
      time: time,
      color: color,
    });
  });

  // Lưu lại thứ tự mới vào localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}
