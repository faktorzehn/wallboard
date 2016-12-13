# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [ConVista Faktor Zehn GmbH](http://www.faktorzehn.at/).

## [unreleased]
### Fixed
- fixed link to sonar user issues
### Added
- added new filter for maven artifact names

## [1.1.2] - 2016-12-13
### Added
- added navigation to specific project via url
  i.e. /0 is the first project, /1 is the second project, ...
- Added configuration for sonar metric trend calculation
### Fixed
- trend calculation and icon colors for sonar metrics

## [1.1.1] - 2016-12-10
### Added
- new widget for jira issues due dates
- new widget for user specific text
- column title and description
- added example configuration config-example.json
### Changed
- removed params onecolor for jira.issue widget
- renamed param colorthreshold for jira.issue widget to threshold
- changed project structure for widgets and directives for better 
organization.
- changed widget names for better organization

## [1.1.0] - 2016-10-24
### Added
- new widget for sonarqube quality gates
- custom.css for style customizations

## [1.0.0] - 2016-08-19
### Added
- Menu autohide after 5 seconds of user inactivity
- Show menu when mouse is moved
### Changed
- Autorefresh is disabled by default
