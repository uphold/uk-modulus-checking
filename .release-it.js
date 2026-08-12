/** @type {import('release-it').Config} */
module.exports = {
  git: {
    changelog: 'echo "## Changelog\n\n$(npx @uphold/github-changelog-generator -f unreleased | tail -n +4 -f)"',
    commitMessage: 'Release ${version}',
    requireBranch: ['master', 'release/*'],
    requireCleanWorkingDir: false,
    requireCommits: true,
    // Allows pushing a fresh `release/*` branch that has no upstream yet.
    requireUpstream: false,
    tag: false,
    tagName: 'v${version}'
  },
  github: {
    release: false,
    releaseName: 'v${version}'
  },
  hooks: {
    'after:bump': [
      'npm run transpile',
      'echo "$(npx @uphold/github-changelog-generator -f v${version})\n$(tail -n +2 CHANGELOG.md)" > CHANGELOG.md',
      'git add CHANGELOG.md dist --all'
    ],
    'before:init': 'test -n "$GITHUB_TOKEN" || (echo "GITHUB_TOKEN is not set" >&2; exit 1)'
  },
  npm: {
    publish: false,
    skipChecks: true
  }
};
