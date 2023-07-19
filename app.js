/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

/**
 * Easy on scroll event listener
 */
const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

/**
 * Navbar links active state on scroll
 */
let navBarLinks = select("#navbar .nav-link", true);
const navBarLinksActive = () => {
  let position = window.scrollY + 200;
  navBarLinks.forEach((navBarLink) => {
    if (!navBarLink.hash) return;
    let section = select(navBarLink.hash);
    if (!section) return;
    if (
      position >= section.offsetTop &&
      position <= section.offsetTop + section.offsetHeight
    ) {
      navBarLink.classList.add("active");
    } else {
      navBarLink.classList.remove("active");
    }
  });
};
window.addEventListener("load", navBarLinksActive);
onscroll(document, navBarLinksActive);

/**
 * Scrolls to an element with header offset
 */
const scrollTo = (el) => {
  let elementPos = select(el).offsetTop;
  window.scrollTo({
    top: elementPos,
    behavior: "smooth",
  });
};


/**
 * Mobile nav toggle
 */
on("click", ".mobile-nav-toggle", function (e) {
  select("body").classList.toggle("mobile-nav-active");
  this.classList.toggle("bi-list");
  this.classList.toggle("bi-x");
});

/**
 * Scroll with offset on links with a class name
 */
on('click', '.nav-link', function (e) {
    if (select(this.hash)) {
      e.preventDefault();

      let body = select("body");
      if (body.classList.contains("mobile-nav-active")) {
        body.classList.remove("mobile-nav-active");
        let navbarToggle = select(".mobile-nav-toggle");
        navbarToggle.classList.toggle("bi-list");
        navbarToggle.classList.toggle("bi-x");
      }
      scrollTo(this.hash);
    }
  },
  true
);

/**
 * Scroll with offset on page load with hash links in the url
 */
window.addEventListener("load", () => {
  if (window.location.hash) {
    if (select(window.location.hash)) {
      scrollTo(window.location.hash);
    }
  }
});

const menu = [
  {
    id: 1,
    category: "html",
    img: "./assets/item-1.jpg",
  },
  {
    id: 2,
    category: "boot&css",
    img: "./assets/item-2.jpeg",
  },
  {
    id: 3,
    category: "JS",
    img: "./assets/item-3.jpg",
  },
  {
    id: 4,
    category: "html",
    img: "./assets/item-4.webp",
  },
  {
    id: 5,
    category: "boot&css",
    img: "./assets/item-5.webp",
  },
  {
    id: 6,
    category: "JS",
    img: "./assets/item-6.webp",
  },
];

const addMenuList = (itemList = []) => {
  document.getElementById("menu-list").innerHTML = itemList
    .map(
      (folio) => `
  <div class="folio-item">
    <img src="${folio.img}" />
  </div>`
    )
    .join(" ");
};

const setActiveClass = (button) => {
  if (button) {
    document.querySelectorAll(".btn-category").forEach((b) => {
      b.classList.remove("active-btn");
    });
    button.classList.add("active-btn");
  }
};

const addCategoryButtons = () => {
  // let categoryList = ['all'];

  // menu.forEach((item) => {
  //   if (item && item.category && !categoryList.includes(item.category)) {
  //     categoryList.push(item.category);
  //   }
  // });

  const categoryList = menu.reduce(
    (categories, item) => {
      if (item && item.category && !categories.includes(item.category)) {
        categories.push(item.category);
      }
      return categories;
    },
    ["all"]
  );

  const buttons = categoryList.map(
    (cat) =>
      `<button class="btn btn-category ${
        cat === "all" ? "active-btn" : ""
      }" category-id="${cat}">${cat}</button>`
  );

  if (buttons.length > 0) {
    document.getElementById("menu-categories").innerHTML = buttons.join(" ");
  }

  document.querySelectorAll(".btn-category").forEach((item) => {
    const categoryType = item.getAttribute("category-id");

    item.addEventListener("click", function () {
      setActiveClass(item);
      item.classList.add("active-btn");
      if (categoryType === "all") {
        addMenuList(menu);
        return;
      }
      const filteredList = menu.filter(
        (item) => item.category === categoryType
      );
      addMenuList(filteredList);
    });
  });
};

document.addEventListener("DOMContentLoaded", function () {
  addCategoryButtons();
  addMenuList(menu);
});

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}

/**
 * Back to top button
 */
let backToTop = select(".back-to-top");
if (backToTop) {
  const toggleBackToTop = () => {
    if (window.scrollY > 100) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  };
  window.addEventListener("load", toggleBackToTop);
  onscroll(document, toggleBackToTop);
}
