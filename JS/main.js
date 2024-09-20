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

  // todoDiv.setAttribute("draggable", "true"); // Cho phép kéo thả
  // todoDiv.setAttribute("data-index", todoList.children.length); // Lưu vị trí ban đầu

  // todoDiv.addEventListener("dragstart", dragStart);
  // todoDiv.addEventListener("dragover", dragOver);
  // todoDiv.addEventListener("drop", drop);
  // todoDiv.addEventListener("dragend", dragEnd);

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

// let dragSrcEl = null;
//
// function dragStart(e) {
//   this.style.opacity = "0.4"; // Giảm độ trong suốt của phần tử khi bắt đầu kéo
//   dragSrcEl = this; // Lưu phần tử đang được kéo
//   e.dataTransfer.effectAllowed = "move"; // Hiệu ứng di chuyển
//   e.dataTransfer.setData("text/html", this.innerHTML); // Lưu nội dung
// }
//
// function dragOver(e) {
//   e.preventDefault(); // Cho phép thả
//   e.dataTransfer.dropEffect = "move"; // Hiệu ứng di chuyển
//   return false;
// }
//
// function drop(e) {
//   e.stopPropagation(); // Ngăn sự kiện mặc định
//
//   // Kiểm tra xem không thả vào chính nó
//   if (dragSrcEl !== this) {
//     // Hoán đổi nội dung giữa hai phần tử
//     dragSrcEl.innerHTML = this.innerHTML;
//     this.innerHTML = e.dataTransfer.getData("text/html");
//   }
//
//   return false;
// }
//
// function dragEnd(e) {
//   this.style.opacity = "1"; // Khôi phục độ trong suốt
// }

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
  // Lưu cả text và time dưới dạng đối tượng
  todos.push(todo);
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

    // todoDiv.setAttribute("draggable", "true");
    // todoDiv.setAttribute("data-index", index);

    // todoDiv.addEventListener("dragstart", dragStart);
    // todoDiv.addEventListener("dragover", dragOver);
    // todoDiv.addEventListener("drop", drop);
    // todoDiv.addEventListener("dragend", dragEnd);

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

// function drop(e) {
//   e.stopPropagation(); // Ngăn sự kiện mặc định

//   if (dragSrcEl !== this) {
//     // Hoán đổi nội dung giữa hai phần tử
//     dragSrcEl.innerHTML = this.innerHTML;
//     this.innerHTML = e.dataTransfer.getData("text/html");

//     // Cập nhật lại localStorage
//     updateLocalTodos();
//   }

//   return false;
// }

// function updateLocalTodos() {
//   let todos = [];
//   const items = document.querySelectorAll(".todo-item");
//   items.forEach((item) => {
//     todos.push(item.innerText);
//   });

//   localStorage.setItem("todos", JSON.stringify(todos));
// }
