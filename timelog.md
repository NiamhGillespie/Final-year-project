# Timelog

* Requirements and value identification tool for prioritisation 
* Niamh Gillespie
* 2549880G
* Peggy Gregory

## Guidance

* This file contains the time log for your project. It will be submitted along with your final dissertation.
* **YOU MUST KEEP THIS UP TO DATE AND UNDER VERSION CONTROL.**
* This timelog should be filled out honestly, regularly (daily) and accurately. It is for *your* benefit.
* Follow the structure provided, grouping time by weeks.  Quantise time to the half hour.

## Week 0

### 20 Sept 2023

* *1 hour* Read over the project description
* *1.5 hours* Researched similar pieces of software and problems with them/areas not covered
* *1.0 hours* Looked into different agile styles of working (differences between kanban and scrum)

## 22 Sept 2023

* *0.5 hours* Initial meeting with supervisor
* *1.5 hour* Consolidating meeting notes and updating minutes on moodle
* *0.5 hours* Researched differences between epics, stories and tasks
* *0.5 hours* Began drafting up Figma design for adding epics and stories

## Week 1

### 23 Sept 2023
* *1 hour* Created a project repo on GitHub, added the cookiecutter files and started issue board
* *1.5 hours* Looked into a variety of web frameworks, decided to use Django as backend
* *0.5 hours* Added task for daily uploading of timelogs and linked to previous commit with rebase

### 24 Sept 2023
* *0.5 hour* Created an initial structure diagram/brainstorm to try and understand the roles that will be needed in the application
* *0.5 hour* Created two more Figma designs for epic and story viewing

### 25 Sept 2023
* *1 hour* Set up initial Django project and added .gitignore file
* *0.5 hours* Created 4th Figma design and added 'add story/task' button

### 26 Sept 2023
* *4 hours* Explored literature related to stakeholder perceptions and user stories
* *2 hours* Started on epic dashboard and base templates and set up starting views and urls

### 27 Sept 2023
* *0.5 hours* Set up basic stylesheet in static files and called it in the base template
* *0.5 hours* Set up basic models for epics and user stories, these will need to be refined at a later date

### 28 Sept 2023
* *1 hours* Chose best design for epic and story viewing and created more refined version

### 29 Sept 2023
* *0.5 hours* Supervisor meeting with Peggy
* *0.5 hours* Consolidated meeting notes and updating minutes on moodle

## Week 2

### 1 Oct 2023
* *1 hours* Researched how to intigrate react with Django
* *1 hours* Added bootstrap and start of navigation bar

### 2 Oct 2023
* *1 hours* More research to intigrate React with Django (initial research didn't work)
* *1 hours* Added React to Django project
* *1 hours* Created serializers from models with Djangos REST API framework

### 3 Oct 2023
* *1 hours* Created population script for Epics
* *0.5 hours* Added Stories to population script
* *1.5 hours* Created navigation bar and homepage react componenets and styled navigation bar
* *1 hour*  Researched how to add routing in react and implemented it
* *2 hours*  Set up basic Epic dashboard along with initial styling, also added team dashboard

### 5 Oct 2023
* *3 hours* Added modal popup form to allow user to input a title to create an Epic, the form is then posted to the Django API and an Epic is added to the Epic List

### 6 Oct 2023
* *1.5 hours* Started on getting epic data from the Django API
* *0.5 hours* Supervisor meeting with Peggy and wrote up meeting notes
* *1 hour* Finished getting epic data from Django API and displayed epic title in the epic dashboard

## Week 3

### 7 Oct 2023
* *3 hours* Added modal popup and form to allow user to input simpilised data to create a story, this information is then posted to the Django API and a story is added to the story list. Then fetched this data from the Django API to display the relevant stories under each epic.

### 8 Oct 2023
* *2.5 hours* Added colour picker to the 'add epic' modal so that users can choose a colour for their epic, this colour is then also used in the story and add story button design. Also ammended epic model and seralizer so that this information will be stored in the database. 

### 9 Oct 2023
* *3 hours* Altering epic_id and story_id so they are unique values (and match id), also created detail views for storys and epics that allow a user to edit and delete a story or epic
* *0.5 hours* Updating epic dashboard stylesheets so it better matches the Figma design I created

### 10 Oct 2023
* *0.5 hours* Adding a GET request to the detail views for stories and epics and manually testing this
* *1 hours* Added an example colour section to the 'add epic' modal so that users can see how visable the title will be based on the colour chosen
* *1 hour* "Added priority information and styling and user icon styling to story displays on epic dashboard
* *0.5 hours* Thought add story form wasn't well designed so made figma design utalising 2 columns instead of the current 1. Started implementing this in react app

### 11 Oct 2023
* *2 hours* Added checkbox to pairable component and dropdown to priority component in the add story form, also started to fix scrolling in epic dashboard

### 12 Oct 2023
* *1.5 hours* Created unit tests for Epic model and automated tests on main branch through GitHub actions (continous integration)

### 13 Oct 2023
* *0.5 hours* Updated css for epic dashboard to rectify some display issues
* *1 hour* Planning next sprint and adding issues to backlog (in github project)
* *0.5 hours* Supervisor meeting with Peggy and wrote up meeting notes
* *0.5 hours* Added unit tests for Story model 
* *1 hour* Added unit tests for /api/teamName/epicsDashboard GET and POST requests

## Week 4

### 14 Oct 2023
* *4 hours* Started working on adding vertical drag and drop feature to stories on the epic dashboard, lots of trial and error with different libraries

### 15 Oct 2023
* *1.5 hours* Updating 'add story' and 'add epic' forms and modals to automatically update the epic dashboard once a new epic/story is added
* *1 hour* Continuing work on drag and drop features

### 17 Oct 2023
* *2 hours* Added order field to Story model so that stories can be ordered by this field and updated tests
* *3.5 hours* Chosen library was not working so began trying out new libraries, began setup drag and drop with react-beautiful-dnd library
* *2.5 hours* Implemented drag and drop sorting of stories - only works if there is only one epic on the dashboard

### 18 Oct 2023
* *1 hour* Updated drag and drop sorting of stories to work with multiple epics
* *1 hour* Added order field to Epic model so that epics can be ordered by this field, updated tests to reflect this addition
* *0.5 hour* Starting drag and drop feature for reordering epics
* *1 hour* Finished drag and drop feature for epics

### 19 Oct 2023
* *0.5 hours* Supervisor meeting with Peggy and wrote up meeting notes
* *1 hours* Created Figma designs for story details, decided against loading up a seperate page currently but it could be a good idea to have this option in the future - possibly linked to by title?

### 20 Oct 2023
* *0.5 hours* Created Figma designs for epic detail =s based on the story details designs


## Week 5

### 23 Oct 2023
* *2 hours* Started on epic details modal, having significant problems styling the react modal componant to display like the Figma design (both height and width problems), I may need to create my own modal component or rethink my design

### 24 Oct 2023
* *1.5 hours* Fixed display issues I was having with the epic details modal

### 25 Oct 2023
* *2 hours* Added information to epic details modal and began formatting with css
* *2.5 hours* Finished epic details modal, added functionality to display all the stories associated with an epic, will need to add a values component to the add epic form and model

### 26 Oct 2023
* *3.5 hours* Created story details modal, will need to some fields to the Story model to fully complete this but these will require very little change to the modal code
* Also added a custom issue template to my repository so I could simplify my issue adding process

### 27 Oct 2023
* *0.5 hours* Started refining the 'add story' form and modal by making them a custom width and adding customised columns.
* *1 hour* Supervisor meeting with Peggy, wrote up meeting notes and added new issues to my backlog


## Week 6

### 30 Oct 2023
* *0.5 hours* Finished refining the 'add story' form and modal
* *2 hours* Added new Tags model with GET and POST API calls for a teams associated tags (currently hardcoded) and GET, PUT and Delete API calls for an individual tag. Also updated the population script to indclude an example tag.

### 31 Oct 2023
* *3 hours* Added tags to 'add story form', user can select a tag by clicking its title in a dropdown menu then unselect it by recklicking the tag title, currently this is very clunky and needs refinement

### 1 Nov 2023
* *2.5 hours* Refined tag adding in user story form and updated story details view so relevent tag titles are displayed

### 2 Nov 2023
* *3 hours* Adding ValueTag model, updated 'add story' and 'add epic' forms to allow users to add value tags and updating both epic and story details components to use new value tags instead of value statements
* *0.5 hours* Updated Story model so it includes state and story point fields, updated the population script to reflected these changes and replaced placeholders in the story detail view
* *0.5 hours* Updating tests so CI is up and running again

### 3 Nov 2023
* *2.5 hours* Researching agile metrics to understand which ones could be good to use in the epic dashboard

## Week 7

### 5 Nov 2023
* *0.5 hours* Deciding on tasks for the sprint backlog and creating placeholder issues for these

### 6 Nov 2023
* *0.5 hours* Writing user stories and definitions of done for the placeholder issues
* *1.5 hours* Added some simple stats based on epics to the epic dashboard. These are very rudimentary right now but will revisit to make more complex once issue tracker dashboard is up and running.

### 7 Nov 2023
* *1 hour* Supervisor meeting with Peggy, wrote up meeting minutes
* *2 hours* Designing tag dashboard

### 8 Nov 2023
* *4 hours* Created tag dashboard based on chosen Figma design, also created add values and tags forms and modals so that a user can add a self defined tag to their team's tag list
* *2 hours* Updated tag dashboard so users can update and delete both tags and values
* *2 hours* Making Epic details view editable, this works but could use a little visual refinement

### 9 Nov 2023
* *3 hours* Refined epic details view and made the stories details view editable

## Week 8

### 12 Nov 2023
* *1 hour* Brainstormed possible layouts for the tracking dashboard, no solid plans yet but I want teams to be able to use scrum or kanbans

### 14 Nov 2023
* *3 hours* Created hand-drawn wireframes for the flow of the tracking dashboard - teams will be able to choose between a scum based or kanban style tracking system. This will allow me to alter displays and metrics based on the methodology chosen. This is quite rigid currently and in the future it would be nice to allow a team to change between workstyles or to perhaps support multiple projects.

### 15 Nov 2023
* *0.5 hours* Planning the new models that will be needed for the tracking dashboards and relationships between them

### 16 Nov 2023
* *1.5 hours* Creating a tracking column model and serializer. Adding this to population script. Created get and post for team columns and created get, put and delete for column details.
* *2 hours* Allowed users to add a tracking column, including the ability to choose a column to automatically mark stories as done once they are moved there. Also allowed users to edit a column.

### 17 Nov 2023
* *1 hour* Supervisor meeting with Peggy and wrote up meeting notes
* *0.5 hours* Let user delete a tracking column

## Week 9

### 19 Nov 2023
* *0.5 hours* Updating tracking column model, serializer and population script to include a field for user stories

### 20 Nov 2023
* *0.5 hours* Creating designs for adding multiple stories to a backlog at once

### 22 Nov 2023
* *4.5 hours* User can add and delete stories to a tracking column throught the edit tracking column form. I've also chosen to only let users add/delete stories who's states are either undefined or are part of the column.

### 23 Nov 2023
* *2.5 hours* Displaying the stories assigned to a column on the column dashboard. Tried to get some drag and drop functionality working but decided to get the simple display working first.

### 24 Nov 2023
* *1 hour* Decided on prospective issues for the sprint backlog, as the end of this sprint would fall during the christmas leave I added many more issues than I typically would
* *0.5 hours* Supervisor meeting with Peggy and wrote up meeting notes
* *3 hours* Started working on drag and drop for tracking columns

## Week 10

### 27 Nov 2023
* *4.5 hours* Fixing bugs with the drag and drop stories for tracking columns - stories will now again display on columns without breaking the web app. Stories can drag vertically but still can't figure out how to also make them drag horizontally. 

### 28 Nov 2023
* *4 hours* Stories can drag and drop horizontally, haven't sorted out ordering vertically yet but running into "database is locked" error which I will need to sort out before I progress with this.

### 29 Nov 2023
* *7 hours* "Database is locked" error fixed and drag and drop for stories on tracking dashboard complete. Also fixed the various update tracking column form bugs.

### 30 Nov 2023
* *1.5 hours* Added WIP option to column forms, if this is specified the column displays the WIP and its border will turn red if too many elements are in the column.
* *0.5 hours* Adding IDs to the story selection menu for tracking columns so if stories have the same name they are still distinguishable

### 1 Dec 2023
* *1 hour* Supervisor meeting with Peggy and meeting minutes write up

## Week 11

### 4 Dec 2023
* *0.5 hours* Creating user stories and definition of dones for all remaining items in the sprint backlog.

### 5 Dec 2023
* *2 hours* Creating tracking column settings modal and form blueprint and created figma design for the sprint section of the tracking dashboard settings

### 6 Dec 2023
* *2 hours* Creating Sprint model, serializer and views

## Week 12

### 13 Dec 2023
* *3 hours* Planning approach to adding sprints to the tracking dashboard

### 17 Dec 2023
* *6 hours* User can add a sprint and change the length of the current sprint, used a calender component for this so styled it to match the rest of my webapp.

## Week 13

### 18 Dec 2023
* *4 hours* Wrote status report.
* *1.5 hours* Refactored file structure of react app files.

### 19 Dec 2023
* *3.5 hours* Added eslint and prettier linting tools to project for static code analysis of javascript, fixed the issues eslint highlighted and formatted my files according to the prettier rules I added.
* *2 hours* Refactoring css files so elements are easier to find, also updated the tag dashboard page so its more obvious whether the user is on the tags or values section.
* *1.5 hours* Began refactoring repetative code into helper methods so they can be shared across classes

### 21 Dec 2023
* *6.5 hours* FInished refactoring the repatative code into helper methods then used the `coverage` package to check how much code coverage I had on my unit tests. Started improving my test coverage - at time of writing up to 93%

### 22 Dec 2023
* *2 hours* Looked into the navigation issue that I've been having with react - didn't find any concrete ansers yet
* *3.5 hours* Completed improving test coverage, overall python test coverage at 99% with both my views.py and models.py files at 100% code coverage.

## Week 14

### 28 Dec 2023
* *8.5 hours* Continued research on navigation issue and fixed it. Fixed another bug with the tracking column title changing, then began working on custom error validation. Also fixed tests I accidentally broke.

### 29 Dec 2023
* *7 hours* Finished form validation, improved the mark_as_complete/done functionality in the tracking column dashboard so if a column has the title 'Done' then the column's mark_as_complete is marked as true, also added a 'completed' field to epics and stories to allow for future epic dashboard filtering, also created a figma design to add filtering to the epic dashboard design.

### 31 Dec 2023
* *6 hours* Edited the tracking dashboard so stories that are put into any column with the 'mark as completed' section as true are automatically marked as completed, they are then displayed as grey on the epics dashboard. Epics can also be marked as completed through the epic details functionality on the epic dashboard. I then added 3 filters to the dashboard (all, uncompleted only and completed only) so that users can choose which subset of stories and epics they want to view.

### 2 Jan 2024
* *4.5 hours* Finalised the user structure, updated my django unit tests so they pass again. Also updated the filters on they epic dashboard so the user interface shows which filter is selected and began working on time based filters for the tracking dashboard.

## Week 15

### 6 Jan 2024
* *8 hours* Finished time based filters on the tracking dashboard and refactored part of the display story methods to work with the new time-based display. Also created initial designs for user management (login, sign up and admin pages) - sign up design needs to be improved but most designs have been chosen. Started work on login page. 

### 7 Jan 2024
* *9 hours* Finalised Figma designs for the user management pages. Realised my tests were failing through github actions, investigated this and discovered it was due to an accidental hardcoded comparison based on the current date so fixed this problem. I then created the Django models for user management. Next I created and styled the sign up, view list of teams and add team react pages. Then started work on the team details page.

### 8 Jan 2024
* *7 hours* Finished team details page layout then completed the user profile and user management pages blueprints. Edited my Organisation and User models slightly and added unit tests for the Organisation, Team and User models (previously untested). Then created view that handle GET and PUT for the Organisation and User models.

### 9 Jan 2024
* *5 hours* Sign up page now creates an organisation and user when the form is entered. Reasearched how to conduct user authentication with my current setup and tried some methods but have not found one that works yet.

### 12 Jan 2024
* *0.5 hours* Supervisor meeting with Peggy and wrote up meeting notes

## Week 15

### 14 Jan 2024
* *3.5 hours* Working on the add team form, researched adding an image to a django database but haven't figured out a solution yet. 

### 17 Jan 2024
* *5 hours* Sorted out adding a team profile image to the django database. Also added creating a new user functionality and updated the view user list and user detail pages so they work with props. 

### 18 Jan 2024
* *4.5 hours* Updating the add team page to allow a user to add team leads and team members, then updated the teams view page to a function instead of class so I could pass location based states to it. 

### 19 Jan 2024
* *9.5 hours* Made user and teams components editable in the admin views, also added filtering and searching to each of these. I also updated the add team form so that both the team and user detail views display correctly. Did the same for the add user form as well, also allowed each user to be added to multiple teams in this form. Also updated user details view so that an admin user will not have a list displayed and the add user view so that only non-admin users will have the teams selection displayed. Started working on allowing teams to be deleted.

### 20 Jan 2024
* *1 hours* Supervisor meeting with Peggy and wrote up meeting notes
* *3 hours* Let user assign team members to a story via the add user form and styled the story form accordingly, also updated unit tests so they no longer fail

## Week 16

### 21 Jan 2024
* *3 hours* Revamping tracking dashboard so when user clicks a story the details modal appears, added user images to the story boxes with a tooltip containing the users fullname that appears on hover, also added a completed banner to completed epics and storys and added tags to uncompleted stories.

### 23 Jan 2024
* *4 hours* Adding the basics of log in and log out functionality with JWT authentication.

### 23 and 24 Jan 2024
* *12 hours* Updating login functionality so it works with my custom user profile, refactored a significant portion of the webapp so that a team_member or team_lead can choose between teams for each of the dashboards - initially I hadn't planned to support this but have set up the majority of the administration side to support multiple teams. Finished off all the user management requirements and manually tested the setup to check if it worked. Updated branding of the webapp and started on help documentation on the homepage.

### 26 Jan 2024
* *2.5 hours* Created first draft of survey questions and emailed to Peggy for feedback

## Week 17

### 29 Jan 2024
* *3 hours* Adding a 404 default page, fixing a tracking dashboard bug - updating the 'completed' checkbox wouldn't update the display of the story details block properly. and added value tags to epic details block

### 30 Jan 2024
* *8.5 hours* Updated my state passing functions so pages can be accessed properly if link is typed in search par as oppose to accessing via a link, Added form validation on log in, sign up and admin adding and editing pages - form validation on sign up includes making sure the username doesn't already exist (created a getUsernames view to achieve this), also added tag and value descriptions to the tracking dashboard.

### 31 Jan 2024
* *0.5 hours* Supervisor meeting with Peggy and wrote up meeting notes

## Week 18

### 4 Feb 2024
* *3.5 hours* Working on homepage/help section of webapp

### 5 Feb 2024
* *6.5 hours* Fixed issues with assigned_to, created_by and last_edited_by in the epic and story forms, made epics, stories, users, teams and tracking columns deletable with a confirmation prompt and finished off the help section - I decided to move this to a seperate help page to allow for the graphic to take center stage on the homepage.

### 6 and 7 Feb 2024
* *6 hours* Hosted both the Django API and React webapp. Tested everything worked as expected and fixed any bugs that hosting has caused. Then finished off user evaluation survey and signed ethics checklist. 