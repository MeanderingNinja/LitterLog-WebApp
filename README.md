# The Cat Bathroom Monitoring System Web App
![web-app-header-image](https://github.com/emma-jinger/cat_bathroom_monitoring_system_web_app/blob/main/public/images/web-app-header-img.png) 

## Introduction
This web app is part of [the LitterLog Project](https://github.com/emma-jinger/Cat_Bathroom_Monitoring_System) I've been working on. It displays the timestamps data corresponding to instances of a cat using the litterbox in the form of graphs and numbers. Specifically, on the web app, you can find:

- the profile of our family cat - Atticus
- the average number of bathroom visits on a daily, weekly, and monthly basis
- the average time Atticus spent per bathroom visit 
- the graph that shows the number of bathroom visits on a daily, weekly, and monthly basis
- the graph that shows the average time Atticus spent per bathroom visit on a daily, weekly, and monthly basis
- an About page that tells the story of the project and the author

![cat_data_graphs_on_web_app](https://github.com/emma-jinger/LitterLog-WebApp/blob/version-1.0.1/public/images/sample_graph20230629.png)

## Installation

### Clone the Repo
To download the code, navigate to a folder of your choosing on the your machine. First, make sure `git`, `Node.js`, and `npm` are installed:
```
sudo apt update
sudo apt install git nodejs npm
```
*Note: for reference, the node.js version I'm using is v16.3.0 and the npm version is 7.15.1.*

Then clone the `LitterLog-WebApp` project:
```
git clone https://github.com/emma-jinger/LitterLog-WebApp
cd LitterLog-WebApp
```

### Install dependencies:
```
npm install
``` 


### Run the web server
```
npm start
```
**Now you should be able to see the web app with this address `http://locahost:5001` on your browser.**

*Note: The web app queries data from a database on the server. In order for you to see the graphs and numbers displayed on the web app, you need to* 
*set up your own database with a table named `cat_data`. `credentials` in `db.js` needs to be modified to reflect this as well. Below is what the table looks like:*

![cat_data](https://github.com/emma-jinger/cat_bathroom_monitoring_system_web_app/blob/main/public/images/cat_data_snippet.png)


## Further Development/Contributing

**New features that could be added**:

- A Download button which allows users to download the raw timestamps data 
- A Sign Up and Log In feature to create a custom profile for the user's cat
- A button that allows the user to opt in for getting notified whenever their cat visits the bathroom 
- Refactor the repo by using the framework React

## Author
[Jing (Emma) Li](https://www.linkedin.com/in/jing-li-2369874b/) 
