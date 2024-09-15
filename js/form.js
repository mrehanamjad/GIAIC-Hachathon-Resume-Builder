"use strict";
let educationIds = 1;
let workExperienceIds = 1;
// toggle toggleSubSection Visibility
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
function addASection(hashMainSectionId, dotSectionContainerClass, SectionHtml) {
    const Container = document.querySelector(dotSectionContainerClass);
    const addBtn = document.querySelector(`${hashMainSectionId} .addSectionBtn`);
    addBtn.addEventListener("click", () => {
        Container.insertAdjacentHTML("beforeend", SectionHtml);
    });
}
function removeSkill() {
    const skillContainer = document.querySelector(".skillContainer");
    skillContainer.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("fa-circle-xmark"))
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
            courses: {
                courseTitle: formData.getAll("courseTitle"),
                courseInstitutionName: formData.getAll("courseInstitutionName"),
                courseCompletionDate: formData.getAll("courseCompletionDate"),
                courseDescription: formData.getAll("courseDescription"),
            },
            projects: {
                projectTitle: formData.getAll("projectTitle"),
                technologyUsed: formData.getAll("technologyUsed"),
                projectGithubLink: formData.getAll("projectGithubLink"),
                projectWebsiteLink: formData.getAll("projectWebsiteLink"),
                projectDescription: formData.getAll("projectDescription"),
            },
        };
        console.log(formValues);
    });
}
toggleSubSection(".educationSectionContainer");
toggleSubSection(".workExperienceSectionContainer");
toggleSubSection(".courseSectionContainer");
toggleSubSection(".projectSectionContainer");
removeSkill();
addASection("#education", ".educationSectionContainer", `
  <div class="sectionIn educationIn">
  <button type="button" class="toggleSubSectionBtn">
  <span>(not specified)</span>
      <div>
          <i class="fa-solid fa-trash" id="delItem"></i>
          <i class="fa-solid fa-chevron-down"></i>
      </div>
  </button>

  <div class="educationSubSection disappear">
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
                  placeholder="e.g. May 2020 - Jan 2022">
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
addASection("#workExperience", ".workExperienceSectionContainer", `
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
                    placeholder="e.g. May 2020 - Jan 2022">
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
addASection("#skills", ".skillContainer", `
  <div>
      <input type="text" name="skill" id="skill" class="smallInput">
      <i class="fa-solid fa-circle-xmark"></i>
  </div>
   `);
addASection("#courses", ".courseSectionContainer", `
  <div class="sectionIn courseIn">
    <button type="button" class="toggleSubSectionBtn">
        <span>(not specified)</span>
        <div>
            <i class="fa-solid fa-trash" id="delItem"></i>
            <i class="fa-solid fa-chevron-down"></i>
        </div>
    </button>
  
    <div class="courseSubSection disappear" >
        <div class="flex">
            <div class="inputContainer">
                <label for="courseTitle">course</label>
                <input type="text" id="courseTitle" name="courseTitle">
            </div>
            <div class="inputContainer">
                <label for="courseInstitutionName">institute/Plateform</label>
                <input type="text" id="courseInstitutionName" name="courseInstitutionName">
            </div>
            <div class="inputContainer">
                <label for="courseCompletionDate">Completion Date</label>
                <input type="text" id="courseCompletionDate" name="courseCompletionDate"
                    placeholder="e.g. May 2023">
            </div>
        </div>
        <div class="inputContainer">
            <label for="courseDescription">Description (optional)</label>
            <textarea type="text" id="courseDescription" name="courseDescription"
                placeholder="A brief description of the course or certification"></textarea>
        </div>
    </div>
  </div>
      `);
addASection("#projects", ".projectSectionContainer", `
  <div class="sectionIn projectIn">
    <button type="button" class="toggleSubSectionBtn">
        <span>(not specified)</span>
        <div>
            <i class="fa-solid fa-trash" id="delItem"></i>
            <i class="fa-solid fa-chevron-down"></i>
        </div>
    </button>
  
    <div class="projectSubSection disappear">
        <div class="flex">
            <div class="inputContainer">
                <label for="projectTitle">Project Title</label>
                <input type="text" id="projectTitle" name="projectTitle">
            </div>
            <div class="inputContainer">
                <label for="technologyUsed">Technologies Used</label>
                <input type="text" id="technologyUsed" name="technologyUsed"  placeholder="Keep separated by comma (,)">
            </div>
        </div>
        <div class="flex">
            <div class="inputContainer">
                <label for="projectGithubLink">Github Link</label>
                <input type="text" id="projectGithubLink" name="projectGithubLink">
            </div>
            <div class="inputContainer">
                <label for="projectWebsiteLink">Website Link</label>
                <input type="text" id="projectWebsiteLink" name="projectWebsiteLink" >
            </div>
        </div>
        <div class="inputContainer">
            <label for="projectDescription">Description</label>
            <textarea type="text" id="projectDescription" name="projectDescription"
               ></textarea>
        </div>
    </div>
  </div>
        `);
getFormData();
