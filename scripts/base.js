let grid = document.querySelector(".grid");

let iso = new Isotope(grid, {
  itemSelector: ".item",
  masonry: {
    columnWidth: 50
  },
});

function filterItem(item) {
  function getFiterString(query) {
    const checkboxs = document.querySelectorAll(query);
    let inclusives = [];
    for (const checkbox of checkboxs) {
      if (checkbox.checked) {
        inclusives.push(checkbox.value);
      }
    }
    return inclusives.length ? inclusives.join(", ") : "*";
  }
  return (
    item.matches(getFiterString("input.kieu")) &&
    item.matches(getFiterString("input.tanglop")) &&
    item.matches(getFiterString("input.trangphuc")) &&
    item.matches(getFiterString("input.thoidai"))
  );
}

document.querySelector(".filter").addEventListener("change", function () {
  for (const hiddenItem of document.querySelectorAll(".hidden")) {
    hiddenItem.classList.remove("hidden");
  }
  iso.arrange({ filter: filterItem });
});

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
const list = Array.from(Array(5).keys());
list.shift();
shuffle(list);
let infScroll = new InfiniteScroll(grid, {
  path: function () {
    if (this.loadCount < list.length) {
      return `items/p${list[this.loadCount]}.html`;
    }
  },
  history: false,
  outlayer: iso,
  append: ".item",
  status: '.page-load-status',
});

infScroll.on("load", function (body) {
  let items = body.querySelectorAll(".item");
  let hiddenItems = Array.from(items).filter(item => !filterItem(item));
  for (const hiddenItem of hiddenItems) {
    hiddenItem.classList.add("hidden");
  }
});
