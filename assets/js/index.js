// Print hello on console log (1)

console.log("hello");

// Print some text (3)

console.log("Module 1 Technical Interview");
console.log("Learner name: Ha Minh Anh");
const date = new Date();
console.log(
  `Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
);

const BASE_URL = "https://frcz3.sse.codesandbox.io/";

// Get api to see job data (4)

const getJobData = async () => {
  try {
    let response = await fetch(`${BASE_URL}jobs`);
    if (response.ok) {
      let data = await response.json();
      // console.log("data", data);
      return data;
    }
    return [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

//answer
getJobData();

// (5)

const ulContain = document.querySelector(".contain-title");
const titleOfJobs = [];

const get10TitleOfJob = async () => {
  try {
    let result = await getJobData();
    if (result.length !== 0) {
      for (let i = 0; i < 10; i++) {
        let liElement = document.createElement("li");
        liElement.textContent = result[i]["title"];
        ulContain.appendChild(liElement);
      }
    }
    return 0;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};

// answer
// get10TitleOfJob();

// (7)

let number = 0;
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const getTitleOfJob = async () => {
  try {
    let result = await getJobData();
    if (result.length !== 0) {
      console.log(number);
      if (number < 0) {
        number = 0;
      } else if (number > 5485) {
        number = 5485;
      }
      ulContain.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        let liElement = document.createElement("li");
        liElement.textContent = result[i + number]["title"];
        ulContain.appendChild(liElement);
      }
    }
    return 0;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};

//answer
prev.addEventListener("click", () => {
  number -= 10;
  getTitleOfJob();
});

next.addEventListener("click", () => {
  number += 10;
  getTitleOfJob();
});

// (8)

const oneFetch = async (page, limit) => {
  try {
    let response = await fetch(`${BASE_URL}jobs?_page=${page}&_limit=${limit}`);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      return data;
    }
    return [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

// answer
// oneFetch(1, 30);

// (10)

const queryBySearch = async (searchString) => {
  try {
    let response = await fetch(`${BASE_URL}jobs?q=${searchString}&_limit=10`);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      return data;
    }
    return [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

// queryBySearch("Full-stack Engineer (ReactJS, NodeJS)");

const applyToPage = async (searchString) => {
  try {
    let listOfResult = await queryBySearch(searchString);
    if (listOfResult.length === 0) {
      alert("Không tìm thấy");
    } else {
      ulContain.innerHTML = "";
      listOfResult.forEach((element) => {
        let liElement = document.createElement("li");
        liElement.textContent = element["title"];
        ulContain.appendChild(liElement);
      });
    }
    return 0;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};

// answer
const searchText = document.getElementById("search-text");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  let searchQuery = searchText.value.trim();
  if (!searchQuery) {
    alert("Hãy nhập thông tim tìm kiếm vào ô");
  } else {
    applyToPage(searchQuery);
  }
});

// (11)

const oneFunction = async (page, limit, searchString) => {
  try {
    let response = await fetch(
      `${BASE_URL}jobs?_page=${page}&_limit=${limit}&q=${searchString}`
    );
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      return data;
    }
    return [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

// answer
// oneFunction(2, 10, "Full-stack Engineer (ReactJS, NodeJS)");

// (12)

const renderTitleList = async (page, limit, searchString) => {
  let data;
  if (!searchString) {
    try {
      let response = await fetch(
        `${BASE_URL}jobs?_page=${page}&_limit=${limit}`
      );
      if (response.ok) {
        data = await response.json();
      } else return 0;
    } catch (error) {
      console.log(error.message);
      return 0;
    }
  } else {
    try {
      let response = await fetch(
        `${BASE_URL}jobs?_page=${page}&_limit=${limit}&q=${searchString}`
      );
      if (response.ok) {
        data = await response.json();
      } else return 0;
    } catch (error) {
      console.log(error.message);
      return 0;
    }
  }
  if (data.length === 0) {
    alert("Không tìm thấy thông tin");
  } else {
    ulContain.innerHTML = "";
    data.forEach((element) => {
      let liElement = document.createElement("li");
      liElement.textContent = element["title"];
      ulContain.appendChild(liElement);
    });
  }
  return 0;
};

// answer
renderTitleList(1, 10, "Full-stack Engineer (ReactJS, NodeJS)");
