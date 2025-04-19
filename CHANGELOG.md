# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-  `init` command now accepts command-line flags (`-t`, `-a`, `-l`, `-f`) to specify project type, architecture, language, and framework directly, bypassing interactive prompts.
-  Validation for flag combinations provided to the `init` command to ensure compatibility with available templates.
-  `init` command now accepts an optional `[name]` argument to specify the project name directly.
-  `check-update` command to manually check for available updates to the Eve CLI.

### Changed

-  Removed automatic update check on CLI startup. Update checks are now performed manually using the `check-update` command or during the `upgrade` process.

### Fixed

-  N/A

## [0.4.0] - YYYY-MM-DD

### Added

-  Initial release features (list previous features if known).

<!-- Add previous versions below -->
