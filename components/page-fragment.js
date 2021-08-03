const template = document.createElement('template');

template.innerHTML = 
`

 <!-- FontAwsome icons  CSS and JavaScript -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" type="text/css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/regular.min.js" type="text/javascript" charset="utf-8"></script>
  
  
  <style>
    :host{
      background: #101D24;
      position: fixed;
      inset: 0;
      z-index: 200;
    }
    .page-bar {
    height: 60px;
    display: flex;
    gap: 10px;
    background: #232D36;
    align-items: center;
    padding-inline: 12px;
    color: #D5D9DA;
    position: fixed;
    width: 100%;
  }
  .page-bar button {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: none;
    background: rgba(0,0,0,0.1);
    color: inherit;
  }
  
  .page-content{
   position: relative;
   top: 60px;
   height: calc(100vh - 60px);
   overflow-y: scroll;
   color: white;
 }
  </style>
  <div class="page-bar">
    <button id="close-fragment">
    <i class="fas fa-arrow-left"></i>
    </button>
    <h3><slot name="name"></slot></h3>
  </div>
 <div class="page-content">
  <slot name="page-content"></slot>
 </div>
 
`;

export class PageFragment extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
   connectedCallback () {
    const id =  this.shadowRoot.querySelector('#close-fragment');
    const funcId =  this.getAttribute('id');
    id.setAttribute('onclick' , `closeFragment('${funcId}')`);
  }
}
