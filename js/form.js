"use strict";
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
            if (sectionTitleInp.value) {
                btn.firstElementChild.textContent = sectionTitleInp.value;
            }
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
            }
        }
    });
}
function addASection(hashMainSectionId, dotSectionContainerClass, SectionHtml, withoutClick = false) {
    const Container = document.querySelector(dotSectionContainerClass);
    const addBtn = document.querySelector(`${hashMainSectionId} .addSectionBtn`);
    if (withoutClick) {
        Container.insertAdjacentHTML("beforeend", SectionHtml);
    }
    else {
        addBtn.addEventListener("click", () => {
            Container.insertAdjacentHTML("beforeend", SectionHtml);
        });
    }
}
function removeSkill() {
    const skillContainer = document.querySelector(".skillContainer");
    skillContainer.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("fa-circle-xmark"))
            target.parentElement?.remove();
    });
}
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
function getFormData() {
    const mainForm = document.querySelector("#mainForm");
    mainForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(mainForm);
        const photoFile = formData.get("photo");
        // Convert image to Base64 before storing
        const photoBase64 = photoFile ? await convertToBase64(photoFile) : null;
        const formValues = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            photo: photoBase64, // Store Base64 string instead of File object
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
        localStorage.setItem("resumeBuilderFormData", JSON.stringify(formValues));
        window.location.href = "./resume.html";
    });
}
function addEducationS(withoutClick = false) {
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
    `, withoutClick);
}
function addWorkExperienceS(withoutClick = false) {
    addASection("#workExperience", ".workExperienceSectionContainer", `
    <div class="sectionIn workIn">
      <button type="button" class="toggleSubSectionBtn">
      <span>(not specified)</span>
          <div>
              <i class="fa-solid fa-trash" id="delItem"></i>
              <i class="fa-solid fa-chevron-down"></i>
          </div>
      </button>
      <div class="workExperienceSubSection disappear">
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
        `, withoutClick);
}
function addCourseS(withoutClick = false) {
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
        `, withoutClick);
}
function addSkillS(withoutClick = false) {
    addASection("#skills", ".skillContainer", `
    <div>
        <input type="text" name="skill" id="skill" class="smallInput">
        <i class="fa-solid fa-circle-xmark"></i>
    </div>
     `, withoutClick);
}
function addProjectS(withoutClick = false) {
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
          `, withoutClick);
}
addEducationS();
addWorkExperienceS();
addCourseS();
addSkillS();
addProjectS();
toggleSubSection(".educationSectionContainer");
toggleSubSection(".workExperienceSectionContainer");
toggleSubSection(".courseSectionContainer");
toggleSubSection(".projectSectionContainer");
removeSkill();
getFormData();
// Edit Resume Form ================================================================
function getFormD() {
    const formDataStr = localStorage.getItem("resumeBuilderFormData");
    if (formDataStr) {
        return JSON.parse(formDataStr);
    }
}
const formDataJSON = getFormD();
if (formDataJSON) {

    function setPersonalInfo() {
        const personalFields = ["firstName", "lastName", "jobTitleApplyFor", "email", "phone", "address", "github", "linkedin", "personalWebsite",
        ];
        personalFields.forEach((key) => {
            const input = document.querySelector(`input[name="${key}"]`);
            if (input)
                input.value = formDataJSON[key] || "";
        });
        ;
        document.querySelector('textarea[name="aboutMe"]').value = formDataJSON.aboutMe;
    }
    function setSection(addSection, formFields, length, sectionFields) {
        for (let i = 0; i < length; i++) {
            addSection(true);
        }
        sectionFields.forEach((key) => {
            try {
                const input = key.toLowerCase().includes("description") ? document.querySelectorAll(`textarea[name="${key}"]`) : document.querySelectorAll(`input[name="${key}"]`);
                formFields[key].forEach((val, i) => { input[i].value = val; });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    function setSkillSection() {
        for (let i = 0; i < formDataJSON.skill.length; i++) {
            addSkillS(true);
        }
        const input = document.querySelectorAll('input[name="skill"]');
        formDataJSON.skill.forEach((val, i) => { input[i].value = val; });
    }
    function setSectionTopText() {
        const Btns = document.querySelectorAll('.toggleSubSectionBtn');
        Btns.forEach((btn, i) => {
            btn.firstElementChild.textContent = btn.nextElementSibling.firstElementChild.firstElementChild.lastElementChild.value;
        });
    }
    setSection(addEducationS, formDataJSON.education, formDataJSON.education.institutionName.length, ["qualification", "institutionName", "educationStartAndEndDate", "educationDescription"]);
    setSection(addWorkExperienceS, formDataJSON.workExperience, formDataJSON.workExperience.companyName.length, ["jobTitle", "companyName", "jobStartAndEndDate", "jobDescription"]);
    setSection(addCourseS, formDataJSON.courses, formDataJSON.courses.courseTitle.length, ["courseTitle", "courseInstitutionName", "courseCompletionDate", "courseDescription"]);
    setSection(addProjectS, formDataJSON.projects, formDataJSON.projects.projectTitle.length, ["projectTitle", "technologyUsed", "projectGithubLink", "projectWebsiteLink", "projectDescription"]);
    setPersonalInfo();
    setSkillSection();
    setSectionTopText();
    document.querySelector("#sBtn").textContent = "Update Resume";
    document.querySelector("#mainH").textContent = "Edit Resume";
}
