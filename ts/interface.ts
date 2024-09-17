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
  
export default interface FormValues {
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
  