# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [ConVista Faktor Zehn GmbH](http://www.faktorzehn.at/).

## [unreleased]
### Fixed
- sonar.newissues: fixed calculation of short artifact name

## [1.1.10]
### Added
- projects: added progressbar for builds

## [1.1.9]
### Fixed
- jenkins.job: added job state ABORTED
### Changed
- sonar.issues and sonar.newissues: neutral color for empty widgets
- version up
- projects: show culprits on mouseover

## [1.1.8] - 2017-05-18
### Fixed
- jenkins job widget for running jobs
- minor fixes in sonar.newissues and sonar.issues widgets

## [1.1.7] - 2017-05-11
### Added
- new widget for project information. Actually it is a combination of jenkins and sonarqube informations and can me configured

## [1.1.6] - 2017-05-10
### Removed
- sonar.metric: unit and reverse properties are removed because they are now loaded from Sonar directly
- sonar.metric: Analyse Build Url was removed and replaced by a direct link to the appropriate domain

## [1.1.5] - 2017-03-24
### Fixed
- bug in sonar widgets after api changes

## [1.1.4] - 2017-03-24
### Fixed
- changes in web api with SonarQube 6.3
### Removed
- removed metricIndex configuration for sonar.metric widget

## [1.1.3]
### Fixed
- fixed link to sonar user issues
### Changed
- project navigation i.e. /project/2 to switch to the second project
### Added
- added new filter for maven artifact names
- added tooltip for sonar new issues artifact names
- more visible information on failed build in jeknins.testreport widget

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
