var assert = require('assert')
var Units = require('../')

describe('convert', function () {
  it('should work for big unit to small unit', function () {
    assert.equal(Units.convert('1', '420coin', 'marley'), '1000000000000000000')
    assert.equal(Units.convert('20', 'gmarley', 'marley'), '20000000000')
    assert.equal(Units.convert('20.05', 'gmarley', 'marley'), '20050000000')
    assert.equal(Units.convert('20.005', 'kmarley', 'marley'), '20005')
    assert.equal(Units.convert('20.0005', 'kmarley', 'marley'), '20000')
    assert.equal(Units.convert('1', 't420coin', '420coin'), '1000000000000')
    assert.equal(Units.convert('1', 't420coin', 'marley'), '1000000000000000000000000000000')
  })
  it('should work for small unit to big unit', function () {
    assert.equal(Units.convert('1', 'marley', '420coin'), '0.000000000000000001')
    assert.equal(Units.convert('0.5', 'marley', '420coin'), '0')
    assert.equal(Units.convert('0.0005', 'kmarley', '420coin'), '0')
    assert.equal(Units.convert('1', 'finney', '420coin'), '0.001')
    assert.equal(Units.convert('20', 'gmarley', '420coin'), '0.00000002')
    assert.equal(Units.convert('1', '420coin', 't420coin'), '0.000000000001')
    // XXX: precision loss
    assert.equal(Units.convert('1', 'marley', 't420coin'), '0')
  })
  it('should fail on invalid input units', function () {
    assert.throws(function () {
      Units.convert('1', 'random', 'marley')
    }, /^Error: Unsupported input unit$/)
  })
  it('should fail on invalid output units', function () {
    assert.throws(function () {
      Units.convert('1', 'marley', 'random')
    }, /^Error: Unsupported output unit$/)
  })
  it('should fail on non-decimal input', function () {
    assert.throws(function () {
      Units.convert('1,00', 'marley', 'random')
    }, /^Error: Unsupported value$/)

    assert.throws(function () {
      Units.convert('test', 'marley', 'random')
    }, /^Error: Unsupported value$/)
  })
})

describe('lazyConvert', function () {
  it('should work for big unit to small unit', function () {
    assert.equal(Units.lazyConvert('1 eth', 'marley'), '1000000000000000000 marley')
    assert.equal(Units.lazyConvert('20 gmarley', 'marley'), '20000000000 marley')
  })
  it('should work for small unit to big unit', function () {
    assert.equal(Units.lazyConvert('1 marley', 'eth'), '0.000000000000000001 eth')
    assert.equal(Units.lazyConvert('1 finney', 'eth'), '0.001 eth')
    assert.equal(Units.lazyConvert('20 gmarley', 'eth'), '0.00000002 eth')
  })
  it('should fail on invalid input', function () {
    assert.throws(function () {
      Units.lazyConvert('1')
    }, /^Error: Invalid input$/)

    assert.throws(function () {
      Units.lazyConvert('1 eth marley')
    }, /^Error: Invalid input$/)
  })
  it('should fail on non-decimal input', function () {
    assert.throws(function () {
      Units.convert('1,00', 'marley', 'random')
    }, /^Error: Unsupported value$/)

    assert.throws(function () {
      Units.convert('test', 'marley', 'random')
    }, /^Error: Unsupported value$/)
  })
})

describe('units export', function () {
  it('should be available', function () {
    assert.equal(typeof Units.units, 'object')
  })
  it('should contain strings', function () {
    assert.equal(typeof Units.units['marley'], 'string')
  })
})
