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
        const users=response.data;
            displayOnScreen(users);
    })
    .catch((error)=>console.log(error));

    event.target.reset();
}

function displayOnScreen(userDetails){
    const UL=document.querySelector("ul");
    const list=document.createElement("li");
    list.innerText=`${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;
    UL.appendChild(list);

    const del_btn=document.createElement("button");
    del_btn.className="del_btn";
    del_btn.innerText="Delete";
    list.appendChild(del_btn);

    const edit_btn=document.createElement("button");
    edit_btn.className="edit_btn";
    edit_btn.innerText="Edit";
    list.appendChild(edit_btn);

    edit_btn.addEventListener("click",()=>{
        document.getElementById("username").value = userDetails.username;
        document.getElementById("email").value = userDetails.email;
        document.getElementById("phone").value = userDetails.phone;

        UL.removeChild(list);
        axios   
            .delete(`https://crudcrud.com/api/2fec14be947e4ae4afeb0d16e8dff17d/appointmentData/${userDetails._id}`)
            .then(()=>console.log("User ready for edit"))
            .catch((error)=> console.log(error));
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
