const template = document.createElement('template');
template.innerHTML = 
`

 <!-- FontAwsome icons  CSS and JavaScript -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" type="text/css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/regular.min.js" type="text/javascript" charset="utf-8"></script>
  
  
  
  
  <style type="text/css" media="all">
      * {
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
      }
      :host{
       width: 100%;
      }
     .flex-column{
       display: flex;
       flex-direction: column;
       align-items: center;
       width: 100%;
    }
    .flex-row{
      display: flex;
      flex-direction: row;
      width: 100%;
    }
    .justify-center{
      justify-content: center;
    }
    
    .profile-img{
      background: grey;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: none;
      position: relative;
      margin-block: 40px;
    }
    .profile-img img{
      object-fit: cover;
      border-radius: 50%;
      pointer-events: none;
    }
    .camera{
    position: absolute;
    bottom:0;
    right: 0;
      background: #07AC9B;
      color: white;
      width: 45px;
      height: 45px;
      display: flex;
      align-items:center;
      justify-content: center;
      border-radius: 50%
    }
    .profile-item{
      gap: 12px;
      padding: 0px 12px;
      padding-top: 15px;
    }
    .prefix-icon ,
    .suffix-icon{
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: none;
      background: none;
      font-size: 1.1em;
      color: #959DA0;
    }
    .suffix-icon{
      color: #07AC9B;
    }
    .profile-item > div{
      
    }
     .label , 
     .sub-label{
      color: #959DA0;
       font-size: 0.9em;
    }
    .main{
      margin: 8px 0px;
    }
    [border] > *:nth-child(1){
      flex-basis: auto;
      flex-grow: 1;
    }
    [border]{
      border-bottom : 1px solid  #565E61;
    }
    .last > div:last-child{
      margin-bottom: 15px;
    }
    .fa-pencil-alt{
    font-size: 0.8em
    }
    .loader{
     height: 100%;
     width:100%;
     background: rgba(0,0,0,0.8);
     position: absolute;
     border-radius: 50%;
     display: flex;
     align-items: center;
     color: white;
     font-size: 1.5em;
     justify-content: center;
     visibility: hidden;
     opacity: 0;
     transition: all 0.2s ease;
    };
    
  </style>
  
  <div class="flex-column justify-center">
       <label for="file" class="profile-img">
          <div class="loader">
            <i class="fas fa-circle-notch fa-spin"></i>
          </div>
          <img id="my-img" src="./src/img/person.png" alt="" width="100%" height="100%"/>
          <input type="file" name="file" id="file" value="" hidden />
          
          <div class="camera">
          <i class="fas fa-camera"></i>
          </div>
       </label>
       <div class="profile-item flex-row">
         <div>
          <button class="prefix-icon">
            <i class="fas fa-user-circle"></i>
          
          </button>
         </div>
         
          <div border class="flex-row">
            <div class="last">
             <div class="label">Name</div>
             <div class="main my-name">Sanmeet</div>
             <div class="sub-label">
               This is not your username or pin . This name will be visible to chatty contacts
               
             </div>
            </div>
            <div>
              <button class="suffix-icon">
            <i class="fas fa-pencil-alt"></i>
           
          </button>
            </div>
         </div>
       </div>
       <div class="profile-item flex-row">
         <div>
          <button class="prefix-icon">
            <i class="fas fa-info-circle"></i>
          
          </button>
         </div>
         
          <div border class="flex-row">
            <div class="last">
             <div class="label">About</div>
             <div class="main state">
           
             </div>
            </div>
            <div>
              <button class="suffix-icon">
            <i class="fas fa-pencil-alt"></i>
           
          </button>
            </div>
         </div>
       </div>
       <div class="profile-item flex-row">
         <div>
          <button class="prefix-icon">
            <i class="fas fa-envelope"></i>
          </button>
         </div>
         
          <div  class="flex-row">
            <div class="last">
             <div class="label">Email</div>
             <div class="main"> ssanmeet123@gmail.com</div>
            </div>
         </div>
       </div>
      </div>
`;

export class  Profile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  
  updateUI(data){
   
   // console.log(data);
    
    this.shadowRoot.querySelector(".profile-img > img").src = data.src;
    
    this.shadowRoot.querySelector(".my-name").innerText = data.name;
    this.shadowRoot.querySelector(".state").innerText = data.status;
    
    document.querySelector('.user-name').innerText = data.name;
    document.querySelector('.user-status').innerText = data.status;
    document.querySelector('.userImg > img').src = data.src;
    
  }
  
  connectedCallback(){
     const img = this.shadowRoot.querySelector('img');
    img.src  = this.getAttribute('src');
    const loader =  this.shadowRoot.querySelector('.loader');
    
    this.shadowRoot.querySelector('.main').innerText = this.getAttribute('name');
    
    const file = this.shadowRoot.querySelector('#file');
    const myImg = this.shadowRoot.querySelector('#my-img');
    file.addEventListener('change' , function (){
       let files =  file.files;
        if (files.length) {
            updateUserImg(files[0] , loader );
         }
    });
   
  }
}
