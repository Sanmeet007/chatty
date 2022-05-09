let template = document.createElement('template');

template.innerHTML =
`

<!-- FontAwsome icons  CSS and JavaScript -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/regular.min.js" type="text/javascript" charset="utf-8"></script>

<!-- CSS-->

<style>

* {
font-family: 'Roboto', sans-serif;
box-sizing: border-box;
}
:host{
display: none;
transition: all 0.2s ease;
}
.messages {
background: #071820;
color: white;
padding: 20px;
text-align: center;
position: relative;
height: calc(100vh - 70px);
overflow-y: scroll;
padding-bottom: 70px;
background-image: url(src/img/background.png);
background-repeat: no-repeat;
background-size: 100%;
}
.header , .footer {
height: 70px;
background: rgb(35,45,54);
}
.footer {
display: flex;
padding: 10px;
align-items: center;
gap: 8px;
background: rgba(0,0,0,0.2);
position: fixed;
bottom: 0;
right: 0;
left: 0;
height:auto;
}

.textarea::-webkit-scrollbar {
    display: none;
}
.textarea {
flex-basis: 100%;
font-size: 1em;
border-radius: 20px;
outline: none;
padding: 12px 15px;
padding-left: 50px;
padding-right: 50px;
background: #2D383E;
border: none;
color: rgb(200,201,203);
font-weight: 500;
max-height: 135px;
overflow-y: scroll;
}

[placeholder]:empty::before {
    content: attr(placeholder);
    color: rgb(186,186,186); 
}

[placeholder]:empty:focus::before {
    content: "";
}

.flex {
flex-basis: auto;
flex-grow:1;
display: flex;
position: relative;
}
.emoji {
position: absolute;
width: 35px;
color: rgb(200,201,203);
height: 35px;
background: rgba(0,0,0,0.05);
transform: translate(5px , 5px);
font-size: 1.2em;
}
.attach {
position: absolute;
right: 0;
width: 35px;
height: 35px;
background: none;
color: grey;
transform: translate(-5px , 5px);
}

div button {
width: 42px;
height: 42px;
border-radius: 50%;
border: none;
background: #00B09C;
color: white;
font-size: 1em;
}

.header {
display: flex;
align-items: center;
color: white;
font-size: 1.1em;
gap: 10px;
padding: 10px 10px;
background: rgba(35,45,54);
box-shadow: 1px 1px 4px 0 rgba(0,0,0,.2);
}
.img {
background: grey;
border-radius: 50%;
width: 45px;
height: 45px;
overflow: hidden;
}
.img img{
object-fit: cover;
}
.header button {
background: rgba(0,0,0,0.1);
font-size: 0.8em;
}
.fa-phone {
transform: rotate(90deg);
}

.status {
display: block;
margin: 2px;
font-size: 0.65em;
}
::slotted(.date){
display: inline-block;
background: #3B444B;
padding: 5px 8px;
color: #c6c6c6;
border-radius: 5px;
font-size: 0.9em;
}
.header > *{
flex-basis: auto;
flex-shrink: 0;
}
.name{
flex-grow: 1;
flex-shrink:1;
}
.options {
display: flex;
gap: 10px;
}
@media screen and (max-width: 370px){
.name {
font-size: 14px
}
}
@media screen and (max-width: 271px){
.header > *{
flex-basis: auto;
flex-shrink: 1;
}
}


 .name:after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0,0,0);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s ease;
  }
 .name:active::after {
    opacity: 0.1;
  }
  
button{
  position: relative;
  overflow: hidden;
}
button:after{
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255,255,255);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.1s ease-in;
}

button:active::after {
  opacity: 0.1;
}

</style>

<!-- HTML -->
<attachment-modal open="hidden"></attachment-modal>
<user-profile></user-profile>

<div class="header">
<button onclick="closeMessenger()"> <i class="fas fa-arrow-left"></i></button>
<div class="img">
<img src="./src/img/person.png" alt="DP" width="100%" height="100%" />
</div>
<div class="name">
<span style="pointer-events:none" id="name"> </span>
<span style="pointer-events:none" class="status online" aria-label="status" id="status"></span>
</div>
<div class="options">
<button id="make-call"><i class="fas fa-phone"></i></button>
<button id="video-call"><i class="fas fa-video"></i></button>
</div>
</div>
<div class="messages" id="mes">
<slot name="message"></slot>
</div>

<form class="footer">
<div class="flex">
<button class="emoji"> <i class="fas fa-grin"></i></button>

<div contenteditable="true" class="textarea" placeholder="Type a message..."></div>

<button class="attach" id="attach-something"> <i class="fa fa-paperclip" aria-hidden="true"></i></button>
</div>
<div>
<button type="submit" id="submit"> <i class="fa fa-paper-plane" aria-hidden="true"></i> </button>
</div>
</form>

`;

export class Messenger extends HTMLElement {
  static get observedAttributes() {
    // add observation to attrs
    return ['status',
      'name',
      'src',
      "unread"];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.dp = this.getAttribute("src");
    this.messageDates = [];
    this.unreadMessages = 0;
   
    const profile = this.shadowRoot.querySelector('user-profile');
     
    const name =  this.shadowRoot.querySelector('.name');
    name.addEventListener('click', function(e){
    
  
      const span = document.createElement('span');
      name.style.position = "relative";
      name.style.overflow = "hidden";
      span.style.cssText =
      `
      position: absolute;
      background: red;
      display: block;
      width: 500%;
      height: 500%;
      transform: translate(-50%, -50%);
      clip-path: circle( 20px at 50%  50%);
      top : ${e.offsetY}px;
      left : ${e.offsetX}px;
      background: rgba(255,255,255,.2);
      transition: clip-path 0.5s ease-in;
      `;
      name.appendChild(span);
      setTimeout(function() {
        span.style.clipPath = "circle(100% at 50%  50%)";
      }, 0);
      setTimeout(function() {
        span.remove();
         profile.setAttribute('display', 'true');
      }, 450);
   
 
    }.bind(this));
   
  }

  scrollToBottom() {
    let objDiv = this.shadowRoot.querySelector('.messages');
    let len = this.children.length;
    setTimeout(function() {

      this.children[len - 1].scrollIntoView({
        behaviour: "smooth"
      });
    }.bind(this), 10);
  }
  
 setProfile(data){
    this.shadowRoot.querySelector('user-profile').updateProfile(data);
  }

  connectedCallback () {
    // fires when element is connected to DOM
    if(this.dp){
    this.shadowRoot.querySelector('.img  img').src = this.dp;
    }
    this.shadowRoot.querySelector('attachment-modal').setAttribute('attachid' , this.getAttribute("id"));
    
    this.shadowRoot.querySelector('#name').innerText = this.getAttribute('person');

    this.shadowRoot.querySelector('#status').innerText = this.getAttribute('status');
    this.setAttribute("unread", "0");


    this.shadowRoot.querySelector('.emoji').addEventListener('click', (e)=> {
      e.preventDefault();
    });

    this.shadowRoot.querySelector('.attach').addEventListener('click', (e)=> {
      e.preventDefault();
    });

    const form = this.shadowRoot.querySelector('form');

    const submitBtn = this.shadowRoot.querySelector('#submit');
     const textarea = this.shadowRoot.querySelector('.textarea');


    form.addEventListener('submit', (e)=> {
      e.preventDefault();
      const value = textarea.innerText;
      const uid = this.getAttribute("id");

      const obj = {
        uid: uid,
        value: value,
        button: submitBtn,
        textarea: textarea
      };
      submitData(obj);
    });

    textarea.addEventListener('click', ()=> {
      setTimeout(function() {
        this.children[this.children.length - 1].scrollIntoView({
          behaviour: "smooth"
        });
      }.bind(this), 500);
    });
    
    const modal = this.shadowRoot.querySelector('attachment-modal');
    
    this.shadowRoot.querySelector('#attach-something').addEventListener('click' , function (){
       modal.setAttribute("open", "visible");
    });
    
    this.shadowRoot.querySelector('#make-call').addEventListener('click' , function (){
        makeCall( "voice", this.getAttribute("id"));
    }.bind(this));
    
    this.shadowRoot.querySelector('#video-call').addEventListener('click' , function (){
        makeCall( "video", this.getAttribute("id"));
    }.bind(this));


  }
  attributeChangedCallback(name, oldValue, newValue) {
    // fires every time attr changes
    switch (name) {
      case 'src':
          if(newValue != null){
            //   console.log(newValue)
        this.shadowRoot.querySelector('.img img').src = newValue;
          }
        break;

      case 'name':
        this.shadowRoot.querySelector('#name').innerText = newValue;
        break;

      case 'status':
        if (newValue === "online") {
          this.shadowRoot.querySelector('#status').innerText = "online";
        } else {
          try {
            let val = parseInt(newValue) * 1000;

            const monthNames = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ];

            val = new Date(val);
            const month = val.getMonth();
            const year = val.getFullYear();
            const date = val.getDate();
            const minutes = val.getMinutes();
            let hours = val.getHours();
            let type = "AM";
            if (hours > 12) {
              hours = hours - 12;
              type = "PM";
            }

            val = `last seen ${date} ${monthNames[month]} ${year}  at ${hours}:${minutes} ${type}`;

            this.shadowRoot.querySelector('#status').innerText = val;
          }catch(e) {
            // console.log(e)
          }
        }
        break;

      case 'unread':
        this.unreadMessages = newValue;
        try {
          document.querySelector(`[uid="${this.id}"`).setAttribute ("unread", newValue);
        }catch(e) {
          //  console.log(e.message);
        }
        break;


      default:
        // code
      }
    }
  }