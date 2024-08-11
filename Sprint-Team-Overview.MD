# SD10 Semester 3 Final Contributions Overview

## Team Members

- **[Ethan Murphy](https://github.com/emurphy04)** - Lead Developer for Java-Console Based E-Commerce Platform
- **[Brenda Armstrong](https://github.com/brendaleearmstrong)** - Lead Developer for VinoVault Wine Search Engine

## Overview

In the final sprint of Semester 3, our team, consisting of just two developers—Ethan Murphy and Brenda Armstrong—successfully delivered two comprehensive projects: the **Java-Console Based E-Commerce Platform** and the **VinoVault Wine Search Engine**. Despite being a smaller team compared to the standard group size of three, we managed to handle all aspects of project development, from planning to execution and deployment. Our team has been working together since our very 1st sprint of Semember 1 and we have built a robust team strategy through trust, collaboration, and effective project management with each member taking the lead on one project while also providing crucial support on the other.

### Project Scrum Agile Management

Given our small team size, we implemented an Agile approach using Scrum principles to manage the project effectively:

- **Daily Stand-ups**: We held every-other-day meetings via Microsoft Teams to discuss progress, address blockers, and plan the day’s tasks. This constant communication ensured that both projects were on track and that any issues were resolved promptly.
- **GitHub Projects**: We utilized GitHub Projects to manage tasks and track progress. Each project had its own board where tasks were categorized into "BackLog", "To Do," "In Progress," and "Done." This visual workflow allowed us to monitor the status of each feature and ensure timely completion.
- **Sprint Planning and Retrospective**: At the start of the sprint, we planned the key features and milestones for each project. We conducted a retrospective at the end of the sprint to discuss what went well, what could be improved, and to document lessons learned.

### Sprint Management and Branching Strategy

Managing the sprint as a two-person team required efficient collaboration and clear communication. To keep our codebases organized and our workflows efficient, we employed a branching strategy tailored to our needs:

#### Java-Console Based E-Commerce Platform (Ethan Murphy's Project)

**Project Overview**: 
The **Java-Console Based E-Commerce Platform** is a console-based application designed to simulate a real-world online marketplace where users can register as buyers or sellers, list computer products for sale, and browse available items. The platform includes features for managing user accounts, adding items for sale, purchasing items, and categorizing listings.

- **Repository**: [SD10-S3-SPRINT-2-JAVA](https://github.com/emurphy04/SD10-S3-SPRINT-2-JAVA)
- **Branching Strategy**:
  - The **main branch** (`main`) served as the stable branch where the final code was consolidated.
  - Feature development was done on separate branches named after the specific feature being worked on (e.g., `Login`, `Seller-CLI`).
  - Once a feature was completed and tested, it was merged into the `main` branch via pull requests to ensure that the integration was smooth and that the codebase remained stable.

**Key Responsibilities**:

- **Ethan Murphy**:
  - **Backend Development**: Designed and implemented core backend features including user management and item listing functionalities.
  - **Database Integration**: Integrated PostgreSQL to manage data storage efficiently.
  - **Documentation**: Authored README file.
  - **Video Demonstration**: Created a video walkthrough to demonstrate the platform's features.
  - **UML Class Diagram**: Created the UML Class Diagram to visually represent the system's architecture.  
  - **Branching Strategy**: Managed feature development and bug fixes on separate branches before merging them into the `main` branch, ensuring the stability of the codebase.

- **Brenda Armstrong**:
  - **Testing**: Conducted extensive testing to ensure the application functioned as expected and was free of critical bugs.
  - **Support Development**: Assisted in refining backend services and contributed to the implementation of key features.
  - **Documentation **: Led documentation efforts for System Documentation and Sprint Team Over Readme.md files.

#### VinoVault Wine Search Engine (Brenda Armstrong's Project)

**Project Overview**: 
**VinoVault** is a full-stack web application that serves as a comprehensive wine search engine, allowing users to search for wines across multiple databases. It provides a rich and interactive experience for wine enthusiasts, featuring user authentication, a personal wine vault, and advanced search capabilities.

- **Repository**: [S3-fsjs-finalsprint-vinovault](https://github.com/brendaleearmstrong/S3-fsjs-finalsprint-vinovault)
- **Branching Strategy**:
  - The **main branch** (`main`) was used as the stable branch that reflected the most up-to-date and tested version of the project.
  - New features and testing were developed on separate branches based upon Sprint Requirements (e.g., `phase-3-/DDL`, `phaase-10-iterate`).
  - Upon completion and testing, these feature branches were merged back into the `main` branch via pull requests, ensuring that only stable and fully reviewed code was included.

**Key Responsibilities**:

- **Brenda Armstrong**:
  - **Full-Stack Development**: Led the branding, design, development and implementation of both frontend and backend components, ensuring seamless database integration. 
  - **Database Management**: Set up and managed PostgreSQL and MongoDB databases, facilitating complex queries for Search, data management with mock data generated through ClaudeAI and ChatGPT.
  - **Feature Implementation**: Developed critical features including user authentication, JWT, EventLogging, 'extra' Vault bonus feature, and advanced search functionality (FullText and Filtered).
  - **Testing and Debugging**: Conducted extensive testing to ensure robustness, fixing issues promptly.
  - **Documentation**: Authored VinoVault readme.md and Sprint Team Overview.md Documentation
  - **Branching Strategy**: Utilized feature branches for development, merging stable code into the `main` branch through pull requests to maintain a clean and functional codebase.

- **Ethan Murphy**:
  - **Testing**: Provided critical testing support to ensure that the VinoVault platform was functional and user-friendly.
  - **Support Development**: Assisted with the refinement of backend services and contributed to the successful deployment of the platform.
  - **Video Demonstration**: Created a video walkthrough to demonstrate the VinoVaults features.  
  - **Documentation Assistance**: Contributed to the project documentation by providing additional insights and ensuring clarity.

### Conclusion

Despite the challenges of working in a smaller team, we were able to successfully manage and deliver two high-quality projects by leveraging effective Scrum-based project management, a robust branching strategy, and strong collaboration. By working together and supporting each other's projects, we ensured that both the Java-Console Based E-Commerce Platform and VinoVault Wine Search Engine were completed to a high standard. The experience gained from this sprint has significantly enhanced our skills in full-stack development, project management, and teamwork, preparing us for future professional challenges.
