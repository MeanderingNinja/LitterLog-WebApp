# The Cat Bathroom Monitoring System Web App
![web-app-header-image](https://github.com/emma-jinger/cat_bathroom_monitoring_system_web_app/blob/main/public/images/web-app-header-img.png) 
## Introduction
This web app is part of [the Cat Bathroom Monitoring System Project](https://github.com/emma-jinger/Cat_Bathroom_Monitoring_System) I've been working on. It displays the timestamps data corresponding to instances of a cat using the litterbox in the form of graphs and numbers. Specifically, on the web app, you can find:

- the profile of our family cat - Atticus
- the average number of bathroom visits on a daily, weekly, and monthly basis
- the average time Atticus spent per bathroom visit 
- the graph that shows the number of bathroom visits on a daily, weekly, and monthly basis
- the graph that shows the average time Atticus spent per bathroom visit on a daily, weekly, and monthly basis
- an About page that tells the story of the project and the author

## Installation

### Clone the Repo
To download the code, navigate to a folder of your choosing on the your machine. First, make sure git is installed:
```
sudo apt update
sudo apt install git
```
Then clone the `cat_bathroom_monitoring_system_web_app` project:
```
git clone https://github.com/emma-jinger/cat_bathroom_monitoring_system_web_app
cd cat_bathroom_monitoring_system_web_app
```

### Install dependencies:
Note for me on a brandnew machine: Before the following command, I need to make sure nodejs and nom are installed? Do I need to run in a virtual env? What does that mean? 
```
npm install
``` 
Note for me on my server: 

### Run the web server
```
npm start
```
Now you should be able to see the web app with this address `http://locahost:5001` on your browser. 


## License
Provide information on the license that your web app is released under. This could include:

The license name (e.g. MIT, GPL, Apache).
A link to the full text of the license.
Any other relevant license information.

## Further Development/Contributing

**New features that could be added**:

- A Download button which allows users to download the raw timestamps data 
- A Sign Up and Log In feature to create a custom profile of the user's cat
- A button that allows the user to opt in for getting notified whenever their cat visits the bathroom 

## Authors
List the authors of your web app, including any contributors or collaborators.

## Acknowledgments
List any individuals or organizations that you would like to thank for their contributions to your web app.

That's an example of a simple web app documentation structure you can use for your README file. Feel free to modify it according to your needs.