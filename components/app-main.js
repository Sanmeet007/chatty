const AppName = "Chatty";
const template = document.createElement('template');
template.innerHTML =
`
<!-- FontAwsome icons  CSS and JavaScript -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/regular.min.js" type="text/javascript" charset="utf-8"></script>

<!--CSS-->
<style type="text/css" media="all">
*{
font-family: 'Roboto', sans-serif;
box-sizing: border-box;
}
.app-bar {
display: block;
height: 120px;
position: relative;
width: 100%;
background: #232D36;
overflow: hidden;
transition: all 0.2s ease;
}
.tabs {
background: rgba(0,0,0,0.1);
display: flex;
}

.tabs > * {
flex-basis: 100%;
padding: 10px;
padding-bottom: 15px;
text-align: center;
text-transform: uppercase;
}
.tab-slider {
height: 5px;
transform: translateY(-5px);
width: 50%;
background: #07AC9B;
pointer-events: none;
transition: 0.5s ease-out;
}
.tab-input {
height: 45px;
overflow: hidden;
color: #9EA3A7;
}
.active {
color: #07AC9B;
background: rgba(1,82,74,0.1);
}

.tab-type::-webkit-scrollbar {
  display: none;
}
.tab-type {
position: relative;
height: calc(100vh - 120px);
background: #101D24;
overflow-y: scroll;
overflow-x: scroll;
scroll-snap-type: x mandatory;
transition: all 0.2s ease-out;
color: white;
}

.tab-type > * {
scroll-snap-align: end;
}
.chats , .calls {
position: absolute;
left: 0;
width: 100vw;
}
.calls {
transform: translateX(100%);
}
.chats {
transform: translateX(0%);
}
.components {
display: flex;
padding: 20px 20px;
width: 100%;
align-items: center;
height: 75px;
gap: 10px;
color: #07AC9B;
position: relative;
}
.app-name {
flex-basis: 100%;
font-size: 1.2em;
color: #9EA3A7;
}
.options {
display: flex;
gap: 10px
}
.search-bar button,
.options button {
width: 40px;
height: 40px;
border-radius: 50%;
font-size: 0.9em;
border: none;
background: rgba(0,0,0,0.1);
color: #9EA3A7
}
.search-bar {
position: absolute;
inset: 0;
display: flex;
align-items: center;
gap: 10px;
padding-inline: 15px;
background: #232D36;
visibility: hidden;
opacity: 0;
}
.search-bar-open {
visibility: visible;
opacity: 1;
}
.search-bar > * {
flex-basis: auto;
outline: none;
color: #D3D7DA;
}
.search-bar input {
background: #232D36;
width: 100%;
padding: 10px 15px;
font-size: 1em;
border: none;
}

.test{
  display: block;
  position: relative;
  height: 2px;
  opacity: 0;
  color: transparent;
  pointer-events : none;
  visibility: hidden;
  overflow: hidden;
}

button{
  position: relative;
  overflow:hidden;
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

.tab:active {
  background: rgba(255,255,255,0.05);
}
</style>

<!-- HTML -->

<div class="app-bar">
<div class="components">
<div class="app-name">
${AppName}
</div>
<div class="options">
<button id="searchOpen"> <i class="fas fa-search"></i></button>
<button onclick="openFragment('settings')"><i class="fa fa-cog"></i></button>
</div>
<div class="search-bar">
<div>
<button id="searchClose"> <i class="fas fa-arrow-left"></i></button>
</div>
<input type="text" name="search" id="search" placeholder="Search..." />
</div>
</div>
<div class="tab-input">
<div class="tabs">
<div class="tab active" id="chats">
chats
</div>
<div class="tab" id="calls">
calls
</div>
</div>
<div class="tab-slider"></div>
</div>

</div>


<div class="tab-type">
<div class="chats">
<span class="test">Hello world</span>

<slot name="chat"></slot>
</div>
<div class="calls">
<span class="test">Hello world</span>

<slot name="call"></slot>
</div>
</div>

<floating-btn type="chats"></floating-btn>

`;
export class AppMain extends HTMLElement {
  static get observedAttributes() {
    return ['current'];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.attr = "";
  }


  open_calls = function() {

    const calls = this.shadowRoot.querySelector('.calls');
    const tabSlider = this.shadowRoot.querySelector('.tab-slider');

    calls.scrollIntoView({
      behavior: "smooth", block: "end", inline: "nearest"
    });
    tabSlider.style.transform = "translate(100% , -5px)";
    this.call_click.classList.add('active');
    this.chat_click.classList.remove('active');

    this.floatingBtn.setAttribute('type', 'calls');
    this.setAttribute("current", "call")
  }

  open_chats = function () {

    const chats = this.shadowRoot.querySelector('.chats');

    const tabSlider = this.shadowRoot.querySelector('.tab-slider');


    chats.scrollIntoView({
      behavior: "smooth", block: "end", inline: "nearest"
    });
    tabSlider.style.transform = "translate(0% , -5px)";

    this.call_click.classList.remove('active');
    this.chat_click.classList.add('active');

    this.floatingBtn.setAttribute('type', 'chats');
    this.setAttribute("current", "chat")
  }

  open_instant_calls = function() {

    const tabSlider = this.shadowRoot.querySelector('.tab-slider');

    tabSlider.style.transform = "translate(100% , -5px)";
    this.call_click.classList.add('active');
    this.chat_click.classList.remove('active');

    this.floatingBtn.setAttribute('type', 'calls');
    this.setAttribute("current", "call")
  }

  open_instant_chats = function () {

    const tabSlider = this.shadowRoot.querySelector('.tab-slider');

    tabSlider.style.transform = "translate(0% , -5px)";

    this.call_click.classList.remove('active');
    
    this.chat_click.classList.add('active');
    
    this.floatingBtn.setAttribute('type', 'chats');
    
    this.setAttribute("current", "chat");
  }
  

  connectedCallback () {
    // fires when element is connected to DOM
    this.floatingBtn = this.shadowRoot.querySelector('floating-btn');
    const searchBar = this.shadowRoot.querySelector('.search-bar');
    const appBar = this.shadowRoot.querySelector('.app-bar');

    const tabType = this.shadowRoot.querySelector('.tab-type');

    const searchOpen = this.shadowRoot.querySelector('#searchOpen');
    searchOpen.addEventListener('click', function (e) {
    setTimeout(function() {
      searchBar.classList.add('search-bar-open');

      appBar.style.height = "calc(120px - 45px )";
      tabType.style.height = "calc(100vh -  75px)";
      tabType.style.overflowX = 'hidden';

      const input = searchBar.querySelector('input');
      input.focus();
    }, 120);

    }.bind(this));

    const searchClose = this.shadowRoot.querySelector('#searchClose');
    searchClose.addEventListener('click', function (e) {
      setTimeout(function() {
      searchBar.classList.remove('search-bar-open');
      appBar.style.height = "120px";

      tabType.style.overflowX = 'visible';
      tabType.style.height = "calc(100vh -  120px)";

      const input = searchBar.querySelector('input');
      input.value = "";
   
      this.shadowRoot.host.querySelectorAll(`[slot=chat]`).forEach(ele=>{
      ele.style.display = "flex";
    });

    this.shadowRoot.host.querySelectorAll(`[slot=call]`).forEach(ele=>{
      ele.style.display = "flex";
      
    });
      
      }.bind(this), 120);
    }.bind(this));


    this.call_click = this.shadowRoot.querySelector('#calls');
    this.chat_click = this.shadowRoot.querySelector('#chats');


    const calls = this.shadowRoot.querySelector('.calls');
    const chats = this.shadowRoot.querySelector('.chats');


    this.chat_click.addEventListener('click', function () {
      this.open_chats();
    }.bind(this));

    this.call_click.addEventListener('click', function () {
      this.open_calls();
    }.bind(this));


    const options = {
      threshold: 0.5
    };

    let ChatObserver = new IntersectionObserver(function (entries, ChatObserver) {
      entries.forEach(ele => {
        if (ele.isIntersecting) {
          // console.log(Observer.takeRecords())
          this.open_instant_calls();

        }
      });
    }.bind(this), options);

    ChatObserver.observe(calls);

    let CallsObserver = new IntersectionObserver(function (entries,
      CallsObserver) {
      entries.forEach(ele => {
        if (ele.isIntersecting) {
          this.open_instant_chats();
        }
      });
    }.bind(this), options);

    CallsObserver.observe(chats);

   this.shadowRoot.querySelectorAll('.tab').forEach( tab => {
     tab.addEventListener('click', (e)=> {
      const span = document.createElement('span');
      tab.style.position = "relative";
      tab.style.overflow = "hidden";
      
      span.style.cssText =
      `
      position: absolute;
      background: red;
      display: block;
      width: 500%;
      height: 500%;
      transform: translate(-50%, -50%);
      clip-path: circle( 40px at 50%  50%);
      top : ${e.offsetY}px;
      left : ${e.offsetX}px;
      background: rgba(255,255,255,0.05);
      transition: clip-path 0.5s ease-in;
      `;
      tab.appendChild(span);
      setTimeout(function() {
        span.style.clipPath = "circle(100% at 50%  50%)";
      }, 0);
      setTimeout(function() {
        span.remove();
      }, 450);
    });
  });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "current") {
    
      const search = this.shadowRoot.querySelector('#search');
      const  slots = this.shadowRoot.querySelector(`slot[name=${newValue}]`);
      search.addEventListener('input', function () {
        let  filteredSlots = slots.assignedNodes();
        filteredSlots = filteredSlots.filter(slot => {
          return slot.getAttribute('name').toLowerCase().includes(search.value.toLowerCase().trim());
        });
        slots.assignedNodes().forEach(ele=> {
          ele.style.display = "none";
        });
        filteredSlots.forEach(ele=> {
          ele.style.display = "flex";
        });
      }.bind(this));
      
    }
  }
}