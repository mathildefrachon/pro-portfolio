"use strict";
import { clickedFilter, clickedPost } from "./index.js";

let contactScreen = document.querySelector("#contact-screen");
let contactContent = document.querySelector(".contact-wrapper");

let filterScreen = document.querySelector("#filter-screen");
let filterContent = document.querySelector("#filter-wrapper");

// menu links

let menuLinkProjects = document.querySelector("#a-projects");
let menuLinkFilters = document.querySelector("#a-filters");
let menuLinkContact = document.querySelector("#a-contact");

window.addEventListener("DOMContentLoaded", initNav);

function initNav() {
  //BUTTONS CATEGORIES
  document
    .querySelectorAll(".cat-link")
    .forEach(element => element.addEventListener("click", clickedFilter));
  //CLICK ON A PROJECT
  gallery.addEventListener("click", clickedPost);
  //SIDE MENU
  menuLinkFilters.addEventListener("click", function() {
    openSide(filterScreen, filterContent);
  });
  document.querySelector("#cross-filter").addEventListener("click", function() {
    closeSide(filterScreen, filterContent);
  });
  menuLinkContact.addEventListener("click", function() {
    openSide(contactScreen, contactContent);
  });
  document
    .querySelector("#cross-contact")
    .addEventListener("click", function() {
      closeSide(contactScreen, contactContent);
    });
}

/* ABOUT PAGE FOR MOBILE */

let aboutSlidesM = document.querySelectorAll(".about-slides-mob");
let aboutSlidesD = document.querySelectorAll(".about-slides-desk");

if (window.innerWidth < 1000) {
  console.log("onMobile");
  aboutSlidesM.forEach(slideM => {
    slideM.classList.remove("none");
  });

  aboutSlidesD.forEach(slideD => {
    slideD.classList.add("none");
  });
}

/* SIDE MENU AND CONTACT */

function openSide(screen, content) {
  extend(screen);
  setTimeout(opacity, 500, content);
}

function closeSide(screen, content) {
  opacity(content);
  setTimeout(extend, 500, screen);
}

/* EFFECT FUNCTIONS */

function none(element) {
  element.classList.add(none);
}

function opacity(content) {
  content.classList.toggle("opacity");
}

function extend(screen) {
  // FOR DESKTOP
  if (window.innerWidth > 1000) {
    screen.classList.toggle("extend-side");
  }
  // FOR MOBILE
  if (window.innerWidth < 1000) {
    screen.classList.toggle("extendMobileInfos");
  }
  screen.classList.toggle("width0");
}
