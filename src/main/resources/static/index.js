const form = document.querySelector(".form");
const showBtn = document.querySelector(".show-contacts-btn");
const aside = document.querySelector(".aside");
const optionsBtn = document.querySelector(".options-button");
const closeModalBtn = document.querySelector(".close-modal");
const deleteBtn = document.querySelector(".delete-button");
const updateBtn = document.querySelector(".update-button");
const searchBtn = document.querySelector(".search-button");
const searchModal = document.querySelector(".search-modal");
const closeSearchModalBtn = document.querySelector(".close-search-modal");
const searchResult1 = document.querySelector(".search-result1");
const searchResult2 = document.querySelector(".search-result2");
const searchResult3 = document.querySelector(".search-result3");


// Stores user input as JSON objects
form.addEventListener('submit', (e) => {

  const formData = new FormData();

  e.preventDefault();

  formData.append('name', document.querySelector('#nameInput').value);
  formData.append('address', document.querySelector('#addressInput').value);

  fetch('http://localhost:8080/api/address-book', {
    method: 'POST',
    mode: "no-cors",
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to POST data');
      }
      if (response.ok) {
        console.log("Fetch successful");
      }
      return response.json();
    })
    .then(data => {
      returnData = data;
      console.log(data);
      console.log("Contact creation successful")
    })
});

// Fetches stored JSON data, and calls addElements function
showBtn.addEventListener('click', () => {
  fetch('http://localhost:8080/api/address-book', {
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to GET data');
    }
    if (response.ok) {
      console.log("Fetch successful");
    }
    return response.json();
  })
  .then(json => {
    console.log(json);
    addElements(json);
  })
});

// Displays stored JSON objects inside aside, and prints a title
// Then calls removeAllChildNodes to reset the list every time showBtn is pressed
function addElements(object) {

  removeAllChildNodes(aside);

  let newTitle = document.createElement("h1");

  let h1Content = document.createTextNode("Contacts:");

  newTitle.appendChild(h1Content);

  aside.appendChild(newTitle);

  for (let i = 0; i < object.length; i++) {
    let newH3 = document.createElement("h3");

    let newContent = document.createTextNode((i + 1) + ". " + "Name: " + object[i].name + ", " + "Address: " + object[i].address);
  
    newH3.appendChild(newContent);

    aside.appendChild(newH3);
  }
}

// Removes all children inside a parent
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

// Opens options modal
optionsBtn.addEventListener('click', () => {
  let modal = document.querySelector(".modal");
  modal.classList.remove("hidden");
});

// Closes options modal
closeModalBtn.addEventListener('click', () => {
  let modal = document.querySelector(".modal");
  modal.classList.add("hidden");
});

// Delete contact
deleteBtn.addEventListener('click', (e) => {

  let inputId = (document.querySelector("#delete-input-id").value) - 1;

  e.preventDefault();

  console.log(inputId);

  fetch(('http://localhost:8080/api/address-book/' + inputId), {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to GET data');
    }
    if (response.ok) {
      console.log("Fetch successful");
    }
    return response.json();
  })
});

// Update contact
updateBtn.addEventListener('click', (e) => {
  
  const formData = new FormData();
  let inputId = (document.querySelector("#idInputUpdate").value) - 1;

  e.preventDefault();

  formData.append('name', document.querySelector('#nameInputUpdate').value);
  formData.append('address', document.querySelector('#addressInputUpdate').value);

  fetch('http://localhost:8080/api/address-book/' + inputId, {
    method: 'PUT',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to POST data');
      }
      if (response.ok) {
        console.log("Fetch successful");
      }
      return response.json();
    })
    .then(data => {
      returnData = data;
      console.log(data);
      console.log("Contact updated successfully")
    })
});

// Find contact
searchBtn.addEventListener('click', (e) => {

  e.preventDefault();

  let input = document.querySelector("#search-input").value;

  searchModal.classList.remove("hidden");

  fetch('http://localhost:8080/api/address-book', {
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to GET data');
    }
    if (response.ok) {
      console.log("Fetch successful");
    }
    return response.json();
  })
  .then(json => {
    console.log(json);
    for (let i = 0; i < json.length; i++) {
      if ((json[i].name).toUpperCase() == input.toUpperCase() || (json[i].address).toUpperCase() == input.toUpperCase()) {
        console.log("Contact: " + json[i].name + ", " + json[i].address + ", Id: " + json[i].id);
        searchResult1.innerHTML = "Id: " + json[i].id;
        searchResult2.innerHTML = "Name: " + json[i].name;
        searchResult3.innerHTML = "Address: " + json[i].address;
      }
    }
  })
});

closeSearchModalBtn.addEventListener('click', () => {
  let modal2 = document.querySelector(".search-modal");
  modal2.classList.add("hidden");
});

// TODO: Final styling




