
describe('Solvers', function() {
  window.displayBoard = function() {};

  describe('countNRooksSolutions()', function() {
    _.range(1, 8).map(function(n) {
      it('finds the number of valid solutions for n=' + n, function() {
        var solutionCount = countNRooksSolutions(n);
        var expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n];
        expect(solutionCount).to.be.equal(expectedSolutionCount);
        if (window !== undefined) {
          window.scrollTo(0,document.body.scrollHeight);
        }
      });
    });
    it('done.', function() { });
  });

  describe('countNQueensSolutions()', function() {
    _.range(0, 9).map(function(n) {
      it('finds the number of valid solutions for n=' + n, function() {
        var solutionCount = countNQueensSolutions(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92][n];
        expect(solutionCount).to.be.equal(expectedSolutionCount);
        if (window !== undefined) {
          window.scrollTo(0,document.body.scrollHeight);
        }
      });
    });
    it('done.', function() { });
  });

  describe('findNRooksSolution()', function() {

    _.range(1, 8).map(function(n) { 
      it('finds a valid solution for n=' + n, function() {
        var solutionBoard = new Board(findNRooksSolution(n));
        var numPieces = _.reduce(solutionBoard.allRowsCopy(), function(memo, row) {
          return memo + _.reduce(row, function(memo, col) {
            return memo + col;
          }, 0);
        }, 0);

        expect(solutionBoard.get('n')).to.equal(n);
        expect(numPieces).to.equal(n);
        expect(solutionBoard.hasAnyRooksConflicts()).to.be.equal(false);
        if (window !== undefined) {
          window.scrollTo(0,document.body.scrollHeight);
        }
      });
    });
    it('done.', function() { });
  });

  describe('findNQueensSolution()', function() {

    [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(n) {
      var noSolution = ((n === 2) || (n === 3));
      it('finds ' + (noSolution ? 'no' : 'a valid') + ' solution for n=' + n, function() {

        var solutionBoard = new Board(findNQueensSolution(n));
        var numPieces = _.reduce(solutionBoard.allRowsCopy(), function(memo, row) {
          return memo + _.reduce(row, function(memo, col) {
            return memo + col;
          }, 0);
        }, 0);

        expect(solutionBoard.get('n')).to.equal(n);
        // Check 2 and 3 for no solution
        if (noSolution) {
          expect(numPieces).to.equal(0);          
        } else {
          expect(numPieces).to.equal(n);
          expect(solutionBoard.hasAnyQueensConflicts()).to.be.equal(false);
        }
        if (window !== undefined) {
          window.scrollTo(0,document.body.scrollHeight);
        }
      });
    });
    it('done.', function() { });
  });
});

