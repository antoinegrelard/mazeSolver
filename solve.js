
/* indicates that the solver should be stopped */
var stop;

/**
 * We want to show the solution being generated dynamically, so replace the outer
 * while() loop in the build() method with a timer that checks the stack 
 * every x milliseconds.  This gives the browser a chance to refresh the display; 
 * otherwise it would only show the final state.
 */
function solve()
{
    
    /* initialize the flag */
    stop = false;
    
    /* Initialize the stack at the first element */
    var stack = startCell;
    
    /* Add a new breadcrumb every millisecond */
    setTimeout(function() { solver(disp, stack) }, 10);
}

/**
 * Indicate we want to stop
 */
function stopSolver()
{
    stop = true;
}

/**
 * Main algorithm to solve the maze
 */
function solver(maze, stack)
{
    if(stop)
    {
        return;    
    }

    var current = startCell;

    console.log(current);

    x = current[0];
    y = current[1];
    // var neighbors = ;

    var cell = maze[x][y];

    cell.visited = true;
    // cell.token.style.backgroundPosition = "center";  

    // see if we're at the exit
    if((x == (maze.length - 1)) && (y == (maze.length - 1)))
    {
        stopSolver();  // done
        return;
    }  
    
    var found = false;
    
    /* look for a connected neighbor that hasn't been visited yet */
    while(neighbors.length > 0)
    {

        console.log(neighbors);

        dir = neighbors.pop();

        console.log(dir);

        if(cell.wall[dir] == false)
        {            
            dx = x + delta.x[dir];
            dy = y + delta.y[dir];
            if(dx >= 0 && dy >= 0 && dx < columns && dy < rows)
            {
                if(maze.cells[dx][dy].visited == false)
                {
                    stack.push( { x: dx, y: dy, neighbors: dirs.shuffle() } );
                    found = true;
                    break;
                }
            }
        }              
    }
    
    if(neighbors.length == 0)
    {
        if(found == false)
        {
            stack.pop();
            if((x == maze.start.x) && (y == maze.start.y))
            {
                stopSolver(); // we're back at the beginning; must not be able to compelete the maze
            }
            cell.token.style.backgroundImage = "url(/image/checked.png)";
        }
    }
    
    if(! stop)
    {
        setTimeout(function () { solver(maze, stack) }, 10);
    }

    /**
     * Add a function to Array that returns that last element.
     * equivalent to a peek operation on a stack
     */
    Array.prototype.peek = function()
    {
        return this[this.length - 1];
    }

}