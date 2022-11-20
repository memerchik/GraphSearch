## Brief explanation
This app allows you to search on non-oriented graph and displays all possible **N** cities that are reachable from city **X**

## Instructions
1. Download the code from the repository
2. Open **index.html** file

### How to add a city(or a graph point)
To add city enter its name and click "Add city". You will see it in the **Cities list**! Add minimum two cities.

### How to add a connection
Select two different cities in the **Add connections** and click **Add**.

*Notice: there is no need to add two connections between two cities. One connection from **City 1 => City 2** will work on both sides because graph is not oriented*

### How to see the result
Once you have completed the previous steps select the city you want to be a starting point and click **Show**

## Brief code documentation
### Graph storage
The graph is stored using matrix. In order to work with matrixes in JavaScript I needed an external **math** library. [Math library used](https://mathjs.org/docs/datatypes/matrices.html#:~:text=js.,resize%20%2C%20clone%20%2C%20and%20more.)
### Graph search algorythm
Algorythm used here is called DFS. It works on adjacency lists, so before starting the algorythm I convert matrix to an adjacency list and then start it
