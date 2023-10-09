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

### 8 Oct 2023
* *3 hours* Altering epic_id and story_id so they are unique values (and match id)