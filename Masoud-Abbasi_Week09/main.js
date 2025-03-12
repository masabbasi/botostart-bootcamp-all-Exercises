const $ = document;
const colorBoxs = $.querySelectorAll(".colorBox");
const editColors = $.querySelectorAll(".colorBoxButton");
const cover = $.querySelector(".cover");
const editBox = $.querySelector(".edit");
const getColor = $.querySelector(".getColor");
const setEdit = $.querySelector(".setEdit");
const cancelEdit = $.querySelector(".cancel");
const copyMessage = $.querySelector(".copyMessage");

let editItem = null;

function randomColor() {
  const code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let randomCol = "#";
  for (let i = 0; i < 6; i++) {
    randomCol += code[Math.floor(Math.random() * 16)];
  }
  return randomCol;
}

function start() {
  colorBoxs.forEach((box) => {
    box.style.backgroundColor = `${randomColor()}`;
    box.children[0].children[0].innerHTML = `${randomColor()}`;
  });
}

colorBoxs.forEach((box) => {
  box.addEventListener("click", (e) => {
    // navigator.clipboard.writeText(box.children[0].children[0].innerHTML)
    const input = document.createElement("input");
    input.value = box.children[0].children[0].innerHTML;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    if (window.innerWidth - e.clientX < 100) {
      copyMessage.style.left = `${e.clientX - 70}px`;
    } else {
      copyMessage.style.left = `${e.clientX + 10}px`;
    }
    if (window.innerHeight - e.clientY < 50) {
      copyMessage.style.top = `${e.clientY - 30}px`;
    } else {
      copyMessage.style.top = `${e.clientY + 10}px`;
    }
    copyMessage.style.display = "block";
    setTimeout(() => {
      copyMessage.style.display = "none";
    }, 2000);
    e.currentTarget.style.backgroundColor = `${randomColor()}`;
    box.children[0].children[0].innerHTML = `${randomColor()}`;
  });
});

editColors.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    editBox.style.display = "flex";
    cover.style.display = "block";
    editItem = e.currentTarget.parentNode.parentNode;
  });
});

setEdit.addEventListener("click", () => {
  editItem.style.backgroundColor = `${getColor.value}`;
  editItem.children[0].children[0].innerHTML = `${getColor.value}`;
  editBox.style.display = "none";
  cover.style.display = "none";
});

cancelEdit.addEventListener("click", () => {
  editBox.style.display = "none";
  cover.style.display = "none";
});

cover.addEventListener("click", () => {
  editBox.style.display = "none";
  cover.style.display = "none";
});

window.addEventListener("load", start);
