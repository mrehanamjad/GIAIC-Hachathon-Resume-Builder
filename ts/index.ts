
const resumeData = localStorage.getItem('resumeBuilderFormData');

(document.querySelectorAll('.resLink') as NodeListOf<HTMLAnchorElement>).forEach(link => {
    if(resumeData){
    link.href = "./resume.html";
    link.textContent = "Your Resume"
    } else {
    link.href = "./form.html";
    }
})