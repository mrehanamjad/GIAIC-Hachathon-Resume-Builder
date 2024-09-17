// import FormValues from "./interface.js";

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
  photo: File | null;
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

const formDataLocal: string | null = localStorage.getItem(
  "resumeBuilderFormData"
);
let allFormDataJSON;
if (formDataLocal) {
  allFormDataJSON = JSON.parse(formDataLocal);
}
if (allFormDataJSON) {
  console.log(allFormDataJSON);
  const formDataJSON: FormValues = allFormDataJSON[0];
  console.log(formDataJSON);
  // left : --------------------------------------------------------
  //setting first section:
  const imgC = document.querySelector("#img") as HTMLDivElement;
  imgC.children[1].textContent = `${formDataJSON.firstName} ${formDataJSON.firstName}`;
  imgC.children[3].textContent = `${formDataJSON.jobTitleApplyFor}`;

  // setting contact details

  const github = "https://github.com/johndoe";
  console.log(`${github ? "Hi" : "display:none;"}`);
  const detailC = document.querySelector("#details") as HTMLDivElement;
  detailC.innerHTML = `
    <h2>Details</h2>
    <p>${formDataJSON.email}</p>
    <p>${formDataJSON.phone}</p>
    <p>${formDataJSON.address}</p>
    <h2>Links</h2>
    <p><a href="${formDataJSON.linkedin}" style="${
    formDataJSON.linkedin ? "" : "display:none;"
  }">Linkedin</a></p>
    <p><a href="${formDataJSON.github}" style="${
    formDataJSON.github ? "" : "display:none;"
  }">Github</a></p>
    <p><a href="${formDataJSON.personalWebsite}" style="${
    formDataJSON.personalWebsite ? "" : "display:none;"
  }">PersonalWebsite</a></p>
    `;

  // setting skills
  const skillSectionUl = document.querySelector(
    "#skillSection ul"
  ) as HTMLUListElement;
  skillSectionUl.innerHTML = "";

  formDataJSON.skill.map((s) => {
    skillSectionUl.insertAdjacentHTML("beforeend", `<li>${s}</li>`);
  });

  // right -----------------------------------------------------------
  // profile or aboutMe section
  const profileP = document.querySelector(
    "#profileSection p"
  ) as HTMLParagraphElement;
  profileP.innerText = formDataJSON.aboutMe + "";

  //Work Experience Section
  const workExperienceSection = document.querySelector(
    "#workExperienceSection"
  ) as HTMLDivElement;
  workExperienceSection.innerHTML = "<h1>Employment History</h1>";
  for (let i = 0; i < formDataJSON.workExperience.jobTitle.length; i++) {
    workExperienceSection.insertAdjacentHTML(
      "beforeend",
      `
    <div>
    <h2>${formDataJSON.workExperience.jobTitle[i]}, ${formDataJSON.workExperience.companyName[i]}</h2>
    <code>${formDataJSON.workExperience.jobStartAndEndDate}</code>
    <p>${formDataJSON.workExperience.jobDescription}</p>
    </div>
    `
    );
  }

  // Education
  const educationSection = document.querySelector(
    "#educationSection"
  ) as HTMLDivElement;
  educationSection.innerHTML = "<h1>Education</h1>";
  for (let i = 0; i < formDataJSON.education.qualification.length; i++) {
    educationSection.insertAdjacentHTML(
      "beforeend",
      `
    <div>
    <h2>${formDataJSON.education.qualification[i]}, ${formDataJSON.education.institutionName[i]}</h2>
    <code>${formDataJSON.education.educationStartAndEndDate[i]}</code>
    <p>${formDataJSON.education.educationDescription[i]}</p>
    </div>
    `
    );
  }

  // courseSection:
  const courseSection = document.querySelector(
    "#courseSection"
  ) as HTMLDivElement;
  courseSection.innerHTML = "<h1>Courses</h1>";
  for (let i = 0; i < formDataJSON.courses.courseTitle.length; i++) {
    courseSection.insertAdjacentHTML(
      "beforeend",
      `
    <div>
    <h2>${formDataJSON.courses.courseTitle[i]}, ${formDataJSON.courses.courseInstitutionName[i]}</h2>
    <code>${formDataJSON.courses.courseCompletionDate[i]}</code>
    <p>${formDataJSON.courses.courseDescription[i]}</p>
    </div>
    `
    );
  }

  // Projects:
  const projectSection = document.querySelector(
    "#projectSection"
  ) as HTMLDivElement;
  projectSection.innerHTML = "<h1>Projects</h1>";
  for (let i = 0; i < formDataJSON.projects.projectTitle.length; i++) {
    projectSection.insertAdjacentHTML(
      "beforeend",
      `
<div>
                    <h2>${formDataJSON.projects.projectTitle[i]}</h2>
                    <p>${formDataJSON.projects.projectDescription[i]}</p>
                    <p><b>Technologies:</b> ${formDataJSON.projects.technologyUsed[i]}</p>
                    <p><a href="${formDataJSON.projects.projectGithubLink[i]}">Github</a>
                    <a href="${formDataJSON.projects.projectWebsiteLink[i]}">Live</a></p>
                </div>
`
    );
  }
}
