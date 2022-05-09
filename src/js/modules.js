import {
  Messenger
} from "../../components/messenger.js";

import {
  ListElement
} from "../../components/list-element.js";

import {
  AppMain
} from "../../components/app-main.js";

import {
  FloatingBtn
} from "../../components/floating-btn.js";

import {
 ChatItem
} from "../../components/chat-item.js";

import {
 Callitem
} from "../../components/call-item.js";

import {
 PageFragment
} from "../../components/page-fragment.js";

import {
 DpModal
} from "../../components/dp-modal.js";

import {
  Profile
} from "../../components/profile.js";


import {
 UserProfile
} from "../../components/user-profile.js";

import {
 AttachmentModal
} from "../../components/attachment-modal.js";

import {
 FileUpload
} from "../../components/file-upload.js";

import {
 LoginSignUp
} from "../../components/login-signup.js";

window.customElements.define('page-fragment', PageFragment);

window.customElements.define('dp-modal' , DpModal);

window.customElements.define('messenger-element', Messenger);

window.customElements.define('list-element', ListElement);

window.customElements.define('app-main', AppMain);

window.customElements.define('floating-btn', FloatingBtn);

window.customElements.define('chat-item', ChatItem);

window.customElements.define('call-item', Callitem);

window.customElements.define('profile-element', Profile);


window.customElements.define('user-profile', UserProfile);


window.customElements.define('attachment-modal', AttachmentModal);

window.customElements.define('file-upload', FileUpload);

window.customElements.define('login-signup', LoginSignUp);
