# Readme

## Project structure 
* `timelog.md` The timelog for my project.
* `data/` data from user evaluation.
* `src/` source code for RViT.
* `status_report/` the status report submitted in December.
* `dissertation/` source for my project dissertation.
* `presentation/` my presentation slides and video.

### Requirements

For the Django API:
* Python 3.11.0
* Packages listed in `requirements.txt` 
* Tested on Windows 11

For the React Web Aplication:
* Node Js v18.12.1
* Packages listed in `package.json`
* Tested on Windows 11



### Build steps
For the Django API: \
Open a command prompt and navigate to the project folder. \
Navigate to the `src` folder \
Run the following command to access the virtual environment `django\Scripts\activate` \
Alternatively you can create your own python virtual environment and install the project requirements with the following command `pip install -r requirements.txt`\
Now navigate to the `src\Requirements_and_value_identification_tool` folder and run `python manage.py runserver`. This should locally host the API. \
A list of the endpoints can be found in the `C:\Users\niamh\Final-year-project\src\Requirements_and_value_identification_tool\Requirements_and_value_identification_tool\urls.py` folder.

For the React JS Web application:
Open a second command prompt and navigate to the project folder. \
Navigate to the `src\Requirements_and_value_identification_tool\react-app` folder \
Run the following command to install project dependencies `npm install` \
After these have installed, run the project with the following command `npm start`. \

Note that the web app is currently configured to use the hosted Django API. To change this to use the locally hosted API, navigate to the `src\Requirements_and_value_identification_tool\react-app\src\constants\index.js` file and change the short URL from the hosted API to the locally hosted one. 



### Testing
To get a code coverage report of the Django code run the following code in the `src\Requirements_and_value_identification_tool` folder.\
Make sure the virtual environment is running and the relevant requirements have been installed.\
`coverage run manage.py test web_app`\
`coverage report`


To get a code coverage report of the React JS code, run the following command in the `src\Requirements_and_value_identification_tool\react_app` folder.\
Before running this, make sure that dependancies have been installed using npm.\
`npm test -- --coverage --watchAll`\



