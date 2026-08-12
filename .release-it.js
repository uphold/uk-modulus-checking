module.exports = {
  git: {
    changelog: 'echo "## Changelog\\n\\n$(npx @uphold/github-changelog-generator -f unreleased | tail -n +4 -f)"',
    commitMessage: 'Release ${version}',
    requireBranch: 'master',
    requireCleanWorkingDir: false,
    requireCommits: true,
    tagName: 'v${version}'
  },
  github: {
    release: true,
    releaseName: 'v${version}'
  },
  hooks: {
    'after:bump': [
      'yarn transpile',
      'echo "$(npx @uphold/github-changelog-generator -f v${version})\n$(tail -n +2 CHANGELOG.md)" > CHANGELOG.md',
      'git add CHANGELOG.md dist --all'
    ]
  },
  npm: {
    publish: true,
    skipChecks: true
  }
};
