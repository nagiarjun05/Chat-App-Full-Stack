const msgsend=document.getElementById("sendBtn");

const msg=document.getElementById('textmsg');

const logout=document.getElementById('logout');

const chat=document.getElementById('chat');

const userList=document.getElementById('user-list');

const token=localStorage.getItem('token');

window.addEventListener('load', ()=>{
    showMessages()
    // setInterval(()=>{
    //     showMessages()
    // },1000)
});


const showMessages=function (){
    axios({
        method:'get',
        url: `http://localhost:3000/users/getmsgs`,
        headers:{'Authorization':token}
    })
    .then(res=>{
        chat.innerHTML='';
        res.data.Messages.forEach(element => {
            var li = document.createElement('li');
            li.className='msgs';
            li.innerHTML=`User ${element.userId} -    Message is "${element.message}"`;
            
            li.value=`${element.id}`;
                
            chat.appendChild(li);
        });
        userList.innerHTML='';
        res.data.Users.forEach(element => {
            var li = document.createElement('li');
            li.className='user-list-item';
            li.innerHTML=`User ${element.name} and id is "${element.id}"`;
            
            li.value=`${element.id}`;
                
            userList.appendChild(li);
        });
    }).catch(err=>showError(err));
};

msgsend.addEventListener('click', (e)=>{
    e.preventDefault();
    const msgToSend=msg.value
    if (!msgToSend){
        alert("You should enter some message before sending.")
    }
    axios({
        method:'post',
        url:`http://localhost:3000/users/msg`,
        data:{
            msg: msgToSend
        },
        headers:{'Authorization':token}
    })
    .then((res)=>{
        alert(res.data.message)
        showMessages()
    })
    .catch((err)=>{
        showError(err.data)
    })
    // if(localStorage.getItem('message')){
    //     localStorage.setItem('message',localStorage.getItem('message')+'-'+msgToSend)
    // }else{
    //     localStorage.setItem('message',msgToSend)
    // }
});

// logout.addEventListener('click',(e)=>{
//     showMessages()
// })