const template = document.createElement('template');
template.innerHTML =
`

<!-- FontAwsome icons  CSS and JavaScript -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/regular.min.js" type="text/javascript" charset="utf-8"></script>


<style>

* {
font-family: 'Roboto', sans-serif;
box-sizing: border-box;
}
 .fa-phone {
        transform: rotate(90deg);
        color: #07AC9B;
      }
.card {
width: 250px;
height: 283px;
background: white;
overflow: hidden;
transform: scale(0.6);
opacity: 0;
position: relative;
transition: all 0.15s  ease-out;
z-index: 502;
}
.card-display {
transform: scale(1);
opacity: 1;
}
.items {
height: 18%;
background: #101D24;
display: flex;
align-items: center;
}
.items  div {
flex: 1;
text-align: center;
}
.items button {
width: 35px;
height: 35px;
background: rgba(0,0,0,0.2);
border: none;
color: #09A798;
border-radius: 50%;
font-size: 1em;
}
.card .img {
background: #333;
width: 100%;
height: 82%;
border-radius: 0;
position: relative;
}
.img img {
object-fit: cover;
}
.card .person-name {
position: absolute;
top: 0;
left: 0;
width: 100%;
color: white;
padding: 5px 10px;
background: rgba(0,0,0,0.2);
}
#modal-close {
position: absolute;
inset: 0;
z-index: 500;
}
</style>

<div>
<div id="modal-close"></div>
<div class="card">
<div class="img">
<div class="person-name">
Someone
</div>
<img src="person.png" alt="" height="100%" width="100%" />
</div>
<div class="items">
<div>
<button><i class="fas fa-phone"></i></button>
</div>
<div>
<button><i class="fas fa-envelope"></i></button>
</div>
<div>
<button><i class="fas fa-info-circle"></i></button>
</div>
</div>
</div>
</div>
`;

export class DpModal extends HTMLElement {

  static get observedAttributes() {
    return ['name',
      'src',
      'class'];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    let src = this.getAttribute('src');
    const modal_close = this.shadowRoot.querySelector('#modal-close');
    modal_close.addEventListener('click', function () {
      this.classList.remove("modal-open")
    }.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'class':

        if (this.classList.contains('modal-open')) {
          this.shadowRoot.querySelector('.card').classList.add('card-display');
        } else {
          this.shadowRoot.querySelector('.card').classList.remove('card-display');
          setTimeout(function () {
            this.shadowRoot.querySelector('img').src = "src/img/person.png";
            this.shadowRoot.querySelector('.person-name').innerText = "someone";
            this.userId = "unknown";
          }.bind(this), 200);
        }
        break;

      case 'src':
        this.shadowRoot.querySelector('img').src = newValue;
        break;

      case 'name':
        this.shadowRoot.querySelector('.person-name').innerText = newValue;
        break;

      default:
        // silence is golden
      }
    }
  }