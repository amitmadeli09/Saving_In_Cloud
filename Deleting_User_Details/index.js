function handleFormSubmit(event) {
    event.preventDefault();

        const userDetails={
            username:event.target.username.value,
            email:event.target.email.value,
            phone:event.target.phone.value
        }
        axios   
            .post("https://crudcrud.com/api/2fec14be947e4ae4afeb0d16e8dff17d/appointmentData",userDetails)
            .then((response)=>{
                displayOnScreen(response.data);
            })
            .catch((error)=>console.log("error"));

            event.target.reset();
  }
  function displayOnScreen(userDetails){
    const UL= document.querySelector("ul");
    const list= document.createElement("li");
    list.innerText=`${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;
    UL.appendChild(list);

    const del_button = document.createElement("button");
    del_button.className = "delete-btn";
    del_button.innerText = "Delete";
    list.appendChild(del_button);

    const edit_Button = document.createElement("button");
    edit_Button.className = "edit-btn";
    edit_Button.innerText = "Edit";
    list.appendChild(edit_Button);

    del_button.addEventListener("click", function() {
        UL.removeChild(list);
        axios
            .delete(`https://crudcrud.com/api/2fec14be947e4ae4afeb0d16e8dff17d/appointmentData/${userDetails._id}`)
            .then(() => console.log("Deleted"))
            .catch(() => console.log("error"));
        });
  }
 
document.addEventListener("DOMContentLoaded",()=>{
    axios
        .get("https://crudcrud.com/api/2fec14be947e4ae4afeb0d16e8dff17d/appointmentData")
        .then((response)=>{
            const users=response.data;
            users.forEach((user)=>{
                displayOnScreen(user);
            });
        })
        .catch((error)=>{
            console.log(error);
        })
})

