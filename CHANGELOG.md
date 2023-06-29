# 3.0.2O

# 3.0.1

### ✨ Features

* replace appname Mes papiers by Mes Papiers
* Update `cozy-ui` from `85.3.1` to `86.3.0`
* Update `cozy-client` from `38.4.0` to `38.7.0`
* Update cozy-mespapiers-lib from `46.3.0` to `50.0.2`
  * Add tooltip property to scan step
  * Update ScanDesktopActionsAlert wording
  * Add some health papers definitions ([b449f6f](https://github.com/cozy/cozy-libs/commit/b449f6f0b3cee6ebdd0f62a59f0988e72286be7f))
  * Remove mespapiers.migrated.metadata flag ([c815522](https://github.com/cozy/cozy-libs/commit/c815522f6a7b7c2c5c66ef718b5c68c56ed0a320))
  * Use a11y menu on home actions ([16052a7](https://github.com/cozy/cozy-libs/commit/16052a7a984fefd94adc8acea26df92ea7710179))
  * Use a11y menu on PaperLine ([243cd93](https://github.com/cozy/cozy-libs/commit/243cd934773e38194406d4f5d8d062c1b302f4c5))
  * Add other option to contract types ([fca1343](https://github.com/cozy/cozy-libs/commit/fca1343c20349874e89fff49f49815e9b77eeefb))
  * Radio step is not mandatory ([ae348df](https://github.com/cozy/cozy-libs/commit/ae348df8efe25bf8a79d2864fd13f06f78eacd64))
  * Add mespapiers.aa-suggestion.disabled flag ([e1342c9](https://github.com/cozy/cozy-libs/commit/e1342c9ce27d86304d312b1ab306b0133a269074))
  * Add PapersPaywall ([4b6fe3a](https://github.com/cozy/cozy-libs/commit/4b6fe3a597fbce6be7f357ce4c3dd359f9bd6a35))
  * Add tooltip property to scan step
  * Update ScanDesktopActionsAlert wording
  * Add expiration date and delay on stranger driver license.
  * Refactor of Steppers Dialog to use Cozy Dialog instead.
  * Change Passport & driver license illustrations
  * Improved `CompositeHeaderImage` component ([5c2f7d2](https://github.com/cozy/cozy-libs/commit/5c2f7d2518b74241d4f515c4a2825c967168ee8d))
  * Improve UX on `ScanResult` ([75ded76](https://github.com/cozy/cozy-libs/commit/75ded765f2170116809376600a40cadaacef394e))
  * Add `useRotateImage` hook ([7199108](https://github.com/cozy/cozy-libs/commit/7199108dbf94688f02bebbd999c95d2d9f036fe9))
  * Add `ScanResultInfo` component ([392e02b](https://github.com/cozy/cozy-libs/commit/392e02b1a99c64c8da10f7de3b8a62a033688614))
  * Add `RotateImage` component ([4d8994c](https://github.com/cozy/cozy-libs/commit/4d8994c0b29d4098cafe35c3bdae6dc30003da31))
  * Add `makeRotatedImage` helper ([93afdea](https://github.com/cozy/cozy-libs/commit/93afdeaf13c8ce2cce80af8835ca673be24c73d4))
  * Add `ScanResultTitle` component ([50b9ed4](https://github.com/cozy/cozy-libs/commit/50b9ed4dc7800f1639b84b215906f0a640dac260))
  * Add `InstallAppModal` component ([9c3bff3](https://github.com/cozy/cozy-libs/commit/9c3bff3894a5fce53f79386b5613c1576a619b3b))
  * Add `ScanDesktopActionsAlert` component ([bda780c](https://github.com/cozy/cozy-libs/commit/bda780cd1a7f830d36240f60232fab2ea8fbb7c1))
  * QRCode accessibility ([67e3383](https://github.com/cozy/cozy-libs/commit/67e3383fe93c9f5c1c7ff0013e056c092b3777ca))
  * Replace SearchInput by SearchBar from cozy-ui ([f03271e](https://github.com/cozy/cozy-libs/commit/f03271ec21c1f5a91fae90064bb167d6018f0c7e))

### 🐛 Bug Fixes

* cozy-mespapiers-lib:
  * Flattened image on some browsers ([76eb3d4](https://github.com/cozy/cozy-libs/commit/76eb3d419ff248e0e9e405f00b01151c0c1c5c56))
  * Wording of EmptyWithHeader ([4bc8845](https://github.com/cozy/cozy-libs/commit/4bc88455306931c1f233e573fed3d063bd9c40d2))
  * The cozyMetadata property does not always exist ([43141dc](https://github.com/cozy/cozy-libs/commit/43141dc171e3397c2e9fe548a5ef89c63233b65a))
  * Display a fileless account with other files ([8ca8e12](https://github.com/cozy/cozy-libs/commit/8ca8e1206e846644340461efd52fc92d583557d7))
  * Clicking on listItem should check the radio button ([900afb4](https://github.com/cozy/cozy-libs/commit/900afb4aa94f99da5974c184b21917d799b70ec1))
  * CreatePaper and createPaperByTheme wasn't spreading ref ([19e0148](https://github.com/cozy/cozy-libs/commit/19e01489f453b34bbe835d3cc535bc53ad894a86))
  * Illustration of national health insurance card ([e9ac821](https://github.com/cozy/cozy-libs/commit/e9ac8218c417edad6f6e757728366bf528b45401))
  * Step modal with Radio buttons ([8614483](https://github.com/cozy/cozy-libs/commit/86144834118c6f4f2400d4d0a6efe9c566bec644))
  * Flashing of the title when arriving on the list of a type of paper ([62de99c](https://github.com/cozy/cozy-libs/commit/62de99cbd7e6fb0ca89fde637f13da693c67e53f))
  * The back button hover area is oval instead of round ([35d6f4d](https://github.com/cozy/cozy-libs/commit/35d6f4d096bcc75ddf60168b29ae537df98a631b))
  * Create paper modal scroll from body on Desktop ([bcb75c7](https://github.com/cozy/cozy-libs/commit/bcb75c7403220a9ef7e21de2bce34c1a131a225c))
  * Search result wasn't using correct datas ([6258887](https://github.com/cozy/cozy-libs/commit/625888732f008dcc3f7fdeb6305efad120f4c554))

### 🔧 Tech

* cozy-mespapiers-lib:
  * Normalize File usage instead Blob ([ec24675](https://github.com/cozy/cozy-libs/commit/ec246755ae41f0aaab0f1edeac82230343b4913b))

# 2.2.0

### ✨ Features

* Remove `mespapiers.v2-1-0.enabled` flag
* Add help button behind flag
* Update cozy-mespapiers-lib from 39.0.1 to ^44.0.0:
  * Updated the following packages:
    * `cozy-client >= 38.2.1`
    * `cozy-doctypes >= 1.88.6`
    * `cozy-harvest-lib >= 13.17.1`
    * `cozy-intent >= 2.11.1`
    * `cozy-logger >= 1.10.1`
    * `cozy-sharing >= 7.1.3`
  * Removed the following flags:
    * `mespapiers.flexsearch.enabled`
    * `mespapiers.fabExtended.enabled`
    * `mespapiers.v2-1-0.enabled`
  * ✨ Add more permissive encoder for flexsearch
  * ✨ Add translate caf file number in search indexes
  * 🐛 Harvest banner wasn't shown for disconnected account
  * Replace ellipsis by midellipsis for document name
  * Remove ellipsis on text when no file from konnector
  * Add expiration date on driver license
  * The snackbar after adding a paper is now shown for 4sec
  * Add `other_administrative_document` paper
  * Redirect to home for paperList and health theme
  * Remove "others" suggestion
  * Remove health documents from paperDef by flag
  * Remove health filter by flag
* Update cozy-flags from `2.11.0` to `3.0.1`
* Update cozy-bar from `7.26.0` to `7.27.0`
* Update cozy-intent from ^2.11.1 to ^2.13.0
* Update cozy-harvest-lib from ^13.17.2 to ^13.18.1
* Update cozy-ui from ^84.1.3 to ^85.3.1
* Upgrade cozy-client from 38.2.1 to 38.4.0

### 🐛 Bug Fixes

* Change log `warn` to `info` if no file with metadata found


# 2.1.0

### ✨ Features

* Update cozy-mespapiers-lib from 36.1.6 to 39.0.1:
  * Pluralize qualification labels on homepage ([91cac28](https://github.com/cozy/cozy-libs/commit/91cac28724825c9e8488e69ad950d4d4d3b960d3))
  * Pluralize qualification labels on PaperListToolbar ([84e3453](https://github.com/cozy/cozy-libs/commit/84e3453b91fccecf4b5877fcc739e6f9553957b6))
  * Limit the display to a maximum of 3 files by default ([e2caa10](https://github.com/cozy/cozy-libs/commit/e2caa107e1bfc9de96202435d7871690986de3d6))
  * Remove "Existing" subheaders ([d68e527](https://github.com/cozy/cozy-libs/commit/d68e527bfeebcd2c0ce44b57088c40e1cc5478d7))
  * Sort category of papers ([1d7c981](https://github.com/cozy/cozy-libs/commit/1d7c981f3e57dadcca6d225c96c5d8ae98dd4398))
  * Change behavior of SearchHeader components ([08e904d](https://github.com/cozy/cozy-libs/commit/08e904df91f1949bdea5273319ebc39e5efe13b1))
  * Update style to FabWrapper ([040aafb](https://github.com/cozy/cozy-libs/commit/040aafb70f223f18751502f1bfe35aed22a50e52))
  * Add accessibility attributes to FilterButton ([8f02a23](https://github.com/cozy/cozy-libs/commit/8f02a23897acc2093080ef363b044d93b4ccece6))
  * Add StackedThumbnail component ([d7f0906](https://github.com/cozy/cozy-libs/commit/d7f09066fa30ccdd229a982a7094cf4d5c0c9d15))
  * Remove choice to keep deleted file on Drive ([fe68e69](https://github.com/cozy/cozy-libs/commit/fe68e69d7aad81fe0bab6265828072019d41bfc5))
  * Update wording of DeleteConfirm modal ([cb52ac7](https://github.com/cozy/cozy-libs/commit/cb52ac707fa11fdf0a62091dcabe2997d2f03f89))
  * Add importAuto and scanPicture actions ([2517080](https://github.com/cozy/cozy-libs/commit/2517080f98f2f0ab6640f6d502be806b423c3e78))
  * Modify createPaper and createPaperByTheme actions ([defa4fc](https://github.com/cozy/cozy-libs/commit/defa4fc65c42d52982128b1cc089fc768ad27428))
  * Remove useless MoreOptions component ([8564dfd](https://github.com/cozy/cozy-libs/commit/8564dfdc3d2f6b27801d6fb6fb8f40da3389af4a))
  * Use new actions approach for PaperFab menu ([e316f9e](https://github.com/cozy/cozy-libs/commit/e316f9eb5aa7c1a7d97f96f18a765720c6c5ec9e))

* Update packages:
  * cozy-client from 36.1.0 to 38.1.0 ([release](https://github.com/cozy/cozy-client/releases/tag/v38.1.0))
  * cozy-ui from 82.12.0 to 84.1.3 ([release](https://github.com/cozy/cozy-ui/releases/tag/v84.1.3))
  * cozy-bar from 7.25.0 to 7.26.0 ([release](https://github.com/cozy/cozy-bar/releases/tag/v7.26.0))

### 🐛 Bug Fixes

* Remove the last Divider on the homepage ([2af2e70](https://github.com/cozy/cozy-libs/commit/2af2e70ea7ab68c82357a5bfd450b647384b47ed))

### 🔧 Tech

* Add missing packages to devDeps ([50f6bfb](https://github.com/cozy/cozy-libs/commit/50f6bfb04a135ddd402f521c6bc3a24f9943fbf7))
* Create app settings if it doesn't exist ([28e0ada](https://github.com/cozy/mespapiers/pull/421/commits/28e0adafdc86884297a4cc06e5424487da739331))

# 2.0.4

### ✨ Features

* Update cozy-mespapiers-lib from 20.0.2 to 36.0.1
* Update cozy-harvest-lib from 13.1.0 to 13.8.0
* Update cozy-bar from 7.16.0 to 7.25.0
* Update cozy-scripts from 6.3.0 to 8.0.3
* Update cozy-client from 34.10.1 to 36.1.0
* Update cozy-device-helper from 2.6.0 to 2.7.0
* Update cozy-doctypes from 1.83.8 to 1.88.1
* Update cozy-flags from 2.9.0 to 2.11.0
* Update cozy-intent from 2.2.0 to 2.9.0
* Update cozy-notifications from 0.13.2 to 0.14.0
* Update cozy-realtime from 4.2.2 to 4.4.0
* Update cozy-sharing from 4.3.1 to 7.0.1
* Update cozy-ui from 80.2.1 to 82.12.0
* Add cozy-tsconfig 1.2.0

### 🔧 Tech

* Add metadata migration service

# 2.0.3

## ✨ Features

* Update cozy-mespapiers-lib from 15.2.0 to 20.0.2
* Update react-router-dom to 6.4.5
* Upgrade cozy-harvest 12.2.0 to 13.1.0
* Update cozy-ui from 79.2.2 to 80.2.1
* Update cozy-client from 34.6.0 to 34.10.1
* Update cozy-device-helper from 2.2.1 to 2.6.0
* Update cozy-intent from 1.17.3 to 2.2.0
* Add the subject of the expiration notification email
* Remove calls to mui/core and use cozy-ui ones instead

## 🐛 Bug Fixes

* The layout route doesn't have a path attribute
* Link to redirect the papers contained in the email

## 🔧 Tech

* Add GH actions to compare the peerDeps of the chosen libs with the deps of the app, to update them if necessary and finally create the PR.

# 2.0.2

## ✨ Features

* Update `cozy-mespapiers-lib` from [8.0.5](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%408.0.5) to [15.2.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%4015.2.0)
* Upgrade `cozy-harvest` from [9.26.6](https://github.com/cozy/cozy-libs/releases/tag/cozy-harvest-lib%409.26.6) to [12.2.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-harvest-lib%4012.2.0)
* Use `cozy-ui/transpiled/react/styles` import instead `@material-ui/core/styles`
* Update `cozy-ui` from [75.6.1](https://github.com/cozy/cozy-ui/releases/tag/v75.6.1) to [79.2.2](https://github.com/cozy/cozy-ui/releases/tag/v79.2.2)
* Update `cozy-client` from [33.1.0](https://github.com/cozy/cozy-client/releases/tag/v33.1.0) to [34.6.0](https://github.com/cozy/cozy-client/releases/tag/v34.6.0)
* Update `react-router-dom` to `6.4.5`
* Refactor router setup
* Add email notification for a document about to expire

## 🐛 Bug Fixes

* Display filename without extension in the notification email
* Get the subDomain from the client instance

## 🔧 Tech

* Add expiration service
* Add configuration for email notifications
* Add `cozy-keys-lib` 4.3.0 (harvest dependency)
* Add `leaflet` 1.7.1 (harvest dependency)

# 2.0.1

* Add minLength constraint to InputMask [1.7.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%401.7.0)
* Add a context menu to rename a paper [1.7.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%401.7.0)
* Allow to search papers by owner [1.8.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%401.8.0)

## 🔧 Tech
* Revert `cozy-scripts` to 6.3.0 for prevent duplicate css.
* Add descriptions and screenshots for cozy-store.

# 1.2.1

## ✨ Features

* Add description for the Cozy Store

# 1.2.0

* Synchronize Apps versions

# 0.6.0

## ✨ Features

* Update cozy-mespapiers-lib from [0.42.1](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.42.1) to [1.6.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%401.6.0)

# 0.5.0

## 📦 Library updates
* Add the select option in the options of each line of paper & cozy bar [0.27.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.27.0)
* [BC] Add multi-select feature, download or forward multiple papers [0.29.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.29.0), [0.29.1](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.29.1)
* Update Viewer with new implementation & add SelectFileButton to be used in the mobile viewer actions [0.30.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.30.0)
* Update `cozy-ui` package to `68.1.1` [0.31.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.31.0)
* Add ForwardModal component [0.32.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.32.0), [0.32.10](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.32.10)
* Change color of file icon to pink [0.33.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.33.0), [0.33.6](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.33.5)
* The search results are directly the files found and not the qualification group to which they belong [0.38.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.38.0)

## ✨ Features

* Update cozy-mespapiers-lib to [0.42.1](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.42.1)
* Update cozy-client to [32.2.3](https://github.com/cozy/cozy-client/releases/tag/v32.2.3)
* Update cozy-ui to [68.9.0](https://github.com/cozy/cozy-ui/releases/tag/v68.9.0)
* Update cozy-sharing to [4.3.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-sharing%404.3.0)
* Update cozy-sharing to [4.3.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-sharing%404.3.0)
* Update cozy-scripts to [6.3.3](https://github.com/cozy/create-cozy-app/blob/master/packages/cozy-scripts/CHANGELOG.md)
* Update cozy-realtime to [4.2.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-realtime%404.2.0)
* Update cozy-harvest-lib to [9.10.1](https://github.com/cozy/cozy-libs/releases/tag/cozy-harvest-lib%409.10.1)
* Update cozy-flags to [2.9.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-flags%402.9.0)
* Update cozy-doctypes to [1.83.8](https://github.com/cozy/cozy-libs/releases/tag/cozy-doctypes%401.83.8)
* Update cozy-device-helper to [2.2.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-device-helper%402.2.0)

## 🐛 Bug Fixes

## 🔧 Tech

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
* Add information step to bank_details and vehicle_registration papers [0.22.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.22.0)
  * Change character by default for the maskPlaceholder ('ˍ')
* Create PaperCardItem [0.23.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.23.0)
* Change mask of IBAN paper [0.24.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.24.0)
* Remove minimum length rule on national_id_card paper [0.26.0](https://github.com/cozy/cozy-libs/releases/tag/cozy-mespapiers-lib%400.26.0)

## ✨ Features

* Update cozy packages and cozy-mespapiers-lib to 0.26.0

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
