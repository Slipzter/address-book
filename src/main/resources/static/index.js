const form = document.querySelector(".form");
const showBtn = document.querySelector(".show-contacts-btn");
const footer = document.querySelector("footer");

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
      throw new Error('Failed to create contact');
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

function addElements(object) {

  for (let i = 0; i < object.length; i++) {
    let newH2 = document.createElement("h2");

    let newContent = document.createTextNode("Name: " + object[i].name + ", " + "Address: " + object[i].address);
  
    newH2.appendChild(newContent);
  
    document.body.insertBefore(newH2, footer);
  }
}

function removeAllChildren(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

