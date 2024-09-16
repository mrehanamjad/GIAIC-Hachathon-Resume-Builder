import { FormValues } from "./interface";

const formDataLocal: string | null = localStorage.getItem(
  "resumeBuilderFormData"
);
let formDataJSON: FormValues | null = null;
if (formDataLocal) {
  formDataJSON = JSON.parse(formDataLocal);
}
if (formDataJSON) {
  console.log(formDataJSON);
  const imgC = document.querySelector("#img") as HTMLDivElement;
  imgC.children[1].textContent = `${formDataJSON.firstName} ${formDataJSON.firstName}`;
    imgC.children[3].textContent = `${formDataJSON.jobTitleApplyFor}`
    
}
