//**CREATING THE INTERACTIVE TABLE */
d3.csv("../static/data/overalldata_cleaned.csv").then(function(data) {
    console.log(data);


    //****CREATING OPTIONS FOR THE FILTER****///

    //grab an array of all the states
    var all_states = data.map(states => states.State)
    
    //filter the data such that I only have a list of all unique states, including DC

    //This filters by checking if the index of the first entry of 
    //a unique element equals the index of the nth entry of the element
    var unique_states = all_states.filter((states,index) => {
        return all_states.indexOf(states) === index;
        //.indexOf returns the indedx of the first iteration of an element
    })


    //go through the unique states array and append each one as an option
    unique_states.forEach(element => {
        //console.log(element)
        d3.select("#state").append("option").attr("value",element).text(`${element}`)
    });



    //Repeat the procecss for years
    var all_years = data.map(years => 
        (years.Date).split('/')[2]
    )
    
    var unique_years = all_years.filter((years,index) => {
        return all_years.indexOf(years) === index
    })

    unique_years.forEach(element => {
        d3.select("#year").append("option").attr("value",element).text(`${element}`)
    })



    //****CREATING EVENT LISTENER TO CREATE TABLE****//

    //select both drop downs and button
    var state_select = d3.select("#state")
    var year_select = d3.select("#year")
    var btn_search = d3.select("#btn-to-search")

    console.log(btn_search)
    //event handlers: we want the function to run on button click, but not
    // on dropdown change
    btn_search.on("click", GenerateTable)
    var tbody = d3.select("tbody")
    //create function to run on click
    function GenerateTable() {

        //prevent refreshing
        d3.event.preventDefault();

        //Clear out the table
        d3.select("tbody").selectAll(`tr`).remove();

        var input1 = state_select.property("value")
        var input2 = year_select.property("value")
        
        //Create if statements
        
        //If nothing was selected, then we want to return a message
        //prompting to ask to filter
        if (input1 === "Select State" && input2 === "Select Year") {
            tbody.append("tr").append("td").text("Please Select a State and/or Year")
        }


        //If anything was selected, we go into the data and create more if
        //statements
        else{

            data.forEach(function(datum) {
                
                //1) If a state was selected but not a year, return all the state
                 if (input1 === datum.State && input2 === "Select Year"){
                    var row = tbody.append("tr") //append a new row for each match

                    Object.entries(datum).forEach(function([key, value]) {
                        var cell = row.append("td")
                        cell.text(value)
                    })
                }
                //2) If a year was selected but not a state, return all the year
                else if (input1 === "Select State" && input2 === (datum.Date).split('/')[2]){
                    var row = tbody.append("tr")

                    Object.entries(datum).forEach(function([key, value]) {
                        var cell = row.append("td")
                        cell.text(value)
                    })
                }
                else if (input1 === datum.State && input2 === (datum.Date).split('/')[2]){
                    var row = tbody.append("tr")

                    Object.entries(datum).forEach(function([key, value]) {
                        var cell = row.append("td")
                        cell.text(value)
                    })
                }
            })
        }
    }




})


//**CREATING THE GRAPHS SECTION OF THE JS */
d3.csv("../static/data/Total_Shootings.csv").then(function(data1) {
    d3.csv("../static/data/AreaType_Shootings.csv").then(function(data2) {
        d3.csv("../static/data/State_count.csv").then(function(data3) {
            console.log(data1)
            console.log(data2)
            
            //set up variables for the buttons and selections
            var graph_select = d3.select("#graphsearch")
            var graph_btn = d3.select("#graph-btn")

            //event listeners
            graph_btn.on("click", GenerateGraph)

            //runs this function when the search button is created
            function GenerateGraph(){
                //initialize the arrays that we are going to use to create a trace
                years = []
                frequency = []
                urban_years = []
                urban_frequency = []
                suburban_years = []
                suburban_frequency = []
                rural_years = []
                rural_frequency = []
                states = []
                state_count = []

                //prevent refreshing
                d3.event.preventDefault();

                //Clear out the table
                d3.select("#graphs").selectAll(".plotly").remove();

                var input3 = graph_select.property("value")

                //Will only generate the graph on event listened
                if (input3 === "Total Shootings") {
                    console.log(input3)
                    data1.forEach(function(datum) {
                            Object.entries(datum).forEach(function([key,value]){
                                if (key === "Year") {
                                    years.push(value)
                                }

                                else if (key === "Date") {
                                    frequency.push(value)
                                }
                            })
                    })

                    //now we actually create the graph
                    var trace = {
                        x : years,
                        y : frequency,
                        type : "scatter"
                    }
                    
                    var layout = {
                        title: "Total Shootings in the USA per Year",
                        xaxis: {title: "Year"},
                        yaxis: {title: "Incident Frequency"}
                    }
                    var data = [trace]

                    Plotly.newPlot("graphs", data, layout)
                }

                else if (input3 === "Area Type Shootings") {
                    console.log(input3)

                    data2.forEach(function(datum) {
                        if (datum.AreaType === "urban") {
                            urban_years.push(datum.Year)
                            urban_frequency.push(datum.Date)
                        }

                        else if (datum.AreaType === "suburban"){
                            suburban_years.push(datum.Year)
                            suburban_frequency.push(datum.Date)
                        }

                        else if (datum.AreaType === "rural") {
                            rural_years.push(datum.Year)
                            rural_frequency.push(datum.Date)
                        }
                    })

                    trace1 = {
                        x: urban_years,
                        y: urban_frequency,
                        name: "Urban",
                        type: "bar"
                    }

                    trace2 = {
                        x: suburban_years,
                        y: suburban_frequency,
                        name: "Suburban",
                        type: "bar"
                    }

                    trace3 = {
                        x: rural_years,
                        y: rural_frequency,
                        name: "rural",
                        type: "bar"
                    }
                    var layout1 = {
                        title: "Shootings Per year, grouped by Area Type",
                        xaxis: {title: "Year"},
                        yaxis: {title: "Incident Frequency"}
                    }

                    var data = [trace1,trace2, trace3]

                    Plotly.newPlot("graphs", data, layout1)
                    

                }
                else if (input3 === "State Total Shootings") {
                    data3.forEach(function(datum) {
                        states.push(datum.State)
                        state_count.push(datum.Count)
                    })

                     var trace4 = {
                        x: states,
                        y:state_count,
                        type: "bar"
                    }

                    var layout2 = {
                        title: "Shootings Per Year, grouped by States",
                        xaxis: {title: "State",
                                tickfont: {
                                    size: 10
                                }},
                        yaxis: {title: "Incident Frequency"}
                    }

                    var data = [trace4]

                    Plotly.newPlot("graphs", data, layout2)
                    
                }

            }

        })
            
    })


})

//**Slick JS */

