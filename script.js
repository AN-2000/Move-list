let moveBottomBtn = document.querySelector(".moveBottom");
let moveTopBtn = document.querySelector(".moveTop");
let moveAllBtn = document.querySelector(".moveAll");
let l2 = document.querySelector(".l2");

moveBottomBtn.addEventListener("click", function () {
  let l1Childern = document.querySelector(".l1 ul").children;
  if (l1Childern.length > 0)
    document.querySelector(".l2 ul").append(l1Childern[l1Childern.length - 1]);
});

moveTopBtn.addEventListener("click", function () {
  let l1Childern = document.querySelector(".l1 ul").children;
  if (l1Childern.length > 0)
    document.querySelector(".l2 ul").prepend(l1Childern[0]);
});

moveAllBtn.addEventListener("click", function () {
  let l1Childern = document.querySelector(".l1 ul").children;
  let length = l1Childern.length;
  for (let i = 0; i < length; i++) moveBottomBtn.click();
});

let Alldropabble = document.querySelector(".l1 ul").children;

for (let j = 0; j < Alldropabble.length; j++){
    Alldropabble[j].addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text",e.target.id)
    })
}

l2.addEventListener("dragover", function (e) {
    e.preventDefault()
})

l2.addEventListener("drop", function (e) {
    if (e.target == this.children[0])
      e.target.append(document.getElementById(e.dataTransfer.getData("text")));
})