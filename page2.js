const regionFilter = document.getElementById("region");
const modelFilter = document.getElementById("model");
const table = document.querySelector(".table-container");

let data = [
  { region: "US", model: "A", sales: 150 },
  { region: "US", model: "B", sales: 120 },
  { region: "US", model: "C", sales: 350 },
  { region: "EU", model: "A", sales: 200 },
  { region: "EU", model: "B", sales: 100 },
  { region: "EU", model: "C", sales: 250 },
  { region: "CA", model: "A", sales: 200 },
  { region: "CA", model: "B", sales: 100 },
  { region: "CA", model: "C", sales: 230 },
  { region: "CA", model: "D", sales: 400 },
];

function renderDropDown(optionsList) {
  let options = "";
  Object.keys(optionsList).forEach((key) => {
    options += `<option value=${key}>${key}</option>`;
  });
  return options;
}

// create model, region obj
let modelObj = { All: "All" };
let regionObj = { All: "All" };

data.forEach((elem) => {
  if (!modelObj[elem.model]) {
    modelObj[elem.model] = elem.model;
  }
  if (!regionObj[elem.region]) {
    regionObj[elem.region] = elem.region;
  }
});

// render dropdown list
modelFilter.innerHTML = renderDropDown(modelObj);
regionFilter.innerHTML = renderDropDown(regionObj);

let filteredData = [];
let rows = "";
data.forEach((elem) => {
  rows += `<tr>
        <td>${elem.region}</td>
        <td>${elem.model}</td>
        <td>${elem.sales}</td>
      </tr>
    `;
});

filteredData = [...data];
modelFilter.addEventListener("change", (e) => {
  rows = "";
  if (regionFilter.value === "All") {
    filteredData = [...data];
    filteredData = data.filter((obj) => obj.model === e.target.value);
  } else if (e.target.value === "All" && regionFilter.value !== "All") {
    filteredData = [...data];
    filteredData = data.filter((obj) => obj.model === regionFilter.value);
  } else {
    filteredData = [...data];
    filteredData = filteredData.filter(
      (obj) => obj.region === regionFilter.value
    );
    filteredData = filteredData.filter((obj) => obj.model === e.target.value);
  }
  console.log(filteredData);
  filteredData.forEach((elem) => {
    rows += `<tr>
      <td>${elem.region}</td>
      <td>${elem.model}</td>
      <td>${elem.sales}</td>
    </tr>
  `;
  });
});

regionFilter.addEventListener("change", (e) => {
  rows = "";
  if (modelFilter.value === "All") {
    filteredData = [...data];
    filteredData = data.filter((obj) => obj.region === e.target.value);
  } else if (e.target.value === "All" && modelFilter.value !== "All") {
    filteredData = [...data];
    filteredData = data.filter((obj) => obj.model === modelFilter.value);
  } else {
    filteredData = [...data];
    filteredData = filteredData.filter(
      (obj) => obj.model === modelFilter.value
    );
    filteredData = filteredData.filter((obj) => obj.region === e.target.value);
  }
  filteredData.forEach((elem) => {
    rows += `<tr>
        <td>${elem.region}</td>
        <td>${elem.model}</td>
        <td>${elem.sales}</td>
      </tr>
    `;
  });
});

// render table
window.addEventListener("load", (event) => {
  table.innerHTML = `<tr>
      <th>Region</th>
      <th>Model</th>
      <th>Sales</th>
    </tr>
    ${rows}`;
});
