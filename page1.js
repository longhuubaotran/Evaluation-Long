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

// Calculate the some for each regions
let sumRegion = {}; // {US:620,EU:550,CA:930}
data.forEach((elem) => {
  // If region doesn't exist, create key
  if (!sumRegion[elem.region]) {
    sumRegion[elem.region] = elem.sales;
  } else {
    // Region exist, add sales to it
    sumRegion[elem.region] += elem.sales;
  }
});

const tempArr = [];
// create array of keys from sumRegion Object
const keyArr = Object.keys(sumRegion);
for (let i = 0; i < keyArr.length; i++) {
  // Create temp obj with same format as given data
  // push temp obj to tempArr
  let tempObj = {};
  tempObj["region"] = keyArr[i];
  tempObj["model"] = "sum";
  tempObj["sales"] = sumRegion[keyArr[i]];
  tempArr.push(tempObj);
}

// insert to given data
data = [...tempArr, ...data];

// render table
window.addEventListener("load", (event) => {
  let rows = "";
  // create rows template
  data.forEach((elem) => {
    rows += `<tr>
      <td>${elem.region}</td>
      <td>${elem.model}</td>
      <td>${elem.sales}</td>
    </tr>
  `;
  });
  table.innerHTML = `<tr>
    <th>Region</th>
    <th>Model</th>
    <th>Sales</th>
  </tr>
  ${rows}`;
});
