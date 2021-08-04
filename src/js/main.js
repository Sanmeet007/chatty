const modal = document.querySelector('dp-modal');
const application = document.querySelector('app-main');
const myChattyProfile = document.querySelector('profile-element');
let messenger = document.querySelectorAll('messenger-element');
const mainLogo = document.querySelector('.main-logo');
const loader = document.querySelector('.loader');

const messengerDIV = document.querySelector('#allMessengers');

const chatty = document.querySelector('.chatty');
let iam = false;

function login(obj) {
  obj.btn.style.pointerEvents = "none";
  const email = obj.email;
  const password = obj.password;
  auth.signInWithEmailAndPassword(email, password).then(res => {
     console.log('User logged in sucessfully ');
  }).catch(error => {
    console.log(error);

     switch (error.code) {
       case 'auth/wrong-password':
         // code
         alert('Wrong password');
         break;
       
       case 'auth/user-not-found':
         // code
        alert('Email not registered. Please Sign Up to continue !');
         break;
       
       case 'auth/too-many-requests':
         // code
        alert(error.message);
         break;
       
       default:
         alert(error.message);
         // code
     }
    obj.btn.style.pointerEvents = "auto";
    obj.btn.innerHTML = `
     <i class="fas fa-arrow-right"></i>
    `;
  });
}

function signUp(obj){
    console.log(obj);
    // add sign up functionality ! 
}

function signOut() {
  auth.signOut();
  let ref = rtdb.ref(`users/${localStorage.userId}`);
  ref.update({
    online: false,
    lastseen: firebase.firestore.Timestamp.now()
  }).then(res => {
    window.location.reload();
  });
}


function secondsToHms(d) {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor(d % 3600 / 60);
  let s = Math.floor(d % 3600 % 60);
  if (h < 10) {
    h = "0"+h;
  }
  if (s < 10) {
    s = "0"+s;
  }
  if (m < 10) {
    m = "0"+m;
  }
  return h +":"+ m+ ":"+ s;
}
function  loginSuccess() {
  setTimeout(()=> {
    mainLogo.classList.add('move');
  }, 1000);
  setTimeout(()=> {
    loader.classList.add('fade-in');
  }, 1200);
  iam = true;
  document.querySelector('#initial').classList.remove('success');
}

function loginSuccess2() {
  setTimeout(function() {
    document.querySelector('app-main').classList.add('success');
    document.querySelector('#initial').classList.remove('success');
    document.querySelector('#initial').style.transform = "translateX(-100%)";
  }, 2000);
}

function finishLoading() {
  if (!iam) {
    document.querySelector('#initial').classList.remove('success');
    document.querySelector('#initial').style.transform = "translateX(100%)";
  }
  setTimeout(function() {
    chatty.classList.remove('initial-route');
    if (iam === true) {
      document.querySelector('app-main').classList.add('success');
    } else {
      document.querySelector('#initial').style.transform = "translateX(0%)";
    }
  },
    2000);
}

function showDp(ele) {
  modal.classList.add('modal-open');
  const src = ele.querySelector('img').src;
  const name = ele.getAttribute('name');
  modal.setAttribute('name',
    name);
  modal.setAttribute('src',
    src);
}

function openMessenger(ele) {
  // console.log(ele);
  ele.style.display = "block";
  setTimeout(function() {
    ele.scrollToBottom();
    ele.classList.add('open-messenger');
  },
    100);
}

function closeMessenger() {

  messenger.forEach(ele => {
    ele.classList.remove('open-messenger');
    setTimeout(function() {
      ele.style.display = "none";
    }, 200);
  });
}


function openFragment(id) {
  if (id !== "chat" && id !== "call") {
    document.querySelectorAll('page-fragment').forEach(ele=> {
      ele.style.zIndex = "200";
    });
  } else {}
  document.querySelector('#'+id).classList.add('open-fragment');
  document.querySelector('#'+id).style.zIndex = "202";
}

function closeFragment(id) {
  document.querySelector('#'+id).classList.remove('open-fragment');

  if (id !== "chat" && id !== "call") {
    setTimeout(function () {
      document.querySelectorAll('page-fragment').forEach(ele=> {
        ele.style.zIndex = "200";
      });
    }, 200);
  } else {}
}

Array.prototype.removeDuplicates = function () {
  let s = new Set(this);
  let it = s.values();
  return Array.from(it);
};


String.prototype.convertToURL = function () {
  const text = String(this);
  let urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + '</a>';
  });
};