"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formDataLocal = localStorage.getItem("resumeBuilderFormData");
let formDataJSON = null;
if (formDataLocal) {
    formDataJSON = JSON.parse(formDataLocal);
}
if (formDataJSON) {
    console.log(formDataJSON);
    const imgC = document.querySelector("#img");
    imgC.children[1].textContent = `${formDataJSON.firstName} ${formDataJSON.firstName}`;
    imgC.children[3].textContent = `${formDataJSON.jobTitleApplyFor}`;
}
