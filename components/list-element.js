let template = document.createElement('template');

template.innerHTML =
`

  <!-- FontAwsome icons  CSS and JavaScript -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" type="text/css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/regular.min.js" type="text/javascript" charset="utf-8"></script>
  
  <style>
    *{
      font-family: 'Roboto', sans-serif;
      box-sizing: border-box;
    }
    :host{
      display: block;
      width: max-content;
      margin-block: 20px;
      padding: 10px;
      border-radius: 15px;
      word-wrap: break-word;
      position: relative;
      overflow: hidden;
    }
     :host([type="main"]) {
      margin-left: 0px;
      text-align: left;
      max-width: 70%;
      background  : #212E36;
      border-top-left-radius: 0px;
    }
    :host([type="replier"]) {
      margin-left: auto;
      text-align: left;
      max-width: 70%;
      background:  #044740;
      color: #C8E1DE;
      border-top-right-radius: 0px;
    }
    .time,
    .info{
      display: block;
    }
    .time{
      text-align: right;
      font-size: 0.7em;
      margin-top: 5px;
    }
    :host([read=true]) .sent{
       color: #70b6fa;
    }
    ::slotted(img){
      object-fit: contain;
      min-width: 150px;
      min-height: 150px;
      width: 100%;
      aspect-ratio: 1;
      background: black;
    }
    ::slotted(audio){
      display: block;
      min-width: 225px;
      width: 50vw;
      background: black;
      padding: 5px;
    }
    ::slotted(video){
      object-fit: contain;
      min-width: 150px;
      min-height: 150px;
      width: 100%;
      aspect-ratio: 1;
      background: black;
    }
    .right{
       position: absolute;
       left:0;
       transform: translateY(-16px);
       font-size: 0.75em;
       margin-left: 15px;
    }
    ::slotted(.document){
      display: block;
      border-bottom: 1.2px solid rgba(192,192,192,0.349);
      min-width: 225px;
      width: 50vw;
      padding-bottom: 6px;
      margin-bottom: 8px;
    }
  </style>
  
  <div>
      <span class="info">
        <slot name="message"></slot>
      </span>
      <span class="time"> 
        <slot name="time"></slot>
       <span id="sent"> <slot name="sent"></slot></span>
      </span>
       <span class="right">
        <slot name="size"></slot>
       </span>
  </div>
  
`;

export class ListElement extends HTMLElement {
   static get observedAttributes() {
    return ['read'];
  }
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
 
   const observer = new IntersectionObserver(function (entries , observer) {
        entries.forEach(entry=>{
          if(entry.isIntersecting){
             messageSeen(this , this.parentElement.id ,this.getAttribute("doc"));
             observer.unobserve(this);
          }
        });
    }.bind(this) , { threshold : 0.2 });
    observer.observe(this);
  }
    attributeChangedCallback(name, oldValue, newValue) {
       if(name == "read"){
        if(newValue == "true"){
       this.shadowRoot.querySelector('#sent').classList.add('sent');
        }else{
         //this.shadowRoot.querySelector('#sent').classList.remove('sent');
        }
       }
    }
}