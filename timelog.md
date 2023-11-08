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