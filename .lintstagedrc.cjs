"use strict"

module.exports = {
  "*.js": ["pnpm prettier --write", "pnpm eslint"],
  "*.{json,md,ts,yaml,yml}": ["pnpm prettier --write"],
  "package.json": ["sort-package-json", "pnpm prettier --write"]
}
