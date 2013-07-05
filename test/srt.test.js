var fs = require('fs');
var path = require('path');
var srt = require('..').srt;
require('should');

describe('srt', function() {
  it('parse', function() {
    var data = fs.readFileSync(path.join(__dirname, './fixtures/parse.srt')).toString();
    var expected = require(path.join(__dirname, './fixtures/parse.json'));
    srt.parse(data).should.eql(expected);
  });

  it('stringify', function() {
    var data = require(path.join(__dirname, './fixtures/stringify.json'));
    var expected = fs.readFileSync(path.join(__dirname, './fixtures/stringify.srt')).toString();
    srt.stringify(data).should.equal(expected);
  });
});