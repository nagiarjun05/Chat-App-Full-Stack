const create=document.getElementById('submit');

const groupname=document.getElementById('group-name');


const token=localStorage.getItem('token');


create.addEventListener('click',(e)=>{
    e.preventDefault()
    axios({
        method:'post',
        url:`http://localhost:3000/users/creategroup`,
        data:{
            name: groupname.value
        },
        headers:{'Authorization':token}
    })
    .then((res)=>{
        console.log(res);
        window.location.href="/chat.html"
    })
    .catch((err)=>{
        showError(err.data)
    })
});


function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
};