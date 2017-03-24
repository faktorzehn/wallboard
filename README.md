# Wallboard

Wallboard is a tool that helps developers to keep track of important metrics on their projects.

## Motivation

* Many different tools in the build process of a software project (i.e. Jenkins, JIRA, SonarQube)
* Every tool has it's very own Dashboard/Wallboard
* Developer needs to monitor them all
* Wallboard integrates all this systems into one place of truth

## Installation

Once you have built a release version or a patch you can copy it to your webserver and run the wallboard.

## Contributors

### Building Your Copy of Wallboard

#### Prerequisites

* You have `node` installed at v4.2.3+ and `npm` at v3.5.1+.
* You are familiar with `npm` and know whether or not you need to use `sudo` when installing packages globally.
* You are familiar with `git`.

#### Build

Once you have the repository cloned, building a copy of the Wallboard is really easy.

```sh
# grunt-cli is needed by grunt; you might have this installed already
npm install -g grunt-cli
npm install
bower update
grunt build
```

At this point, you should now have a `archive/` directory containing a zip file for your built version of Wallboard.

#### Release / Patch

* Update the README.ME
* Build the release/patch

```sh
# patch (3.5.2 -> 3.5.3)
grunt patch
# minor release (3.5.2 -> 3.6.0)
grunt release-minor
# major release (3.5.2 -> 4.0.0)
grunt release-major
```
* Update the Wiki on Github

## License

Wallboard is under the [GPLv3](./LICENSE)
