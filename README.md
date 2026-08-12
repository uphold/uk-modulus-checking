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

## Release process

Releasing is a two-step process.

### 1. Open the release Pull Request

Run `release-it` on a `release/*` branch. This bumps the version, rebuilds `dist`, updates the `CHANGELOG.md`, and commits and pushes the branch. It does *not* tag, publish or create a GitHub release.

A `GITHUB_TOKEN` is required, as the changelog is generated from the merged Pull Requests:

```sh
git checkout master && git pull
git checkout -b release/next
GITHUB_TOKEN=$(gh auth token) npm run release -- --increment patch
```

Then open a Pull Request for that branch and get it merged.

### 2. Tag the release commit

Once merged, create and push a tag for the release commit. Deriving the tag from `package.json` keeps it in sync with the version that will be published:

```sh
git checkout master && git pull
VERSION="v$(node -p "require('./package.json').version")"
git tag "$VERSION" && git push origin "$VERSION"
```

Upon pushing this tag, the [release](https://github.com/uphold/uk-modulus-checking/actions/workflows/release.yaml) workflow will generate the GitHub release and publish the package to NPM. It can also be triggered manually with a specific tag via manual dispatch.

The workflow is idempotent: it skips the GitHub release or the NPM publish if either already exists for that version.

## License
MIT

## Credits
Many thanks to [bazerk/uk-modulus-checking](https://github.com/bazerk/uk-modulus-checking) for the original inspiration.

[npm-image]: https://img.shields.io/npm/v/uk-modulus-checking.svg?style=flat-square
[npm-url]: https://npmjs.org/package/uk-modulus-checking
[ci-image]: https://img.shields.io/github/actions/workflow/status/uphold/uk-modulus-checking/tests.yaml?branch=master&style=flat-square
[ci-url]: https://github.com/uphold/uk-modulus-checking/actions/workflows/tests.yaml
