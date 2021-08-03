const template = document.createElement('template');
template.innerHTML = 
`

 <!-- FontAwsome icons  CSS and JavaScript -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" type="text/css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/regular.min.js" type="text/javascript" charset="utf-8"></script>
  
  <style>
     .fa-phone {
        transform: rotate(90deg);
      }
     .plus {
       font-size: 0.6em;
       transform: translate(-7px , -8px);
     }
     .floating-btn {
      background: #07AC9B;
      color: white;
      position: fixed;
      bottom: 0;
      right: 0;
      margin: 20px;
      height: 60px;
      width: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
    }
  </style>
  <div class="floating-btn" onclick="customChats()">
    <i class="fas fa-envelope"></i>
  </div>
`;

export class FloatingBtn extends HTMLElement {
  static get observedAttributes() {
    return ['type'];
  }
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
   attributeChangedCallback(name, oldValue, newValue) {
    if(name === "type"){
      if(newValue === "chats"){
       
         this.shadowRoot.querySelector('.floating-btn').setAttribute('onclick' , 'openFragment("chats")');
       
         this.shadowRoot.querySelector('.floating-btn').innerHTML = ` <i class="fas fa-envelope"></i>`;
         
      }
      
      if(newValue === "calls"){
      
         this.shadowRoot.querySelector('.floating-btn').setAttribute('onclick' , 'openFragment("calls")');
       
         this.shadowRoot.querySelector('.floating-btn').innerHTML = ` <i style="color: white" class="fas fa-phone"></i><span class="plus">+</span>`;
     
      }
    }
  }
}
