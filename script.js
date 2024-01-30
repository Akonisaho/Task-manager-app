// script.js
// Dark mode toggle function
// Your existing JavaScript code
  const input = document.querySelector(".task-input");
  const addButton = document.querySelector(".add-button");
  const todosHtml = document.querySelector(".tasks");
  const emptyImage = document.querySelector(".empty-image");
  let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
  const deleteAllButton = document.querySelector(".delete-all");
  const filters = document.querySelectorAll(".filter");
  let filter = '';
  
  showTodos();
  
  function getTodoHtml(todo, index) {
    if (filter && filter != todo.status) {
      return '';
    }
    let checked = todo.status == "completed" ? "checked" : "";
    return /* html */ `
      <li class="task">
        <label for="${index}">
          <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
          <span class="${checked}">${todo.name}</span>
        </label>
        <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
      </li>
    `; 
  }
  
  function showTodos() {
    if (todosJson.length == 0) {
      todosHtml.innerHTML = '';
      emptyImage.style.display = 'block';
    } else {
      todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
      emptyImage.style.display = 'none';
    }
  }
  
  function addTodo(todo)  {
    input.value = "";
    todosJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
  }
  
  input.addEventListener("keyup", e => {
    let todo = input.value.trim();
    if (!todo || e.key != "Enter") {
      return;
    }
    addTodo(todo);
  });
  
  addButton.addEventListener("click", () => {
    let todo = input.value.trim();
    if (!todo) {
      return;
    }
    addTodo(todo);
  });
  
  function updateStatus(todo) {
    let todoName = todo.parentElement.lastElementChild;
    if (todo.checked) {
      todoName.classList.add("checked");
      todosJson[todo.id].status = "completed";
    } else {
      todoName.classList.remove("checked");
      todosJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJson));
  }
  
  function remove(todo) {
    const index = todo.dataset.index;
    todosJson.splice(index, 1);
    showTodos();
    localStorage.setItem("todos", JSON.stringify(todosJson));
  }
  
  filters.forEach(function (el) {
    el.addEventListener("click", (e) => {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
        filter = '';
      } else {
        filters.forEach(tag => tag.classList.remove('active'));
        el.classList.add('active');
        filter = e.target.dataset.filter;
      }
      showTodos();
    });
  });
  
  deleteAllButton.addEventListener("click", () => {
    todosJson = [];
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
  });
  
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }
  
  
function toggleDarkMode() {
    const body = document.body;
    const container = document.querySelector('.container');
    const settingsIcon = document.querySelector('.settings-icon');
  
    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');
  
    
    if (darkModeStylesheet.getAttribute('href') === './dark-mode.css') {
      darkModeStylesheet.setAttribute('href', '');
      settingsIcon.classList.remove('dark-mode-color', 'spin');
    } else {
      darkModeStylesheet.setAttribute('href', './dark-mode.css');
      settingsIcon.classList.add('dark-mode-color', 'spin');
    }
  }
