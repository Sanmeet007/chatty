const template = document.createElement('template');

template.innerHTML = 
`

 <!-- FontAwsome icons  CSS and JavaScript -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" type="text/css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/regular.min.js" type="text/javascript" charset="utf-8"></script>
  
  <style>
   *{
     box-sizing: border-box;
   }
   :host{
   background: black;
   background-image: url(./src/img/background.svg);
   background-repeat: none;
   background-size: cover;
   position: fixed;
   inset:0;
   z-index: 10000;
   color: white;
   padding:20px 15px;
   overflow: hidden;
   overflow-y: scroll;
   overflow-x: hidden;
   }
  .signUpBtn , 
  .loginBtn{
    font-size : 1.1em;
    color: white;
    background: none;
    border: none;
    padding: 10px 0px;
    position: relative;
  }

  .active::after{
    content : "";
    height: 3px;
    width: 85%;
    margin: 0 7.5%;
    border-radius: 10px;
    background: white;
    position: absolute;
    left:0;
    bottom: 0;
  }
  header{
   display: flex;
   gap: 30px;
   align-items: center;
   margin-bottom: 5vh;
  }
  h3{
  font-size: 2em;
  }
  .bottom-bar{
   position: fixed; 
   bottom: 0;
   left:0;
   height: 9vh;
   backdrop-filter: blur(2px);
   width: 100%;
   background: rgba(44,44,44 , 0.7)
  }
  .bottom-bar button{
   position: absolute;
   top:0;
   left: 72%;
   padding: 13px 30px;
   color: white;
   border-radius: 5px;
   border: none;
   transform: translateY(-50%);
   font-size: 1.2em;
  }
  .login,
  .signup{
    pointer-events : none;
    transition: transform 0.2s ease-in-out;
   }

   .login{
     transform : translateX(-120%);
   }
   .signup{
     transform : translateX(120%);
   }
   .screens{
    display: flex;
   }
   .screens > * {
     width: 100%;
     flex-shrink: 0;
   }
  .inview{
    pointer-events : auto;
  }
  .bottom-bar > span{
   display: block;
   padding: 12px 15px;
   transform : translateY(-100%);
  }
  input{
    outline: none;
    color: white;
    width: 100%;
    padding: 10px;
    background: rgba(49,49,49);
    border:none;
    border: 2px solid rgb(103,103,103);
    margin-bottom: 20px;
  }
 
  input:focus{
    border-color: #07AC9B;
  }
  
  .btn{
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: none;
  margin-right: 8px;
  color: white;
  }
  #facebook  {
    background: rgb(0,61,246)
  }
  #google{
    background: rgb(255,28,28)
  }
 label{
   margin: 13px 0px;
   display: flex;
 }
 .password{
 position: realtive;
 width: 100%; 
 }
 .password div{
  position: absolute;
  right:0;
  margin-right: 10px;
  transform: translateY(-130%)
 }
 .password span{
 background: white;
 color: black;
 width: 30px;
 height: 30px;
 display:  flex;
 border-radius: 50%;
 align-items: center;
 justify-content: center;
 }
 form {
   padding-top: 20px;
 }
 #forgot{
   opacity: 1;
   visibility: visible;
   pointer-events : auto;
   transition: opacity 0.2s ease ;
 }
 .hideme{
   opacity:0! important;
   visibility: hidden ! important;
   pointer-events : none ! important;
 }
 
 .normal{
    background: #07AC9B;
    transition : background 0.2s ease;
   }
 .beauti{
  background: orange;
 }
 strong {
   color: orange;
   font-weight: 700
 }
 .color{
  color : #07AC9B;
 }
  </style>
  <div>
     <header>
       <button class="loginBtn active">Login</button>
       <button class="signUpBtn">Sign Up</button>
     </header>
     <div class="screens">
      <div class="login inview" style="transform : translateX(0)">
        <h3><span class="color">Welcome</span> Back !</h3>
         <form id="login">
         <label for="loginEmail">Email address </label>
         <input type="email" name="email" placeholder="hunter@email.com" id="loginEmail"/>

         <label for="loginPassword">Password</label>
       
         <div class="password">
          <div>
          <span data-for="loginPassword">
              <i class="fas fa-eye"></i>
          </span>
          </div>
         <input type="password" name="password"  placeholder="hunterXhunter" id="loginPassword"/>
         </div>
         
         </form>
         <br/>
          <button class="btn" id="google"><i class="fab fa-google"></i></button>
          <button class="btn" id="facebook"><i class="fab fa-facebook"></i></button>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
     
      </div>
      <div class="signup">
         <h3>Hello <strong>Beautiful</strong></h3>
        <p>Enter your information below or login using your social account</p>
         <form id="signup">
         
           <label for="userName">Your Name</label>
           <input type="name" name="userName" id="userName" placeholder="hunter"/>
       
         
           <label for="signUpEmail">Email address</label>
           <input type="email" name="email" id="signUpEmail" placeholder="hunter@email.com"/>
       
    
         <label for="signUpPassword">Password</label>
       
          <div class="password">
          <div>
          <span data-for="signUpPassword">
              <i class="fas fa-eye"></i>
          </span>
          </div>
           <input type="password" name="password" id="signUpPassword" placeholder="hunterXhunter"/>
         </div>
          

         </form>
            <br/>
          <button class="btn" id="google"><i class="fab fa-google"></i></button>
          <button class="btn" id="facebook"><i class="fab fa-facebook"></i></button>
             <br/>
             <br/>
             <br/>
      </div>
      <div class="bottom-bar">
        <span id="forgot">forgot password ?</span>
        <button class="normal" id="submit"><i class="fas fa-arrow-right"></i></button>
      </div>
     </div>
  </div>
  `;

export class LoginSignUp extends HTMLElement {
 
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  submitSignUp( header, btn,form){
    header.style.pointerEvents = "none";
    btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i>`;
    let email = form.email.value ;
    let password = form.password.value;
    let cPassword = form.cPassword.value;
    console.log(email , password , cPassword);
  }
  submitLogin( header,btn,form){
    header.style.pointerEvents = "none";
    btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i>`;
    let email = form.email.value ;
    let password = form.password.value;
   
    login({
        header : header ,
        btn : btn ,
        email : email,
        password : password
      });
      
  }
  connectedCallback(){
    const header = this.shadowRoot.querySelector('header');
    const forgot = this.shadowRoot.querySelector('#forgot');
    const  inputs =  this.shadowRoot.querySelectorAll('input');
 
    inputs.forEach(input =>{
      input.addEventListener('focusin' , (e)=>{
        setTimeout(function() {
          input.form.scrollIntoView();
          forgot.classList.add('hideme');
        }, 500);
      });
      input.addEventListener('focusout' , (e)=>{
        setTimeout(function() {
          forgot.classList.remove('hideme');
        }, 500);
      });
    });

  
    this.shadowRoot.querySelectorAll('.password span').forEach(span =>{   
       
       span.addEventListener("click", function (){
         let id =   span.getAttribute("data-for");
       
         const input =   this.shadowRoot.querySelector("#"+id);
         
         let type = input.getAttribute("type");
      
          if(type == "password"){
            input.setAttribute("type" , "text");
            span.innerHTML = 
            `
           <i class="fas fa-eye-slash"></i>
            `;
          }else{
            input.setAttribute("type" , "password");
            span.innerHTML = 
            `
              <i class="fas fa-eye"></i>
            `;
           }
         
       }.bind(this));
       
    });
    
    
   const loginBtn = this.shadowRoot.querySelector('.loginBtn');
   const signUpBtn = this.shadowRoot.querySelector('.signUpBtn');
   const signup = this.shadowRoot.querySelector('.signup');
   const login = this.shadowRoot.querySelector('.login');
   
   signUpBtn.addEventListener('click', function (e){
      signUpBtn.classList.add('active');
      signup.classList.add('inview');
      signup.style.transform = "translateX(-100%)";
      forgot.style.display = "none";
      submitBtn.classList.add('beauti');
      login.style.transform = "translateX(-120%)";
      loginBtn.classList.remove('active');
      login.classList.remove('inview');
      this.setAttribute('current','signup');
   }.bind(this));
   
   loginBtn.addEventListener('click', function (e){
      signUpBtn.classList.remove('active');
      signup.classList.remove('inview');
      signup.style.transform = "translateX(120%)";
      forgot.style.display = "block";
      submitBtn.classList.remove('beauti');
      login.style.transform = "translateX(0%)";
      loginBtn.classList.add('active');
      login.classList.add('inview');
      this.setAttribute('current' , 'login');
   }.bind(this));
    
    const submitBtn = this.shadowRoot.querySelector('#submit');
    
    const loginForm = this.shadowRoot.querySelector('#login');
    
    const signUpForm = this.shadowRoot.querySelector('#signup');
    
    submitBtn.addEventListener('click' , function (e){
      e.preventDefault();
      let current =  this.getAttribute('current');
        switch (current) {
          case 'login':
            this.submitLogin( header,submitBtn, loginForm);
            break;
          
          case 'signup':
            this.submitSignUp(header ,submitBtn, signUpForm);
            break;
          
          default:
            // silence is golden ! 
        }
       
    }.bind(this));
    
    
    loginForm.addEventListener('submit' , function (e){
      e.preventDefault();
      submitLogin( header , submitBtn , loginForm);
    });
    signUpForm.addEventListener('submit' , function (e){
      e.preventDefault();
      this.submitSignUp( header , submitBtn , loginForm);
    }.bind(this));
    
  }
}
