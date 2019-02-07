"use strict";

let json_link =
  "https://portfolio-backend.mathildefrachon.com/wp-json/wp/v2/projects?_embed&per_page=20";
let urlParams = new URLSearchParams(window.location.search);

const gallery = document.querySelector("#gallery");

window.addEventListener("DOMContentLoaded", init);

/* THIS IS AFTER CLICKING ON A PROJECT / SUBPAGE */
let cat = urlParams.get("category");
let activeFilter = cat;
if (cat) {
  console.log("array have a category : " + cat);
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
let currentArray = [];

function init() {
  // fetch JSON
  fetch(json_link)
    .then(e => e.json())
    .then(data => buildList(data));
}

// BUILD THE ARRAY OF PROJECTS
function buildList(data) {
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
    project.otherimages = [];
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
    // let projectWrap = clone.querySelector(".project-wrapper");
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
  console.log(projectImg);
  projectImg.setAttribute("src", source);
  projectImg.classList.remove("none");
  projectWrap.classList.remove("width-load");
  projectTitle.innerHTML = oneProject.name;
  projectImg.dataset.projectId = oneProject.id;
  projectImg.dataset.wpid = oneProject.wpid;
}

// CLEAR THE ARRAY
function clearList() {
  gallery.innerHTML = "";
}

// ------------------- FILTER THE ARRAY ------------------------- //

// SET ACTIVE FILTER NUMBER
function clickedFilter(event) {
  console.log("clickedFilter");
  console.log(this);
  const filter = this.dataset.filter;

  activeFilter = filter;
  event.preventDefault(); // PREVENT FROM GOIN BACK TO BEGINNING AFTER FILTERING
  currentArray = filterByCat(filter);
  console.log(currentArray);
  displayArray(currentArray, filter);
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
function clickedPost(event) {
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
