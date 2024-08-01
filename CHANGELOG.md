# 3.8.0

# 3.7.0

### 🐛 Bug Fixes

* Paper model was incorrect for french driver license by @JF-Cozy in https://github.com/cozy/mespapiers/pull/656

### 🔧 Tech

* Remove node 16 from tests and stages in CI by @zatteo in https://github.com/cozy/mespapiers/pull/655
* Upgrade packages by @JF-Cozy in https://github.com/cozy/mespapiers/pull/657

# 3.6.0

### ✨ Features

* Don't save `page` metadata anymore by @Merkur39 in https://github.com/cozy/mespapiers/pull/618
* Split 2-sided files by @Merkur39 in https://github.com/cozy/mespapiers/pull/640
* Adjustments to face selection by @Merkur39 in https://github.com/cozy/mespapiers/pull/643
* Add edit paper feature by @JF-Cozy in https://github.com/cozy/mespapiers/pull/646
* Ensure the app settings document exists when the app is loaded by @Merkur39 in https://github.com/cozy/mespapiers/pull/645
* ForwardModal: Asynchronous processing before share validation by @Merkur39 in https://github.com/cozy/mespapiers/pull/651
* paperDef: Change information step for foreign driver license paper by @Merkur39 in https://github.com/cozy/mespapiers/pull/652
* feat: Show message if imported pdf is encrypted by @JF-Cozy in https://github.com/cozy/mespapiers/pull/654

### 🐛 Bug Fixes
* NoteDialog: Note creation returns a 404 when trying to save by @Merkur39 in https://github.com/cozy/mespapiers/pull/647
* Rename helpers file to makeInputAdornment by @Merkur39 in https://github.com/cozy/mespapiers/pull/648
* OCR: Set metadata in the correct place by @Merkur39 in https://github.com/cozy/mespapiers/pull/649
* Edit paper feature by @Merkur39 in https://github.com/cozy/mespapiers/pull/650
* Actions/modify: Open the correct modification procedure by @Merkur39 in https://github.com/cozy/mespapiers/pull/653

### 🔧 Tech
* Use specific nvm version to match default one in travis distro by @JF-Cozy in https://github.com/cozy/mespapiers/pull/642
* refactor: Reorganize providers to put them all at the same place by @Merkur39 in https://github.com/cozy/mespapiers/pull/644

**Full Changelog**: https://github.com/cozy/mespapiers/compare/3.5.0...3.6.0-beta.1

# 3.5.0

### ✨ Features
* Use data API router of react-router-dom by @Merkur39 in https://github.com/cozy/mespapiers/pull/632
* Update wording manifest.webapp by @BenjaminMty in https://github.com/cozy/mespapiers/pull/631
* Change country logic by @JF-Cozy in https://github.com/cozy/mespapiers/pull/635
* feat: Update french wording of the vehicle registration license number by @Merkur39 in https://github.com/cozy/mespapiers/pull/638
* Add realtime on io.cozy.settings by @JF-Cozy in https://github.com/cozy/mespapiers/pull/641

### 🐛 Bug Fixes
* Use contants instead of strings to list all known metadata by @Merkur39 in https://github.com/cozy/mespapiers/pull/637

# 3.4.0

### ✨ Features

* Add CountryList to another papers ([079025a](https://github.com/cozy/cozy-libs/commit/079025a1fd8f3a5fc7a0b4fd4f4098c1e164e209))
* Add default value country metadata to specific papers ([cf3f820](https://github.com/cozy/cozy-libs/commit/cf3f820a57cffe0c257b9ddc9afcb559e520e465))
* Correction of the style of creation steps ([f9eda04](https://github.com/cozy/cozy-libs/commit/f9eda04f9bd0c6670d9fb89c97f9f7dd8a9f2353))
* Use FixedDialog instead Dialog ([cb69653](https://github.com/cozy/cozy-libs/commit/cb696530ce8ae05a899c0158e6938fe7d6069dcb))
* Remove search on birthcity ([6d29cea](https://github.com/cozy/cozy-libs/commit/6d29ceac8f4ae3e1b9e44ab35547f9259b1c8271))
* Add translated BIC number label in search ([2e5bb9c](https://github.com/cozy/cozy-libs/commit/2e5bb9ce8a8cb450c01e26a862b232dfa73480f7))
* Add search on national health insurance card label ([4ac7677](https://github.com/cozy/cozy-libs/commit/4ac76777f2aa5170d5b7280b58200c2f5ab3b87d))
* Use default expanded attributes in search result ([eedebf2](https://github.com/cozy/cozy-libs/commit/eedebf217da62e191591a38dd5e0496b3a428113))
* Add tax certificate paper ([bff2dcb](https://github.com/cozy/cozy-libs/commit/bff2dcb25864eb8c6c1d7f5b6599772d9a4b0e7d))
* Add OCR for vehicle registration ([d72706f](https://github.com/cozy/cozy-libs/commit/d72706f3c3b91a0d31a34e32ed34f1efa807694c))
* Adjusting the display of konnectors without files ([cce3d43](https://github.com/cozy/cozy-libs/commit/cce3d433671044f5d26f7cceee9ef5e21536b9d2))
* Change style home page skeleton ([fdb053b](https://github.com/cozy/cozy-libs/commit/fdb053bb6f1276e7354e6736efbc890f05c09d68))
* Hide search when there are no files ([d9c5d87](https://github.com/cozy/cozy-libs/commit/d9c5d87e79eae45cd0e6a3100c60127c50dd9887))
* Konnector UI management without files ([0afdaf7](https://github.com/cozy/cozy-libs/commit/0afdaf7170f2e97cbfa4b119a001dd30eb5fdef4))
* Remove Onboarding feature ([c2e8b97](https://github.com/cozy/cozy-libs/commit/c2e8b9754dd74940a7d0c17c9f4dcd906737452c))
* Show Empty also when no konnectors have files ([a7635ff](https://github.com/cozy/cozy-libs/commit/a7635ff4478b92b02d9fd17c805a2d5be5ed8d4b))
* Redirect when webview killed in 'scanDocument' ([19adb35](https://github.com/cozy/cozy-libs/commit/19adb350797764fe6bf8d790ab3334b1f04f769f))
* Add possibility to define a specific doctype ([6e315d5](https://github.com/cozy/cozy-libs/commit/6e315d5bc37f622efcd9a1542f6277779336eb47))
* Go to correct step when webview killed in 'scanDocument' ([7040457](https://github.com/cozy/cozy-libs/commit/704045716f57ead408fdd5181c2c42b2d176a77e))
* Add support for io.cozy.bills and use it in expense_claim ([ac42025](https://github.com/cozy/cozy-libs/commit/ac42025f43c9f8a1b33e40c2ee6dc6cd59f9e4c4))
* Add mobile notifications to the expiration service ([83ea8d5](https://github.com/cozy/mespapiers/commit/83ea8d5016c605de108ffb7aff83dd5ab5e056ec))
* Change the execution time slot for the expiration service ([cbf59e0](https://github.com/cozy/mespapiers/commit/cbf59e02f913af5f7828bc82c30fff48bfdce370))
* Reverse usage of bills in expense_claim paper ([c1295fc](https://github.com/cozy/mespapiers/commit/c1295fcc5082768e5a7f91e564e66ebf06bd9dc6))
* Adjust search result ([46c1c96](https://github.com/cozy/mespapiers/commit/46c1c96260993774d99ec09f61134d884453f1a0))

### 🐛 Bug Fixes

* Translate country metadata only if valid ([4512b99](https://github.com/cozy/cozy-libs/commit/4512b997c9f37005a03022d9076d6d719f918004))
* Bic number wasn't supported well in search ([11a1989](https://github.com/cozy/cozy-libs/commit/11a198966196029018b779b903dd6ec4399ffc65))
* Ensure country code used for translation is valid ([7faf374](https://github.com/cozy/cozy-libs/commit/7faf3749db7e959b722e4ae1af685895f4fcd3d0))
* Set default value for formData when editing it ([2d32099](https://github.com/cozy/cozy-libs/commit/2d32099896b52a399f7255dff270bcbb10675e56))
* When using OCR, save or retrieve metadata in the correct place ([9c84c35](https://github.com/cozy/cozy-libs/commit/9c84c353f13fc22999b2a6ecf23550d63520d431))
* Support old flagship app in FormDataProvider loadFormBackup ([1e58ad1](https://github.com/cozy/cozy-libs/commit/1e58ad1ec08115aaf9c716309d6f0d0ad99311da))
* Wait until StepperDialogProvider is ready ([c1e2658](https://github.com/cozy/cozy-libs/commit/c1e2658244a3aabcd8b96c2cce73bf07636bfd39))
* Stuck when OCR was not activated ([406f682](https://github.com/cozy/cozy-libs/commit/406f682b8e670df569e8a96068b0ea444a324272))
* Forwarding files not working because docs not forwarded in state ([9bcd94c](https://github.com/cozy/mespapiers/commit/9bcd94c3a2d8e58e3b011205ed696621618e67d7))
* File name wasn't correct ([8b58363](https://github.com/cozy/mespapiers/commit/8b58363eddea7d01c3d09fc5416a985c0e4d8fdc))

### 🔧 Tech

* Add methods to export and import data from FormDataProvider ([6bfa967](https://github.com/cozy/cozy-libs/commit/6bfa9675d62538cd07b375c03d555f0776e37a08))
* Add an indexed storage wrapper based on localforage ([a8097f9](https://github.com/cozy/cozy-libs/commit/a8097f936ae519e2ee90dae8e213c6b12b07c84c))
* Merge all files from cozy-mespapiers-lib to mespapiers app ([13c4c44](https://github.com/cozy/mespapiers/commit/13c4c447604613f6fbf019e612b1fd4409451f11))

# 3.3.5

### ✨ Features

* Add `taxNumber` to migration script
* Upgrade cozy-ui 105.2.1 to 105.10.2
* Upgrade cozy-client 46.0.0 to 46.8.0
* Upgrade cozy-mespapiers-lib 90.0.0 to 95.0.3
  * Add a health paper ([2aadd32](https://github.com/cozy/cozy-libs/commit/2aadd321afe5f2bb38445ffc7a73a2c3d36fd3d2))
  * Add licenseNumber and confidentialNumber in search ([28149bf](https://github.com/cozy/cozy-libs/commit/28149bf66e0ce58d5caf7a987f28d24617e327d3))
  * Add licenseNumber and confidentialNumber on vehicle_registration ([5ae2469](https://github.com/cozy/cozy-libs/commit/5ae24696d7a99bee73d3ceb28c07432680daaa40))
  * Add vehicle registration license number on file name ([92e1a99](https://github.com/cozy/cozy-libs/commit/92e1a992d0550c6d848dc65d0c79e8b4dbb8b612))
  * Filter with several themes ([7d81402](https://github.com/cozy/cozy-libs/commit/7d81402492ebf3a03271e5ed7813a2342f0176c9))
  * Hide the badge on the filter button when themes filter is visible ([ae388df](https://github.com/cozy/cozy-libs/commit/ae388dff487e87edc55312f6f8deb47f4051b2d7))
  * Remove fuse.js lib ([9839d99](https://github.com/cozy/cozy-libs/commit/9839d990fd8e5952628f473b66cd9d8a95b7537d))
  * Homogenize the behavior of importAuto ([e34f64a](https://github.com/cozy/cozy-libs/commit/e34f64aee0f8b87ea72d3f9c9306ae85f01ec717))
  * The importAuto action display a contextualize konnector icon ([9511e06](https://github.com/cozy/cozy-libs/commit/9511e061fecc74f8f478b9586f7a0f6dc4ecb48b))
  * Use the connector name instead of the slug in the description ([15a4458](https://github.com/cozy/cozy-libs/commit/15a44584bd2efe2c0d04b3130d26c40feedfa887))
  * Add Adornment attribute to TextField in RadioAdapter ([a551d9b](https://github.com/cozy/cozy-libs/commit/a551d9b16417502aeb0d270c6f360ee52950137e))
  * Convert options of RadioAdapter component to object ([d9cb7b3](https://github.com/cozy/cozy-libs/commit/d9cb7b39ae75456098b9485e6e8221ebdda313eb))
  * Converting noticePeriod information steps ([9173877](https://github.com/cozy/cozy-libs/commit/91738778789d72f122353b6e6c5bbc979c3e3e5e))
  * Update information steps with a list of radio inputs ([829bdd8](https://github.com/cozy/cozy-libs/commit/829bdd8324da9f20910726765597bbd20653637a))

### 🐛 Bug Fixes

* By updating cozy-mespapiers-lib:
  * The selectedThemes argument of ([66365fc](https://github.com/cozy/cozy-libs/commit/66365fc69d07a51703852586dcecd04d5d5f851e))
  * The konnector category of the phone_invoice paper ([8039e65](https://github.com/cozy/cozy-libs/commit/8039e658ba39b0a2033ea549d38eae505d2b38d5))
  * When editing, save or get metadata in the right place ([c3a163d](https://github.com/cozy/cozy-libs/commit/c3a163d148544cf128146af2340f83ce16dca52f))
  * `featureDate` attribute must be the one provided by the papersDefinitions ([4291159](https://github.com/cozy/cozy-libs/commit/4291159bc933332ef90bc10a27a1bb36477a205b))
  * Save the right information in contractType metadata ([8849e7b](https://github.com/cozy/cozy-libs/commit/8849e7bf1c83a3e6fb33fe26bffa94eace1dc059))
  * Using the inputLabel attribute in the RadioAdapter ([1544227](https://github.com/cozy/cozy-libs/commit/1544227461e8e9fc6a6fc461b06bd3f40849218b))
  * Merge all metadata when submit information step ([900c3d7](https://github.com/cozy/cozy-libs/commit/900c3d72d0dd1ad64e775a0696ab59308b44a714))
  * The noticePeriod field must be a TextField during ocr ([74a6a14](https://github.com/cozy/cozy-libs/commit/74a6a14825a2d46ed1c63b3d8833b5f7aba14c2a)), closes https://github.com/cozy/cozy-libs/issues/2515
  * Wrong writing of the pay_sheet qualification ([9dafd90](https://github.com/cozy/cozy-libs/commit/9dafd90eeabb104d93c033aebc78f081c0c09499))
  * Create a paper if myself does not exist ([63b6dd7](https://github.com/cozy/cozy-libs/commit/63b6dd780d96f251c08b9f91e0b4a32898608a37))
  * Download action calls a function with bad argument ([ae9bbd2](https://github.com/cozy/cozy-libs/commit/ae9bbd2f5bfc3295553d3ae1aaef68c5cb6c63ac))
  * Add missing locales for installing app button ([82d2122](https://github.com/cozy/cozy-libs/commit/82d2122b14e084eb30ca3871df31bdc7493f87d4))

# 3.3.4

### ✨ Features

* Upgrade cozy-bar 7.27.0 to 12.0.0
* upgrade cozy-sharing 10.2.0 to 10.4.1
* Upgrade cozy-ui 103.8.0 to 105.0.2
* Upgrade cozy-client 45.14.0 to 46.0.0
* Upgrade cozy-flags 3.0.1 to 3.2.0
* Upgrade cozy-mespapiers-lib 80.0.0 to 88.0.0
  * Add `editText` on `pay_sheet` attributes ([11994d9](https://github.com/cozy/cozy-libs/commit/11994d9a850e4dbf9003e6c10fe00cb3e9757321))
  * Add `netSocialAmount` in search ([f1266d7](https://github.com/cozy/cozy-libs/commit/f1266d7360b4be43a98baf87437184a9d51217bc))
  * Add `pay_sheet` step ([7a36680](https://github.com/cozy/cozy-libs/commit/7a366801755b5752a0677b1cd58bd27cf1d9a669))
  * Add ref tax number on multiple papers ([104bdaa](https://github.com/cozy/cozy-libs/commit/104bdaa3a697371cfb3391d8d6a5b3134ad65e58))
  * Add translated `pay_sheet` number in flexsearch ([d953623](https://github.com/cozy/cozy-libs/commit/d9536236456bca260a57cd11c2196f761dcc4c95))
  * Add foreign `national_id_card` ([90b9449](https://github.com/cozy/cozy-libs/commit/90b9449d16f41fbfca54ea596319437a878e6be8))
  * Adjust buttons styles for Viewer ([dcad271](https://github.com/cozy/cozy-libs/commit/dcad271401654a0ac7c77b88dfe706877d7b7c08))
  * Add support for `,` and `.` in input type number ([6fbe07d](https://github.com/cozy/cozy-libs/commit/6fbe07d77aa483875b2be3414760f91aa5287904))

### 🐛 Bug Fixes

* ExpirationNotification should use the `en` locale by default
* By updating cozy-mespapiers-lib:
  * Add `metadata.netSocialAmount` into query select ([73d75a2](https://github.com/cozy/cozy-libs/commit/73d75a2307faee9f436d1baeb36b34a09de3f83c))
  * Change type of the `variant` Alert ([ed3a07e](https://github.com/cozy/cozy-libs/commit/ed3a07e3fc074b64e1a5d4c6ab3e88dfc84d523e))

# 3.3.3

### ✨ Features

* Upgrade cozy-client 45.6.0 to 45.14.0
* Upgrade cozy-doctypes 1.89.3 to 1.89.4
* Upgrade cozy-harvest-lib 22.0.3 to 22.4.0
* Upgrade cozy-intent 2.19.1 to 2.19.2
* Upgrade cozy-interapp 0.8.1 to 0.9.0
* Upgrade cozy-mespapiers-lib 75.6.2 to 80.0.0
* Upgrade cozy-notifications 0.14.0 to 0.15.0
* Upgrade cozy-ui 102.2.1 to 103.8.0

# 3.3.2

### ✨ Features

* Update cozy-ui and cozy-sharing
* Upgrade cozy-mespapiers-lib 73.2.0 to 75.6.2
  * Number of files displayed ([acf8f1a](https://github.com/cozy/cozy-libs/commit/acf8f1ab257375b272d6e2a3803e2eb97f8781a7))
  * Update copyToClipboard to use navigator.clipboard ([2d82f92](https://github.com/cozy/cozy-libs/commit/2d82f9228d9c0850ce7a765a99dbdbe5a0550513))
  * Use await for copyToClipboard method ([0bff241](https://github.com/cozy/cozy-libs/commit/0bff2415659ea55aab82bc52eaa869d81bf0bfcc))
  * Use copyToClipboard instead of copy-text-to-clipboard package ([d1f7d51](https://github.com/cozy/cozy-libs/commit/d1f7d513e99b26c85050a52db190ccb8af6cf105))
  * Remove copy-text-to-clipboard package ([55b75ed](https://github.com/cozy/cozy-libs/commit/55b75ede59c66f4f4761f463b65bf326e2dc0b01))
  *  Update cozy-ui to 102.2.1 ([02afc25](https://github.com/cozy/cozy-libs/commit/02afc25f576ada7707ec9f02e6ef0449103e2d56))
  * Navigate after share as attachment success ([a6d0a3c](https://github.com/cozy/cozy-libs/commit/a6d0a3cead44143a0f9edd9c22de1cd2b71fa15a))
  * Update multiselect wording ([0200a14](https://github.com/cozy/cozy-libs/commit/0200a14fc772f672cd5d6bd59059c56d2b9e5db1))
  * Change number of doc displayed ([4c25cbd](https://github.com/cozy/cozy-libs/commit/4c25cbd8eb6a44ad6a9cc2d4c9d730d8326d0ad6))
  * Change wording in ForwardModal ([be8c252](https://github.com/cozy/cozy-libs/commit/be8c252dee9bb6d64a0fc806e925d6fe9d6d4a5f))
  * Routes and file viewer behavior in multiselection ([681d49a](https://github.com/cozy/cozy-libs/commit/681d49abeaa178b211981457459b569a6046e945))
  * Close multiselection after successful delete/forward ([05e7b4f](https://github.com/cozy/cozy-libs/commit/05e7b4faad0b0c4f9b8cbce3e5ca1656c614f1d6))
  * Calculate isMultiSelectionActive from current URL ([45844d0](https://github.com/cozy/cozy-libs/commit/45844d076cedc79566172fe7f3a47ecf7b0aad17))
  * Do not allow to go back to ForwardModal ([b24e841](https://github.com/cozy/cozy-libs/commit/b24e8418c3dd630cd93ce54512f0f4ac2c4002ef))
  * Add a FileSharingProvider to expose feature from flagship app ([dbf10d4](https://github.com/cozy/cozy-libs/commit/dbf10d4cfb6418ca0ec160fe124ae40afed2c738))
  * Add MultiselectBackdrop to ShareBottomSheet ([661e7e8](https://github.com/cozy/cozy-libs/commit/661e7e83896b8842c6d4b4b37b83615836546a35))
  * Add ShareBottomSheet ([7175f9f](https://github.com/cozy/cozy-libs/commit/7175f9f9634cd37b25a3dcd985362659f69b87c0))
  * Open ShareBottomSheet when sharing on flagship ([6f97b15](https://github.com/cozy/cozy-libs/commit/6f97b15fb0989ec90cbd1f055349fbfeec3f983b))
  * Show success and error alerts at the end of attachment share ([645c922](https://github.com/cozy/cozy-libs/commit/645c92237f1e1582200f4d2cfb0d9992afadbd00))
  * Multiple file can now be printed from selection ([02cf031](https://github.com/cozy/cozy-libs/commit/02cf03116a07b1fef35c63977c64b50fe3a31312))
  * Upgrade cozy-ui 102.0.0 to 102.1.0 ([aa99d7c](https://github.com/cozy/cozy-libs/commit/aa99d7c19a0e58e9aff65e36deb55594014db790))
  * Use sourceAccountIdentifier instead sourceAccount ([28358c6](https://github.com/cozy/cozy-libs/commit/28358c696cfdf74439bcafc0721f012ba96d6e1e))
  * Upgrade cozy-ui 101.1.1 to 102.0.0 ([c3995c9](https://github.com/cozy/cozy-libs/commit/c3995c9aaad0159c8236cb743a13586921667b5e))

# 3.3.1

### ✨ Features

* Add cozy-logger from ^1.10.4
* Use CozyTheme instead of MuiTheme
* Update cozy-client from ^45.0.0 to ^45.6.0
* Update cozy-doctypes from ^1.88.6 to ^1.89.3
* Update cozy-harvest-lib from ^20.2.1 to ^22.0.3
* Update cozy-intent from ^2.18.0 to ^2.18.1
* Update cozy-sharing from ^10.0.0 to ^10.1.3
* Update cozy-ui from ^99.0.4 to ^101.1.1
* Update cozy-intent from ^2.18.1 to ^2.19.1
* Update cozy-mespapiers-lib from ^70.0.0 to 73.2.0

### 🔧 Tech

* Bump to node 20
* Remove travis caches

# 3.3.0

### ✨ Features

* Update cozy-mespapiers-lib from 66.0.1 to 70.0.0
  * Add help tooltip in paper selector ([9874a97](https://github.com/cozy/cozy-libs/commit/9874a97c0e9f6b1841f9ddef6e1dd15d429c6aaa))
  * Add help tooltip on OCR result page ([62cc04d](https://github.com/cozy/cozy-libs/commit/62cc04df8924a3cc324c22ac9ee2e1202fb22c87))
  * Add help tooltip on Scan actions ([1a9f383](https://github.com/cozy/cozy-libs/commit/1a9f383146549c3073177f452a3c34defc40bba0))
  * Add PapersCreatedProvider ([9e0cee2](https://github.com/cozy/cozy-libs/commit/9e0cee2fc4f040830eba86dddc7a100a8bef087c))
  * Add PointerAlert on placeholders if no papers created by the app ([a17c01e](https://github.com/cozy/cozy-libs/commit/a17c01e07516a2d2a92381c6fd873c02426169b6))
  * Add tooltip on forward Fab ([4e1b3fe](https://github.com/cozy/cozy-libs/commit/4e1b3fe7ae89e5ee5982662addf74572dc23a55f))
  * Adjust wording ([8bd9ee5](https://github.com/cozy/cozy-libs/commit/8bd9ee5b758ce020074acc1f5a511a9ad334dbf8))
  * Change wording when no papers ([521cb72](https://github.com/cozy/cozy-libs/commit/521cb72908ef7028721de294a3433be233edae49))
  * Center Onboarding verticaly ([b1aa84a](https://github.com/cozy/cozy-libs/commit/b1aa84a5965f707f8cdfb58a9e3e332dad9fd128))
  * Replace paper selection modale by NestedSelect ([b45bb4d](https://github.com/cozy/cozy-libs/commit/b45bb4d1b6762966e3b77c98331f327645dab453))
  * Replace ScanResultInfo by PointerAlert ([82a1873](https://github.com/cozy/cozy-libs/commit/82a18736eae0a364b83ce1092cec9ab2ad9eb600))
  * Add BoxDate component ([a1dc01e](https://github.com/cozy/cozy-libs/commit/a1dc01ee750369587f7410c21dbd645f59216462))
  * Add BoxPassword component ([6ed4b35](https://github.com/cozy/cozy-libs/commit/6ed4b35642dbe208fbd247a7f8ce62c65a8203bb))
  * Add file thumbnail to ForwardModal ([747912f](https://github.com/cozy/cozy-libs/commit/747912f6f2a468de981dfa8e7d41116dff25279a))
  * Add helper for copy to clipboard with alert ([c423824](https://github.com/cozy/cozy-libs/commit/c42382459812f7643276a3bb8fcb166e23457f36))
  * Add helper for make ttl (bigduration format) ([7c97f39](https://github.com/cozy/cozy-libs/commit/7c97f39eb0146fedb94691bc7ee1422ad9320f06))
  * Add Send option on files in desktop mode ([44a2d8b](https://github.com/cozy/cozy-libs/commit/44a2d8b0ac9917a06efdf036b7c55aeb5cba86a5))
  * Forward action redirect to ForwardModal ([46a1333](https://github.com/cozy/cozy-libs/commit/46a1333a0073f62518a39b4ded2b8e84ee207427))
  * Make ForwardModal compatible with a Route ([e125651](https://github.com/cozy/cozy-libs/commit/e1256519621174d306dec0cdc6d093a9cf0bed69))
  * Multi select on desktop forward files instead download ([c5b8752](https://github.com/cozy/cozy-libs/commit/c5b875230cff6400522bbbe3f8117bc033023ca5))
  * Render the correct icon when fallback in ForwardModal ([d594138](https://github.com/cozy/cozy-libs/commit/d594138a35fefb36dcaffc321aca297ae9a0d44d))
  * Replace file sharing icon ([cf60470](https://github.com/cozy/cozy-libs/commit/cf60470e5a46e4099aeb12bd60bdc73d4561ae9e))
  * Use BoxDate & BoxPassword components in ForwardModal ([9e3617f](https://github.com/cozy/cozy-libs/commit/9e3617f9de9eac2ee587d99b5b6da8598814204d))
  * Add print action on files ([76a97d5](https://github.com/cozy/cozy-libs/commit/76a97d50881ad14feaa2f433e609655420833764))
  * Replace spinner by skeletons on papers list ([2303501](https://github.com/cozy/cozy-libs/commit/230350100d4836fa3d9a50777f86252fef81e358))
  * Replace spinners by skeletons on home and onboarding ([fdf50a0](https://github.com/cozy/cozy-libs/commit/fdf50a05fe16b891ebc91d6960e7f48674764dfd))
  * Replace Spinner by ListSkeleton in search result ([7dd45a9](https://github.com/cozy/cozy-libs/commit/7dd45a9ea0b12cb3b5287201cea9fc540eb259e1))
  * Change wording `paper` to `document` ([37967f4](https://github.com/cozy/cozy-libs/commit/37967f46de765d8046a0ebb8bb4750c90a085ab0))
  * Add regex rules for passport attributes ([a30b431](https://github.com/cozy/cozy-libs/commit/a30b43126fd019fb14eb48ac43288ed55bc5a0d1))
  * Add `xsmall` size to `CompositeHeaderImage` component ([06e51d9](https://github.com/cozy/cozy-libs/commit/06e51d954395449356f4d0de0f48f18bdceb1065))
  * Add configuration for SelectPaperFormat modal ([7ade74e](https://github.com/cozy/cozy-libs/commit/7ade74e44e0f6d1893bac8292d26c6982ebe884f))
  * Add country detection for passport ([8b5a9a2](https://github.com/cozy/cozy-libs/commit/8b5a9a2d1673d9955d18754cab588c0785e2912d))
  * Add identity card version detection ([ea8475a](https://github.com/cozy/cozy-libs/commit/ea8475a7c8168b2b8c1ca0972f96f64d35e1e21d))
  * Add new identity card format (2021) ([a9ba5f1](https://github.com/cozy/cozy-libs/commit/a9ba5f1f3e5713525caca01107126891f6782048))
  * Add paper version detection ([c24d06b](https://github.com/cozy/cozy-libs/commit/c24d06b6589af0ef919f1c030222c46145c8c5a3))
  * Add SelectPaperFormat component ([5752fb4](https://github.com/cozy/cozy-libs/commit/5752fb41b9c1f9cfd75b4a092a75b774a489221d))
  * Add the SelectPaperFormat modal to the process ([dce2992](https://github.com/cozy/cozy-libs/commit/dce29929edde4296db31be0978ce6eebe92e4ccb))
  * Increase the maximum size of images before integrating ([41a7e5c](https://github.com/cozy/cozy-libs/commit/41a7e5c25b5f7be85f0347692b6844a8eabad6a4))

* Upgrade cozy-ui 97.1.0 to 99.0.4

### 🐛 Bug Fixes
* Scan rotation doesn't work at the last rotation ([3b7227d](https://github.com/cozy/cozy-libs/commit/3b7227dba316a4fdc62b4701f1209cf9bd0a6019))
* Display the right konnector ([6440349](https://github.com/cozy/cozy-libs/commit/6440349470de6687fbf32f0df318c97ab2542641))
* An error when file doesn't have a createdByApp cozyMetadata ([8d059b2](https://github.com/cozy/cozy-libs/commit/8d059b2d543784f81b384c3b8d18575514a1277f))

### 🔧 Tech
* Use CozyDevTools instead FlagSwitcher ([f043279](https://github.com/cozy/cozy-libs/commit/f0432793412fab4210c041379aed55b2c73164cf))
* Use cozy-minilog instead cozy-logger ([8612f7e](https://github.com/cozy/cozy-libs/commit/8612f7e8048a16c67dec5e49ce622a2aa7e87e31))

# 3.2.0

### ✨ Features

* Update cozy-mespapiers-lib from 60.0.4 to 66.0.1
  * Add BIC number to bank_details ([6a2f3ff](https://github.com/cozy/cozy-libs/commit/6a2f3fffb18878b147976e4a74b71be3a32982a1))
  * Add nationality to residence_permit ([94db363](https://github.com/cozy/cozy-libs/commit/94db363f5f6dd77b69854421179411909b3917f2))
  * Add ocr result page ([67fd4fd](https://github.com/cozy/cozy-libs/commit/67fd4fdadf6a33c1343c348bec5a37d07e4b97bf))
  * Add ocr step to paper thats compatible ([4b9808f](https://github.com/cozy/cozy-libs/commit/4b9808f835b94541983516720ce9b7f454473c17))
  * Create a new contact input for information step ([0f15467](https://github.com/cozy/cozy-libs/commit/0f154670ad8ac33daf1969619bbc085192909a80))
  * Improve design of OCR result page ([f9b5d12](https://github.com/cozy/cozy-libs/commit/f9b5d122ac1b0c00baa578694086b89ef781220c))
  * Submit formData in any step ([c2287f6](https://github.com/cozy/cozy-libs/commit/c2287f6828e089165dda31012d6359ef6a662383))
  * Adapt paper maxLength ([9fe9e39](https://github.com/cozy/cozy-libs/commit/9fe9e393ae7e826141653da9c0c5e53357b1300c))
  * Add mask to BIC number ([c1837c8](https://github.com/cozy/cozy-libs/commit/c1837c82827930de54afcc2104d45a61369e7fa9))
  * Ignore onboarding from flagshipUpload ([b26c3e3](https://github.com/cozy/cozy-libs/commit/b26c3e30d48d020a5f9db5925302b82bf4a537d2))
  * Add diploma and CV papers with 255 characters max ([2953e86](https://github.com/cozy/cozy-libs/commit/2953e8663533f9e16a3bffb5a3ce2eed179e8e31))
  * Add expense claim paper ([6bba739](https://github.com/cozy/cozy-libs/commit/6bba739f7c77c31b690f55658371229c21915801))
  * Add isAvailable flagship method to isOCRActivated helper ([c7ca01a](https://github.com/cozy/cozy-libs/commit/c7ca01a7eca4d4a8dd579c4db9d7d6d22fa98c13))
  * Add helper for make a compliant object with formMetadata ([77f687b](https://github.com/cozy/cozy-libs/commit/77f687b928d7f3a11b534b569b8425b2b5c16854))
  * Add helper for transform File to Base64 ([bb3b22c](https://github.com/cozy/cozy-libs/commit/bb3b22c770365ffa26e057dd6095c96aa0af5d42))
  * Add helper to get attributes from OCR ([450b1ae](https://github.com/cozy/cozy-libs/commit/450b1ae4d0c62d1e1d53d48ebdd1543ea7449046))
  * Add new animated svg for ocr processing ([c988299](https://github.com/cozy/cozy-libs/commit/c9882991e8eb3d9ff554a1a4b9a2aa84ad4ffeca))
  * Add OCR informations to papersDefinitions file ([ecd4adb](https://github.com/cozy/cozy-libs/commit/ecd4adbd9c59a3644683328fab0d84c9eafaa3ab))
  * Add some functions to process OCR result ([58d1de9](https://github.com/cozy/cozy-libs/commit/58d1de9ba52a747c615cf04c9365b5fa33eeed29))
  * Added Dialog for OCR processing ([86660c8](https://github.com/cozy/cozy-libs/commit/86660c85215ec6b251e75aa3f0fe259e6fe0fd84))
  * Integration of the OCR functionality in ScanResultDialog  ([19d6f96](https://github.com/cozy/cozy-libs/commit/19d6f96b2e818d76d7b3f20618b5c72b55f2c123))
  * Helper update to know if we are at the last step ([287f004](https://github.com/cozy/cozy-libs/commit/287f004435858e47c19b3059a25aeaacf8bf1257))
  * Update ocr informations translations ([9b0a915](https://github.com/cozy/cozy-libs/commit/9b0a9152c0dbce8f53ed52b91f1ad9edb9650217))
  * The rotateImage function does not need to be executed ([dc958eb](https://github.com/cozy/cozy-libs/commit/dc958eb41f052f783f9fc96ad8e5377332e86d9e))
  * Add label given by user to paper other_invoice.json ([63af19e](https://github.com/cozy/cozy-libs/commit/63af19e726c0860bc06f6382f6acc9b2c6f35464))
  * The label of the information step fields adapts automatically ([7edad6a](https://github.com/cozy/cozy-libs/commit/7edad6aa15209e62362cafc7d1b51aea605a3357))
* Update cozy-client from `40.3.0` to `43.2.0`
* Update cozy-harvest-lib from `17.2.1` to `20.2.1`
* Update cozy-intent from `2.15.0` to `2.18.0`
* Update cozy-sharing from `9.0.0` to `10.0.0`
* Update cozy-ui from `91.2.0` to `95.11.1`

### 🐛 Bug Fixes

* by updating cozy-mespapiers-lib:
  * Add text for information edit ([67faf3d](https://github.com/cozy/cozy-libs/commit/67faf3d9d17a53ec75b571b1fbe7c89535eb5505))
  * Style for pdf icon in step view when importing a pdf ([6a38676](https://github.com/cozy/cozy-libs/commit/6a38676f3418ddb80b197ce5a1c5289aa8c8f121))
  * IBAN number must be valid with 25 characters ([d94c59d](https://github.com/cozy/cozy-libs/commit/d94c59d32f91dce44777d1b37ed286384ca1b1fe))
  * Use the "mask" attribute rather than "maxLength" ([8014b3d](https://github.com/cozy/cozy-libs/commit/8014b3dbe078385276b750093976f02a50553707))

# 3.1.0

### ✨ Features

* Update cozy-mespapiers-lib from 57.1.2 to 60.0.4
  * Restrict mime type images for paper creation ([225f75c](https://github.com/cozy/cozy-libs/commit/225f75c18523a641d694c2da131e1d2b0fa28f2e))
  * Add onSubmit on stepper and redirect to paper list ([dbd0529](https://github.com/cozy/cozy-libs/commit/dbd0529f30095ab492f243f1c48798fe95124a3f))
  * Add possibility to skip onboarding with query param ([9dfb772](https://github.com/cozy/cozy-libs/commit/9dfb772e7faa80f267ac88ff320c5544ba3e8ba5))
  * Handle back behavior in stepper for returnUrl querypar ([8997b97](https://github.com/cozy/cozy-libs/commit/8997b97fb7dd0dd0ff03cc1aea7e8337f3c15446))
  * Handle back in paper create process with returnUrl ([d18eeec](https://github.com/cozy/cozy-libs/commit/d18eeec2058a885420beb59b6c7cd99f41a5a572))
  * Set onboarded true if skipOnboarding query param ([2438da5](https://github.com/cozy/cozy-libs/commit/2438da5b24a1f54309e753173a67f85aa9691bfd))
  * Skip scan step for returnUrl query param ([49f8103](https://github.com/cozy/cozy-libs/commit/49f8103cf52e3ca7da0b802dc1a8b88bd70d0675))
  * Spread setCurrentStepIndex in StepperDialogProvider ([c60a162](https://github.com/cozy/cozy-libs/commit/c60a1626168753f89e566639e0e9c53eced6838e))
  * Add ErrorBoundary component ([a36294e](https://github.com/cozy/cozy-libs/commit/a36294e1d58b26946cce5841cd8b0748b1d359a7))
  * Add ErrorBoundary component in Router app ([6378f39](https://github.com/cozy/cozy-libs/commit/6378f39e37d4af9c1c1a34cfd23c311b61aec074))
  * Add ErrorProvider ([69e9db1](https://github.com/cozy/cozy-libs/commit/69e9db13c642aa409289a8f9d04b5985d408b014))
  * Wrap all Providers by ErrorProvider ([d0f8e4c](https://github.com/cozy/cozy-libs/commit/d0f8e4cbd2f7f389ee4a12880d564dde76deca3c))
  * Remove the stepIndex property from the config file ([4e38d06](https://github.com/cozy/cozy-libs/commit/4e38d060a19c9a517887d26f75053da607efab3b))
  * Add option to useKonnectorActions ([ad8bf05](https://github.com/cozy/cozy-libs/commit/ad8bf0596644e9f82b458ae955295d1b35d128e4))
  * Install konnector from intent ([2e8fd9e](https://github.com/cozy/cozy-libs/commit/2e8fd9ed6b5afd56852fd9cb14f5f5e23a0e7d37))
  * Remove all harvest.inappconnectors.enabled occurence ([1dde315](https://github.com/cozy/cozy-libs/commit/1dde315435a5f0b5674f09978fa0388ce9e86f85))
  * Update importAuto action ([5e997bf](https://github.com/cozy/cozy-libs/commit/5e997bf3c9ba93cedc6c1f8865abc16718b8839e))
* Update cozy-client from `40.2.0` to `40.3.0`
* Update cozy-device-helper from `2.7.0` to `3.0.0`
* Update cozy-harvest-lib from `15.0.0` to `17.2.1`
* Update cozy-intent from `2.13.0` to `2.15.0`
* Update cozy-realtime from `4.4.0` to `5.0.0`
* Update cozy-sharing from `7.1.3` to `9.0.0`
* Update cozy-ui from `90.7.0` to `91.2.0`

### 🐛 Bug Fixes

* by updating cozy-mespapiers-lib:
  * Now set default value when editing information ([d8b0098](https://github.com/cozy/cozy-libs/commit/d8b00989d6b511d6a1fa25e2fadcb785f84a8ae6))
  * The text field must not be hidden by the keyboard ([6e93b24](https://github.com/cozy/cozy-libs/commit/6e93b24045c7320d03cd426fdf1c242f5e858ebf))

# 3.0.21

### ✨ Features

* Update cozy-mespapiers-lib from 56.0.0 to 57.1.2
  * Redirect on the install path by Intent when click on a note ([fb2bb30](https://github.com/cozy/cozy-libs/commit/fb2bb30081bc87163014153597e827340be568a2))
  * Use Filename with midellipsis in PaperItem name ([fdd5270](https://github.com/cozy/cozy-libs/commit/fdd5270debc987d1b833edfbf324801b20dbe4d0))

### 🐛 Bug Fixes

* by updating cozy-mespapiers-lib:
  * Make sure the doc must be a file before using isNote ([2686603](https://github.com/cozy/cozy-libs/commit/2686603def1cd2d051e1dde065a9177879db5d59))

# 3.0.20

### ✨ Features

* Update cozy-mespapiers-lib from 45.0.0 to 56.0.0
  * ✨ Replace Thumbnail by cozy-ui one ([dd25050](https://github.com/cozy/cozy-libs/commit/dd25050a29f9b7600051227a4d8653a189a727bd))
  * ✨ Upgrade cozy-ui from 85.5.0 to 85.6.0 ([c9b017d](https://github.com/cozy/cozy-libs/commit/c9b017d036e015d85dec6d5f4eb7409da4980843))
  * Add expiration date and delay on stranger driver license.
  * Refactor of Steppers Dialog to use Cozy Dialog instead.
  * Change Passport & driver license illustrations
  * Add some health papers definitions ([b449f6f](https://github.com/cozy/cozy-libs/commit/b449f6f0b3cee6ebdd0f62a59f0988e72286be7f))
  * Remove mespapiers.migrated.metadata flag ([c815522](https://github.com/cozy/cozy-libs/commit/c815522f6a7b7c2c5c66ef718b5c68c56ed0a320))
  * Use a11y menu on home actions ([16052a7](https://github.com/cozy/cozy-libs/commit/16052a7a984fefd94adc8acea26df92ea7710179))
  * Use a11y menu on PaperLine ([243cd93](https://github.com/cozy/cozy-libs/commit/243cd934773e38194406d4f5d8d062c1b302f4c5))
  * Add other option to contract types ([fca1343](https://github.com/cozy/cozy-libs/commit/fca1343c20349874e89fff49f49815e9b77eeefb))
  * Radio step is not mandatory ([ae348df](https://github.com/cozy/cozy-libs/commit/ae348df8efe25bf8a79d2864fd13f06f78eacd64))
  * Add mespapiers.aa-suggestion.disabled flag ([e1342c9](https://github.com/cozy/cozy-libs/commit/e1342c9ce27d86304d312b1ab306b0133a269074))
  * Add PapersPaywall ([4b6fe3a](https://github.com/cozy/cozy-libs/commit/4b6fe3a597fbce6be7f357ce4c3dd359f9bd6a35))
  * Add `InstallAppFromIntent` component ([2384e35](https://github.com/cozy/cozy-libs/commit/2384e3512bd5e3c934139eaba2098efe28dfb4a3))
  * Add `isInstalledApp` helper ([7db71f4](https://github.com/cozy/cozy-libs/commit/7db71f48aedda51bb27a18223ca655d5a0c81fd7))
  * Update `redirectPaperCreation` ([8f2fc34](https://github.com/cozy/cozy-libs/commit/8f2fc34208e6b11fc2ecd9468cd3520da5180dcc))
* Change help modal wording
* Add sentry
* replace appname Mes papiers by Mes Papiers
* Add intents compliancy and cozy-interapp 0.8.0
* Update cozy-harvest-lib from `13.18.1` to `15.0.0`
* Update cozy-keys-lib from `4.3.0` to `5.0.0`
* Replace app icon (remove `beta`)
* Update cozy-scripts from 8.0.3 to 8.1.1
* Update cozy-interapp from 0.8.0 to 0.8.1
* Update cozy-client from 38.4.0 to 40.2.0
* Update cozy-ui from 85.5.0 to 90.3.0

### 🐛 Bug Fixes

* Wording of EmptyWithHeader ([4bc8845](https://github.com/cozy/cozy-libs/commit/4bc88455306931c1f233e573fed3d063bd9c40d2))
* by updating cozy-mespapiers-lib:
  * On InstallApp modal, redirect to the correct store (cozy/cozy-libs@8500ed9)
  * The cozyMetadata property does not always exist ([43141dc](https://github.com/cozy/cozy-libs/commit/43141dc171e3397c2e9fe548a5ef89c63233b65a))
  * Display a fileless account with other files ([8ca8e12](https://github.com/cozy/cozy-libs/commit/8ca8e1206e846644340461efd52fc92d583557d7))
  * Clicking on listItem should check the radio button ([900afb4](https://github.com/cozy/cozy-libs/commit/900afb4aa94f99da5974c184b21917d799b70ec1))
  * CreatePaper and createPaperByTheme wasn't spreading ref ([19e0148](https://github.com/cozy/cozy-libs/commit/19e01489f453b34bbe835d3cc535bc53ad894a86))
  * Illustration of national health insurance card ([e9ac821](https://github.com/cozy/cozy-libs/commit/e9ac8218c417edad6f6e757728366bf528b45401))
  * Step modal with Radio buttons ([8614483](https://github.com/cozy/cozy-libs/commit/86144834118c6f4f2400d4d0a6efe9c566bec644))
  * Flattened image on some browsers ([76eb3d4](https://github.com/cozy/cozy-libs/commit/76eb3d419ff248e0e9e405f00b01151c0c1c5c56))
  * Remove duplicate paperDefinition ([293c419](https://github.com/cozy/cozy-libs/commit/293c4194ab84e688da18b89365746e184fdd2ec9))

### 🔧 Tech

* Add terser-webpack-plugin `1.4.5` (see cozy/cozy-home@b0c5915)

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
