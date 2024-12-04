function handleFormSubmit(event) {
    event.preventDefault();

    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value
    };

    axios
        .post("https://crudcrud.com/api/2fec14be947e4ae4afeb0d16e8dff17d/appointmentData", userDetails)
        .then((response) => {
            displayOnScreen(response.data);
        })
        .catch((error) => console.log(error));

  
    event.target.username.value = "";
    event.target.email.value = "";
    event.target.phone.value = "";
}

function displayOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
        document.createTextNode(`${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`)
    );

    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
}


document.addEventListener("DOMContentLoaded", () => {
    axios
        .get("https://crudcrud.com/api/2fec14be947e4ae4afeb0d16e8dff17d/appointmentData")
        .then((response) => {
            const users = response.data;
            users.forEach((user) => {
                displayOnScreen(user); 
            });
        })
        .catch((error) => console.log(error));
});
  
  // Do not touch the code below
  module.exports = handleFormSubmit;