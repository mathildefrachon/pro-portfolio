"use strict";
import {
  urlParams,
  currentArray,
  cat,
  activeFilter,
  imgArray
} from "./index.js";

// get the index of the project from the url
let index = urlParams.get("index");
let imgIndex = 1;
// let image = document.querySelector("img");
const images = document.querySelector(".images");

// CLICK ON IMG
images.addEventListener("click", clickedImages);

function clickedImages() {
  if (imgIndex >= imgArray.length) {
    imgIndex = 0;
  } else {
  }
  let activeDot = document.querySelector("#" + "dot" + imgIndex);
  document.querySelectorAll(".point").forEach(dot => {
    dot.classList.remove("dotActive");
  });

  if (imgIndex >= imgArray.length) {
    console.log("go back to first main img");
    images.src = imgArray[0].url;
    imgIndex = 0;
  } else {
    images.src = imgArray[imgIndex].url;
    imgIndex++;
  }
  activeDot.classList.add("dotActive");
}

/* NEXT AND PREVIOUS PROJECT */

document.querySelector("#next").addEventListener("click", nextProject);

document.querySelector("#previous").addEventListener("click", previousProject);

function nextProject() {
  console.log("next");
  closeInfos();
  const thisIndex = currentArray.findIndex(pr => pr.wpid == index);
  console.log(thisIndex);
  let nextIndex = thisIndex + 1;
  if (nextIndex >= currentArray.length) {
    nextIndex = 0;
  }

  if (cat) {
    console.log("we have a category:" + cat);

    let newUrl =
      "subpage.html?index=" +
      currentArray[nextIndex].wpid +
      "&category=" +
      activeFilter;
    console.log(newUrl);

    // document.querySelector("#next").setAttribute("href", newUrl);
  } else {
    let newUrl = "subpage.html?index=" + currentArray[nextIndex].wpid;
    document.querySelector("#next").setAttribute("href", newUrl);
  }

  setTimeout(
    function() {
      document.querySelector("#next").setAttribute("href", newUrl);
    },
    500,
    newUrl
  );
}

function previousProject() {
  console.log("previous");

  const thisIndex = currentArray.findIndex(pr => pr.wpid == index);
  let nextIndex = thisIndex - 1;
  if (nextIndex < 0) {
    nextIndex = currentArray.length - 1;
  }

  let newUrl =
    "subpage.html?index=" +
    currentArray[nextIndex].wpid +
    "&category=" +
    activeFilter;

  document.querySelector("#previous").setAttribute("href", newUrl);
}

/* DISPLAY INFOS - OPEN CLOSE MENU INFOS */

document.querySelector("#plus").addEventListener("click", displayInfos);
document.querySelector("#crossI").addEventListener("click", closeInfos);
const img_container = document.querySelector(".img_container");
const infos_container = document.querySelector(".infos_container");
const infos = document.querySelector(".infos");
console.log(infos_container);

function displayInfos() {
  console.log("plus infos");

  //for desktop
  if (window.innerWidth > 1000) {
    infos_container.classList.remove("width0");
    infos_container.classList.add("extend-side");
    img_container.classList.remove("extend");
    img_container.classList.add("shorter");

    setTimeout(function() {
      infos.classList.toggle("opacity");
    }, 500);
  }

  //for mobile
  else if (window.innerWidth < 1000) {
    console.log("onMobile");
    infos_container.classList.remove("width0");
    infos_container.classList.add("extendMobileInfos");
    document.querySelector("#crossI").style.opacity = "1";

    setTimeout(function() {
      infos.classList.toggle("opacity");
    }, 500);
  }
}

function closeInfos() {
  console.log("close infos");

  //for desktop
  if (window.innerWidth > 1000) {
    infos.classList.toggle("opacity");

    setTimeout(function() {
      infos_container.classList.add("width0");
      infos_container.classList.remove("extend-side");
      img_container.classList.add("extend");
      img_container.classList.remove("shorter");
    }, 500);
  }

  //for mobile
  if (window.innerWidth < 1000) {
    console.log("on Mobile");

    infos.classList.toggle("opacity");

    setTimeout(function() {
      infos_container.classList.add("width0");
      infos_container.classList.remove("extendMobileInfos");
      document.querySelector("#crossI").style.opacity = "0";
    }, 500);
  }
}
