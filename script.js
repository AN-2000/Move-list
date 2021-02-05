let moveBottomBtn = document.querySelector(".moveBottom");
let moveTopBtn = document.querySelector(".moveTop");
let moveAllBtn = document.querySelector(".moveAll");
let addBtn = document.querySelector(".add-btn");
let searchBtn = document.querySelector(".search-btn");
let l2 = document.querySelector(".l2");
let l1List = document.querySelector(".l1 ul");
let input = document.querySelector("input");
let l1 = document.querySelector(".l1");

//3 - A 
//Add a new element to l1 list
addBtn.addEventListener("click", function () {
  let li = document.createElement("li");
  li.draggable = true;
  li.id = uid();
  li.innerHTML = "Write Your Task Here";
  li.contentEditable = true;
  l1List.appendChild(li);
  attachDnDEvents();
});

//3 - C 
//whenever there is change in input show all the elements of the list 
input.addEventListener("change", function () {
  let items = l1List.querySelectorAll("li");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("hide");
  }
});

//3 - B 
//To filter elements from l1 list
searchBtn.addEventListener("click", function () {
  //to filter all the matching element from the list l1 and hide the remaining
  let index;
  let items = l1List.querySelectorAll("li");
  for (let i = 0; i < items.length; i++) {
    if (items[i].innerHTML == input.value) {
      index = i;
    }
  }
  
    for (let i = 0; i < items.length; i++) {
      if (index != i) {
        items[i].classList.add("hide");
      }
    }
  
});

//2 - A
//Moves a bottom element from l1 to l2
moveBottomBtn.addEventListener("click", function () {
  let l1Childern = document.querySelector(".l1 ul").children;

  if (l1Childern.length > 0)
    document.querySelector(".l2 ul").append(l1Childern[l1Childern.length - 1]);
});

// 2 - B
//Moves a top element from l1 to l2
moveTopBtn.addEventListener("click", function () {
  let l1Childern = document.querySelectorAll(".l1 ul li");

  if (l1Childern.length > 0)
    document.querySelector(".l2 ul").prepend(l1Childern[0]);
});

// 2 - C
//Moves all elements from l1 to l2
moveAllBtn.addEventListener("click", function () {
  let l1Childern = document.querySelectorAll(".l1 ul li");
  let length = l1Childern.length;
  for (let i = 0; i < length; i++) moveBottomBtn.click();
});

l2.addEventListener("dragover", function (e) {
  e.preventDefault();
});

//4 - A
// Problem => when you add drop listener to a parent it also affects the child 
          //  Because of which here the elements were being added inside the li tag itself instead of ul 


// Solution => in the drop handler we check if the target on which the event is happening is same as this.children[0]
            // meaning here this refers to l1 or l2 and children of l1 and l2 is a ul so if the element from which the drop event was emitted is a ul append the element if not just ignore 

l2.addEventListener("drop", function (e) {
  if (e.target == this.children[0])
    e.target.append(document.getElementById(e.dataTransfer.getData("text")));
});

//4 - B
// comments remains same for l1 as they were for l2.

l1.addEventListener("dragover", function (e) {
  e.preventDefault();
});

l1.addEventListener("drop", function (e) {

  if (e.target == this.children[0])
    e.target.append(document.getElementById(e.dataTransfer.getData("text")));
});

//1 - A
// make the given node right sibling of specified node
function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

//1 - B
//generate unique id 
const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

//1 - C
//attach drag and drop events to all the list elements
//this is be called whenever we add a new element in the list
function attachDnDEvents() {
  //l1 list children
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

    //This code implements the insertion before and after the sibling list element of a particular list
    AlldropZoneChildren[k].addEventListener("drop", function (event) {
      var y = event.clientY;
      let positionData = event.target.getBoundingClientRect();
      let middle = (positionData.top + positionData.bottom) / 2;
      if (y >= positionData.top && y < middle) {
        // console.log(event.dataTransfer.getData("text"));
        event.target.parentNode.insertBefore(
          document.getElementById(event.dataTransfer.getData("text")),
          event.target
        );
      } else if (y >= middle && y <= positionData.bottom) {
        // console.log(event.dataTransfer.getData("text"));
        insertAfter(
          document.getElementById(event.dataTransfer.getData("text")),
          event.target
        );
      }
    });
  }
}
