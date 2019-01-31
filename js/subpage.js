"use strict";

let loader = document.querySelector(".loader");
let imgVert = document.querySelector(".imgVert");
let imgWrap = document.querySelector(".imgwrapper");

// get the index of the project from the url
let index = urlParams.get("index");
console.log(index);
let image = document.querySelector("img");
const images = document.querySelector(".images");

// window.addEventListener("DOMContentLoaded", displayProject);

/* DISPLAY THE CLICKED PROJECT */
function displayProject(currentArray) {
  //FIND THE RIGHT PROJECT
  const myProject = currentArray.find(p => p.wpid == index);

  // DISPLAY IMAGES LANDSCAPE AND PORTRAIT
  let downloadingImage = new Image();
  downloadingImage.onload = function() {
    console.log(downloadingImage);
    console.log(myProject);
    loader.classList.add("none");
    checkImgOrientation(downloadingImage, imgVert, imgWrap);
  };

  downloadingImage.src = myProject.image;

  // DISPLAY INFOS
  console.log("display infos");
  displayInfos(myProject);

  // DOTS IMG SLIDE
  displayDots(myProject);

  imgVert.setAttribute("src", myProject.image);
  imgVert.classList.remove("none");
}

function displayInfos(myProject) {
  console.log("infos projets");
  console.log(myProject.description);
  document.querySelector("h1").textContent = myProject.name;
  document.querySelector(".postsubTitle").textContent = myProject.subtitle;
  document.querySelector(".postType").textContent = myProject.type;
  document.querySelector(".postDesc").textContent = myProject.description;
  document.querySelector(".postKeywords").textContent = myProject.keywords;
}

function displayDots(myProject) {
  let imgIndex = 0;
  let imgArray = myProject.otherimages;

  const dot_nav = document.querySelector("#dot_nav");

  imgArray.forEach(img => {
    let dot = document.createElement("div");
    dot.classList.add("point");
    dot.id = "dot" + imgArray.indexOf(img);
    console.log(dot.id);
    dot_nav.appendChild(dot);
  });
}

// CLICK ON IMG
images.addEventListener("click", clickedImages);

function clickedImages(imgIndex) {
  console.log("clicked img");

  let activeDot = document.querySelector("#" + "dot" + imgIndex);
  document.querySelectorAll(".point").forEach(dot => {
    dot.classList.remove("dotActive");
    console.log(activeDot + "is active dot");

    if (imgIndex >= imgArray.length) {
      console.log("go back to first main img");
      images.src = myProject.image;
      imgIndex = 0;
      document.querySelector("#dot_main").classList.add("dotActive");
      // document.querySelector(".point:not(.dotActive)")
    } else {
      images.src = imgArray[imgIndex].url;
      activeDot.classList.add("dotActive");
      imgIndex++;
    }
  });
}

/* NEXT AND PREVIOUS PROJECT */

document.querySelector("#next").addEventListener("click", nextProject);

document.querySelector("#previous").addEventListener("click", previousProject);

function nextProject() {
  console.log("next");
  //index++;
  const thisIndex = currentArray.findIndex(pr => pr.wpid == index);
  console.log(thisIndex);
  let nextIndex = thisIndex + 1;
  if (nextIndex >= currentArray.length) {
    nextIndex = 0;
  }
  // displayProject(currentArray);
  if (cat) {
    console.log("we have a category:" + cat);
    let newUrl =
      "subpage.html?index=" +
      currentArray[nextIndex].wpid +
      "&category=" +
      activeFilter;
    document.querySelector("#next").setAttribute("href", newUrl);
  } else {
    let newUrl = "subpage.html?index=" + currentArray[nextIndex].wpid;
    document.querySelector("#next").setAttribute("href", newUrl);
  }
  console.log(newUrl);
}

function previousProject() {
  console.log("next");
  //index--;

  const thisIndex = currentArray.findIndex(pr => pr.wpid == index);
  const nextIndex = thisIndex - 1;
  if (nextIndex < 0) {
    nextIndex = currentArray.length - 1;
  }
  // displayProject(currentArray);
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
    infos_container.classList.add("extendInfos");
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
      infos_container.classList.remove("extendInfos");
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
