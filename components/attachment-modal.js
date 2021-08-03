const template = document.createElement('template');
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
    position: fixed; 
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.8);
    isolation: isolate;
    z-index: 4000;
    inset:0;
    overflowv: hidden;
    transition: all 0.3s ease;
    visibility: hidden; 
  }
  

  .attach-modal{
  height: 100vh;
  inset:0;
  position: absolute;
  z-index: 1;
  width:100%;
  opacity:0;
  }
  
  .card{
    background : rgb(14,27,34);
    padding: 10px;
    border-radius: 4px;
    width: 80%;
    height: 55vh;
    display: flex;
    gap:10px;
    position: absolute;
    z-index: 2;
    transition: 0.5s ease-in-out;
  }
  
  .display-progress{
   background: rgb(46,58,65);
    flex-basis:100%;
   flex-grow:1;
   padding: 10px;
   display: flex;
   flex-direction: column;
   gap: 10px;
  }
 
  form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  }
  form button {
  padding: 8px 10px;
  background: #07AC9B;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: none;
  font-size: 0.8em;
  }
  form label {
  padding: 8px 10px;
  background: #07AC9B;
  color: white;
  border: none;
  border-radius: 4px;
  width: max-content;
  }
  .flex{
  display: flex;
  gap: 10px;
  width: 100%;
  }
  .flex > *{
    flex-basis:100%;
  }
  .inline{
   align-items: center;
   display: flex;
   gap: 15px;
  }
  .inline div{
    flex-grow :1;
    color : white;
    text-align: end;
  }
  .dummy{
    height: 100%;
   display : grid;
    place-content: center;
   color: #908b8b;
   flex-basis:100%
  }
  .reset{
    opacity: 0.5;
    pointer-events: none;
  }
  </style>
  
  <div class="attach-modal"></div>
   <div class="card">
     <form accept-charset="utf-8" enctype="multipart/form-data">
     <div class="inline">
       <label for="attachments">Choose Files</label>
       <div id="select"> 0 files selected</div>
     </div>
      <input type="file" name="attachments[]" id="attachments" multiple="multiple"  hidden style="display: none"/>
      <div class="display-progress">
       <div class="dummy">Please select some files to send</div>
      </div>
      <div  class="flex">
      <button id="reset"  class="reset">Reset</button>
      <button type="submit" id="send" class="reset">Send</button>
      </div>
     </form>
   </div>
`;

export class AttachmentModal extends HTMLElement {
  
  static get observedAttributes() {
    return ['open'];
  }
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback(){
    const attachments = this.shadowRoot.querySelector("#attachments");
    const form = this.shadowRoot.querySelector("form");
    const select = this.shadowRoot.querySelector("#select");
    const div = this.shadowRoot.querySelector('.display-progress');
    const reset = this.shadowRoot.querySelector('#reset');
    const send = this.shadowRoot.querySelector('#send');
  
  
 
     reset.addEventListener('click' , (e)=>{
         e.preventDefault();
         
         reset.classList.add('reset');
         attachments.value = "";
            div.innerHTML = 
      `
       <div class="dummy">Please select some files to send</div>
      </div>
      `;
         select.innerText =  attachments.files.length + " file selected";
     });
     
     
    attachments.addEventListener('change' , ()=>{
    if(attachments.files.length > 0){
      send.classList.remove('reset');
      reset.classList.remove('reset');
      div.innerHTML =    
      `
      <div class="dummy">
        Start sending
      </div>
      `;
      
      if(attachments.files.length  === 1){
      select.innerText =  attachments.files.length + " file selected";
      }else{
      select.innerText =  attachments.files.length + " files selected";
      }
    }else{
      send.classList.add('reset');
      reset.classList.add('reset');
      div.innerHTML = 
      `
       <div class="dummy">Please select some files to send</div>
      </div>
      `;
    }
    });
    
     form.addEventListener('submit' , function(e){
       e.preventDefault();
       send.classList.add('reset');
       const files  = attachments.files;
       reset.classList.add('reset');
       div.innerHTML = "";
       let obj = {
         div : div,
         resetBtn : reset,
         sendBtn : send
       };
       sendAttachments(this.getAttribute("attachid"), files , obj);
    }.bind(this));
   
   
    const modal =  this.shadowRoot.querySelector('.attach-modal');
 
    modal.addEventListener('click' , function (){
       this.setAttribute('open' , 'hidden');
    }.bind(this));
    
  }
  
   attributeChangedCallback(name, oldValue, newValue) {
     if(name == "open"){
         const card =  this.shadowRoot.querySelector('.card');
       if(newValue == 'visible'){
        this.style.visibility = "visible";
   
        card.style.transform = "translateY(0px)";
        
        setTimeout(function() {
         this.shadowRoot.querySelector(".attach-modal").style.opacity = "1";
        }.bind(this), 300);
        
       }else{
        this.style.visibility = "hidden";
     
        card.style.transform = "translateY(-100vh)";
     
  
       setTimeout(function () {
        this.shadowRoot.querySelector(".attach-modal").style.opacity = "1";
       }.bind(this), 300);
       }
     }
   }
}
