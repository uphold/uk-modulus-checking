# uk-modulus-checking
UK modulus checking.

## Status
[![build status][travis-image]][travis-url]

## Usage

### `new UkModulusChecking(sortCode, accountNumber).isValid()`

This method validates if the given sortCode and accountNumber represent a valid `Faster Payment Account`.

#### Arguments

1. `sortCode` *(&#42;)*: The sorting code to validate.
2. `accountNumber` *(&#42;)*: The account number to validate.

#### Returns
*(boolean)*:  Returns `true` if the account is valid.

#### Example
```js
new UkModulusChecking('938063', '15764273').isValid();
// => false

new UkModulusChecking('089999', '66374958').isValid();
// => true

new UkModulusChecking('08-99-99', '66374958').isValid();
// => true

new UkModulusChecking('08-9999', '66374958').isValid();
// => true

```* * *

## Tests

```sh
npm test
```

## Release

```sh
npm version [<newversion> | major | minor | patch] -m "Release %s"
```

## License
MIT

## Credits

Many thanks to [bazerk/uk-modulus-checking](https://github.com/bazerk/uk-modulus-checking) for the original inspiration.

[travis-image]: https://img.shields.io/travis/uphold/vocalink.svg?style=flat-square
[travis-url]: https://img.shields.io/travis/uphold/vocalink.svg?style=flat-square
