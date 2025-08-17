# Changelog
## [v3.0.1] - 2025-08-17
### :bug: Bug Fixes
- [`1226523`](https://github.com/scout-ch/hering/commit/12265235583d6a2c259f796d1474957931732a50) - fix SPA fallback page for proxy *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :wrench: Chores
- [`474d6ec`](https://github.com/scout-ch/hering/commit/474d6ec1a56333ddbc8d868dc5e8c0d113b45ae7) - **deps**: npm updates *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`015de95`](https://github.com/scout-ch/hering/commit/015de959e0c569a4af94899aecdaecd5ba85baa0) - **deps**: vitejs upgrades *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v3.0.0] - 2025-08-15
### :boom: BREAKING CHANGES
- due to [`981c0fc`](https://github.com/scout-ch/hering/commit/981c0fc7c04231e01e94a0cdad9d9c450a62bc97) - load data from the updated Hering API *(commit by [@mario-zelger](https://github.com/mario-zelger))*:

  the previous API is no longer supported


### :sparkles: New Features
- [`981c0fc`](https://github.com/scout-ch/hering/commit/981c0fc7c04231e01e94a0cdad9d9c450a62bc97) - load data from the updated Hering API *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`21f0f98`](https://github.com/scout-ch/hering/commit/21f0f98853f17f8e101354fa7125d750cdf325f3) - use language code in URL *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`9b933ab`](https://github.com/scout-ch/hering/commit/9b933abc83047ae7d0ecc86ca41debeb9d0876a6) - re-added legacy URL helper to redirect old hash-based routes *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :wrench: Chores
- [`bfd36eb`](https://github.com/scout-ch/hering/commit/bfd36eb43634394ab072fc4be420c5f748010de5) - **deps**: update NPM dependencies *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.6.1] - 2024-12-03
### :recycle: Refactors
- [`feb6b69`](https://github.com/scout-ch/hering/commit/feb6b69358461d0a24ecbd518bd864ca9741df76) - added basic error handling during data initialisation *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`e662632`](https://github.com/scout-ch/hering/commit/e662632ed3a281ea5b53dfd6bc15416a3f868a44) - added simple retry policy for API requests *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`7a2defb`](https://github.com/scout-ch/hering/commit/7a2defb03aa49260fdce671b64bfb2c6827e96ad) - keep modal header and footer always visible *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.6.0] - 2024-11-26
### :sparkles: New Features
- [`222621a`](https://github.com/scout-ch/hering/commit/222621afa68a9a91b82be2e0a8268fa0141cde59) - added ability to list swiss holidays for easier camp start selection [#12](https://github.com/scout-ch/hering/pull/12) *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :recycle: Refactors
- [`d6a4a73`](https://github.com/scout-ch/hering/commit/d6a4a737362bab38b87e23ce23d03ff71618fc25) - highlight non-default values instead of using filter reset button *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`1ea0e8c`](https://github.com/scout-ch/hering/commit/1ea0e8cb590c8a95240dc11743b4d42333444566) - only show delayed loading messages on initial load *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.5.1] - 2024-11-07
### :bug: Bug Fixes
- [`5e42947`](https://github.com/scout-ch/hering/commit/5e42947b98585b4e6942ee159e686e5605351188) - ensure form entry styling is consistent across browsers and platforms *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.5.0] - 2024-11-02
### :sparkles: New Features
- [`703cf4f`](https://github.com/scout-ch/hering/commit/703cf4f8d844418b601665a3eb935710204cdfff) - added loading and updating indication for calendar tasks *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`a4307a6`](https://github.com/scout-ch/hering/commit/a4307a6a136c5aa37ab89e12dd5af7dd05abdef1) - changed the UI for the calendar filter options *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`749ae01`](https://github.com/scout-ch/hering/commit/749ae0152012136b8faf4cb72b4b548a67a7f191) - added tooltips to explain certain calendar filters in more detail *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :bug: Bug Fixes
- [`bcbfd60`](https://github.com/scout-ch/hering/commit/bcbfd60a08202b1b8c419867112cc29ed8a9ab5e) - fix table scrolling on small screens *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :recycle: Refactors
- [`6f4b53d`](https://github.com/scout-ch/hering/commit/6f4b53d4d10e576b985485c373ffd65b563e8c6a) - optimize use of useEffect hooks *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`4494bff`](https://github.com/scout-ch/hering/commit/4494bff30552bb54e556547629ac58b095d40e17) - use explicit functions for Hering API calls *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.4.0] - 2024-10-25
### :sparkles: New Features
- [`b3ca8a8`](https://github.com/scout-ch/hering/commit/b3ca8a8b4bfdbb04bf52def204a1f2cfd3e0343d) - added ability to download tasks as an Excel workbook *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :recycle: Refactors
- [`3675adb`](https://github.com/scout-ch/hering/commit/3675adb98fe9ef536fcd67edb217ecb87fae86b1) - reformatted file *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`d1151f7`](https://github.com/scout-ch/hering/commit/d1151f7458fd0b1e0e9c95e1a60a80b4a978b17b) - CSS refactorings *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :art: Code Style Changes
- [`db7e49f`](https://github.com/scout-ch/hering/commit/db7e49f9104e8a1e773e16ffebfc12e56366fc84) - use file meaning instead of file type in download link *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`57bc295`](https://github.com/scout-ch/hering/commit/57bc2959ea02c93ff52bf3dbb2f540698e43a442) - added dropdown button component *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`1fff4bc`](https://github.com/scout-ch/hering/commit/1fff4bce302f87ab043910ba32ce16ea3b2015dd) - use dropdown button for calendar downloads *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`7c0daac`](https://github.com/scout-ch/hering/commit/7c0daac31ff7b1dc8a5c318b2d753a506437c9ad) - added style for calendar reset button *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`5b29968`](https://github.com/scout-ch/hering/commit/5b29968c3176825b917a0c6677a58019d01f21c1) - vertically align table content to middle *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :wrench: Chores
- [`030a32c`](https://github.com/scout-ch/hering/commit/030a32cf04ba53058dea10f6d018701ad1c2d8a2) - **deps**: axios update *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`91636c3`](https://github.com/scout-ch/hering/commit/91636c3a29d111494167bd50cd3d33eb3365e502) - **deps**: date-fns upgrade *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`ef91c89`](https://github.com/scout-ch/hering/commit/ef91c89fecfc07386bf7af6d17d9eb6270d9729a) - **deps**: i18next-browser-languagedetector upgrade *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`232acd8`](https://github.com/scout-ch/hering/commit/232acd8cdf10bfeec836eea837162b1efda6d8ce) - **deps**: ics upgrade *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`b22f5b5`](https://github.com/scout-ch/hering/commit/b22f5b549800beb8e89278e68207ee2203eaa7a0) - **deps**: react-i18next upgrade *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`f09730a`](https://github.com/scout-ch/hering/commit/f09730a6df2e64ebee940bc379ebfb0264ec2e6c) - **deps**: removed unnecessary react router dom types *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`c7872f8`](https://github.com/scout-ch/hering/commit/c7872f8783d2cd54eb2056c95e49d290db76bb5e) - **deps**: vite-tsconfig-paths upgrade *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`3db133b`](https://github.com/scout-ch/hering/commit/3db133b1686e3bda8d019725f491d425a89cc04b) - **deps**: use latest v5 TypeScript versions *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.3.1] - 2024-05-16
### :bug: Bug Fixes
- [`1960571`](https://github.com/scout-ch/hering/commit/1960571b1e23c652bb1db2175a08d733156ae99f) - validate parsed date before creating tasks [#30](https://github.com/scout-ch/hering/pull/30) *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`cae3807`](https://github.com/scout-ch/hering/commit/cae3807c24c09db5dc1d065558e5e50de5081a09) - use correct import for ics package *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`298d79e`](https://github.com/scout-ch/hering/commit/298d79e38a266c312a37d9117209ab0e7e609424) - use unique key for Link *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.3.0] - 2024-05-09
### :sparkles: New Features
- [`24e2525`](https://github.com/scout-ch/hering/commit/24e2525606004a4b7cdf8785e0af68d5ef24568d) - change active menu item while scrolling [#11](https://github.com/scout-ch/hering/pull/11) *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :bug: Bug Fixes
- [`86182de`](https://github.com/scout-ch/hering/commit/86182de7312d168ac15bd65fe49419dd90d6c667) - more robust navigation to hash location after page reload *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`a317f3b`](https://github.com/scout-ch/hering/commit/a317f3b3fa6bc1f3f1800e7666f5190bdfcc73c0) - use react dependency tracking correctly *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :recycle: Refactors
- [`b66370f`](https://github.com/scout-ch/hering/commit/b66370f2e62a23d94cf8b4a8d3a8db922a1cf637) - removed unused code *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :art: Code Style Changes
- [`5aba007`](https://github.com/scout-ch/hering/commit/5aba007c6d4ff84315f3de7aa5063add38e8852f) - use cursor pointer on open nav item *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`216c29c`](https://github.com/scout-ch/hering/commit/216c29c1c9395d23f2ee6aa9843f43dfdd00e1ac) - footer ui optimizations *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`9696dc4`](https://github.com/scout-ch/hering/commit/9696dc4e0eaf71d24c4b8f3d579954c4558c436b) - warning component without @emotion/styled dependency *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :wrench: Chores
- [`b052f7e`](https://github.com/scout-ch/hering/commit/b052f7e31bef7db251585135611f9740ad4806a5) - **deps**: npm dependency updates *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`2363b37`](https://github.com/scout-ch/hering/commit/2363b378835cbfab514a2e146d34b5f19cb64830) - **deps**: removed unused dependencies *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`249d16b`](https://github.com/scout-ch/hering/commit/249d16bcf15e2cb00b9c58a6a34620f032c75640) - **deps**: removed ESLint Jest extension *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.2.1] - 2024-04-16
### :recycle: Refactors
- [`52d3595`](https://github.com/scout-ch/hering/commit/52d3595d38364142c39a63ec2819fc09d3748bd8) - removed unnecessary Section component *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.2.0] - 2024-02-15
### :sparkles: New Features
- [`65f7a65`](https://github.com/scout-ch/hering/commit/65f7a65ea6a740ffcb9619adf83216091ad1d300) - added ability to set subtext in loading component *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :zap: Performance Improvements
- [`eb1708b`](https://github.com/scout-ch/hering/commit/eb1708b17742af42b0b47fa2ac55eea5f02b8dc3) - **app**: lazy load components for faster initial startup *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :recycle: Refactors
- [`04323b5`](https://github.com/scout-ch/hering/commit/04323b5c9174dac31ed48682e94a4161137033cf) - remove unnecessary whitespace in filename *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`a342f63`](https://github.com/scout-ch/hering/commit/a342f63eb14f36f8d53ea0323a8acf3eccdadd47) - load Font Awesome icons via module import *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`85f9b1f`](https://github.com/scout-ch/hering/commit/85f9b1f9cbe3a692bb3aca102b69a017e0a5144c) - removed unused parameter *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`4140b1f`](https://github.com/scout-ch/hering/commit/4140b1f9814c8351ba6991c65fe2ea8420e7b6b7) - updated folder structure and moved page components *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`8a26303`](https://github.com/scout-ch/hering/commit/8a2630335e199f37f3b1179664799aef52aa87d9) - moved less files to appropriate components *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`aa4cbfc`](https://github.com/scout-ch/hering/commit/aa4cbfc6a0723305f0e726cc3e34aaeb18e122e3) - moved shared components in separate subdirectories *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :wrench: Chores
- [`65e7a07`](https://github.com/scout-ch/hering/commit/65e7a07876a9dc82abf4ef3e7e2837efe15b6a5f) - **translation**: removed unused translations *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.1.0] - 2024-02-14
### :sparkles: New Features
- [`d4622a2`](https://github.com/scout-ch/hering/commit/d4622a26fb5e066f166de87c16ccc6d8960cbddb) - **calendar**: include calendar prefix in downloaded ics file name *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`b769859`](https://github.com/scout-ch/hering/commit/b769859523d6b0cd4d900a91e0a5cec16125a868) - **calendar**: added ability to download the tasks as a CSV file *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :bug: Bug Fixes
- [`4909d00`](https://github.com/scout-ch/hering/commit/4909d006dbe7de709af1c9904143f1940f450e90) - **calendar**: use 'flex-end' instead of 'end' css value *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :recycle: Refactors
- [`abac219`](https://github.com/scout-ch/hering/commit/abac219c5a69135f0d7f6a397970555f77cf04c3) - **calendar**: set deadline time to start of the day (00:00:00) *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`98a13db`](https://github.com/scout-ch/hering/commit/98a13db1bbacc5764b47996fd481f326f24b784d) - **calendar**: remove unnecessary button styling *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`46b2177`](https://github.com/scout-ch/hering/commit/46b21777a1657d3501d1dc6cb7f6161a6566a00c) - **calendar**: moved ics download button outside of calendar table *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`5c3516f`](https://github.com/scout-ch/hering/commit/5c3516f7dc2d26f24ffb6fdf2a6136b42f541549) - **calendar**: format deadline with double digit months *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`59f4f44`](https://github.com/scout-ch/hering/commit/59f4f4438b401560962c5afd6501b3fd6efcb500) - **calendar**: removed unused translation *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.0.1] - 2024-02-12
### :bug: Bug Fixes
- [`c5c3342`](https://github.com/scout-ch/hering/commit/c5c3342ecbd0c144be78c1f2972e114e6ac53caa) - set correct router base path *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v2.0.0] - 2024-02-12
### :boom: BREAKING CHANGES
- due to [`73485a6`](https://github.com/scout-ch/hering/commit/73485a60d6611eee335c1efcbb65fd4920bf7427) - added legacy URL redirect handler *(commit by [@mario-zelger](https://github.com/mario-zelger))*:

  added legacy URL redirect handler


### :sparkles: New Features
- [`de078f7`](https://github.com/scout-ch/hering/commit/de078f7642d712c90c15fbcd451854ad48d7f22b) - added loading view until data is ready *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`598ce93`](https://github.com/scout-ch/hering/commit/598ce93330e3a923c337c24a678ed2e3927c6051) - added loading component *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`4a1cdb7`](https://github.com/scout-ch/hering/commit/4a1cdb79c7c3eefe9a1d1105f5567800882430a0) - implemented client side search *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`73485a6`](https://github.com/scout-ch/hering/commit/73485a60d6611eee335c1efcbb65fd4920bf7427) - added legacy URL redirect handler *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`f88c591`](https://github.com/scout-ch/hering/commit/f88c591085f6254445f65e4d66704d7dc370cfd9) - store calendar form values in session storage *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`aa370f6`](https://github.com/scout-ch/hering/commit/aa370f68bf079dc273317c28e2b61d6cb1525ff5) - create tasks automatically on load and if relevant input changes *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`92a71e6`](https://github.com/scout-ch/hering/commit/92a71e6bcd821833f6feca88af54d38b4c75ee5a) - load impressum data from API *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :bug: Bug Fixes
- [`59f02e1`](https://github.com/scout-ch/hering/commit/59f02e1e001a4d1dd0aac930b7dcb587c4f96368) - use helper for section hash scrolling *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`af68a6a`](https://github.com/scout-ch/hering/commit/af68a6ad790f93ad420101707db354b44ac42068) - set link path from root *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`4775208`](https://github.com/scout-ch/hering/commit/4775208468c96c365beed58eca81353c2939597b) - use instance scrolling to start block *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`36e423a`](https://github.com/scout-ch/hering/commit/36e423a5b1243888710e67f598fa04c128f6dfa2) - warning view optimized *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`905f976`](https://github.com/scout-ch/hering/commit/905f976be2176d3d950176ecf0328738c3de35ff) - use language data from client response *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`2fb0b9b`](https://github.com/scout-ch/hering/commit/2fb0b9b20e01cd5ad95dbaf9aa24e158a0a1d2d0) - scroll to top if no hash is available *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :recycle: Refactors
- [`7e08f47`](https://github.com/scout-ch/hering/commit/7e08f47a9a367f458875da33dbc56068a69ef275) - refactoring and reformat code *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`49c7bb5`](https://github.com/scout-ch/hering/commit/49c7bb55a77d62040234e0677548b64a021b5b42) - ICS download component refactored *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`04039bb`](https://github.com/scout-ch/hering/commit/04039bbf552c37e3be9c5e3e93f35922ea8ab645) - removed unused properties *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`6e92253`](https://github.com/scout-ch/hering/commit/6e92253875eaa4919109713fbd09559b1a683050) - replace withTranslation with the useTranslation hook *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`809db3e`](https://github.com/scout-ch/hering/commit/809db3e1a79fc953e866deadf2fed64d3a7d204e) - renaming and reformatting *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`7d7ac4d`](https://github.com/scout-ch/hering/commit/7d7ac4d2dee49030f8138966f0305ea6f57faf4f) - rewrite CalendarForm into function component *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`dfa282b`](https://github.com/scout-ch/hering/commit/dfa282b7df6064f3395a199442f81eac2f8ba98f) - use consistent array notation *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`3520dd2`](https://github.com/scout-ch/hering/commit/3520dd2b16e3872ba0a0109f7bf2b7732a9391cf) - add navigate dependency *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`3581b1b`](https://github.com/scout-ch/hering/commit/3581b1b483d416dc8ddccc46c2e859dd5c476f5a) - removed unused local translation data *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :wrench: Chores
- [`ac19921`](https://github.com/scout-ch/hering/commit/ac1992103ad187c8eeed319c48da981886e11bbd) - React 18 upgrade and lot's of npm package updates *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`95c8ea6`](https://github.com/scout-ch/hering/commit/95c8ea6792d636650681a3a6f76c0f8a1b8f4b12) - use compatible TypeScript version *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`1b2a149`](https://github.com/scout-ch/hering/commit/1b2a149993d465b4f9f50f71728e0b26876fe5c0) - removed web vitals *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`d519e47`](https://github.com/scout-ch/hering/commit/d519e473c75bcdf92a7dc1a1faa39da1e06a4408) - removed unused test file *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`0dee779`](https://github.com/scout-ch/hering/commit/0dee7795aeffbe8f280a659902e3fc8288399d16) - use ES6 as target *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`4fb23fd`](https://github.com/scout-ch/hering/commit/4fb23fd314ce3fedd4f74c2f1dee7134222f12de) - **deps**: update and remove unused dependencies *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`61036ce`](https://github.com/scout-ch/hering/commit/61036ce62a58e55b97d2c71f4dedfccfbae1f139) - FontAwesome update *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`aaa6063`](https://github.com/scout-ch/hering/commit/aaa6063dbce47f756c346cdf86632e0a857d1aa3) - **deps**: move react-scripts to dev dependencies *(commit by [@mario-zelger](https://github.com/mario-zelger))*


[v2.0.0]: https://github.com/scout-ch/hering/compare/v1.0.0...v2.0.0
[v2.0.1]: https://github.com/scout-ch/hering/compare/v2.0.0...v2.0.1
[v2.1.0]: https://github.com/scout-ch/hering/compare/v2.0.1...v2.1.0
[v2.2.0]: https://github.com/scout-ch/hering/compare/v2.1.0...v2.2.0
[v2.2.1]: https://github.com/scout-ch/hering/compare/v2.2.0...v2.2.1
[v2.3.0]: https://github.com/scout-ch/hering/compare/v2.2.1...v2.3.0
[v2.3.1]: https://github.com/scout-ch/hering/compare/v2.3.0...v2.3.1
[v2.4.0]: https://github.com/scout-ch/hering/compare/v2.3.1...v2.4.0
[v2.5.0]: https://github.com/scout-ch/hering/compare/v2.4.0...v2.5.0
[v2.5.1]: https://github.com/scout-ch/hering/compare/v2.5.0...v2.5.1
[v2.6.0]: https://github.com/scout-ch/hering/compare/v2.5.1...v2.6.0
[v2.6.1]: https://github.com/scout-ch/hering/compare/v2.6.0...v2.6.1
[v3.0.0]: https://github.com/scout-ch/hering/compare/v2.6.1...v3.0.0
[v3.0.1]: https://github.com/scout-ch/hering/compare/v3.0.0...v3.0.1
