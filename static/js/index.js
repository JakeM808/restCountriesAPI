// Add the brew finder when the form submits
const countryInfoForm = document.querySelector("#countryInfoForm");
countryInfoForm.addEventListener("submit", (e) => countryInfo(e, 1));

function countryInfo(event, pageNumber) {
  event.preventDefault();
  // console.dir(event.target.city);
  const name = document.getElementsByName("country")[0].value;
  console.log(`Collecting data on ${name}...`);
  const url = `https://restcountries.com/v3.1/name/{country}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => showCountryInfo(data, pageNumber))
    .catch((err) => console.error(err));
}

function showCountryInfo(data, pageNumber) {
  data.sort((a, b) => {
    if (a.country > b.country) {
      return 1;
    } else if (a.country < b.country) {
      return -1;
    } else {
      return 0;
    }
  });
  let table = document.getElementById("country-table");

  // TODO: Clear out the table of any current data
  clearTable(table);

  // Create the brewery table headers
  const thead = document.createElement("thead");
  table.append(thead);
  let tr = document.createElement("tr");
  thead.append(tr);
  const tableHeadings = [
    "Name",
    "Flag",
    "Coat of Arms",
    "Currencies",
    "Capital",
    "Languages",
  ];
  for (let heading of tableHeadings) {
    let th = document.createElement("th");
    th.scope = "col";
    th.innerText = heading;
    tr.append(th);
  }

  // write a row for each brewery in data
  for (let country of data) {
    let tr = document.createElement("tr");
    table.append(tr);

    const td = document.createElement("td");
    td.innerHTML = `<a href=${country.website_url} target="_blank">${country.name}</a>`;
    tr.append(td);

    newDataCell(tr, country.name);
    newDataCell(tr, country.flag);
    newDataCell(tr, country.coatOfArms);
    newDataCell(tr, country.currencies);
    newDataCell(tr, country.capital);
    newDataCell(tr, country.languages);
  }

  // Add a next button if there is data
  if (data.length == 10) {
    let nextButton = document.createElement("button");
    nextButton.classList.add("prev-next-btn", "btn", "btn-primary");
    nextButton.innerText = "Next";
    nextButton.addEventListener("click", (e) => countryInfo(e, pageNumber + 1));
    table.after(nextButton);
  }

  // Add a previous button for all pages past page 1
  if (pageNumber > 1) {
    let prevButton = document.createElement("button");
    prevButton.classList.add("prev-next-btn", "btn", "btn-danger");
    prevButton.innerText = "Prev";
    prevButton.addEventListener("click", (e) => countryInfo(e, pageNumber - 1));
    table.after(prevButton);
  }
}

// Helper function to create a new data cell for table
function newDataCell(tr, value) {
  let td = document.createElement("td");
  td.innerText = value ?? "-";
  tr.append(td);
}

// Helper function to clear the brewery table
function clearTable(table) {
  table.innerHTML = "";
  const buttonsToClear = document.querySelectorAll(".prev-next-btn");
  for (let btn of buttonsToClear) {
    btn.remove();
  }
}
