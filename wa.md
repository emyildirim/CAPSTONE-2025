## **Introduction**
This document outlines the working agreement for our team to ensure effective collaboration, communication, and productivity throughout the development of the Job Application Website. All team members are expected to adhere to these guidelines to maintain a positive and efficient working environment.

---

## **Team Members**

| Student ID | Name | Email | GitHub Username |
|------------|----------------------|------------------------|----------------|
| 153658190  | Ivan Gabrovsky       | igabrovsky@myseneca.ca | IvaniGabrovsky |
| 115673188  | Aziz Nosirov         | anosirov@myseneca.ca   | Aziz-Nosirov223 |
| 160235206  | Erkam Yildirim       | eyildirim1@myseneca.ca | emyildirim |
| 110383197  | Hekmatullah Shren Zada | hshren-zada@myseneca.ca | hekmat-shrez |

---

## **Communication Guidelines**

### **Primary Communication Tools**
- **Microsoft Teams**: For daily communication, quick updates, and informal discussions.
- **Email**: For formal communication or when detailed documentation is required.
- **GitHub Issues**: For tracking tasks, bugs, and feature requests.

### **Response Time**
- Every Monday 11:30AM to 12:30PM, a mandatory team meeting is scheduled.
- Team members are expected to join the meetings in the first 10 minutes, otherwise let others know about emergencies.
- Team members are expected to respond to messages within **24 hours** during weekdays.
- For urgent matters, use the `@here` or `@channel` tags in Microsoft Teams.
- If work is required on a public holiday, the scheduled meeting will still take place. 

### **Meeting Schedule**
- **Sprint Planning**: At the beginning of each sprint.
- **Sprint Review**: At the end of each sprint.
- **Retrospective**: After the sprint review meeting.

### **Meeting Etiquette**
- Be on time for all meetings.
- Come prepared with updates or questions.
- Respect everyone’s time and opinions.

---

## **Collaboration Guidelines**

### **Code Collaboration**
- Use **GitHub** for version control and collaboration.
- Follow the **Git Flow** workflow:
  - Create a new branch for each feature or bug fix.
  - Use descriptive branch names (e.g., `feature/user-authentication`, `bugfix/login-error`).
  - Submit a **Pull Request (PR)** for review before merging into the `main` branch.
- Review PRs within **24 hours** of submission.

### **Code Reviews**
- Provide constructive feedback during code reviews.
- Ensure all code meets the team’s **Definition of Done (DoD)** before merging.

### **Pair Programming**
- Pair programming is encouraged for complex tasks or when onboarding new team members.

---

## **Coding Standards**

### **General Coding Practices**
- Follow Google's [coding style guide](https://developers.google.com/style/code-samples).
- Keep code readable, maintainable, and well-documented.
- Use meaningful variable and function names.
- Write comments where necessary, but avoid redundant comments.

### **JavaScript (.js & .jsx)**
- Use **ES6+** syntax where applicable.
- Indentation: **2 spaces per level**.
- Use **camelCase** for variable and function names.
- Use **PascalCase** for React components.
- Always use **strict equality (`===` and `!==`)**.
- Prefer `const` and `let` over `var`.

Example:

```javascript
// Bad
var name = "John";

// Good
const name = "John";
```

```jsx
// React Component Example
function WelcomeMessage({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

### **CSS (.css)**
- Follow BEM (Block-Element-Modifier) methodology for naming classes.
- Use **hyphen-separated lowercase** class names.
- Keep styles modular and reusable.
- Avoid using `!important` unless necessary.

Example:

```css
/* Bad */
.buttonPrimary {
  background: blue;
}

/* Good */
.button-primary {
  background: blue;
}
```

---

## **Conflict Resolution**

### **Open Communication**
- Address conflicts directly and professionally with the involved team members.
- Focus on the issue, not the person.

### **Escalation**
- If a conflict cannot be resolved within the team, escalate it to the instructor or project manager for mediation.

---

## **Documentation and Artifacts**

### **Documentation Standards**
- All documentation should be clear, concise, and written in **Markdown (.md) format**.
- Update documentation regularly to reflect changes in the project.

### **Artifact Storage**
- Store all project-related documents (e.g., `wa.md`, `dod.md`, design files) in the **main branch** of the GitHub repository.

---

## **Definition of Done (DoD)**
Refer to the [Definition of Done Document (dod.md)](dod.md) for the criteria that must be met for a task or user story to be considered complete.

---

## **Amendments**
This working agreement is a living document and can be updated as needed. Any changes must be agreed upon by all team members and documented in this file.

---

**Last Updated**: 25/Jan/2025  
**Signed by**:  
- Hekmatullah Shren Zada: HS  
- Ivan Gabrovsky: IG  
- Erkam Yildirim: EY  
- Aziz Nosirov: AN  

---

By adhering to this working agreement, we commit to maintaining a collaborative, respectful, and productive team environment. Let’s build something amazing together! 🚀
