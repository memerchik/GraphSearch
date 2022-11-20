
//Arrays of cities
var cities=[]
var citiesGraph=math.zeros(0,0)

var list
var visited
var destinations

//Functions
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function resizeGraph(){
    let newGraph = math.zeros(cities.length, cities.length)
    citiesGraph.forEach(function(value, index, matrix){
        newGraph.set(index, citiesGraph.get(index))
    });
    return newGraph;
}

function logGraph(){
    console.log("///////start///////")
    for(let k=0;k<citiesGraph._data.length;k++){
        console.log(citiesGraph._data[k])
    }
    console.log("////////end////////")
}

function findWays(start){
    if(start==-1){
        return
    }
    destinations=[]
    //Converting matrix to adjacency list
    list=Array(citiesGraph._size[0])
    list.fill(['a'])
    for(let i=0;i<citiesGraph._size[0];i++){
        list[i]=[]
        for(let k=0;k<citiesGraph._size[1];k++){
            if(citiesGraph.get([i,k])==1){
                list[i].push(k)
            }
        }
    }
    console.log(list)
    visited=Array(citiesGraph._size[0])
    visited.fill(false)
    dfs(start-1)
    if(destinations.length>0){
        showResults(true)
    }
    else{
        showResults(false)
    }
     
}

function dfs(start){
    visited[start]=true
    for(let h=0;h<list[start].length;h++){
        element=list[start][h]
        if(visited[element]){
            continue
        }
        destinations.push(element)
        dfs(element)
    }
}


function addCity(name){
    if(name==""){
        return
    }
    cities.push(name)
    console.log(cities)
    citiesGraph=resizeGraph()
    $("#first-city").append("<option value="+cities.length+">"+name+" ("+cities.length+")</option>")
    $("#second-city").append("<option value="+cities.length+">"+name+" ("+cities.length+")</option>")
    $("#result-city").append("<option value="+cities.length+">"+name+" ("+cities.length+")</option>")
    $("#display-cities").append("<div class='city'><h5>"+name+"</h5><div>City ID: "+cities.length+"</div></div>")
    logGraph()
}

function addConnection(city1, city2){
    if(citiesGraph.get([city1-1, city2-1]) == 0){
        citiesGraph.set([city1-1, city2-1], 1)
        citiesGraph.set([city2-1, city1-1], 1)
        $("#display-connections").append("<div class='city flex-row-space-between'><h5>"+cities[city1-1]+" ("+city1+") <=> "+cities[city2-1]+" ("+city2+")</h5><button class='rmv-btn remove-connection' tag="+city1+":"+city2+">Remove</button></div>")
        logGraph()
    }
    
}

function removeConnection(city1, city2){
    citiesGraph.set([city1-1, city2-1], 0)
    citiesGraph.set([city2-1, city1-1], 0)
    $(".remove-connection[tag='"+city1+":"+city2+"']").parent().remove()
    logGraph()
}

function showResults(success){
    if(success){
        $("#results-output").html("")
        destinations.map((val, ind)=>{
            $("#results-output").append("<div class='city'><h5>"+cities[val]+"</h5><div>City ID:"+(val+1)+"</div></div>")
        })
    }
    else{
        $("#results-output").html("")
        $("#results-output").append("<p>You can't go anywhere from here</p>")
    }
    
    
}

//Triggers
$(document).ready(()=>{
    $("#add-city").click(function(){
        let newCity=$("#add-city-input").val()
        if(newCity!=""){
            addCity(newCity)
        }
    })
    $("#add-connection").click(function(){
        let city1=$("#first-city").val()
        let city2=$("#second-city").val()
        if(city1!=city2&&city1!=-1&&city2!=-1){
            addConnection(city1, city2)
        }
    })
    $("#display-connections").on("click", ".remove-connection", function(){
        let tag=$(this).attr("tag").split(":")
        removeConnection(tag[0], tag[1])
    })
    $("#destinations-show").click(function(){
        findWays($("#result-city").val())
    })
    $("#clear-list").click(function(){
        $("#display-connections").html("")
        $("#display-cities").html("")
        $("#results-output").html("")
        $("#first-city").html("<option value='-1'>-</option>")
        $("#second-city").html("<option value='-1'>-</option>")
        $("#result-city").html("<option value='-1'>-</option>")
        cities=[]
        citiesGraph=math.zeros(0,0)
        logGraph()
    })

    //Cosmetics
    $("#add-city-input").bind("focus", function(){
        $("#add-city-input").val("")
    }) 
})
