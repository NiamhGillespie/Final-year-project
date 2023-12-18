
## *Requirements and value identification tool for prioritisation* 
#### *Niamh Gillespie* 
#### *2549880G* 

## Proposal
### Motivation

Project management and task prioritisation is a key element of software development. This project incorporates agile methodology to create a light-weight web application which supports the tracking and prioritisation of epics and stories.

By making the values of epics and stories visible, agile team members and stakeholders can see the value that each of these items bring. Not only will this help with story and epic prioritisation but also increases team awareness and visibility.
                                                        
### Aims

The aim of this project is to create a project management tool that agile teams can use to manage their day-to-day workflow. Teams should be able to create epics and associate these with user stories. 

Teams should be able to create value statements based on company or project specific values, and associate these with either epics or stories. This will allow both developers and stakeholders to see the potential value of a task and these can be used for prioritisation. 

There should be different visualisations of the epics and stories so that product owners, team members and stakeholders can see story progression, task prioritisation and past development.

## Progress

* Selected frameworks - chose to use a Django API for easy database management with a React JS frontend as it allows for reusable components and good state management.
* Created an epics dashboard where a team can add and edit epics and stories then order these by priority. 
* Created a tag dashboard where team members can add and edit tags and team values - these can be linked to user stories.
* Created a tracking dashboard where team members can create and edit tracking columns, assign stories and work in progress limits to these columns and then move stories along the columns - this is based on a kanban board. 


## Problems and risks
### Problems

When implementing drag and drop functionality, I had to try multiple libraries before I found one that worked with this project. Unfortunately, the majority of libraries were lacking in documentation which slowed my progress. 

Using Django as an API backend has presented some problems. For instance, when I was implementing drag and drop for the tracking dashboard, I originally designed this to work in parallel. However, this resulted in too many simultaneous calls to my database with the webapp breaking randomly. 

Also using the Django API, the error messages displayed on the webapp are typically just the relevant status code, therefore I have to rely on console debugging to find issues, which can slow progress down. 


### Risks

Ideally, I would like to recruit participants who have commercial experience working with similar products, for instance Jira, to participate in my user evaluations. Due to this pre-requisite, it may be more difficult to recruit participants.

**Mitigation -**  ask my former team at Morgan Stanley if they know anyone who would be willing to participate in my study, I could also post on research orientated Facebook groups. I also have a contact with a large commercial software house who I may be able to recruit participants through.

To conduct my user evaluations, it would be best if I were able to host my webapp. This could be complicated as I will need to host both my Django API and my React Webapp. 

**Mitigation -**  I will need to research the best way of hosting this. This could be a time-consuming process but some of my user evaluations could be conducted via zoom so it will be helpful to have this functionality.


## Plan

**Christmas break:** 

Finish majority of coding, this includes:
* Refactoring my code, including updating my tests and adding form validation;
* Adding sprint functionality to the tracking dashboard;
* Adding filters to the epic dashboard;
* Creating a user structure with privileges management (organisation, admin, team leads, team members, stakeholders).


**Semester Two:**

*Week 1 and 2 -* Finish any remaining code and commence creating user evaluation. Also set up web application hosting.

*Week 3 to 5 -* Conduct user evaluations. Begin writing dissertation introduction and analysis section.

*Week 6 and 7 -* Write first draft of evaluation section.

*Week 7 and 8 -* Write first draft of product section.

*Week 9 and 10 -* Refine dissertation.
