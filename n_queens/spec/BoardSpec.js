describe("Board", function() {

  var capitalize = function(word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  var verifyConflictTypes = function(expectedConflicts, matrix){
    // The Board() constructor will accept a matrix and build that into a (Backbone) Board object (as defined in Board.js)
    var board = new Board(matrix);
    _.map('row col rooks majorDiagonal minorDiagonal queens'.split(' '), function(conflictType){
      var conflictDetected = board['hasAny' + capitalize(conflictType) + 'Conflicts']();
      var conflictExpected = _(expectedConflicts).contains(conflictType);
      var message = conflictExpected ? 'should' : 'should not';

      it(message + " find a " + conflictType + " conflict", function() {
        expect(conflictDetected).to.be.equal(conflictExpected);
        if (window !== undefined) {
          window.scrollTo(0,document.body.scrollHeight);
        }
      });
    });
  };

  describe('Empty Boards', function() {
    describe("3x3", function() {
      verifyConflictTypes([''], [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]);
    });
    describe("4x4", function() {
      verifyConflictTypes([''], [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);
    });
  });

  describe('Row Conflicts', function() {
    describe("3x3 Top", function() {
      verifyConflictTypes(['row', 'rooks', 'queens'], [
        [1, 0, 1],
        [0, 0, 0],
        [0, 0, 0]
      ]);    
    });  
    describe("4x4 Bottom", function() {
      verifyConflictTypes(['row', 'rooks', 'queens'], [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 1]
      ]);
    });
  }); 

  describe('Column Conflicts', function() {
    describe("3x3 Left", function() {
      verifyConflictTypes(['col', 'rooks', 'queens'], [
        [1, 0, 0],
        [0, 0, 0],
        [1, 0, 0]
      ]);
    });    
    describe("4x4 Right", function() {
      verifyConflictTypes(['col', 'rooks', 'queens'], [
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
      ]);
    });
  });

  describe('Major Diagonal Conflicts', function() {
    describe("4x4 Lower-Left", function() {
      verifyConflictTypes(['majorDiagonal', 'queens'], [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 1, 0, 0]
      ]);
    });
    describe("3x3 Upper-Right", function() {
      verifyConflictTypes(['majorDiagonal', 'queens'], [
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0]
      ]);
    });
    describe("4x4 Corners", function() {
      verifyConflictTypes(['majorDiagonal', 'queens'], [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
      ]);
    });
  });

  describe('Minor Diagonal Conflicts', function() {
    describe("4x4 Lower-Right", function() {
      verifyConflictTypes(['minorDiagonal', 'queens'], [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 0]
      ]);
    });
    describe("3x3 Upper-Left", function() {
      verifyConflictTypes(['minorDiagonal', 'queens'], [
        [0, 1, 0],
        [1, 0, 0],
        [0, 0, 0]
      ]);
    });
    describe("4x4 Corners", function() {
      verifyConflictTypes(['minorDiagonal', 'queens'], [
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 0]
      ]);
    });
  });

});
