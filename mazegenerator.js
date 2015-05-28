var playerCell = [];
var exitCell = [];
var currentCell = [];
var cells = new Array();
var path;
var unvis;

function newMaze(x, y) {

    // Establish variables and starting grid

    var totalCells = x*y;
    unvis = new Array();
    for (var i = 0; i < y; i++) {
        cells[i] = new Array();
        unvis[i] = new Array();
        for (var j = 0; j < x; j++) {
            cells[i][j] = [0,0,0,0];
            unvis[i][j] = true;
        }
    }
    
    // Set a random position to start from
    currentCell = [0, 0];
    exitCell = [x-1, y-1];
    playerCell = currentCell;
    path = [currentCell];
    unvis[currentCell[0]][currentCell[1]] = false;
    var visited = 1;

    // Loop through all available cell positions
    while (visited < totalCells) {
        // Determine neighboring cells
        pot = [[currentCell[0]-1, currentCell[1], 0, 2],
                [currentCell[0], currentCell[1]+1, 1, 3],
                [currentCell[0]+1, currentCell[1], 2, 0],
                [currentCell[0], currentCell[1]-1, 3, 1]];
        var neighbors = new Array();
        
        // Determine if each neighboring cell is in game grid, and whether it has already been checked
        for (var l = 0; l < 4; l++) {
            if (pot[l][0] > -1 && pot[l][0] < y && pot[l][1] > -1 && pot[l][1] < x && unvis[pot[l][0]][pot[l][1]]) { neighbors.push(pot[l]); }
        }
        
        // If at least one active neighboring cell has been found
        if (neighbors.length) {
            // Choose one of the neighbors at random
            next = neighbors[Math.floor(Math.random()*neighbors.length)];
            
            // Remove the wall between the current cell and the chosen neighboring cell
            cells[currentCell[0]][currentCell[1]][next[2]] = 1;
            cells[next[0]][next[1]][next[3]] = 1;
            
            // Mark the neighbor as visited, and set it as the current cell
            unvis[next[0]][next[1]] = false;
            visited++;
            currentCell = [next[0], next[1]];
            path.push(currentCell);
        }
        // Otherwise go back up a step and keep going
        else {
            currentCell = path.pop();
        }
    }
    return cells;
}

function solve(maze) {

    var myMaze = maze;
    var currentNeighbors;
    var pathToExit = [playerCell];
    var unvisSolve = new Array();
    var visited = 1;

    for (var i = 0; i < myMaze.length; i++) {
        unvisSolve[i] = new Array();
        for (var j = 0; j < myMaze.length; j++) {
            unvisSolve[i][j] = true;
        }
    }

    unvisSolve[playerCell[0]][playerCell[1]] = false;


    setInterval(function() {
        if((playerCell[0] !== exitCell[0]) || (playerCell[1] !== exitCell[1])) {

            var potential = [
                                [playerCell[0]-1, playerCell[1], 0, 2],
                                [playerCell[0]  , playerCell[1]+1, 1, 3],
                                [playerCell[0]+1, playerCell[1], 2, 0],
                                [playerCell[0]  , playerCell[1]-1, 3, 1]
                            ];

            var neighbors = new Array();

            // Determine if each neighboring cell is in game grid, and whether it has already been checked
            for (var l = 0; l < 4; l++) {
                if (potential[l][0] > -1 && potential[l][0] < myMaze.length && potential[l][1] > -1 &&  potential[l][1] < myMaze.length && unvisSolve[potential[l][0]][potential[l][1]]) {
                    neighbors.push(potential[l]);
                }
            }

            var neighborX;
            var neighborY;
            var neighborAxis;
            var neighborCell;
            var neighborBorderValue;
            var neighborsToVisit= new Array();

            for (var m = 0; m < neighbors.length; m++) {
                neighborX = neighbors[m][0];
                neighborY = neighbors[m][1];
                neighborAxis = neighbors[m][3];
                neighborCell = $('#' + neighborX + '-' + neighborY);
                switch(neighborAxis){
                    case 0:
                        neighborBorderValue = neighborCell.css("border-top-style");
                        break;
                    case 1:
                        neighborBorderValue = neighborCell.css("border-right-style");
                        break;
                    case 2:
                        neighborBorderValue = neighborCell.css("border-bottom-style");
                        break;
                    case 3:
                        neighborBorderValue = neighborCell.css("border-left-style");
                        break;
                }

                if(neighborBorderValue === "none") {
                    neighborsToVisit.push(neighbors[m]);
                }

            };

            // If at least one active neighboring cell has been found
            if (neighborsToVisit.length) {
                // Choose one of the neighbors at random
                next = neighborsToVisit[Math.floor(Math.random()*neighborsToVisit.length)];
                
                // Mark the neighbor as visited, and set it as the current cell
                unvisSolve[next[0]][next[1]] = false;
                playerCell = [next[0], next[1]];
                $('.visited.current').removeClass("current");
                $('#' + playerCell[0] + '-' + playerCell[1]).addClass("current");
                $('#' + pathToExit[pathToExit.length-1][0] + '-' + pathToExit[pathToExit.length-1][1]).removeClass("current").addClass("visited");
                // $('#' + playerCell[0] + '-' + playerCell[1]).css({
                //    background: 'greenyellow'
                // });
                pathToExit.push(playerCell);
            }
            // Otherwise go back up a step and keep going
            else {
                playerCell = pathToExit.pop();
                $('#' + pathToExit[pathToExit.length-1][0] + '-' + pathToExit[pathToExit.length-1][1]).removeClass("current").addClass("visited");
                $('.visited.current').removeClass("current");
                $('#' + playerCell[0] + '-' + playerCell[1]).addClass("current").addClass("visited");
            }

        }
    }, 10);

}


    
