"use strict";

export let urlParams = new URLSearchParams(window.location.search);
export let cat = urlParams.get("category");
export let activeFilter = cat;
export let imgArray;
export let currentArray = [];

let json_link =
  "https://portfolio-backend.mathildefrachon.com/wp-json/wp/v2/projects?_embed&per_page=20";

let loader = document.querySelector(".loader");
let imgVert = document.querySelector(".imgVert");
let imgWrap = document.querySelector(".imgwrapper");
const gallery = document.querySelector("#gallery");

window.addEventListener("DOMContentLoaded", init);

/* THIS IS AFTER CLICKING ON A PROJECT / SUBPAGE */

if (cat) {
  json_link = json_link + "&categories=" + cat;
}

// CREATE OBJECT PROJECT

const objProject = {
  name: "",
  subtitle: "",
  type: "",
  description: "",
  keywords: "",
  image: "",
  category: "",
  relatedpost: {
    title: "",
    url: ""
  },
  otherimages: [],
  id: null,
  wpid: null
};

let project = "";
const projectsArray = [];

function init() {
  // fetch JSON
  fetch(json_link)
    .then(e => e.json())
    .then(data => buildList(data));
}

// BUILD THE ARRAY OF PROJECTS
function buildList(data) {
  console.log(data);
  data.forEach(dataProject => {
    project = Object.create(objProject);
    project.name = dataProject.title.rendered;
    project.wpid = dataProject.id;
    project.image =
      dataProject._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.full.source_url;
    project.subtitle = dataProject.acf.subtitle;
    project.type = dataProject.acf.type;
    project.description = dataProject.acf.description;
    project.keywords = dataProject.acf.keywords;
    project.otherimages = [
      {
        url:
          dataProject._embedded["wp:featuredmedia"][0].media_details.sizes.full
            .source_url
      }
    ];
    project.category = dataProject.categories;
    for (var key in dataProject.acf) {
      if (key.startsWith("other_images") && dataProject.acf[key]) {
        project.otherimages.push(dataProject.acf[key]);
      }
    }
    projectsArray.push(project);
    project.id = projectsArray.indexOf(project);
  });
  currentArray = projectsArray;

  displayArray(currentArray);
}

// DISPLAY THE ARRAY IN GALLERY AND IN SUBPAGE
function displayArray(currentArray) {
  let urlParams = new URLSearchParams(window.location.search);
  let urlIndex = urlParams.get("index");
  if (urlIndex === null) {
    displayList(currentArray);
    console.log("we are on gallery");
  } else {
    displayProject(currentArray);
    console.log("we are on subpage");
  }
}

// DISPLAY ARRAY IN THE GALLERY
function displayList(listOfProjects) {
  currentArray = listOfProjects;
  //CLEAR THE TABLE
  clearList();
  // CLONE FOR EACH PROJECT
  cloneProject(listOfProjects);
}

//CLONE BY PROJECT AND APPEND
function cloneProject(listOfProjects) {
  listOfProjects.forEach(oneProject => {
    let template = document.querySelector("#project-template").content;
    let clone = template.cloneNode(true);
    // FILL IN THE CLONE
    imgLoaded(clone, oneProject);
    // APPEND
    gallery.appendChild(clone);
  });
}

//WHEN IMG LOADED GIVE SRC AT PROJECT IMG + TAKE OUT LOADER
function imgLoaded(clone, oneProject) {
  let downloadingImage = new Image();
  let loader = clone.querySelector(".loader");
  let projectImg = clone.querySelector(".project-img");
  let projectWrap = clone.querySelector(".project-wrapper");
  let projectTitle = clone.querySelector("h2");

  downloadingImage.onload = function() {
    loader.classList.add("none");
    projectWrap.classList.remove("width-load");
    projectImg.classList.remove("none");
    checkImgOrientation(downloadingImage, projectImg, projectWrap);
  };
  downloadingImage.src = oneProject.image;
  let source = downloadingImage.src;
  displayImg(oneProject, projectImg, projectWrap, source, projectTitle);
}

// GIVE PORTRAIT OR LANDSCAPE CLASS
function checkImgOrientation(downloadingImage, projectImg, projectWrap) {
  //   console.log(myProject);
  if (downloadingImage.naturalWidth > downloadingImage.naturalHeight) {
    console.log("landscape img");
    projectImg.classList.remove("portrait");
    projectImg.classList.add("landscape");

    //for mobile
    if (window.innerWidth < 1000) {
      projectImg.style.marginBottom = "20%";
      projectWrap.style.height = "30vh";
    }
  } else if (downloadingImage.naturalWidth < downloadingImage.naturalHeight) {
    console.log("portrait img");
    projectImg.classList.add("portrait");
    projectImg.classList.remove("landscape");
  }
}

// GIVE SOURCE TO projectImg IN HTML + TITLE + ID AND WPID TO EACH CLONE
function displayImg(oneProject, projectImg, projectWrap, source, projectTitle) {
  //console.log(projectImg);
  projectImg.setAttribute("src", source);
  projectTitle.innerHTML = oneProject.name;
  projectImg.dataset.projectId = oneProject.id;
  projectImg.dataset.wpid = oneProject.wpid;
}

// CLEAR THE ARRAY
function clearList() {
  gallery.innerHTML = "";
}

// ------------------- FILTER THE ARRAY ------------------------- //
// let filterScreen = document.querySelector("#filter-screen");
// let filterContent = document.querySelector("#filter-wrapper");
// import closeSide from "./navigation.js";

// SET ACTIVE FILTER NUMBER
export function clickedFilter(event) {
  console.log("clickedFilter");
  console.log(this);
  const filter = this.dataset.filter;

  activeFilter = filter;
  event.preventDefault(); // PREVENT FROM GOIN BACK TO BEGINNING AFTER FILTERING
  currentArray = filterByCat(filter);
  console.log(currentArray);
  displayArray(currentArray, filter);
  document.querySelector("#filter-wrapper").classList.toggle("opacity");
  setTimeout(function() {
    if (window.innerWidth > 1000) {
      document.querySelector("#filter-screen").classList.toggle("extend-side");
    }
    // FOR MOBILE
    if (window.innerWidth < 1000) {
      document
        .querySelector("#filter-screen")
        .classList.toggle("extendMobileInfos");
    }
    document.querySelector("#filter-screen").classList.toggle("width0");
  }, 500);
}

// FILTER THE ARRAY AND RETURN IT
function filterByCat(filter) {
  currentArray = projectsArray.filter(byCat);

  function byCat(project) {
    if (project.category.toString() === filter.toString()) {
      return true;
    } else {
      return false;
    }
  }
  return currentArray;
}

// SET URL SUBPAGE WITH WPID OF POST OR FILTER OF CATEGORY
export function clickedPost(event) {
  const postClicked = event.target;
  console.log(postClicked);
  let index = postClicked.dataset.wpid;
  console.log(index);
  let url = "subpage.html?index=" + index;
  if (activeFilter) {
    url += "&category=" + activeFilter;
  }
  postClicked.parentElement.setAttribute("href", url);
}

/* ----------------- DISPLAY PROJECT SUBPAGE ---------------- */

/* DISPLAY THE CLICKED PROJECT */

function displayProject(currentArray) {
  //FIND THE RIGHT PROJECT
  let index = urlParams.get("index");
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
  imgArray = myProject.otherimages;
  const dot_nav = document.querySelector("#dot_nav");
  console.log("create dots");

  imgArray.forEach(img => {
    let dot = document.createElement("div");
    dot.classList.add("point");
    dot.id = "dot" + imgArray.indexOf(img);
    dot_nav.appendChild(dot);
  });
  document.querySelector("#dot0").classList.add("dotActive");
}
