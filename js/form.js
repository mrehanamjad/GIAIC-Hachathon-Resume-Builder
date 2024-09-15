"use strict";
let educationIds = 1;
let workExperienceIds = 1;
// toggle toggleSubSection Visibility using Event Delegation
function toggleSubSection(dotContainerClass) {
    const elContainer = document.querySelector(dotContainerClass);
    elContainer.addEventListener("click", function (e) {
        const target = e.target;
        // Toggle SubSection visibility
        if (target.classList.contains("toggleSubSectionBtn") ||
            target.closest(".toggleSubSectionBtn")) {
            // getting btn
            const btn = target.closest(".toggleSubSectionBtn");
            // getting first input of the section:
            const sectionTitleInp = btn.parentElement?.lastElementChild
                ?.firstElementChild?.firstElementChild
                ?.lastElementChild;
            // setting title of section/btn on the basis of first input of the section:
            sectionTitleInp.addEventListener("input", function () {
                if (btn.firstElementChild) {
                    this.value.trim().length > 0
                        ? (btn.firstElementChild.textContent = this.value)
                        : (btn.firstElementChild.textContent = "(not specified)");
                }
            });
            const subSection = btn.nextElementSibling;
            if (subSection) {
                // Toggle visibility of basis of btn click
                subSection.classList.toggle("disappear");
                // changing up n down arrors on button
                btn.lastElementChild?.lastElementChild?.classList.toggle("fa-chevron-down");
                btn.lastElementChild?.lastElementChild?.classList.toggle("fa-chevron-up");
            }
        }
        // Remove the  section on clicking the delete icon
        if (target.id === "delItem") {
            const sectionToRemove = target.closest(".sectionIn");
            if (sectionToRemove) {
                sectionToRemove.remove();
                //  TODO: changing text of Btn
                // const addBtn = elContainer.parentElement?.lastElementChild as HTMLElement
                // if(elContainer.childElementCount < 1){
                //    addBtn.textContent = "+ Add Education"
                // } else {
                //   addBtn.textContent = "+ Add one more education"
                // }
            }
        }
    });
}
// Adding one more education
function addOneMoreEducation() {
    const eduContainer = document.querySelector(".educationSectionContainer");
    const addOneMoreEducationBtn = document.querySelector("#education .addSectionBtn");
    addOneMoreEducationBtn.addEventListener("click", () => {
        ++educationIds;
        eduContainer.insertAdjacentHTML("beforeend", `
<div class="sectionIn educationIn">
  <button type="button" class="toggleSubSectionBtn">
  <span>(not specified)</span>
      <div>
          <i class="fa-solid fa-trash" id="delItem"></i>
          <i class="fa-solid fa-chevron-down"></i>
      </div>
  </button>

  <div class="educationSubSection disappear" id="education${educationIds}">
      <div class="flex">
          <div class="inputContainer">
              <label for="qualification">Degree or Qualification</label>
              <input type="text" id="qualification" name="qualification">
          </div>
          <div class="inputContainer">
              <label for="institutionName">Institution Name</label>
              <input type="text" id="institutionName" name="institutionName">
          </div>
          <div class="inputContainer">
              <label for="educationStartAndEndDate">Start & End Date</label>
              <input type="text" id="educationStartAndEndDate" name="educationStartAndEndDate"
                  placeholder="e.g. 2020-2024">
          </div>
      </div>
      <div class="inputContainer">
          <label for="educationDescription">Description</label>
          <textarea type="text" id="educationDescription" name="educationDescription"
              placeholder="Any honors or awards received"></textarea>
      </div>
  </div>
</div>
    `);
    });
}
function addOneMoreWorkExperience() {
    const eduContainer = document.querySelector(".workExperienceSectionContainer");
    const addOneMoreEducationBtn = document.querySelector("#workExperience .addSectionBtn");
    addOneMoreEducationBtn.addEventListener("click", () => {
        ++workExperienceIds;
        eduContainer.insertAdjacentHTML("beforeend", `
<div class="sectionIn workIn">
  <button type="button" class="toggleSubSectionBtn">
  <span>(not specified)</span>
      <div>
          <i class="fa-solid fa-trash" id="delItem"></i>
          <i class="fa-solid fa-chevron-down"></i>
      </div>
  </button>

  <div class="workSubSection disappear" id="workExperience${workExperienceIds}">
      <div class="flex">
          <div class="inputContainer">
              <label for="jobTitle">Job Title</label>
              <input type="text" id="jobTitle" name="jobTitle">
          </div>
          <div class="inputContainer">
              <label for="companyName">Company Name</label>
              <input type="text" id="companyName" name="companyName">
          </div>
          <div class="inputContainer">
              <label for="jobStartAndEndDate">Start & End Date</label>
              <input type="text" id="jobStartAndEndDate" name="jobStartAndEndDate"
                  placeholder="e.g. 2020-2024">
          </div>
      </div>
      <div class="inputContainer">
          <label for="jobDescription">Description</label>
          <textarea type="text" id="jobDescription" name="jobDescription"
              placeholder="Key Responsibilities and Achievements"></textarea>
      </div>
  </div>
</div>
    `);
    });
}
function addSkill() {
    const skillContainer = document.querySelector(".skillContainer");
    const addSkillBtn = document.querySelector("#skills .addSectionBtn");
    addSkillBtn.addEventListener("click", () => {
        skillContainer.insertAdjacentHTML("beforeend", `
  <div>
      <input type="text" name="skill" id="skill" class="smallInput">
      <i class="fa-solid fa-circle-xmark"></i>
  </div>
      `);
    });
}
function removeSkill() {
    const skillContainer = document.querySelector(".skillContainer");
    skillContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('fa-circle-xmark'))
            target.parentElement?.remove();
    });
}
const mainForm = document.querySelector("#mainForm");
function getFormData() {
    mainForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(mainForm);
        const formValues = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            jobTitleApplyFor: formData.get("jobTitleApplyFor"),
            aboutMe: formData.get("aboutMe"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            linkedin: formData.get("linkedin"),
            personalWebsite: formData.get("personalWebsite"),
            github: formData.get("github"),
            education: {
                qualification: formData.getAll("qualification"),
                institutionName: formData.getAll("institutionName"),
                educationStartAndEndDate: formData.getAll("educationStartAndEndDate"),
                educationDescription: formData.getAll("educationDescription"),
            },
            workExperience: {
                jobTitle: formData.getAll("jobTitle"),
                companyName: formData.getAll("companyName"),
                jobStartAndEndDate: formData.getAll("jobStartAndEndDate"),
                jobDescription: formData.getAll("jobDescription"),
            },
            skill: formData.getAll("skill"),
        };
        console.log(formValues);
    });
}
toggleSubSection(".educationSectionContainer");
toggleSubSection(".workExperienceSectionContainer");
addOneMoreEducation();
addSkill();
removeSkill();
addOneMoreWorkExperience();
getFormData();
