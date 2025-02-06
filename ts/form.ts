// interfaces:
interface Education {
  qualification: string[];
  institutionName: string[];
  educationStartAndEndDate: string[];
  educationDescription: string[];
}

interface WorkExperience {
  jobTitle: string[];
  companyName: string[];
  jobStartAndEndDate: string[];
  jobDescription: string[];
}

interface Courses {
  courseTitle: string[];
  courseInstitutionName: string[];
  courseCompletionDate: string[];
  courseDescription: string[];
}

interface Projects {
  projectTitle: string[];
  technologyUsed: string[];
  projectGithubLink: string[];
  projectWebsiteLink: string[];
  projectDescription: string[];
}

interface FormValues {
  firstName: string | null;
  lastName: string | null;
  photo: string | File | null;
  jobTitleApplyFor: string | null;
  aboutMe: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  linkedin: string | null;
  personalWebsite: string | null;
  github: string | null;
  education: Education;
  workExperience: WorkExperience;
  skill: string[];
  courses: Courses;
  projects: Projects;
}

// toggle toggleSubSection Visibility
function toggleSubSection(dotContainerClass: string) {
  const elContainer = document.querySelector(
    dotContainerClass
  ) as HTMLDivElement;
  

  elContainer.addEventListener("click", function (e) {
    const target = e.target as HTMLElement;

    // Toggle SubSection visibility
    if (
      target.classList.contains("toggleSubSectionBtn") ||
      target.closest(".toggleSubSectionBtn")
    ) {
      // getting btn
      const btn = target.closest(".toggleSubSectionBtn") as HTMLButtonElement;
      // getting first input of the section:
      const sectionTitleInp = btn.parentElement?.lastElementChild
        ?.firstElementChild?.firstElementChild
        ?.lastElementChild as HTMLInputElement;
      // setting title of section/btn on the basis of first input of the section:
      sectionTitleInp.addEventListener("input", function () {
        if (btn.firstElementChild) {
          this.value.trim().length > 0
            ? (btn.firstElementChild.textContent = this.value)
            : (btn.firstElementChild.textContent = "(not specified)");
        }
      });

      if(sectionTitleInp.value){
        btn.firstElementChild!.textContent = sectionTitleInp.value;
      }

      const subSection = btn.nextElementSibling;

      if (subSection) {
        // Toggle visibility of basis of btn click
        subSection.classList.toggle("disappear");
        // changing up n down arrors on button
        btn.lastElementChild?.lastElementChild?.classList.toggle(
          "fa-chevron-down"
        );
        btn.lastElementChild?.lastElementChild?.classList.toggle(
          "fa-chevron-up"
        );
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

function addASection(
  hashMainSectionId: string,
  dotSectionContainerClass: string,
  SectionHtml: string,
  withoutClick: boolean = false
) {
  const Container = document.querySelector(
    dotSectionContainerClass
  ) as HTMLDivElement;
  const addBtn = document.querySelector(
    `${hashMainSectionId} .addSectionBtn`
  ) as HTMLButtonElement;

  if (withoutClick) {
    Container.insertAdjacentHTML("beforeend", SectionHtml);
  } else {
    addBtn.addEventListener("click", () => {
      Container.insertAdjacentHTML("beforeend", SectionHtml);
    });
  }
}

function removeSkill() {
  const skillContainer = document.querySelector(
    ".skillContainer"
  ) as HTMLDivElement;

  skillContainer.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("fa-circle-xmark"))
      target.parentElement?.remove();
  });
}

function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

function getFormData(): void {
  const mainForm = document.querySelector("#mainForm") as HTMLFormElement;

  mainForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    const formData = new FormData(mainForm);

    const photoFile = formData.get("photo") as File | null;

    // Convert image to Base64 before storing
    const photoBase64 = photoFile ? await convertToBase64(photoFile) : null;

    const formValues: FormValues = {
      firstName: formData.get("firstName") as string | null,
      lastName: formData.get("lastName") as string | null,
      photo: photoBase64, // Store Base64 string instead of File object
      jobTitleApplyFor: formData.get("jobTitleApplyFor") as string | null,
      aboutMe: formData.get("aboutMe") as string | null,
      email: formData.get("email") as string | null,
      phone: formData.get("phone") as string | null,
      address: formData.get("address") as string | null,
      linkedin: formData.get("linkedin") as string | null,
      personalWebsite: formData.get("personalWebsite") as string | null,
      github: formData.get("github") as string | null,
      education: {
        qualification: formData.getAll("qualification") as string[],
        institutionName: formData.getAll("institutionName") as string[],
        educationStartAndEndDate: formData.getAll("educationStartAndEndDate") as string[],
        educationDescription: formData.getAll("educationDescription") as string[],
      },
      workExperience: {
        jobTitle: formData.getAll("jobTitle") as string[],
        companyName: formData.getAll("companyName") as string[],
        jobStartAndEndDate: formData.getAll("jobStartAndEndDate") as string[],
        jobDescription: formData.getAll("jobDescription") as string[],
      },
      skill: formData.getAll("skill") as string[],
      courses: {
        courseTitle: formData.getAll("courseTitle") as string[],
        courseInstitutionName: formData.getAll("courseInstitutionName") as string[],
        courseCompletionDate: formData.getAll("courseCompletionDate") as string[],
        courseDescription: formData.getAll("courseDescription") as string[],
      },
      projects: {
        projectTitle: formData.getAll("projectTitle") as string[],
        technologyUsed: formData.getAll("technologyUsed") as string[],
        projectGithubLink: formData.getAll("projectGithubLink") as string[],
        projectWebsiteLink: formData.getAll("projectWebsiteLink") as string[],
        projectDescription: formData.getAll("projectDescription") as string[],
      },
    };

    console.log(formValues);
    localStorage.setItem("resumeBuilderFormData", JSON.stringify(formValues));
    window.location.href = "./resume.html";
  });

}

function addEducationS(withoutClick: boolean = false) {
  addASection(
    "#education",
    ".educationSectionContainer",
    `
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
    `,
    withoutClick
  );

}
function addWorkExperienceS(withoutClick: boolean = false) {
  addASection(
    "#workExperience",
    ".workExperienceSectionContainer",
    `
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
        `,
    withoutClick
  );
}
function addCourseS(withoutClick: boolean = false) {
  addASection(
    "#courses",
    ".courseSectionContainer",
    `
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
        `,
    withoutClick
  );
}
function addSkillS(withoutClick: boolean = false) {
  addASection(
    "#skills",
    ".skillContainer",
    `
    <div>
        <input type="text" name="skill" id="skill" class="smallInput">
        <i class="fa-solid fa-circle-xmark"></i>
    </div>
     `,
    withoutClick
  );
}
function addProjectS(withoutClick: boolean = false) {
  addASection(
    "#projects",
    ".projectSectionContainer",
    `
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
          `,
    withoutClick
  );
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
  const formDataStr: string | null = localStorage.getItem(
    "resumeBuilderFormData"
  );
  if (formDataStr) {
    return JSON.parse(formDataStr);
  }
}

const formDataJSON = getFormD();
if (formDataJSON) {

  function setPersonalInfo() {
    const personalFields = ["firstName","lastName","jobTitleApplyFor","email","phone","address","github","linkedin","personalWebsite",
    ];
    personalFields.forEach((key) => {
      const input = document.querySelector(
        `input[name="${key}"]`
      ) as HTMLInputElement;
      if (input) input.value = formDataJSON[key] || "";
    });

    ;(document.querySelector('textarea[name="aboutMe"]') as HTMLTextAreaElement ).value = formDataJSON.aboutMe as string;
  }

  function setSection(addSection: (param: boolean) => void,formFields: Education | WorkExperience | Courses | Projects,length: number,sectionFields:string[]) {

    for (let i = 0; i < length; i++) {
      addSection(true);   
    }

    sectionFields.forEach((key) => {
      try {
        const input = key.toLowerCase().includes("description") ? document.querySelectorAll(`textarea[name="${key}"]`) as NodeListOf<HTMLTextAreaElement> : document.querySelectorAll(`input[name="${key}"]`) as NodeListOf<HTMLInputElement>;
        (formFields as any)[key].forEach((val:string,i:number) => {input[i].value = val}); 
      } catch (error) {
        console.log(error);
      }

    })
   
  }

  function setSkillSection(){
    for (let i = 0; i < formDataJSON.skill.length; i++) {
      addSkillS(true); 
    }
    const input = document.querySelectorAll('input[name="skill"]') as NodeListOf<HTMLInputElement>;
    formDataJSON.skill.forEach((val:string,i:number) =>{input[i].value = val})   
  }

  function setSectionTopText(){
    const Btns = document.querySelectorAll('.toggleSubSectionBtn') as NodeListOf<HTMLButtonElement>;
    Btns.forEach((btn, i) => {
      btn.firstElementChild!.textContent = (btn.nextElementSibling!.firstElementChild!.firstElementChild!.lastElementChild! as HTMLInputElement).value
    });
  }

  setSection(
    addEducationS,
    formDataJSON.education,
    formDataJSON.education.institutionName.length,
    ["qualification","institutionName","educationStartAndEndDate","educationDescription"]
  );
  setSection(
    addWorkExperienceS,
    formDataJSON.workExperience,
    formDataJSON.workExperience.companyName.length,
    ["jobTitle","companyName","jobStartAndEndDate","jobDescription"]
  );
  setSection(
    addCourseS,
    formDataJSON.courses,
    formDataJSON.courses.courseTitle.length,
    ["courseTitle","courseInstitutionName","courseCompletionDate","courseDescription"]
  );

  setSection(
    addProjectS,
    formDataJSON.projects,
    formDataJSON.projects.projectTitle.length,
    ["projectTitle","technologyUsed","projectGithubLink","projectWebsiteLink","projectDescription"]
  );

  setPersonalInfo();
  setSkillSection();
  setSectionTopText(); 

  (document.querySelector("#sBtn") as HTMLButtonElement).textContent = "Update Resume";

}
