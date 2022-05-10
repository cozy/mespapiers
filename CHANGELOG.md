# 0.4.0

## 📦 Library updates

* Multiple choice to Contact [0.10.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.10.0), [0.11.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.11.0)
* Filter by theme on Home [0.12.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.12.0)
* Mask for inputs [0.13.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.13.0)
* Search input on Home [0.14.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.14.0)
* Synchronize the versions of cozy packages [0.15.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib@0.15.0)
* Add a mask for the ID card number field [0.16.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib@0.16.0), [0.16.1](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib@0.16.1)
* Always Display the maskPlaceholder [0.17.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib@0.17.0)
* Add the documentation for papersDefinitions configuration file [0.18.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib@0.18.0)
* Align text value in inputMask [0.19.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib@0.19.0)
* Upgrade cozy-ui to 67.0.0 [0.21.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.21.0)

## ✨ Features

* Update cozy packages and cozy-mespapiers-lib to 0.21.0

## 🐛 Bug Fixes

## 🔧 Tech

* Remove packages already in cozy-mespapiers-lib dependencies

# 0.3.0

## ✨ Features

* Update cozy-mespapiers-lib to 0.9.0
* Update cozy-ui to 65.0.1
* Update cozy-client to 28.2.1
* Update cozy-device-helper to 1.18.0
* Update cozy-harvest-lib to 8.4.2
* Update cozy-sharing to 4.1.6
* Add cozy-flags to 2.8.7 (required by cozy-client >28)

## 🐛 Bug Fixes

## 🔧 Tech

* Change bundlemon configuration
* Add permission to create and modify contacts

# 0.2.0

## ✨ Features

* Add 2 routes with their views for creation of a paper
* Use cozy-mespapiers-lib 🔥

## 🐛 Bug Fixes

* Fixed the display of the Stepper on the header of the paper creation modal (Desktop version)
* The Enter key correctly passes the Informations and Contact steps (Desktop version)
* Rename vehicle registration illustration

## 🔧 Tech

* Add bundlemon (used with `yarn build && yarn bundlemon`)

# 0.1.0-beta.9

## ✨ Features

* Added the FilePicker component
* Added several Papers available for creation & "Activities" theme
* Redirection to Home after deleting the last Paper of a category
* Add Beta icon

## 🐛 Bug Fixes

## 🔧 Tech

* Improved Paper name generation
* Improved text field constraint
* Multiple fixes and optimizations


# 0.1.0-beta.8

## ✨ Features

* Added the possibility to choose a contact other than yourself as the owner of the file.
Today limited to a single choice, but thought for a future need.
* Removed suggestion header if empty
* Displayed thumbnail on Paper category list
* Papers list display all papers filtered by contacts
* Added a `See more` button on Paper list
* Added the `open` action in the paper menu
* Added multiple papers available for creation

## 🐛 Bug Fixes

* Displayed the contact list on Safari
* A created document displays well its thumbnail
* Fix process of Paper creation on Desktop view
* Position of Spinner on Paper list
* Incorrect date value (If a date is selected or entered manually and then deleted)

## 🔧 Tech

* Added filenameModel & labelGivenByUser attributes for manage paper name when created
* Added possibility to add required constraint on Inputs
* Various optimizations


# 0.1.0-beta.7

## ✨ Features

* Added thumbnail
* Added konnector link on all tax choices
* Categories list sorted by name

## 🐛 Bug Fixes

## 🔧 Tech

* Added cozy-flags for manage configuration
* Refactor metadata (The attributes that are not qualification attributes should be removed
from the `qualification:` object, but remain in the `metadata`)
* Added PapersDefinitionsProvider
* Using cozy-client instead cozy-scanner
* Remove cozy-scanner


# 0.1.0-beta.6

## ✨ Features

* Update ID card illustration
* Added onboarding page @Ldoppea
* Added option in the menu dropdown

## 🐛 Bug Fixes

* Fixed sharing link generated when using the transfer button
* Fixed filename displayed in papers list

## 🔧 Tech

* Added SW for manage PWA updates


# 0.1.0-beta.5

## ✨ Features

* Remove Cozy sharing button in Viewer
* Sorted papers by creation date, from most recent to oldest
* Deactivation of the send button if the input constraints are not valid
* Added some illustrations
* Added redirection to Store for Energy & ISP category
* Added news papersDefinitions
* Added "View in Drive" & "Forward" in action menu
* Convert images to PDF before upload and merge files into a single PDF file on multi-page scenario by @Ldoppea
* Display `New Paper` dialog using `List` instead of `Grid` by @Ldoppea
* Added input date to invoice
* Added 2 inputs for permit paper

## 🐛 Bug Fixes

* On the list of papers, clicking on the right icon has the same effect as clicking on the line
* The Fab menu appears on the file list
* Fixed a limitation issue in the number of fetched files by @Crash--
* Constraints on number type fields
* ...

## 🔧 Tech

* Added missing permissions
* Action menu refactored
* Changed load Css order @Crash--


# 0.1.0-beta.4

## ✨ Features

* Added option menu for the files (actions not working)

## 🐛 Bug Fixes

## 🔧 Tech


# 0.1.0-beta.3

## ✨ Features

* Add a button to generate documents and simulate the selection of its own contact


# 0.1.0-beta.2

## ✨ Features

* Changed name of the folder created in Drive for saving Papers
* Added name of the category in the cozy bar once in it

## 🐛 Bug Fixes

* Fixed a problem that made it possible to save the same paper several times, by clicking several times

## 🔧 Tech


# 0.1.0-beta.1

## ✨ Features

* Initialization of the first beta

## What's Changed
**Full Changelog**: https://github.com/cozy/mespapiers/commits/0.1.0-beta.1
