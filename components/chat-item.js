const template = document.createElement('template');

template.innerHTML = 
`
<style>
:host{
    display: flex;
    background: #101D24;
    color: #D3D7DA;
    align-items: center;
    padding: 0 15px;
    gap: 15px;
    position: relative;
    overflow:hidden;
    user-select: none;
}
  
 .img {
    width: 50px;
    height: 50px;
    background: grey;
    outline: none;
    border-radius: 50%;
    overflow: hidden;
    flex-basis: 50px;
  }
   .img img {
    object-fit: cover;
  }
   .details{
    position: relative;
    padding : 18px 0px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    border-bottom: 1.2px solid #2A373D;
  }
   .title , .last-chat {
    display: block;
  }
  .last-chat {
    margin-top: 8px;
    font-size: 0.8em
  }
  
   .fa-phone {
    transform: rotate(90deg);
    color: #07AC9B;
  }
    .name {
    flex-grow: 1;
    pointer-events: none;
  }
    .last-seen {
    font-size: 0.7em;
    color: #949DA2;
  }
  .new-message:empty{
  display: none
  }
  .new-message{
    pointer-events: none;
    background: #07AC9B;
    color: black;
    margin-left: 15px;
    margin-top: 8px;
    width: 25px;
    height: 25px;
    font-size: 0.8em;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .time{
     pointer-events: none
  }
  </style>

      <div class="img" onclick="showDp(this)" name="">
         <img loading="lazy" src="opm.png" alt="" width="100%" height="100%"/>
      </div>
      <div class="details" onclick="openMessenger('userId')"><!-- click -->
        <div class="name">
          <span class="title"></span>
          <span class="last-chat"> <slot name="last-chat"></slot> </span>
        </div>
        <div class="last-seen">
          <span class="time">
          <slot name="last-seen"></slot>
         </span>
        
          <span class="new-message"></span>
        
        </div>
      </div>
      
`;

export class ChatItem extends HTMLElement {
  static get observedAttributes() {
    return ['uid' , 'src' , 'name' , 'unread'];
  }
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
      
  }
   connectedCallback () {
     this.shadowRoot.querySelector('.title').innerText = this.getAttribute('name');
    const img = this.shadowRoot.querySelector('img');
    this.src =  this.getAttribute('src');
    img.src = this.src;
    
    
   this.addEventListener('click', function(e){
  
     try{

      const span = document.createElement('div');
      this.style.position = "relative";
      this.style.overflow = "hidden";
      
 
   span.style.cssText =
     `
      position: absolute;
      display: block;
      width:  200%;
      height:  200%;
      transform: translate(-50%, -50%);
      clip-path: circle( 50px at 50%  50%);
      top : ${ e.offsetY}px;
      left : ${e.offsetX}px;
      background: rgba(255,255,255,0.2);
      transition: clip-path 0.5s ease-in;
      `;
    this.shadowRoot.appendChild(span);
    
    setTimeout(function() {
        span.style.clipPath = "circle(100% at 50%  50%)";
      }, 0);
      setTimeout(function() {
        span.remove();
      }, 450);
      
     }catch(e){
       console.log(e);
     }
  
    }.bind(this));
  }
 
  attributeChangedCallback(name, oldValue, newValue) {
   
    switch (name) {
      case 'uid':
       this.shadowRoot.querySelector('.details').setAttribute('onclick', "openMessenger("+newValue+")" );
        break;
      
      case 'src':
       this.shadowRoot.querySelector('img').src = newValue;
        break;
        
      case 'unread':
        if(newValue == 0){
         this.shadowRoot.querySelector('.new-message').innerText = "";
        }else{
         this.shadowRoot.querySelector('.new-message').innerText = newValue;
        }
        break;
      
      case 'name':
         this.shadowRoot.querySelector('.title').innerText = newValue;
         this.shadowRoot.querySelector('.img').setAttribute('name' , newValue);
        break;
      
      default:
        // code
    }
  }
}
