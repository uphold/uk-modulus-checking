# uk-modulus-checking
Modulus checking allows payment originators to confirm that customer codes and account numbers are compatible before submitting a Bacs Direct Credit of Direct Debit.

## Status
[![npm version][npm-image]][npm-url] [![build status][ci-image]][ci-url]

## Installation
Install the package via `npm`:

```sh
npm install uk-modulus-checking --save
```

## Usage

### `new UkModulusChecking({ accountNumber, sortCode }).isValid()`

This method validates if the given accountNumber and sortCode represent a valid `Faster Payment Account`.

#### Arguments

1. `accountNumber` *(string)*: The account number to validate.
2. `sortCode` *(string)*: The sort code to validate.

#### Returns
*(boolean)*:  Returns `true` if the account is valid.

#### Example
```js
new UkModulusChecking({ accountNumber: '15764273', sortCode: '938063' }).isValid();
// => false

new UkModulusChecking({ accountNumber: '66374958', sortCode: '089999' }).isValid();
// => true

new UkModulusChecking({ accountNumber: '66374958', sortCode: '08-99-99' }).isValid();
// => true

new UkModulusChecking({ accountNumber: '66374958', sortCode: '08-9999' }).isValid();
// => true
```

## Tests

```sh
npm test
```

## Release

Releases are automated. Trigger the [Release](https://github.com/uphold/uk-modulus-checking/actions/workflows/release.yaml) workflow on `master` and pick the version bump (`major`, `minor` or `patch`).

The workflow bumps the version, rebuilds `dist`, updates the `CHANGELOG.md`, commits and tags the release, publishes to npm and creates the GitHub release.

## License
MIT

## Credits
Many thanks to [bazerk/uk-modulus-checking](https://github.com/bazerk/uk-modulus-checking) for the original inspiration.

[npm-image]: https://img.shields.io/npm/v/uk-modulus-checking.svg?style=flat-square
[npm-url]: https://npmjs.org/package/uk-modulus-checking
[ci-image]: https://img.shields.io/github/actions/workflow/status/uphold/uk-modulus-checking/tests.yaml?branch=master&style=flat-square
[ci-url]: https://github.com/uphold/uk-modulus-checking/actions/workflows/tests.yaml
