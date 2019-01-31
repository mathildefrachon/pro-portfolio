"use strict";

/* INFOS MENU */

document.querySelector("#a_filters").addEventListener("click", displayMenu);
document.querySelector("#crossP").addEventListener("click", displayMenu);
const menu_project = document.querySelector("#project_infos");
const menu_text = document.querySelector("#menu_container");
// //BUTTONS CATEGORIES
// document
//   .querySelectorAll(".cat_link")
//   .forEach(element => element.addEventListener("click", clickedFilter));
// CLICK ON A PROJECT

gallery.addEventListener("click", clickedPost);

function displayMenu() {
  console.log("displayMenu");
  if (window.innerWidth > 414) {
    menu_project.classList.toggle("width0");
    menu_project.classList.toggle("extendInfos");
    setTimeout(function() {
      menu_text.classList.toggle("opacity");
    }, 500);
  }
  // FOR MOBILE
  else {
    console.log("display Menu Mobile");
    menu_project.classList.toggle("width0");
    menu_project.classList.toggle("extendMobileInfos");
    setTimeout(function() {
      menu_text.classList.toggle("opacity");
    }, 500);
  }
}

/* ABOUT PAGE FOR MOBILE */

let aboutSlidesM = document.querySelectorAll(".aboutSlidesM");
let aboutSlidesD = document.querySelectorAll(".aboutSlidesD");

if (window.innerWidth < 1000) {
  console.log("onMobile");
  aboutSlidesM.forEach(slideM => {
    slideM.classList.remove("none");
  });

  aboutSlidesD.forEach(slideD => {
    slideD.classList.add("none");
  });
}

/* CONTACT PAGE */

document.querySelector("#a_contact").addEventListener("click", openContact);

function openContact() {
  let contact_screen = document.querySelector(".contact_screen");
  // FOR DESKTOP
  if (window.innerWidth > 1000) {
    contact_screen.classList.toggle("width0");
    contact_screen.classList.toggle("extendInfos");
    setTimeout(function() {
      document.querySelector(".contact_text").classList.toggle("opacity");
    }, 500);
  }
  // FOR MOBILE
  if (window.innerWidth < 1000) {
    contact_screen.classList.toggle("width0");
    contact_screen.classList.toggle("extendMobileInfos");
    setTimeout(function() {
      document.querySelector(".contact_text").classList.toggle("opacity");
    }, 500);
  }
}

document.querySelector("#crossC").addEventListener("click", closeContact);

function closeContact() {
  let contact_screen = document.querySelector(".contact_screen");
  // FOR DESKTOP
  if (window.innerWidth > 1000) {
    document.querySelector(".contact_text").classList.toggle("opacity");
    setTimeout(function() {
      contact_screen.classList.toggle("width0");
      contact_screen.classList.toggle("extendInfos");
    }, 500);
  }
  // FOR MOBILE
  if (window.innerWidth < 1000) {
    document.querySelector(".contact_text").classList.toggle("opacity");
    setTimeout(function() {
      contact_screen.classList.toggle("width0");
      contact_screen.classList.toggle("extendMobileInfos");
    }, 500);
  }
}
