const template = document.createElement('template');
template.innerHTML = 
`

 <!-- FontAwsome icons  CSS and JavaScript -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" type="text/css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/regular.min.js" type="text/javascript" charset="utf-8"></script>
  
  <style>
   *{
     box-sizing: border-box;
     font-family: 'Roboto', sans-serif;
   }
   :host{
     position: fixed;
     z-index: 505;
     background: black;
     inset:0;
     pointer-events: none;
     visibility: hidden;
     opacity: 0;
     transition: all 0.08s ease-out;
     transform: translateY(10%);
     overflow-y: scroll;
   }
  
   :host(.display){
     pointer-events: auto;
     visibility: visible;
     opacity: 1;
     transform: translateY(0%)
   }
   .hero{
     color: white;
     --img : "";
     background: black;
     width: 100%;
     aspect-ratio: 1;
     position: relative;
     isolation: isolate;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
   }
   .hero > *{
     width: 100%;
     display: block;
     text-align: center;
   }
   .hero:before{
     content :"";
     background-image: linear-gradient( rgba(0,0,0,0.7) , rgba(0,0,0,1) , black) , var(--img);
     background-size: cover;
     background-repeat: no-repeat;
     position: absolute;
     inset:0;
     z-index: -2;
   }
   .hero:after{
    content : "";
    position: absolute;
    inset :0;
    backdrop-filter : blur(2px);
    z-index:-1;
   }
   .hero .img{
    inline-size: 120px;
    aspect-ratio:1;
    overflow:hidden;
    border-radius: 50%;
    background: linear-gradient(145deg, #e6e6e6, rgb(0,0,0));
    box-shadow: 0.5px 0.5px 4px 2px rgba(45,45,45,0.2);
   }
   img{
    object-fit: cover;
   }
   .header{
   width: 100%;
   height: 60px;
   background: transparent;
   position: absolute;
   top:0;
   display: flex;
   align-items: center;
   padding: 0px 15px;
   gap : 12px
   }
   .header > div:nth-child(2){
     font-size: 1.1em;
     text-align: center;
   }
   h3{
    text-transform: uppercase;
     transform: translateY(12px);
     letter-spacing: 1.5px;
   }
   h4{
   font-weight: 300;
   }
   h4:before{
   content :"";
   position: absolute;
   width:80%;
   height: 2px;
   background:rgb(47,47,47);
   left: 10%;
   top: -5px;
   border-radius: 20px;
   }
   .social {
    display: flex;
    margin-inline: 5%;
    width: auto;
   }
   .social > *{
     flex-basis: 100%;
   }
   .lost{
     transform: translateY(15px)
   }
   .fab{
    margin-right: 4px;
   }
   
   .fa-facebook-f{
     color: #4267B2;
   }
   .fa-twitter{
     color: rgb(29,161,242);
   }
   .fa-instagram{
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
  -webkit-background-clip: text;
          /* Also define standard property for compatibility */
          background-clip: text;
  -webkit-text-fill-color: transparent;
  
   }
   .section{
    padding: 15px 15px;
    background: #101D24;
    color: #9EA3A7;
   }
  
   .heading{
    color: #07AC9B;
    font-size: 1.1em;
    margin-bottom: 12px;
    display: flex;
    gap: 5px;
    align-items:center;
   }
   .my-status{
    font-size: 0.9em;
    font-style: italic; 
    padding: 8px 20px;
    color: #9EA3A7;
   }
   .my-status::before{
    content : "❝";
    display: inline-block;
    margin-right: 2px;
    transform : translateY(-2px)
   }
   .my-status::after{
    content : "❞";
    margin-left: 2px;
    display: inline-block;
    transform : translateY(2px)
   }
   .icon{
   font-size: 0.7em;
   }
   .intel{
   font-size: 0.88em;
  }
  .spl{ white-space: pre-line;
   }
   .section{
   margin-bottom: 10px;
   }
   #close-profile{
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: none;
    color: white;
    background: rgba(255,255,255,0.05);
    font-size: 0.8em;
   }
   .hobbie{
     padding: 5px 8px;
     border-radius: 20px;
     border: 1.5px solid silver;
     line-height:1;
   }
   .hobbie .icon{
     font-size: 0.8em;
     display: inline-block;
     margin-right: 6px
   }
   .hobbies{
    display: flex; 
    flex-wrap: wrap;
    gap: 10px;
   }
   a{
   text-decoration : none;
   color: white;
   }
  </style>
  
  <div class="hero">
  <div class="header">
      <button id="close-profile"><i class="fas fa-arrow-left"></i></button>
  </div>
    <div class="img">
    <img src="" alt="dp"  width="100%" height="100%"/>
    </div>
    <h3 id="name"> sanmeet Singh</h3>
     <div class="my-status">
      unavailable
      </div>
    <div class="lost">
    <h4> Follow On</h4>
    <div class="social">
      <div><i class="fab fa-facebook-f"></i> Facebook</div>
      <div><i class="fab fa-instagram"></i> Instagram</div>
      <div><i class="fab fa-twitter"></i> Twitter</div>
    </div>
    </div>
  </div>
   <div class="section">
      <div class="heading"><i class="icon fas fa-tasks"></i> My Hobbies</div>
      <br />
      <div class="intel hobbies">
     unavailable
      </div>
        <br />
  </div>
   <div class="section">
      <div class="heading"><i class="icon fas fa-school"></i> My Education</div>
      <div class="intel edu">
         unavailable
      </div>
  </div>
  <div class="section">
      <div class="heading"><i class="icon fas fa-hand-paper"></i>About me</div>
      <p class="intel spl">
       unavailable
      </p>
  </div>
 
 
`;

export class UserProfile extends HTMLElement {
 static get observedAttributes() {
    return ['display'];
  }
  
  updateProfile(data){
    try{
    this.shadowRoot.querySelector("#name").innerText = data.name;
    
    this.shadowRoot.querySelector(".img img").src = data.src;
    
    this.shadowRoot.querySelector(".hero").style.setProperty("--img", `url(${data.src})`);
    
    this.shadowRoot.querySelector(".my-status").innerText = data.status;
 
    this.shadowRoot.querySelector(".spl").innerText = data.bio;
    
    this.shadowRoot.querySelector(".edu").innerText = data.education;
    
    const social = data.social;
    let html = "";
  
    social.forEach(link =>{
      let icon = "";
      switch (link.name.toLowerCase()) {
        case 'facebook':
          icon = "fab fa-facebook-f";
          break;
          
        case 'instagram':
          icon = "fab fa-instagram";
          break;
          
        case 'twitter':
          icon = "fab fa-twitter";
          break;
        
        default:
          // code
      }
       html +=`<a href="${link.href}"><div><i class="${icon}"></i> ${link.name}</div></a>`;
       });
     
    const hobbies = data.hobbies;
    let hob = "";
    
    hobbies.forEach(hobbie =>{
      hob += `<span class="hobbie"><i class="${hobbie.icon}"></i> ${hobbie.name}</span>`;
    });
    
    this.shadowRoot.querySelector(".social").innerHTML = html;
    
    this.shadowRoot.querySelector(".hobbies").innerHTML = hob;
    }catch(e){
      console.log(e)
    }
   
  }
  
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const button = this.shadowRoot.querySelector('#close-profile');
    button.addEventListener('click' , function (){
      this.classList.remove('display');
    }.bind(this));
  }
  
  
   attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'display':
        if(newValue == "true"){
         this.classList.add('display');
        }else{
         this.classList.remove('display');
        }
        break;
      
      default:
        // code
    }
  }
}
