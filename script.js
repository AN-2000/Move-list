let moveBottomBtn = document.querySelector(".moveBottom");
let moveTopBtn = document.querySelector(".moveTop");
let moveAllBtn = document.querySelector(".moveAll");
let addBtn = document.querySelector(".add-btn");
let searchBtn = document.querySelector(".search-btn");
let l2 = document.querySelector(".l2");
let l1List = document.querySelector(".l1 ul");
let input = document.querySelector("input")

addBtn.addEventListener("click", function () {
  let li = document.createElement("li");
  li.draggable = true;
  li.id = uid();
  li.innerHTML = "Write Your Task Here"
  li.contentEditable = true;
  l1List.appendChild(li);
  attachDnDEvents()
});

input.addEventListener("change", function () {
  let items = l1List.querySelectorAll("li");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("hide")
  }
})

searchBtn.addEventListener("click", function () {
  let index;
  let items = l1List.querySelectorAll("li")
  for (let i = 0; i < items.length; i++){
    if (items[i].innerHTML == input.value) {
      index = i;
    }
  }
  if (index) {
    for (let i = 0; i < items.length; i++) {
      if (index != i) {
          items[i].classList.add("hide")
      }
    }
  }
});

moveBottomBtn.addEventListener("click", function () {
  let l1Childern = document.querySelector(".l1 ul").children;

  if (l1Childern.length > 0)
    document.querySelector(".l2 ul").append(l1Childern[l1Childern.length - 1]);
});

moveTopBtn.addEventListener("click", function () {
  let l1Childern = document.querySelectorAll(".l1 ul li");

  if (l1Childern.length > 0)
    document.querySelector(".l2 ul").prepend(l1Childern[0]);
});

moveAllBtn.addEventListener("click", function () {
  let l1Childern = document.querySelectorAll(".l1 ul li");
  let length = l1Childern.length;
  for (let i = 0; i < length; i++) moveBottomBtn.click();
});

function attachDnDEvents() {
  let Alldropabble = document.querySelector(".l1 ul").children;
  let AlldropZoneChildren = Alldropabble;
  for (let j = 0; j < Alldropabble.length; j++) {
    Alldropabble[j].addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text", e.target.id);
    });
  }

  for (let k = 0; k < AlldropZoneChildren.length; k++) {
    AlldropZoneChildren[k].addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    AlldropZoneChildren[k].addEventListener("drop", function (event) {
      var y = event.clientY;
      let positionData = event.target.getBoundingClientRect();
      let middle = (positionData.top + positionData.bottom) / 2;
      if (y >= positionData.top && y < middle) {
        console.log(event.dataTransfer.getData("text"));
        event.target.parentNode.insertBefore(
          document.getElementById(event.dataTransfer.getData("text")),
          event.target
        );
      } else if (y >= middle && y <= positionData.bottom) {
        console.log(event.dataTransfer.getData("text"));
        insertAfter(
          document.getElementById(event.dataTransfer.getData("text")),
          event.target
        );
      }
    });
  }
}

l2.addEventListener("dragover", function (e) {
  e.preventDefault();
});

l2.addEventListener("drop", function (e) {
  if (e.target == this.children[0])
    e.target.append(document.getElementById(e.dataTransfer.getData("text")));
});

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
