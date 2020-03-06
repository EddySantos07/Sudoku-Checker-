 let puzzle = [[ 8,9,5,   7,4,2,   1,3,6 ],
              [ 2,7,1,   9,6,3,   4,8,5 ],
              [ 4,6,3,   5,8,1,   7,9,2 ],

              [ 9,3,4,   6,1,7,   2,5,8 ],
              [ 5,1,7,   2,3,8,   9,6,4 ],
              [ 6,8,2,   4,5,9,   3,7,1 ],

              [ 1,5,9,   8,7,4,   6,2,3 ],
              [ 7,4,6,   3,2,5,   8,1,9 ],
              [ 3,2,8,   1,9,6,   5,4,7 ]];



function getRow (grid, row) {
  return grid[row];
}


function getColumn (grid, colum) {
  let column = [];

  for (let i = 0; i < grid.length; i++) {
    column.push(grid[i][colum]);
  }
  return column;
}



function getSection (grid, x , y) {
  x *= 3; // index 2 - [ 9,3,4,   6,1,7,   2,5,8 ],
  y *= 3; // index  0 [ 8,9,5,   7,4,2,   1,3,6 ] 
  
  let section = [];
  
  for (let i = y; i < y + 3; i ++ ) {

    for (let j = x; j < x + 3; j++) {
      // console.log(grid[j])
      section.push(grid[i][j])
      // console.log(section)
    }
  }
  return section;
}

// getSection(puzzle, 0, 0);
// // -> [ 8,9,5,2,7,1,4,6,3 ]
// console.log(getSection(puzzle, 1,0));
// -> [ 7,4,2,9,6,3,5,8,1 ]



function includes1to9 (section) {
  
  for (let i = 0; i < section.length; i++) {  
    
    for (let j = i + 1; j < section.length; j++) {
      if (section[i] > 9 || section[j] > 9 ) {
        return false;
      }  
      if (section[j] === section[i]) {
        return false;
      }
    }
  }
  return true;
}

// includes1to9([1,1,2,3,4,5,6,7,8]); // => false (no 9)
// includes1to9([1,2,3,4,5,6,7,8,9]); // => true
// includes1to9([1,1,2,3,4,5,6,7,8]) // => false (no 9);



/* The main function Sudoku Cheker function below */ 


function SudokuChecker (grid) {
  let count = 0;
  
  let x = 0;
  let y = 0;
  
  for (let i = 0; i < grid.length; i++) {
    if (includes1to9(getRow(grid,i))) {
      count++;
    } else {
      return false;
    }

    if (includes1to9(getColumn(grid,i))) {
      count++;
    } else {
      return false;
    }

    if (includes1to9(getSection(grid, x, y))) {
      // console.log(getSection(grid, x, y)); // testing what index is this in the grid
      
      count++;
      x++;
      if (x === 3) { // if the index is 3 then reset to 0 and repeat 
        x = 0;
        y++;
        
      }
    }     
  }

 if (count === 27) { // 9 + 9 + 9 meaning all the rows were 1-9 no repeats 
   return true; // return true if grid meets all requirements
 } else {
   return false; 
 }

}
console.log(SudokuChecker(puzzle));