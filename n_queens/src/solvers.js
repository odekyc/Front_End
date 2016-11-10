/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// Hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space.)
// Take a look at solversSpec.js to see what the tests are expecting




// Return the number of nxn chessboards that exist, with n rooks placed such that none
// of them can attack each other.
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var recurse = function(board, currentRow, n) {
    //base case if currentRow equals n
      //increment solutionCount
      //return
    //recursive case - loop through each row and column
      //place a piece
      //check for conflict
          //if no conflict recurse on NEXT row
      //remove piece 
    if(currentRow === n) {
      solutionCount++;
      return;
    }
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.setPiece(currentRow, colIndex,1);
      if(!board.hasAnyRooksConflicts()) {
        recurse(board, currentRow + 1, n);
      }
      board.setPiece(currentRow, colIndex, 0);
    }

  };
  recurse(board, 0, n);
  return solutionCount;
  // var solutionCount = 0;
  // var board = new Board({n:n});
  // var rowTrying=0;
  // var colTrying=0;

  // var recurse = function(board, rowStart, colStart, testRow, testCol, rooksPlaced) {
  //   if(rooksPlaced===n){
  //     solutionCount++;
  //     if(testRow===n-1){
  //       return;
  //     }
  //     else if((testRow<n-1)&&(testCol===n-1))
  //     {
  //       colTrying=0;
  //       rowTrying++;
  //       var newboard= new Board({n:n});
  //       board=newboard;
  //       recurse(board,0,0,rowTrying,colTrying,0);

  //     }
  //     else if((rowTrying<n-1)&&(colTrying<n-1)){
        
  //       var newboard= new Board({n:n});
  //       board=newboard;

  //       recurse(board,0,0,rowTrying,colTrying,0);

  //     }
  //   }

  //   if(board.getPiece(testRow,testCol)===0){
  //     console.log("see if we get here");
  //     board.setPiece(testRow,testCol);
  //     rooksPlaced++;
  //   }
  //   else{
  //   for(var i=rowStart; i<n; i++){
  //     for(var x=colStart; x<n; x++){
  //       if(i===testRow){
  //         recurse(board, i+1, 0, rowTrying, colTrying,rooksPlaced );
  //       }
  //       else if(i!==testRow){
  //         board.setPiece(i,j,1);
  //         if(board.hasAnyRooksConflicts()===false){
  //           rooksPlaced++;
  //           recurse(board, i+1,0,rowTrying,colTrying,rooksPlaced);
  //         }
          
  //           board.setPiece(i,j,0);
          
  //       }
  //     }
  //   }
    
  //   }

  // };
  // recurse(board, 0,0,rowTrying,colTrying,0);
  // return solutionCount;

};


// Return the number of nxn chessboards that exist, with n queens placed such that none
// of them can attack each other.
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var recurse = function(board, currentRow, n) {
    //base case if currentRow equals n
      //increment solutionCount
      //return
    //recursive case - loop through each row and column
      //place a piece
      //check for conflict
          //if no conflict recurse on NEXT row
      //remove piece 
    if(currentRow === n) {
      solutionCount++;
      return;
    }
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.setPiece(currentRow, colIndex,1);
      if(!board.hasAnyQueensConflicts()) {
        recurse(board, currentRow + 1, n);
      }
      board.setPiece(currentRow, colIndex, 0);
    }

  };
  recurse(board, 0, n);
  return solutionCount;
};


// Return a matrix (an array of arrays) representing a single nxn chessboard,
// with n rooks placed such that none of them can attack each other.
// (If no solution, return an empty matrix.)
window.findNRooksSolution = function(n) {
  
  var solution;

  var boardFinder = function(){
    this.countNRooksSolutions(n);
    solution = board;
  }

 console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  // return solution;
};


// Return a matrix (an array of arrays) representing a single nxn chessboard,
// with n queens placed such that none of them can attack each other.
// (If no solution, return an empty matrix.)
window.findNQueensSolution = function(n) {
  var solution;
  var board= new Board({n: n });
   
  var row=0;

 
  var recurse=function(row){

    if(row===n){
      solution=board.allRowsCopy();
      return;
    }
   for(var i = row; i < n; i++) {
       for(var j = 0; j < n; j++) {
          board.setPiece(i,j,1);
          if(board.hasAnyQueensConflicts()===false){
            row++;
            console.log(board);
            recurse(row);
          }
          else{
            board.setPiece(i,j,0);
          }
        }
      
    }
};
 recurse(row);



 if(solution===undefined){
  var newboard=new Board({n:n});
  solution=newboard.allRowsCopy();
 }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
