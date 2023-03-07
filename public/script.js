
// ***********************Helper function for inserting innerHTML identified by 'selector' ***************************
// Helper Function #1
const insertHtml = function (selector, html) {
    let targetElem = document.querySelector(selector);
    console.log("20230306: " + targetElem)
    //innerHTML: sets the HTML markup contained within the element.
    targetElem.innerHTML = html;
};

// Helper Function #2: Substitude property that has double curly brackets with a value
const insertProperty = function (string, propName, propValue) {
    // string would be the whole category-snippet as a string
    let propToReplace = "{{" + propName + "}}";
    // Using RegExp() constructor with the flag "g" as an argument 
    //of the method replace() will replace all the matches
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
};

// Helpfer function #3: Show loading icon inside element identified by 'selector' 
const showLoading = function (selector) {
    let html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
};



//*********************** Dynamically loading home page content *****************

// homeHtml to be inserted to #main-content 
let homeHtml = "snippets/home-page.html";
// 20230111: url that can be used to fetch the number of visits
let retrieveAvgDailyVisits = "/api/v1/avgDailyVisits";


// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function () {
    showLoading("#main-content");
    // 20230302: insert home-page.html snippet 
    //sendGetRequest takes 3 arguments: requestUrl, responseHandler, isJsonResponse
    ajaxUtils.sendGetRequest(
        homeHtml, 
        function (response_homeHtml) {insertHtml("#main-content", response_homeHtml);    
        // 20230306: Call the callback function after the HTML content is inserted
        onHomePageLoad(); }, 
        false);
});

onHomePageLoad = function() {
  // Load the daily visit graph and the avg number if daily visits
  catData.loadDailyVisits();
  // Inset graph to #TimeSpan-graph in home-page.html (Worked 20230303!)
  catData.loadDailyAvgTimePerVisit();
  loadAvgTimePerVisitAllTime();
}

// 20230306: function to insert the all time avg time per vist to #avgTimePerVisitAllTime in home-page.html. 
let avgTimePerVisit = '/api/v1/avgTimePerVisitAllTime'
loadAvgTimePerVisitAllTime = function() {
  ajaxUtils.sendGetRequest(avgTimePerVisit, 
    function(res) {
      insertHtml("#avgTimePerVisit", res)
    }, false
    )
}


// ************************** Dynamically load visit graphs and avg number of visits above the Day/Week/Month buttons *******************
// **************** Functions below are call back functions for click events set up in home-page.html *************** 
let catData = {};
 
// **** Function #1: Load the daily visit graph and the avg number if daily visits ****
let daily_visit_graph_html = "snippets/daily_visit_graph.html";
catData.loadDailyVisits = function () {
    showLoading("#visit-graph");
    // Insert the graph showing number of visits on a DAILY basis 
    ajaxUtils.sendGetRequest(daily_visit_graph_html,
        function (responseText) { insertHtml("#visit-graph", responseText) }, false);
    // Get the avg num of dailyly visits and insert it to #avg-num-of-visits in home-page.html
    ajaxUtils.sendGetRequest(retrieveAvgDailyVisits,
        function (responseText) { insertHtml("#avg-num-of-visits", responseText) }, false);

};


// **** Function #2: Load the daily visit graph and avg visits per week ****
let weekly_visit_graph_html = "snippets/weekly_visit_graph.html";
// 20230111: url that can be used to fetch the avg number of weekly visits
let retrieveAvgWeeklyVisits = "/api/v1/avgWeeklyVisits";
catData.loadWeeklyVisits = function () {
    showLoading("#visit-graph");
    // Insert the graph showing number of visits on a WEEKLY basis 
    ajaxUtils.sendGetRequest(weekly_visit_graph_html,
        function (responseText) { insertHtml("#visit-graph", responseText) }, false);
    // Get the avg num of weekly visits and insert it to #avg-num-of-visits in home-page.html
    ajaxUtils.sendGetRequest(retrieveAvgWeeklyVisits,
        function (responseText) { insertHtml("#avg-num-of-visits", responseText) }, false);
};


// **** Function #3: Load the monthly visit graph and avg visits per month ****
let monthly_visit_graph_html = "snippets/monthly_visit_graph.html";
// 20230111: url that can be used to fetch the avg number of monthly visits
let retrieveAvgMonthlyVisits = "/api/v1/avgMonthlyVisits";
catData.loadMonthlyVisits = function () {
    showLoading("#visit-graph");
    ajaxUtils.sendGetRequest(monthly_visit_graph_html,
        function (responseText) { insertHtml("#visit-graph", responseText) }, false);
    // Get the avg visits per month and insert it to #avg-num-of-visits in home-page.html
    ajaxUtils.sendGetRequest(retrieveAvgMonthlyVisits,
        function (responseText) { insertHtml("#avg-num-of-visits", responseText) }, false);
};



// ************************** Dynamically load average time per visit graphs and avg time per visit above the Day/Week/Month buttons *******************
// **************** Functions below are call back functions for click events set up in home-page.html *************** 



// Function #1: Inset graph to #TimeSpan-graph in home-page.html
// 20230303:
let getAvgTimePerVisitDaily = "/api/v1//avgTimePerVisitDaily"
catData.loadDailyAvgTimePerVisit = function () {
  // showLoading("TimeSpan-graph");
  ajaxUtils.sendGetRequest(getAvgTimePerVisitDaily, 
    function(data){
      //20230303: trying it out for the theme not work. Plotly.Plotly.register(PlotlyThemes);
        const trace = {
            x: data.map(row => row.date),
            y: data.map(row => row.avg_duration),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "blue"},
            line: {color: "blue"}
          };

        const layout = {
          title: "Daily Average Time per Visit",
          xaxis: {title: "Date"},
          yaxis: {title: "Average Time"}
        }
        // 20230306: file name in graphOptions specifies the name of the file that will be created when the plot is saved.  
        // The plot will be saved to your plotly account (I have to import plotly with username like this: const plotly = require('plotly')('username', 'apikey');)
        // const graphOptions = {
        //   layout: layout,
        //   filename: "daily-average-time",
        //   fileopt: "overwrite"
        // };

        // Plotly has to be captialized here to work 
        Plotly.newPlot("TimeSpan-graph", [trace], layout, function (err, msg) {
          if (err) {
            console.error(err);
          } else {
            console.log(msg);
          }
        });
    }, 
    true); // true instead of false here
}


// Function #2: Inset graph to #TimeSpan-graph in home-page.html
// 20230303: Work in progress
let getAvgTimePerVisitWeekly = "/api/v1//avgTimePerVisitWeekly"
catData.loadWeeklyAvgTimePerVisit = function () {
  // showLoading("TimeSpan-graph");
  ajaxUtils.sendGetRequest(getAvgTimePerVisitWeekly, 
    function(data){
      //20230303: trying it out for the theme not work. Plotly.Plotly.register(PlotlyThemes);
        const trace = {
            x: data.map(row => row.week),
            y: data.map(row => row.avg_duration),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "blue"},
            line: {color: "blue"}
          };

        const layout = {
          title: "Weekly Average Time per Visit",
          xaxis: {title: "Date"},
          yaxis: {title: "Average Time"}
        }

        // Plotly has to be captialized here to work 
        Plotly.newPlot("TimeSpan-graph", [trace], layout, function (err, msg) {
          if (err) {
            console.error(err);
          } else {
            console.log(msg);
          }
        });
    }, 
    true); // true instead of false here
}


// Function #3: Inset graph to #TimeSpan-graph in home-page.html
// 20230303: 
let getAvgTimePerVisitMonthly = "/api/v1//avgTimePerVisitMonthly"
catData.loadMonthlyAvgTimePerVisit = function () {
  // showLoading("TimeSpan-graph");
  ajaxUtils.sendGetRequest(getAvgTimePerVisitMonthly, 
    function(data){
      //20230303: trying it out for the theme not work. Plotly.Plotly.register(PlotlyThemes);
        const trace = {
            x: data.map(row => row.month),
            y: data.map(row => row.avg_duration),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "blue"},
            line: {color: "blue"}
          };

        const layout = {
          title: "Monthly Average Time per Visit",
          xaxis: {title: "Date"},
          yaxis: {title: "Average Time"}
        }

        // Plotly has to be captialized here to work 
        Plotly.newPlot("TimeSpan-graph", [trace], layout, function (err, msg) {
          if (err) {
            console.error(err);
          } else {
            console.log(msg);
          }
        });
    }, 
    true); // true instead of false here
}














// Dynamically load average number of daily visits 
// Old method of getting the avg number of visits above the graphs 
// The home-page.html had this line: <scan id="num_of_visit">{{num_of_visit}}</scan>
// Ditched on 20230301

// catData.loadAvgDailyVisits = function(){
//     ajaxUtils.sendGetRequest(
//         retrieveAvgDailyVisits,
//         // res_numOfVisit is the number returned by the above url
//         function (res_numOfVisit) {
//             ajaxUtils.sendGetRequest(homeHtml, function (response_homeHtml) {
//                 // 20230111: insertProperty returns a new version of responseText (string) which has {{num_of_visit}} replaced
//                 insertHtml("#main-content", insertProperty(response_homeHtml, "num_of_visit", res_numOfVisit))
//             }, false)
//         },
//         false);
// }















// // ******** Dynamically load Menu Categories ************
// let dc = {};
// let allCategoriesUrl =
//     "https://davids-restaurant.herokuapp.com/categories.json";
// let categoriesTitleHtml = "snippets/categories-title-snippet.html";
// let categoryHtml = "snippets/category-snippet.html";

// // Function to load the menu categories view
// dc.loadMenuCategories = function () {
//     showLoading("#main-content");
//     switchMenuToActive();
//     // Insert data from allCategoriesUrl to html snippets and build them together
//     ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
// };

// // Helpful function to the above function
// // function: Build and show HTML for the categories page based on the data from the server
// function buildAndShowCategoriesHTML(categories) {
//     // Load title snippet of categories page
//     ajaxUtils.sendGetRequest(categoriesTitleHtml, function (categoriesTitleHtml) {
//         // Retrieve single category and use it to build Categories View Html
//         ajaxUtils.sendGetRequest(categoryHtml,
//             function (categoryHtml) {
//                 let categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
//                 insertHtml("#main-content", categoriesViewHtml);
//             },
//             false);
//     },
//         false);
// };

// // Helpper function to the above function
// // Function: Usin categories data and snippet html to build categories view html to be inserted into page
// function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {
//     // Use categoriesTitleHtml as the base to build on
//     let finalHtml = categoriesTitleHtml;
//     finalHtml += "<section class='row'>";

//     // Loop over the categories
//     for (let i = 0; i < categories.length; i++) {
//         // Insert category values
//         // Use categoryHtml as the base to add real values each time
//         let html = categoryHtml;
//         let name = "" + categories[i].name;
//         let short_name = "" + categories[i].short_name;
//         html = insertProperty(html, "name", name);
//         html = insertProperty(html, "short_name", short_name);
//         finalHtml += html;
//     }
//     finalHtml += "</section>";
//     return finalHtml;
// };

// // Helper Function to substitude property that has 
// // double curly brackets with a value
// const insertProperty = function (string, propName, propValue) {
//     // string would be the whole category-snippet as a string
//     let propToReplace = "{{" + propName + "}}";
//     // Using RegExp() constructor with the flag "g" as an argument 
//     //of the method repalace() will replace all the matches
//     string = string.replace(new RegExp(propToReplace, "g"), propValue);
//     return string;
// };


// // ******** Dynamically load Single Category View (Menu Items) ************
// let menuItemsTitleHtml = "snippets/menu-items-title.html";
// let menuItemHtml = "snippets/menu-item.html";
// let menuItemsUrl =
//     // value short_name used in this project is grabbed when the allCategories Html is built
//     "https://davids-restaurant.herokuapp.com/menu_items.json?category=";

// // Helper function
// // Remove the class 'active' from home and switch to Menu button
// const switchMenuToActive = function () {
//     // Remove 'active' from home button 
//     // className property value is a string
//     let classes = document.querySelector("#navHomeButton").className;
//     // Reason to use new RegExp constructor is to use "g" (global)--find all occurence of 'active' if for some reason exist
//     classes = classes.replace(new RegExp("active", "g"), "");
//     document.querySelector("#navHomeButton").className = classes;

//     // Add 'active' to menu button if not already there
//     classes = document.querySelector("#navMenuButton").className;
//     // If #navMenuButton has no active as a class
//     // indexOf string method returns -1 when the searched substring is not found 
//     if (classes.indexOf("active") == -1) {
//         classes += " active";
//         document.querySelector("#navMenuButton").className = classes;
//     }
// };

// dc.loadMenuItems = function (categoryShort) {
//     showLoading("#main-content");
//     switchMenuToActive();
//     ajaxUtils.sendGetRequest(menuItemsUrl + categoryShort, buildAndShowMenuItemsHTML);
// };

// function buildAndShowMenuItemsHTML(categoryMenuItems) {
//     // Retieve menu item title html
//     ajaxUtils.sendGetRequest(
//         menuItemsTitleHtml,
//         function (menuItemsTitleHtml_resp) {
//             // Retrieve menu items html
//             ajaxUtils.sendGetRequest(
//                 menuItemHtml,
//                 // The actual build of the final html
//                 function (menuItemHtml_resp) {
//                     let final_html = buildMenuItemsViewHtml(menuItemsTitleHtml_resp, menuItemHtml_resp, categoryMenuItems);
//                     insertHtml("#main-content", final_html);
//                 },
//                 false);
//         },
//         false)
// };

// function buildMenuItemsViewHtml(menuItemsTitleHtml, menuItemHtml, categoryMenuItems) {
//     // Replace the place holders in the title html with the actual values
//     menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "name", categoryMenuItems.category.name);
//     menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "special_instructions", categoryMenuItems.category.special_instructions);
//     let final_html = menuItemsTitleHtml;
//     final_html += "<section class='row'>";

//     // Menu Items View Html
//     // Loop over menu items 
//     let menu_items = categoryMenuItems.menu_items;
//     let catShortName = categoryMenuItems.category.short_name;
//     for (let i = 0; i < menu_items.length; i++) {
//         let newMenuItemHtml = menuItemHtml;
//         console.log("inside for loop, catShortName is: " + catShortName);
//         // Replace the place holders in the title html with the actual values
//         newMenuItemHtml = insertProperty(newMenuItemHtml, "catShortName", catShortName);
//         newMenuItemHtml = insertProperty(newMenuItemHtml, "short_name", menu_items[i].short_name);
//         newMenuItemHtml = insertItemPrice(newMenuItemHtml, "price_small", menu_items[i].price_small);
//         newMenuItemHtml = insertItemPortionName(newMenuItemHtml, "small_portion_name", menu_items[i].small_portion_name);
//         newMenuItemHtml = insertItemPrice(newMenuItemHtml, "price_large", menu_items[i].price_large);
//         newMenuItemHtml = insertItemPortionName(newMenuItemHtml, "large_portion_name", menu_items[i].large_portion_name);
//         newMenuItemHtml = insertProperty(newMenuItemHtml, "name", menu_items[i].name);
//         newMenuItemHtml = insertProperty(newMenuItemHtml, "description", menu_items[i].description);
//         // Add clearfix after every second menu ietm
//         if (i % 2 != 0) {
//             newMenuItemHtml += "<div class='clearfix visible-lg-block visible-md-block'></div>"
//         }
//         final_html += newMenuItemHtml;
//     };
//     final_html += "</section>";
//     return final_html;
// };

// // Append price with "$" if price exist
// // Handle when the price tag for some items do not exist
// function insertItemPrice(html, pricePropName, priceValue) {
//     // If not specified, replace with empty string (priceValue is undefined if not exists)
//     if (!priceValue) {
//         return insertProperty(html, pricePropName, "");
//     }
//     priceValue = "$" + priceValue.toFixed(2);
//     html = insertProperty(html, pricePropName, priceValue);
//     return html;
// };

// // Handle when the portion name for some items do not exist
// function insertItemPortionName(html, portionPropName, portionValue) {
//     if (!portionValue) {
//         return insertProperty(html, portionPropName, "");
//     }
//     portionValue = "(" + portionValue + ")";
//     return insertProperty(html, portionPropName, portionValue);
// };