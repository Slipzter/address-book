const form = document.querySelector(".form");
const showBtn = document.querySelector(".show-contacts-btn");
const aside = document.querySelector(".aside");

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
  .catch(error => {
    console.log("Error, unable to connect to API")
  });
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

