// toggle dark mode
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark");
}

// count tasks
let itemsLeft = document.getElementById("items_left");
itemsLeft.innerText = document.querySelectorAll(".card-Body-AddTodo").length;

// Add items
let input = document.getElementById("input");
let checkbtn = document.getElementsByClassName("checkbtn");
let todo_List = document.querySelector(".todos ul");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (input.value.length > 0) {
      event.preventDefault();

      addItems(input.value);
      input.value = "";
    } else {
      alert("Can't add an empty task!");
    }
  }
});

function addItems(text) {
  const item = document.createElement("li");
  item.className = "card-Body-AddTodo";

  item.innerHTML = `
        <label class="input_label">
        <input type="checkbox" class="checkbtn"/>
        <p class="todo_input added-Task">${text}</p>
        </label>
        <span class="close"></span>
        `;
  todo_List.append(item);
  itemsLeft.innerText = +itemsLeft.innerText + 1;
}

// clear completed
let completed = document.getElementById("clearBtn");

completed.addEventListener("click", () => {
  const itemChecked = document.querySelectorAll(
    '.card-Body-AddTodo input[type="checkbox"]:checked'
  );
  itemChecked.forEach((item) => {
    removeItem(item.closest("li"));
  });
});

document.querySelectorAll(".filters input").forEach((radio) => {
  radio.addEventListener("change", (event) => {
    filterTodo(event.target.id);
  });
});

function filterTodo(id) {
  const allItems = document.querySelectorAll("li");

  switch (id) {
    case "all":
      allItems.forEach((item) => {
        item.classList.remove("hidden");
      });
      break;
    case "active":
      allItems.forEach((item) => {
        if (item.querySelector("input").checked) {
          item.classList.add("hidden");
        } else {
          item.classList.remove("hidden");
        }
      });
      break;
    default:
      allItems.forEach((item) => {
        if (item.querySelector("input").checked) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
      break;
  }
}

// remove task
todo_List.addEventListener("click", (event) => {
  if (event.target.classList.contains("close")) {
    removeItem(event.target.parentElement);
  }
});

function removeItem(item) {
  item.remove();
  itemsLeft.innerText = +itemsLeft.innerText - 1;
}
