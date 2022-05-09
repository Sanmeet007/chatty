auth.onAuthStateChanged(user=> {
  if (user) {
    if (chatty.classList.contains('initial-route')) {
      loginSuccess();
    }
    localStorage.userId = user.uid;
    setStatus();
    load();
    iam = true;

  } else {
    iam = false;
    finishLoading();
  }
});

function setStatus() {

  let ref = rtdb.ref(`users/${localStorage.userId}`);

  ref.update({
    online: true,
    lastseen: firebase.firestore.Timestamp.now()
  });

  ref.onDisconnect().update({
    online: false,
    lastseen: firebase.firestore.Timestamp.now()
  });

}

async function getChatList() {
  let arr = [];
  let response = await db.collection('chats').where('user-connection',
    'array-contains',
    localStorage.userId).get();
  response = await response.docs;
  await  response.forEach(item=> {
    const id = item.data();
    id['user-connection'].forEach(i=> arr.push(i));
  });
  arr = await arr.removeDuplicates();
  return  await arr;
}



function messageSeen(ele , id , doc) {
  const ms = document.getElementById(id);


  if (ele.getAttribute("read") == "false" && ele.getAttribute("type") == "main") {
    db.collection('chats').doc(doc).update({
      read: true
    }).then(()=> {
      ele.setAttribute('read', 'true');
      let i = Array.from(ms.children).filter(child => {
        if (child.getAttribute("read") == "false" && child.getAttribute("type") == "main") {
          return true;
        }
      });
      ms.setAttribute("unread",
        i.length);
    });
  }
}


function reFetchUserDetails(id) {

  rtdb.ref(`users/${id}`).get().then(data => {
    data = data.val();
    if (data.online === true) {
      document.querySelector('#'+id).setAttribute("status", "online");
    } else {
      document.querySelector('#'+id).setAttribute("status", data.lastseen.seconds);
    }
  });

  db.collection('user-details')
  .doc(id).get()
  .then(res=> {
    const data = res.data();
    if (data && res.id != localStorage.userId) {
      application.innerHTML +=
      `  <chat-item
      slot="chat"
      name="${data.name}"
      uid="${res.id}"
      unread="0"
      src="${data.src}">
      <span slot="last-chat">😂 go to ?</span>
      <span slot="last-seen"></span>
      <span slot="new-message" class="new-message">20</span>
      </chat-item>
      `;

      const element = document.querySelector('#'+res.id);

      element.setAttribute('src', data.src);
      element.setAttribute('name', data.name);

      element.setProfile(data);

      const chatEle = document.querySelector(`[uid="${res.id}"]`);

      chatEle.setAttribute("unread", element.unreadMessages);
    }
  });
}

function addNewMessenger(id) {
  const item = document.createElement('messenger-element');
  item.setAttribute('id',
    id);

  if (document.getElementById(id) == null) {
    messengerDIV.appendChild(item);
    reFetchUserDetails(id);
  }
  messenger = document.querySelectorAll('messenger-element');
  return document.querySelector('#'+id);
}

function createMessengers(arr) {

  arr.forEach(id => {
    if (id !== localStorage.userId) {
      const item = document.createElement('messenger-element');
      item.setAttribute('id', id);
      messengerDIV.appendChild(item);
    }
  });
  messenger = document.querySelectorAll('messenger-element');
  initRTDB();
}

function load() {
  getChatList()
  .then((arr) => {
    createMessengers(arr);
    let eleArr = [];
    arr.forEach(id => {
      db.collection('user-details')
      .doc(id).get()
      .then(res=> {
        const data = res.data();
        //  console.log(data)
        if (res.id == localStorage.userId) {
          myChattyProfile.updateUI(data);
        }
        if (data && res.id != localStorage.userId) {
          application.innerHTML +=
          `  <chat-item
          slot="chat"
          name="${data.name}"
          uid="${res.id}"
          unread="0"
          src="${data.src}">
          <span slot="last-chat">😂 go to ?</span>
          <span slot="last-seen"></span>
          </chat-item>
          `;

          const element = document.querySelector('#'+res.id);

          element.setAttribute('src', data.src);
          element.setAttribute('name', data.name);

          element.setProfile(data);

          const chatEle = document.querySelector(`[uid="${res.id}"]`);

          chatEle.setAttribute("unread", element.unreadMessages);

        }
      });
    });
    initiateUserStatus();
    checkUsers();
    if (!chatty.classList.contains('initial-route')) {
      setTimeout(function() {
        loginSuccess2();
      }, 2000);
    } else {
      finishLoading();
    }
  }).catch(e => {
    console.log(e);
  });
}

function initRTDB() {

  db.collection('chats')
  .where('user-connection',
    'array-contains',
    localStorage.userId)
  .orderBy('time')
  .onSnapshot(
    response => {


      response = response.docChanges();


      response.forEach(docs => {

        if (docs.type == "added" || docs.type == "modified") {
          const data = docs.doc.data();

          const index = data['user-connection'].indexOf(localStorage.userId);
          data['user-connection'].splice(index, 1);
          thisMessenger = Array.from(messenger).filter(mess => {
            return mess.id === data['user-connection'][0] ? true: false;
          });
          if (thisMessenger.length === 0) {
            thisMessenger = addNewMessenger(data["user-connection"][0]);
          } else {
            thisMessenger = thisMessenger[0];
          }
          // Check this for errors ?

          let userType = "";

          if (data["user-id"] === localStorage.userId) {
            userType = "replier";
          } else {
            userType = "main";
          }


          let time = data.time.seconds;
          date = new Date(time*1000);

          let currentDate = date.getFullYear()  +"-"+ parseInt(date.getMonth() + 1) +"-"+ date.getDate();

          time = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
          });

          if (data.type) {
            switch (data.type) {
              case 'image/jpeg':
                // code
                data.message = `
                <img slot="message" src="${data.message}"  onclick="window.open(this.src)"  loading="lazy"/>
                `;
                break;

              case 'image/png':
                data.message = `
                <img slot="message" src="${data.message}"  onclick="window.open(this.src)"  loading="lazy"/>
                `;
                break;

              case 'image/gif':
                data.message = `
                <img slot="message" src="${data.message}"  onclick="window.open(this.src)"  loading="lazy"/>
                `;
                break;

              case 'image/svg+xml':
                data.message = `
                <img slot="message" src="${data.message}"  onclick="window.open(this.src)"  loading="lazy"/>
                `;
                break;

              case 'video/mp4':
                data.message = `
                <video poster="./src/img/poster.png" slot="message" controls src="${data.message}" onclick="window.open(this.src)" loading="lazy"></video>
                `;
                break;

              case 'video/mkv':
                data.message = `
                <video poster="./src/img/poster.png" slot="message" controls src="${data.message}"  loading="lazy"></video>
                `;
                break;

              case 'audio/mp3':
                data.message = `
                <audio slot="message"  controls src="${data.message}"  loading="lazy"></audio>
                `;
                break;

              case 'audio/mpeg':
                data.message = `
                <audio slot="message" controls src="${data.message}"  loading="lazy"></audio>
                `;
                break;

              case 'application/pdf':
                data.message = `
                <div class="document" slot="message">
                <a style="text-decoration: none ; color: white" href="${data.message}">
                <i style="margin-right: 4px" class="fas fa-file"></i>
                ${data.filename}</a>

                </div>
                `;
                break;

              case 'text/html':
                data.message = `
                <div class="document" slot="message">
                <a style="text-decoration: none ; color: white" href="${data.message}">
                <i style="margin-right: 4px" class="fas fa-file"></i>
                ${data.filename}</a>

                </div>
                `;
                break;

              case 'text/js':
                data.message = `
                <div class="document" slot="message">
                <a style="text-decoration: none ; color: white" href="${data.message}">
                <i style="margin-right: 4px" class="fas fa-file"></i>
                ${data.filename}</a>

                </div>
                `;
                break;

              case 'text/plain':
                data.message = `
                <div class="document" slot="message">
                <a style="text-decoration: none ; color: white" href="${data.message}">
                <i style="margin-right: 4px" class="fas fa-file"></i>
                ${data.filename}</a>

                </div>
                `;
                break;

              case 'text/css':
                data.message = `
                <div class="document" slot="message">
                <a style="text-decoration: none ; color: white" href="${data.message}">
                <i style="margin-right: 4px" class="fas fa-file"></i>
                ${data.filename}</a>

                </div>
                `;
                break;

              case 'application/vnd.android.package-archive':
                data.message = `
                <div class="document" slot="message">
                <a style="text-decoration: none ; color: white" href="${data.message}">
                <i style="margin-right: 4px" class="fas fa-file"></i>
                ${data.filename}</a>

                </div>
                `;
                break;

              case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                data.message = `
                <div class="document" slot="message">
                <a style="text-decoration: none ; color: white" href="${data.message}">
                <i style="margin-right: 4px" class="fas fa-file"></i>
                ${data.filename}</a>

                </div>
                `;
                break;

              default:
                data.message = "<span slot='message'>"+ data.message.convertToURL()+"</span>";
                break;
            }


          } else {
            data.message = "<span slot='message'>"+ data.message.convertToURL()+"</span>";
          }

          if (!data.size) {
            data.size = "";
          }else{
            data.size = formatBytes(data.size);
          }

          if (document.querySelector("[doc='"+ docs.doc.id+"']") == null) {
            if (thisMessenger.messageDates.includes(currentDate)) {

              thisMessenger.innerHTML +=
              `<list-element
              read="${data.read}"
              doc="${docs.doc.id}"
              slot="message"
              type=${userType}>
              <span slot="time">${time}</span>

              ${data.message}

              <span slot="sent" class="seen">✓✓</span>

              <span slot="size">${data.size}</span>

              </list-element>
              `;

            } else {
              thisMessenger.messageDates.push(currentDate);


              currentDate = beautifyDate(currentDate);
              thisMessenger.innerHTML +=
              `
              <div slot="message" class="date">${currentDate}</div>
              <list-element
              doc="${docs.doc.id}"
              read="${data.read}"
              slot="message"
              type=${userType}>
              <span slot="time">${time}</span>

              ${data.message}

              <span slot="sent" class="seen">✓✓</span>

              <span slot="size">${data.size}</span>
              </list-element>
              `;

            }

            try {
              let i = 0;
              Array.from(thisMessenger.children).forEach(child => {

                if (child.getAttribute("read") == "false" && child.getAttribute("type") == "main" && docs.type == "added") {
                  i++;
                }

              });

              thisMessenger.setAttribute("unread",
                i);

              thisMessenger.scrollToBottom();
              thisMessenger.children[thisMessenger.children.length - 1].scrollIntoView();
            }catch(e) {
              console.log(e)
            }

          } else {
            let setEle = document.querySelector("[doc='"+ docs.doc.id+"']");
            setEle.setAttribute("read", data.read)
          }


        }


      });
    },
    error => {
      console.log(error);
    });
}

function initiateUserStatus() {
  rtdb.ref('/users').on('value',
    (response) => {
      const users = response.val();
      Object.entries(users).forEach(user => {
        const id = user[0];
        const obj = user[1];
        const ele = document.querySelector("#"+id);
        if (ele != null) {
          try {
            if (obj.online === true) {
              ele.setAttribute("status", "online");
            } else {
              ele.setAttribute("status", obj.lastseen.seconds);
            }
          }catch(e) {
            console.log(e)
          }
        }
      });
    },
    (error) => {
      console.log(error)
    });
}


function submitData(obj) {
  if (auth.currentUser != null) {
    obj.button.innerHTML =
    `<i class="fas fa-circle-notch fa-spin"></i>`;
    db.collection('chats').add({
      "message": obj.value,
      "user-id": localStorage.userId,
      "user-connection": [obj.uid, localStorage.userId],
      "time": firebase.firestore.Timestamp.now(),
      "read": false
    }).then(()=> {
      obj.textarea.innerText = "";
      obj.button.innerHTML = ` <i class="fa fa-paper-plane" aria-hidden="true"></i>`;
    }).catch(e=> {
      obj.button.innerHTML = ` <i class="fa fa-paper-plane" aria-hidden="true"></i>`;
      alert('somethinfmg went wrong');
    });
  }
}

function checkUsers() {
  db.collection('user-details').onSnapshot((response)=> {
    response = response.docChanges();
    response.forEach(docs => {
      if (docs.type === "modified") {

        if (document.querySelector('#'+docs.doc.id) != null) {
          try {
            let data = docs.doc.data();
            const element = document.querySelector('#'+docs.doc.id);
            const Cha = document.querySelector(`[uid="${docs.doc.id}"]`)

            element.setAttribute('src', data.src);
            element.setAttribute('name', data.name);

            Cha.setAttribute('src', data.src);
            Cha.setAttribute('name', data.name);

            element.setProfile(data);
          }catch(e) {
            //  console.log(e)
          }
        }
        if (docs.doc.id == localStorage.userId) {
          const setdata = docs.doc.data();
          myChattyProfile.updateUI(setdata);
        }

      }
    })

  }, (error)=> {
    // console.log(error)
  })
}

function updateUserImg(file , loader) {

  loader.style.visibility = "visible";
  loader.style.opacity = "1";

  let uploadTask = storage.child(file.name).put(file);
  uploadTask.on('state_changed',
    (snapshot) => {},
    (error) => {
      console.log(error)
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        db.collection('user-details').doc(localStorage.userId).update({
          src: downloadURL
        }).then(e => {

          loader.style.visibility = "hidden";
          loader.style.opacity = "0";
        }).catch(e => console.log(e));
      });
    }
  );
}


function sendAttachments(to ,files, obj) {
  obj.sendBtn.innerHTML =
  `<i class="fas fa-circle-notch fa-spin"></i>`;
  let length = files.length;
  let date = new Date();
  date = date.getTime();

  Array.from(files).forEach(
    (file,
      index) => {
      let fname = file.name;
      fname = fname.slice((Math.max(0, fname.lastIndexOf(".")) || Infinity) + 1);

      let uploadTask = storage.child(date+"."+fname).put(file);

      const fileElement = document.createElement("file-upload");
      fileElement.setAttribute("name",
        file.name)
      fileElement.setAttribute("percentage",
        "0")
      obj.div.appendChild(fileElement);
      fileElement.setEvent(uploadTask.cancel)
      uploadTask.on('state_changed',
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          fileElement.setAttribute("percentage", Math.round(progress))
        },
        (error) => {
          // Handle unsuccessful uploads
          switch (error.code) {
            case 'storage/unauthorized':
              alert(error.message);
              fileElement.remove();
              if (length == 0) {
                obj.div.innerHTML =
                `
                <div class="dummy">Please select some files to send</div>
                </div>
                `;
                obj.resetBtn.classList.remove('reset');
                obj.sendBtn.innerText = `Send`;
                obj.resetBtn.click();
              }
              break;

            case 'storage/canceled':
              length = length - 1;
              if (length < 0) {
                length = 0;
              }
              fileElement.remove();
              if (length == 0) {
                obj.div.innerHTML =
                `
                <div class="dummy">Please select some files to send</div>
                </div>
                `;
                obj.resetBtn.classList.remove('reset');
                obj.sendBtn.innerText = `Send`;
                obj.resetBtn.click();
              }
              break;

            case 'storage/unknown':
              alert(error.message);
              fileElement.remove();
              if (length == 0) {
                obj.div.innerHTML =
                `
                <div class="dummy">Please select some files to send</div>
                </div>
                `;
                obj.resetBtn.classList.remove('reset');
                obj.sendBtn.innerText = `Send`;
                obj.resetBtn.click();
              }
              break;

            default:
              alert(error.message);
              fileElement.remove();
              if (length == 0) {
                obj.div.innerHTML =
                `
                <div class="dummy">Please select some files to send</div>
                </div>
                `;
                obj.resetBtn.classList.remove('reset');
                obj.sendBtn.innerText = `Send`;
                obj.resetBtn.click();
              }
              break;
          }
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            db.collection('chats').add({
              "message": downloadURL,
              "user-id": localStorage.userId,
              "user-connection": [to, localStorage.userId],
              "time": firebase.firestore.Timestamp.now(),
              "read": false,
              "type": file.type,
              "size": file.size,
              "filename": file.name
            }).then(()=> {
              fileElement.setAttribute('type', 'sent');
              if (obj.div.querySelectorAll('[type="sent"]').length == length) {
                obj.sendBtn.innerText = `Success`;
                setTimeout(function() {
                  obj.sendBtn.innerText = `Send`;
                  obj.resetBtn.click();
                }, 1000);
              }
            });
          });

        });
    });
}

var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var local_stream;
var screenStream;
var peer = null;
var currentPeer = null;


//

const videoAnswerBtn = document.querySelector('#answerVideo');
const videoEndBtn = document.querySelector('#endVideo');
const videoInfo = document.querySelectorAll('.video-info');
const videoCallText = document.querySelector('#video-call-text');
const videoCallDiv = document.querySelector('.video-call-ui');
const videoCover = document.querySelector('.video-cover');

const remote = document.querySelector('#remote')
const local = document.querySelector('#local')


const endBtn = document.querySelector('#end');
const answerBtn = document.querySelector('#answer');
const voiceCallText = document.querySelector("#voice-call-text");
const cover = document.querySelector('.voice-cover');
const btnDiv = document.querySelector('.buttons');
const callUi = document.querySelector('.voice-call-ui');


let interval;

// video call functions

function incomingVideoCall() {
  videoCallDiv.style.display = "block";
  setTimeout(function() {
    videoEndBtn.style.display = "block"
    videoCover.style.background = "rgba(0,0,0,0.7)"
    videoAnswerBtn.style.display = "block";
    videoCallText.style.color = "white"
    videoCallText.innerText = "Incoming video call";
    videoCallDiv.classList.add('picked')
  }, 200);
}
function pickUpVideoCall() {
  videoAnswerBtn.style.display = "none";
  videoInfo.forEach(item => {
    item.style.display = "none";
  });

  local.style.display = "block"
  remote.style.display = "block"

  videoCallText.innerText = "Connecting";
  let i = 0;

  const roomId = videoCallDiv.getAttribute('roomid');
  joinRoom(roomId);
  /* setTimeout(function () {
    interval = setInterval(function() {
      videoCallText.innerText = secondsToHms(i);
      i++
    }, 1000);
  }, 1000);*/
}
function endVideoCall() {
  videoCover.style.background = "black"

  try {
    clearInterval(interval);
  }catch(e) {
    console.log(e)
  }


  videoAnswerBtn.style.display = "none";
  videoInfo.forEach(item => {
    item.style.display = "none";
  })

  videoCallText.style.color = "red"
  videoCallText.innerText = "Call ended";

  local.style.display = "none"
  remote.style.display = "none"

  videoEndBtn.style.display = "none"

  videoInfo.forEach(item => {
    item.style.display = "block"
  })

  // here p2p close !
  setTimeout(function() {
    videoCallDiv.classList.remove('picked');
    setTimeout(function() {
      videoCallDiv.style.display = "none"
    }, 200);
  }, 1000);

  const roomId = videoCallDiv.getAttribute('roomid');

  try {
    rtdb.ref('users/'+localStorage.userId).update({
      incall: false
    });

    rtdb.ref(`logs/${roomId}`).update({
      alive: false
    })
  }catch(e) {
    console.log(e)
  }
}

// Voice call functions


function incomingVoiceCall(from) {

  callUi.style.display = "block ! important";
  setTimeout(()=> {
    voiceCallText.style.color = "white";
    btnDiv.style.display = "flex";
    answerBtn.style.display = "block";
    voiceCallText.innerText = "Incoming Call";
    callUi.classList.add('picked');
    cover.style.background = 'rgba(0,0,0,0.7)';
  }, 200);
}
function pickUpVoiceCall() {
  answerBtn.style.display = "none";
  voiceCallText.innerText = "Connecting";

  let i = 0;

  setTimeout(function () {
    interval = setInterval(function() {
      voiceCallText.innerText = secondsToHms(i);
      i++
    }, 1000);
  }, 1000);
}
function endVoiceCall() {

  try {
    clearInterval(interval);
  }catch(e) {
    console.log(e)
  }
  i = 0;
  voiceCallText.style.color = "red";
  voiceCallText.innerText = "Call ended";
  btnDiv.style.display = "none";
  cover.style.background = 'black';
  setTimeout(function() {
    callUi.classList.remove('picked');
    setTimeout(function() {
      callUi.style.display = "none";
    }, 200);
  }, 1000);

  const roomId = callUi.getAttribute('roomid');

  // here p2p close !

  try {
    rtdb.ref('users/'+localStorage.userId).update({
      incall: false
    });

    rtdb.ref(`logs/${roomId}`).update({
      alive: false
    })
  }catch(e) {
    console.log(e)
  }
}

let busy = false;

rtdb.ref('logs').on('value', function (snapshot) {

  Object.entries(snapshot.val()).forEach(entry=> {
    const roomId = entry[0];
    const obj = entry[1];

    if (obj.alive && obj["user-connection"].includes(localStorage.userId)) {
      busy = true;
    }

    if (obj.alive && obj["user-connection"].includes(localStorage.userId)) {

      let array = obj['user-connection'].slice();
      const index = array.indexOf(localStorage.userId);

      array.splice(index, 1);
      const secondUserId = array[0];

      callUi.setAttribute("roomid", roomId);
      videoCallDiv.setAttribute("roomid", roomId);

      if (obj["user-id"] === localStorage.userId) {
        //  console.log('i am calling to someone ')
        accessCall(obj.type, "outgoing", secondUserId, roomId)
      } else {
        //  console.log('someone is calling me ')
        accessCall(obj.type, "incoming", secondUserId, roomId)
      }

      rtdb.ref(`logs/${roomId}`).onDisconnect().update({
        alive: false
      })

    }
  });
});

rtdb.ref('logs').on('child_changed', function(child) {
  obj = child.val()
  if (obj.alive === false && obj["user-connection"]. includes(localStorage.userId)) {
    if (busy == true) {
      endCall(obj["type"]);
      busy = false;
    }
  }
});

function accessCall(callType , call , secondUserId , roomId) {

  if (call == "incoming") {
    switch (callType) {
      case 'video':
        incomingNewVideoCall(secondUserId, roomId)

        break;

      case 'voice':
        incomingNewPhoneCall(secondUserId, roomId);

        break;

      default:
        // silence is golden
      }
    } else {
      switch (callType) {
        case 'video':
          placeNewVideoCall(secondUserId, roomId)
          createRoom(roomId)
          break;

        case 'voice':
          placeNewPhoneCall(secondUserId, roomId)
          break;

        default:
          // silence is golden
        }
      }
    }


    function makeCall(type , to) {

      rtdb.ref('users/'+localStorage.userId).update({
        incall: true
      });

      rtdb.ref('users/'+localStorage.userId).onDisconnect().update({
        incall: false
      });

      rtdb.ref('users/'+to).get().then(res=> {
        res = res.val();

        if (res.incall != true) {
          rtdb.ref('logs').push().set({
            "time": firebase.firestore.Timestamp.now(),
            "user-connection": [localStorage.userId, to],
            "user-id": localStorage.userId,
            "alive": true,
            "type": type
          }).catch(e => console.log(e));
        } else {
          alert('Person you are trying to call is busy !');
        }
      });
    }


    function placeNewPhoneCall(to) {
      callUi.style.display = "block";
      voiceCallText.style.color = "white";
      btnDiv.style.display = "flex";
      answerBtn.style.display = "none";

      voiceCallText.innerText = "Connecting";
      callUi.classList.add('picked');
      cover.style.background = 'rgba(0,0,0,0.7)';

      // p2p
    }

    function placeNewVideoCall(to) {
      videoCallDiv.style.display = "block";
      videoCallDiv.classList.add('picked')
      videoAnswerBtn.style.display = "none";
      videoInfo.forEach(item => {
        item.style.display = "none";
      });
      videoEndBtn.style.display = "block"
      videoCover.style.background = "rgba(0,0,0,0.7)"
      videoCallText.style.color = "white"
      local.style.display = "block"
      remote.style.display = "block"
      videoCallText.innerText = "Connecting";

      // p2p
    }

    function incomingNewPhoneCall(from) {
      incomingVoiceCall(from);
      //p2p
    }

    function incomingNewVideoCall(from) {
      incomingVideoCall(from);
      // p2p
    }

    function endCall(type) {
      // if else for type
      if (type == "video") {
        endVideoCall()
      } else {
        endVoiceCall()
      }
    }





    function setLocalStream(stream) {
      local.srcObject = stream;
    }
    function setRemoteStream(stream) {
      remote.srcObject = stream;
    }

    function createRoom(roomId) {
      console.log("Creating Room");
      let room_id = "P2P"+roomId+"CONNECTION";
      peer = new Peer(room_id);
      peer.on('open', (id) => {
        console.log("Peer Connected with ID: ", id);
        getUserMedia({
          video: true
        }, (stream) => {
          local_stream = stream;
          setLocalStream(local_stream);
        }, (err) => {
          console.log(err);
        });
        console.log("Waiting for peer to join.");
      });

      peer.on('call', (call) => {
        call.answer(local_stream);
        call.on('stream', (stream) => {
          setRemoteStream(stream);
        });
        currentPeer = call;
      });
    }



    function joinRoom(roomId) {
      console.log('Joining room')
      let room_id = "P2P"+roomId+"CONNECTION";
      console.log(room_id)
      peer = new Peer();
      peer.on('open', (id) => {
        console.log("Connected with Id: " + id);
        getUserMedia({
          video: true
        }, (stream) => {
          local_stream = stream;
          setLocalStream(local_stream);
          console.log("Joining peer");
          let call = peer.call(room_id, stream);
          call.on('stream', (stream) => {
            setRemoteStream(stream);
          });
          currentPeer = call;
        }, (err) => {
          console.log(err);
        });
      });
    }
