const template = document.createElement('template');
template.innerHTML =
`

<!-- FontAwsome icons  CSS and JavaScript -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/regular.min.js" type="text/javascript" charset="utf-8"></script>



<style type="text/css" media="all">
*{
box-sizing: border-box;
}
.file {
background: rgba(26,40,47 , 0.5);
color: white;
border-radius: 4px;
display: flex;
overflow: hidden
}
.file > div:nth-child(1) {
flex-grow:1;
}

progress {
margin-block: 8px;
display: block;
width: 100%;
height: 8px;
border-radius: 40px;
overflow:hidden;
}

 progress[value] { 
/* Reset the default appearance */ 
-webkit-appearance: none; 
appearance: none;
}
progress[value]::-webkit-progress-bar {
background-color: rgb(179,179,179); 
border-radius: 2px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset; 
}
progress[value]::-webkit-progress-value { 
 background: #0363c0;
}
.flex {
display: flex;
}
.flex > {
flex-basis: 100%;
}

.percentage {
flex-grow:1;
text-align: end;
}
.file-options {
border-left: 2px solid rgb(46,58,65);
display: flex;
align-items: center;
width: 50px;
justify-content: center;
font-size: 1.8em;
margin-inline: 5px;
}
.file-info {
padding: 8px 15px;
}
.file-name{
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
width: 180px;
}
</style>
<div class="file">
<div class="file-info">
<div class="flex">
<span class="file-name"></span>
<span class="percentage"></span>
</div>
<progress max="100" value=""></progress>
</div>
<div class="file-options">
×
</div>
</div>

`;

export class FileUpload extends HTMLElement {
  static get observedAttributes() {
    return ['name',
      'percentage' ,
      'type'];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  setEvent(fun) {
    this.shadowRoot.querySelector('.file-options').addEventListener("click", ()=> {
      fun();
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {

    switch (name) {
      case 'percentage':
        this.shadowRoot.querySelector('.percentage').innerText = newValue +"%";
        this.shadowRoot.querySelector('progress').value = newValue;
        break;

      case 'name':
        this.shadowRoot.querySelector('.file-name').innerText = newValue;
        break;

      case 'type' : 
          if(newValue == "sent"){
            this.shadowRoot.querySelector('.file-options').innerHTML = 
            `<i style="font-size: 0.8rem" class="fas fa-check"></i>`;
          }
       break;
      default:
        // code
      }
    }
  }