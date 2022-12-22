FAll22 ECE SoftwareLab 

    Senior Lab Project for 'Project Management' demo. Allows the creation of users, which are assigned to a
    'Default' Project. Each project shares two hardware sets, to simulate the sharing of resources. 
    Negative inputs for checking in or checking out hardware is treated as a positive number. 
    Leaving a project is functional, user 111 and user 222 have multiple projects as of 12/1
     and can be accessed with password 'world'.
     
     12/20 User '555' created with password 'hello'

    Created using NPX Create-React-App with Typescript framework, Flask Routing,
    reacter-dom-v6 for multipage routing and pymongo as our database.
    It's hosted using Heroku (if link still works) at 
    https://software-lab-project.herokuapp.com/ (BROKEN)
    
    UPDATE 12/20:
    Migrated app to Render
    - Link: https://software-lab-project.onrender.com/

    Frontend and routing written by Kenneth P. 
    Backend by Spence S.
    Debugging and emotional support by Michael R., Emma M., Aarya A.

    🔌 https://github.com/thehubisgitted
    
    Previous GitHub containing other commits: 
    https://github.com/emmapmorris/EE461LProject
    
    
**User Documentation**

**User Login**
  - Sign In: To sign in a user must put in their User ID and password               
  ![Screenshot 2022-12-01 170947](https://user-images.githubusercontent.com/81803330/205178910-67d51a33-aa27-4580-a897-e92e61cb324a.png)
  - Create Account: A user account can be created by inputting a Username, User ID, password, and password confirmation
  ![Screenshot 2022-12-01 171306](https://user-images.githubusercontent.com/81803330/205178996-8c6b065a-7c50-49bb-a341-9fd89392089f.png)
  - Link: https://software-lab-project.herokuapp.com/

**Project Registration/Views**
  - All new registered users are initialized into the Default Project
  ![Screenshot 2022-12-01 171416](https://user-images.githubusercontent.com/81803330/205179143-afe35c0e-eb95-488e-8265-f6b9f16d1609.png)
  - As of now, users can only register for projects manually through calling the function addUserToProjects() 
  - The views page will show all Projects that a user is registered for, allowing for check-in and check-outs
  ![Screenshot 2022-12-01 190302](https://user-images.githubusercontent.com/81803330/205191602-e44ebd31-a123-422e-b926-8dfb31934263.png)

  - Users can leave projects br pressing the leave button next to the respective project
  - Link: https://software-lab-project.herokuapp.com/projects

**Hardware Set Page**
 - The projects page shows the information for the current project, name, and availability
 - The main interface shows the availability of sets
    - A user can check in or check out hardware to/from either set by entering a value in the text field, and then clicking the check in or check out buttons for the respective hardware set to adjust the storage capacity for the project and set. 
  - User is allowed to either log out, or leave the project by pressing the respective buttons
  ![Screenshot 2022-12-01 171622](https://user-images.githubusercontent.com/81803330/205179397-80c36bce-1568-460b-96a1-a6bae2494ae0.png)
  **Project Creation Page**
  - Users can create a Project on this page
  - Must add themselves to a project using userID
  - Can have multiple users just have the IDs comma separated EX: 555,111,000
  ![image](https://user-images.githubusercontent.com/61165807/208604661-3d4b9e4e-1143-4121-892b-ec36b86a46a6.png)

  


