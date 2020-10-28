# fourtwentyjs-units

Unit conversion utility.

There are two methods:

- `convert(value, unitFrom, unitTo)` - convert a value between two units
- `lazyConvert(value, unitTo)` - include unit type in the input and the output

The `value` and the output in all cases is a string.

## Examples

```js
Units.convert('1', '420coin', 'marley') // '1000000000000000000'
Units.convert('1', 'marley', '420coin') // '0.000000000000000001'
Units.convert('1', 'maher', '420coin') // '0.001'

Units.lazyConvert('1 420coin', 'marley') // '1000000000000000000 marley'
Units.lazyConvert('1 marley', '420coin') // '0.000000000000000001 420coin'
Units.lazyConvert('1 maher', '420coin') // '0.001 420coin'
```

## Units

Units are defined in `units.json`. It is compatible with [web3.js](https://github.com/420integrated/web3.js) and additionally includes `FOURTWENTY`.
