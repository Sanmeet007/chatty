const template = document.createElement('template');

template.innerHTML = 
`

     <!-- FontAwsome icons  CSS and JavaScript -->
     
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" type="text/css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/regular.min.js" type="text/javascript" charset="utf-8"></script>
    
     <style>
    :host {
      display: flex;
      background: #101D24;
      color: #D3D7DA;
      align-items: center;
      padding: 0 15px;
      gap: 15px;
      position: relative;
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
      .details {
        position: relative;
        padding: 18px 0px;
        flex-grow: 1;
        display: flex;
        align-items: center;
        border-bottom: 1.2px solid #2A373D;
      }
      .title , .last-chat {
        display: block;
      }
      .last-call {
        margin-top: 10px;
        font-size: 0.8em;
        display: block;
      }
    
      .fa-phone {
        transform: rotate(90deg);
        color: #07AC9B;
      }
      .name {
        flex-grow: 1;
      }
    
      .phone-call {
        margin-left: 40px
      }
      .phone-call button {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: none;
        outline: none;
        border: none;
        font-size: 1em;
      }
    
    </style>
    
    
    <div class="img" onclick="showDp(this)">
      <img src="opm.png" alt="" width="100%" height="100%" />
    </div>
    <div class="details" onclick="openMessenger('unknown')">
      <!-- click -->
      <div class="name">
        <span class="title"></span>
        <span class="last-call">
          <slot name="last-call"></slot>
        </span>
      </div>
      <div class="phone-call">
        <button><i class="fas fa-phone"></i></button>
      </div>
    </div>

      
`;

export class Callitem extends HTMLElement {
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
    img.src = this.getAttribute('src');
     
    this.name =  this.getAttribute('name');
    this.userId  = this.getAttribute('user-id');
     const element =   this.shadowRoot.querySelector('.img');
  
    element.setAttribute ('name' , this.name);
    element.setAttribute ('user-id' , this.userId);
    
      
    this.shadowRoot.querySelector('.details').setAttribute('onclick', "openMessenger("+this.userId+")" );
  }
}
