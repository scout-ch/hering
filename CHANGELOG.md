# Changelog
## [v3.4.0] - 2026-05-09
### :sparkles: New Features
- [`14d859d`](https://github.com/scout-ch/hering/commit/14d859d2188a2000a804ab898b4aef6366771f8a) - change language without needing to reload the site *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`130ac80`](https://github.com/scout-ch/hering/commit/130ac80fd4e33e35a57bce9ed2e6fc337897f8fc) - rewrite of the search functionality to use FlexSearch as the search index *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :bug: Bug Fixes
- [`778c26f`](https://github.com/scout-ch/hering/commit/778c26f574db0c1f4dfef97fda3d61e6c73323b6) - enhanced search result interaction with hover effects and navigation *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`86ca027`](https://github.com/scout-ch/hering/commit/86ca027673a0d923925b4e9c7a023e7f8caae776) - improved navigation with hover states *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`b1953da`](https://github.com/scout-ch/hering/commit/b1953dada2d3ad50f17d53e80529b3d529baf6e9) - redirect to home if a section was not found in the data *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`224fda6`](https://github.com/scout-ch/hering/commit/224fda6cd44848c5926eef27d2a57061cd667097) - updated search behavior to keep markdown content in the results *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`03772af`](https://github.com/scout-ch/hering/commit/03772af062ac9e885a5ea2ecb23e6cea28255d4e) - cache queried data indefinitely for the current session *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`a546a3d`](https://github.com/scout-ch/hering/commit/a546a3df56f03f97ecb181fd176cd3673a99ccc4) - **deps**: update dependency i18next to v26 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`83c3fb8`](https://github.com/scout-ch/hering/commit/83c3fb8da12ca22c3a9bcef28426dd45b8af76d8) - **deps**: update dependency react-tooltip to v6 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`99c3b83`](https://github.com/scout-ch/hering/commit/99c3b83109b2b0082b41c2792becd6e50977999f) - **deps**: React 19 upgrade *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :recycle: Refactors
- [`9837909`](https://github.com/scout-ch/hering/commit/9837909cc29bf5771d4e9c0a6c0d322744bfe375) - enhance search matching logic with normalization and type safety *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`5f61147`](https://github.com/scout-ch/hering/commit/5f61147a75b5b0d3522e9ab7f701d1157fb10ea2) - optimize search functionality by preprocessing chapters and removing Markdown links *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`811dab6`](https://github.com/scout-ch/hering/commit/811dab6f1b1a31de187fed658a30d02f40d94ce3) - improve search by preprocessing sentences on initial load *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`2caa8e6`](https://github.com/scout-ch/hering/commit/2caa8e6a54531de96df654ea05a2a29642fc5e42) - do section preprocessing via query select observer *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`f65fd04`](https://github.com/scout-ch/hering/commit/f65fd04e4b309a5fc05ae841eb8136b8f5bb42d9) - migrate routing to @tanstack/react-router *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :wrench: Chores
- [`49a6bbb`](https://github.com/scout-ch/hering/commit/49a6bbbddb762f989025fef7e8299866fb181e86) - **deps**: update dependency @types/node to v24.10.8 *(PR [#140](https://github.com/scout-ch/hering/pull/140) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`9c495db`](https://github.com/scout-ch/hering/commit/9c495db964e6591f6ad749bf98f09ba6dfa7c2ef) - **deps**: update dependency @tanstack/react-query to v5.90.17 *(PR [#141](https://github.com/scout-ch/hering/pull/141) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`264d5b3`](https://github.com/scout-ch/hering/commit/264d5b3d4ecee3ad10352c582658f88b04f70c54) - **deps**: update dependency @types/node to v24.10.9 *(PR [#142](https://github.com/scout-ch/hering/pull/142) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`fc406a0`](https://github.com/scout-ch/hering/commit/fc406a035c04098fce912dd2f828d5363f3a15a7) - **deps**: update dependency @tanstack/react-query to v5.90.18 *(PR [#143](https://github.com/scout-ch/hering/pull/143) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`e029b6d`](https://github.com/scout-ch/hering/commit/e029b6d99e9d52664fb7c3f5e825a435dcf3277e) - **deps**: update dependency @tanstack/react-query to v5.90.19 *(PR [#144](https://github.com/scout-ch/hering/pull/144) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`24fa7b5`](https://github.com/scout-ch/hering/commit/24fa7b5af8bd5f983b0feb11f4fcd4e7741e5c4e) - **deps**: update dependency i18next to v25.8.0 *(PR [#145](https://github.com/scout-ch/hering/pull/145) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`c00f275`](https://github.com/scout-ch/hering/commit/c00f27531dbbb634b43f9f8871fd17d719b0e280) - **deps**: update dependency @tanstack/react-query to v5.90.20 *(PR [#146](https://github.com/scout-ch/hering/pull/146) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`af1b5f0`](https://github.com/scout-ch/hering/commit/af1b5f0177a96e6210658b1c3b271c00a51d4121) - **deps**: update dependency axios to v1.13.3 *(PR [#147](https://github.com/scout-ch/hering/pull/147) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`66ffec2`](https://github.com/scout-ch/hering/commit/66ffec28f32bcfeea549a07dce27f677100b3b5c) - **deps**: update dependency axios to v1.13.4 *(PR [#148](https://github.com/scout-ch/hering/pull/148) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`a2a81b6`](https://github.com/scout-ch/hering/commit/a2a81b67f2d11477934d7dfe00af166b05a9d950) - **deps**: update dependency @vitejs/plugin-react to v5.1.3 *(PR [#149](https://github.com/scout-ch/hering/pull/149) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`0f1641c`](https://github.com/scout-ch/hering/commit/0f1641c579c608fae3b2c61d1d8140ef3bcd99c7) - **deps**: update dependency @types/node to v24.10.10 *(PR [#150](https://github.com/scout-ch/hering/pull/150) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`95dce1c`](https://github.com/scout-ch/hering/commit/95dce1c1ef27b9411d1a855e481f0f5b4e52af8d) - **deps**: update dependency i18next to v25.8.1 *(PR [#151](https://github.com/scout-ch/hering/pull/151) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`ed66dd6`](https://github.com/scout-ch/hering/commit/ed66dd6eb08493b33075aefd95836d8f6b8b4acb) - **deps**: update dependency i18next to v25.8.3 *(PR [#152](https://github.com/scout-ch/hering/pull/152) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`be8ad4a`](https://github.com/scout-ch/hering/commit/be8ad4a38c6057fcde732406d1ed55e5c774542d) - **deps**: update dependency @types/react to v18.3.28 *(PR [#153](https://github.com/scout-ch/hering/pull/153) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`735193b`](https://github.com/scout-ch/hering/commit/735193b5fe478d8fa738e0bed71efb43842740b9) - **deps**: update dependency @types/node to v24.10.11 *(PR [#155](https://github.com/scout-ch/hering/pull/155) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`5f2ddb3`](https://github.com/scout-ch/hering/commit/5f2ddb342faea1cded5bc76d3e5e5b0a9104f7fa) - **deps**: update dependency i18next to v25.8.4 *(PR [#154](https://github.com/scout-ch/hering/pull/154) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`4399c3e`](https://github.com/scout-ch/hering/commit/4399c3eff84157bde55e1a8cb77bb7ab83a4a15a) - **deps**: update dependency @fortawesome/react-fontawesome to v3.2.0 *(PR [#156](https://github.com/scout-ch/hering/pull/156) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`e661852`](https://github.com/scout-ch/hering/commit/e661852a48252572eeba3cfe0489c0b97decb80d) - **deps**: update dependency @types/node to v24.10.12 *(PR [#157](https://github.com/scout-ch/hering/pull/157) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`06f352c`](https://github.com/scout-ch/hering/commit/06f352cc7507a9c8e1ad619542a67ffda92116bc) - **deps**: update dependency axios to v1.13.5 *(PR [#158](https://github.com/scout-ch/hering/pull/158) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`18a249f`](https://github.com/scout-ch/hering/commit/18a249f986b323ede38b98d05f1fb69fbcac7a69) - **deps**: update dependency @vitejs/plugin-react to v5.1.4 *(PR [#160](https://github.com/scout-ch/hering/pull/160) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`3204b86`](https://github.com/scout-ch/hering/commit/3204b86145d728626ff427d33334ca12b9581b66) - **deps**: update dependency @types/node to v24.10.13 *(PR [#161](https://github.com/scout-ch/hering/pull/161) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`462274a`](https://github.com/scout-ch/hering/commit/462274a0545266d8a66f0b59ce28ff136c016872) - **deps**: update font awesome to v7.2.0 *(PR [#162](https://github.com/scout-ch/hering/pull/162) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`ee0a076`](https://github.com/scout-ch/hering/commit/ee0a07688cfee72efaa15da54dd3fc3354b19662) - **deps**: update dependency @tanstack/react-query to v5.90.21 *(PR [#163](https://github.com/scout-ch/hering/pull/163) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`45b4b6b`](https://github.com/scout-ch/hering/commit/45b4b6b0b90e6d692ad1b56973efce8b589e0ce0) - **deps**: update dependency i18next to v25.8.5 *(PR [#164](https://github.com/scout-ch/hering/pull/164) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`8654d75`](https://github.com/scout-ch/hering/commit/8654d75cef006907652ff4e59a151fa81cb4637a) - **deps**: update dependency i18next to v25.8.6 *(PR [#165](https://github.com/scout-ch/hering/pull/165) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`a38f532`](https://github.com/scout-ch/hering/commit/a38f53260344a31f22025c61b588608ce796905e) - **deps**: update dependency i18next-browser-languagedetector to v8.2.1 *(PR [#166](https://github.com/scout-ch/hering/pull/166) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`5a7c9a1`](https://github.com/scout-ch/hering/commit/5a7c9a1456226cc6ce133cbf4385bfb8dafc3143) - **deps**: update dependency i18next to v25.8.7 *(PR [#167](https://github.com/scout-ch/hering/pull/167) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`288424f`](https://github.com/scout-ch/hering/commit/288424f8cbe565baba5bf8150596f255d69f1ad4) - **deps**: update dependency i18next to v25.8.8 *(PR [#168](https://github.com/scout-ch/hering/pull/168) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`c18e8f1`](https://github.com/scout-ch/hering/commit/c18e8f1ad6c014affa4100af8c01fb978401ea28) - **deps**: update dependency i18next to v25.8.10 *(PR [#169](https://github.com/scout-ch/hering/pull/169) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`28250b7`](https://github.com/scout-ch/hering/commit/28250b7fcb174eb9ecc3e1faf495d2e8da8cfca6) - **deps**: update dependency i18next to v25.8.11 *(PR [#170](https://github.com/scout-ch/hering/pull/170) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`7aa23d4`](https://github.com/scout-ch/hering/commit/7aa23d4bb4b9128d6b1081eda947762fe984ca8e) - **deps**: update dependency i18next to v25.8.13 *(PR [#171](https://github.com/scout-ch/hering/pull/171) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`75b76c6`](https://github.com/scout-ch/hering/commit/75b76c61b93eb46626fc3eb6c0bc71356ccaec8c) - **deps**: update dependency @types/node to v24.10.14 *(PR [#172](https://github.com/scout-ch/hering/pull/172) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`b67aa3f`](https://github.com/scout-ch/hering/commit/b67aa3fcb57b1d0cbf4095f18de62d29f53f0389) - **deps**: update dependency @types/node to v24.10.15 *(PR [#173](https://github.com/scout-ch/hering/pull/173) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`3544eeb`](https://github.com/scout-ch/hering/commit/3544eebc30123e2b2cb055fc6c91c5ae790b4fe0) - **deps**: update dependency axios to v1.13.6 *(PR [#175](https://github.com/scout-ch/hering/pull/175) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`7ad9f31`](https://github.com/scout-ch/hering/commit/7ad9f31eb04b7923b2219839adca657eb9e5f560) - **deps**: update dependency @types/node to v24.11.0 *(PR [#176](https://github.com/scout-ch/hering/pull/176) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`9d69aa0`](https://github.com/scout-ch/hering/commit/9d69aa061d1347fd37e089e91a743a1a3cbb768d) - **deps**: update dependency i18next to v25.8.14 *(PR [#177](https://github.com/scout-ch/hering/pull/177) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`5d85e5f`](https://github.com/scout-ch/hering/commit/5d85e5f05a0f1ef063b10a52a8e6779c5a0a75a1) - **deps**: update docker/setup-qemu-action action to v4 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`8518af2`](https://github.com/scout-ch/hering/commit/8518af2869372e980a3441f254fc0694649d8aad) - **deps**: update docker/login-action action to v4 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`406518a`](https://github.com/scout-ch/hering/commit/406518a1248c5392fb53a1a47ef703c054b25346) - **deps**: update docker/setup-buildx-action action to v4 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`58655a2`](https://github.com/scout-ch/hering/commit/58655a2c8c939b3ad9dad77b6626a942ee07a191) - **deps**: update github artifact actions *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`da29252`](https://github.com/scout-ch/hering/commit/da292525c45a4af034dd141e6f5ebb12a3d83f0d) - **deps**: update dependency dompurify to v3.3.2 *(PR [#181](https://github.com/scout-ch/hering/pull/181) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`65f4689`](https://github.com/scout-ch/hering/commit/65f468943fe880f9a8984a29cbfbb27e9636039d) - **deps**: update docker/metadata-action action to v6 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`dacfee0`](https://github.com/scout-ch/hering/commit/dacfee0f2a72bbb7a1a115106879e1a8ab6926bd) - **deps**: update docker/build-push-action action to v7 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`990da78`](https://github.com/scout-ch/hering/commit/990da7827528556fdab19b77f6c339b24712dffe) - **deps**: update dependency @types/node to v24.11.1 *(PR [#184](https://github.com/scout-ch/hering/pull/184) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`59b0b29`](https://github.com/scout-ch/hering/commit/59b0b29b5ac8858bcd7514921a284ac1b14ffe7e) - **deps**: update dependency @types/node to v24.11.2 *(PR [#185](https://github.com/scout-ch/hering/pull/185) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`cd65c62`](https://github.com/scout-ch/hering/commit/cd65c62961b394c4bcc05acdfa4061a7c80d6757) - **deps**: update dependency @types/node to v24.12.0 *(PR [#186](https://github.com/scout-ch/hering/pull/186) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`79e1c53`](https://github.com/scout-ch/hering/commit/79e1c53808393e6b5cddaa6266fccc56431d4db5) - **deps**: update dependency @tanstack/react-router to v1.166.3 *(PR [#187](https://github.com/scout-ch/hering/pull/187) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`eb0d354`](https://github.com/scout-ch/hering/commit/eb0d354c388b4905d1de77c8abbad72ca52dff70) - **deps**: update dependency i18next to v25.8.17 *(PR [#188](https://github.com/scout-ch/hering/pull/188) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`9752bf1`](https://github.com/scout-ch/hering/commit/9752bf1a3c6d5796cd421880c6b1fc461c5a073e) - **deps**: update dependency @tanstack/react-router to v1.166.6 *(PR [#189](https://github.com/scout-ch/hering/pull/189) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`cebd3bd`](https://github.com/scout-ch/hering/commit/cebd3bd9bde8b5afacb611d754a933488f43894c) - **deps**: update dependency @tanstack/react-router to v1.166.7 *(PR [#190](https://github.com/scout-ch/hering/pull/190) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`0ec9902`](https://github.com/scout-ch/hering/commit/0ec9902c04d2e920ffd4f4fe0bd3c6432eaf156c) - **deps**: update dependency less to v4.6.2 *(PR [#191](https://github.com/scout-ch/hering/pull/191) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`73b2c7e`](https://github.com/scout-ch/hering/commit/73b2c7e3c791dfa0b8d274262f468d3019c03c86) - **deps**: update dependency dompurify to v3.3.3 *(PR [#192](https://github.com/scout-ch/hering/pull/192) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`0b7a723`](https://github.com/scout-ch/hering/commit/0b7a72379ab931601e65c50634cc453c367041e4) - **deps**: update dependency i18next to v25.8.18 *(PR [#193](https://github.com/scout-ch/hering/pull/193) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`c33d742`](https://github.com/scout-ch/hering/commit/c33d742d908db6bb0d5a796d9c326fcf7eafe5ac) - **deps**: update dependency less to v4.6.3 *(PR [#194](https://github.com/scout-ch/hering/pull/194) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`22e61c2`](https://github.com/scout-ch/hering/commit/22e61c2af441de22a2050e0b020e42c568eb1318) - **deps**: update dependency less to v4.6.4 *(PR [#195](https://github.com/scout-ch/hering/pull/195) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`bc81f02`](https://github.com/scout-ch/hering/commit/bc81f020d3f814602905e35a16cc72e469bf1748) - **deps**: update dependency @tanstack/react-router to v1.167.0 *(PR [#196](https://github.com/scout-ch/hering/pull/196) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`7a8e8ca`](https://github.com/scout-ch/hering/commit/7a8e8ca5c4ceb9ef8a7f061aebd44a76ee4ecdba) - **deps**: update dependency @vitejs/plugin-react to v5.2.0 *(PR [#197](https://github.com/scout-ch/hering/pull/197) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`bfb7a9e`](https://github.com/scout-ch/hering/commit/bfb7a9e749d8c6e3bdf1403d24ab4fd4d1491eb0) - **deps**: update dependency @tanstack/react-router to v1.167.5 *(PR [#199](https://github.com/scout-ch/hering/pull/199) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`7688de0`](https://github.com/scout-ch/hering/commit/7688de01f547eb6e6b426c7bbcf83ab6b9b45b5f) - **deps**: update dependency i18next to v25.8.20 *(PR [#200](https://github.com/scout-ch/hering/pull/200) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`01b58d2`](https://github.com/scout-ch/hering/commit/01b58d2617c8f888fa3f6a8be189a8c428d5ade2) - **deps**: update dependency @fortawesome/react-fontawesome to v3.3.0 *(PR [#203](https://github.com/scout-ch/hering/pull/203) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`10b4995`](https://github.com/scout-ch/hering/commit/10b499524b00ce979e99c6a0ad8a27a196867d58) - **deps**: update dependency @tanstack/react-router to v1.168.1 *(PR [#204](https://github.com/scout-ch/hering/pull/204) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`2035524`](https://github.com/scout-ch/hering/commit/2035524a9375cb094b5b4f018668b0abfdb0ff22) - **deps**: update dependency i18next to v25.9.0 *(PR [#205](https://github.com/scout-ch/hering/pull/205) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`5551c1e`](https://github.com/scout-ch/hering/commit/5551c1e99f6af2240d3198eac058baeaec2c6949) - **deps**: update dependency i18next to v25.10.2 *(PR [#206](https://github.com/scout-ch/hering/pull/206) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`b384ecc`](https://github.com/scout-ch/hering/commit/b384ecccf0dfd5cf5888291dbbab9ebaf6c186ce) - **deps**: update dependency ics to v3.9.0 *(PR [#207](https://github.com/scout-ch/hering/pull/207) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`0f43064`](https://github.com/scout-ch/hering/commit/0f43064e2ddcb73d843cf1ca43b7a79cddb99a87) - **deps**: update dependency i18next to v25.10.3 *(PR [#208](https://github.com/scout-ch/hering/pull/208) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`f2bcc37`](https://github.com/scout-ch/hering/commit/f2bcc37db420458b29c72f2195ac0f48fcbf7b34) - **deps**: update dependency @tanstack/react-router to v1.168.2 *(PR [#209](https://github.com/scout-ch/hering/pull/209) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`4102201`](https://github.com/scout-ch/hering/commit/41022010edd7752b0c7eef8bae1ee8ce27e26001) - **deps**: update dependency i18next to v25.10.4 *(PR [#210](https://github.com/scout-ch/hering/pull/210) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`c201554`](https://github.com/scout-ch/hering/commit/c2015549a033225817b4b716e661a148a849ce73) - **deps**: update dependency i18next to v25.10.5 *(PR [#211](https://github.com/scout-ch/hering/pull/211) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`8b0d918`](https://github.com/scout-ch/hering/commit/8b0d918896a358981fc1250627c922db351e364d) - **deps**: update dependency @tanstack/react-query to v5.95.2 *(PR [#201](https://github.com/scout-ch/hering/pull/201) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`a56821d`](https://github.com/scout-ch/hering/commit/a56821df4ded8316abfb22f41903f36bbf236634) - **deps**: update dependency @tanstack/react-router to v1.168.10 *(PR [#212](https://github.com/scout-ch/hering/pull/212) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`54859fd`](https://github.com/scout-ch/hering/commit/54859fdf98c12610e2ffd5b5d7d301d1aa62c782) - **deps**: update dependency i18next to v25.10.10 *(PR [#213](https://github.com/scout-ch/hering/pull/213) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`2d7bd27`](https://github.com/scout-ch/hering/commit/2d7bd271b9639b3dec006c6367da261597237a68) - **deps**: update dependency @tanstack/react-query to v5.96.0 *(PR [#215](https://github.com/scout-ch/hering/pull/215) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`b35eada`](https://github.com/scout-ch/hering/commit/b35eadaba06cea0fc8635deb4c96c054ca39f919) - **deps**: update dependency ics to v3.11.0 *(PR [#216](https://github.com/scout-ch/hering/pull/216) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`837b5ac`](https://github.com/scout-ch/hering/commit/837b5acd09b6411df51a52c641a5c6a3cb56c0d0) - **deps**: update dependency @tanstack/react-query to v5.96.1 *(PR [#220](https://github.com/scout-ch/hering/pull/220) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`ee8ee59`](https://github.com/scout-ch/hering/commit/ee8ee598149ea78abf62a2ec4b572cabdb219ee2) - **deps**: update dependency vite to v7.3.2 [security] *(PR [#221](https://github.com/scout-ch/hering/pull/221) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`5de70c9`](https://github.com/scout-ch/hering/commit/5de70c9658dbc8b97c755767b18a15d148076d7a) - **deps**: update dependency @tanstack/react-query to v5.96.2 *(PR [#223](https://github.com/scout-ch/hering/pull/223) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`a93a4c8`](https://github.com/scout-ch/hering/commit/a93a4c8c8489424227b3bdc9edb480f18d1946ad) - **deps**: update dependency @types/node to v24.12.2 *(PR [#224](https://github.com/scout-ch/hering/pull/224) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`cb7e032`](https://github.com/scout-ch/hering/commit/cb7e032433679bcb13ca62fdb95777474549189a) - **deps**: update dependency axios to v1.15.0 [security] *(PR [#225](https://github.com/scout-ch/hering/pull/225) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`6fbe166`](https://github.com/scout-ch/hering/commit/6fbe16601c452d57c52ede0ba4c01915db6f84ce) - **deps**: update dependency dompurify to v3.4.0 [security] *(PR [#226](https://github.com/scout-ch/hering/pull/226) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`e1181a3`](https://github.com/scout-ch/hering/commit/e1181a39281592d3d73b1c6c034ad06bcf103ba0) - **deps**: update dependency @tanstack/react-query to v5.97.0 *(PR [#227](https://github.com/scout-ch/hering/pull/227) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`16b6aac`](https://github.com/scout-ch/hering/commit/16b6aac59e1e9673a72a218ce9fbbc7119e75c82) - **deps**: update dependency react-tooltip to v5.30.1 *(PR [#228](https://github.com/scout-ch/hering/pull/228) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`40d541f`](https://github.com/scout-ch/hering/commit/40d541fc9aedb69ea1c7c7fd2a055754dd851a5d) - **deps**: update dependency @tanstack/react-router to v1.168.13 *(PR [#229](https://github.com/scout-ch/hering/pull/229) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`12341df`](https://github.com/scout-ch/hering/commit/12341df0f734ec6d1160c0e8a0e2920179fb1846) - **deps**: update dependency @tanstack/react-router to v1.168.15 *(PR [#230](https://github.com/scout-ch/hering/pull/230) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`aa1e695`](https://github.com/scout-ch/hering/commit/aa1e695e5699a8bf09a1c47c62679f061969f1f2) - **deps**: update dependency @tanstack/react-query to v5.99.0 *(PR [#232](https://github.com/scout-ch/hering/pull/232) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`f8e7125`](https://github.com/scout-ch/hering/commit/f8e7125a256ff477f3c8e16be58c05d64979dadd) - **deps**: update dependency @tanstack/react-router to v1.168.18 *(PR [#231](https://github.com/scout-ch/hering/pull/231) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`54c4ae2`](https://github.com/scout-ch/hering/commit/54c4ae29aa021c3f9bd3c6473f1f550806650446) - **deps**: update dependency @tanstack/react-router to v1.168.19 *(PR [#233](https://github.com/scout-ch/hering/pull/233) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`83b086a`](https://github.com/scout-ch/hering/commit/83b086ac998fdc9d46883f3af774a42c32501463) - **deps**: update dependency @tanstack/react-router to v1.168.21 *(PR [#234](https://github.com/scout-ch/hering/pull/234) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`c2f1cf9`](https://github.com/scout-ch/hering/commit/c2f1cf987bf3548eea1358e34a65b36feb2e6c4a) - **deps**: update actions/github-script action to v9 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`404abef`](https://github.com/scout-ch/hering/commit/404abef21801a177e09ab1a9df1277b7620816b1) - **deps**: update dependency @tanstack/react-router to v1.168.22 *(PR [#235](https://github.com/scout-ch/hering/pull/235) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`1553db2`](https://github.com/scout-ch/hering/commit/1553db2f8bfcc7a4bd577033850a2937531f05fc) - **deps**: update dependency unist-util-visit to v5.1.0 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`ebabe1a`](https://github.com/scout-ch/hering/commit/ebabe1a9a35691c3b930ac69c1ae0fe7ccc10ff1) - **deps**: updated dependencies *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`c146b59`](https://github.com/scout-ch/hering/commit/c146b59de1b024d3b91d0019f0880148241ec679) - **deps**: Vite 8 upgrade *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`6d5c07d`](https://github.com/scout-ch/hering/commit/6d5c07dd4631f0214560917c1864b7192442a870) - **deps**: update dependency i18next to v26.0.8 *(PR [#239](https://github.com/scout-ch/hering/pull/239) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`3d6b9e6`](https://github.com/scout-ch/hering/commit/3d6b9e629066414ed2aa9d958315d02d791a5459) - **deps**: update dependency @tanstack/react-router to v1.168.24 *(PR [#240](https://github.com/scout-ch/hering/pull/240) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`ca4806c`](https://github.com/scout-ch/hering/commit/ca4806c7c9388a257b3bf962d9053da4760ab0e1) - **deps**: update dependency @tanstack/react-query to v5.100.5 *(PR [#241](https://github.com/scout-ch/hering/pull/241) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`34b477c`](https://github.com/scout-ch/hering/commit/34b477cf6b98e0422349f16fa8c058b003eb6443) - **deps**: update dependency @tanstack/react-router to v1.168.25 *(PR [#242](https://github.com/scout-ch/hering/pull/242) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`76f2644`](https://github.com/scout-ch/hering/commit/76f26442ea4e1b961a0684888f70a9b92bff8a97) - **deps**: update dependency @tanstack/react-query to v5.100.6 *(PR [#243](https://github.com/scout-ch/hering/pull/243) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`0366d30`](https://github.com/scout-ch/hering/commit/0366d30ac22a2a9300ffe9c686b731eb518c7342) - **deps**: update dependency @tanstack/react-router to v1.168.26 *(PR [#244](https://github.com/scout-ch/hering/pull/244) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`92757c7`](https://github.com/scout-ch/hering/commit/92757c78b56b5871bee26ac577ce3344a70a047a) - **deps**: update dependency dompurify to v3.4.2 *(PR [#245](https://github.com/scout-ch/hering/pull/245) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`136f302`](https://github.com/scout-ch/hering/commit/136f302652b31798eafeb7f8ae39b69b97d0a4b9) - **deps**: update dependency @tanstack/react-router to v1.169.1 *(PR [#246](https://github.com/scout-ch/hering/pull/246) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`7851540`](https://github.com/scout-ch/hering/commit/7851540b499e36386dc4d501433f2db169c7e87d) - **deps**: update dependency @tanstack/react-query to v5.100.7 *(PR [#247](https://github.com/scout-ch/hering/pull/247) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`c77e2f7`](https://github.com/scout-ch/hering/commit/c77e2f7af42740760d08147ed2b5a8bb7a4f1930) - **deps**: update dependency @tanstack/react-query to v5.100.8 *(PR [#248](https://github.com/scout-ch/hering/pull/248) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`1b07f7f`](https://github.com/scout-ch/hering/commit/1b07f7f40c4f8bf2761f0035c1f0cc2e4e848cfd) - **deps**: update dependency react-i18next to v17.0.6 *(PR [#249](https://github.com/scout-ch/hering/pull/249) by [@renovate[bot]](https://github.com/apps/renovate))*


## [v3.3.1] - 2026-01-11
### :bug: Bug Fixes
- [`1ea3ef0`](https://github.com/scout-ch/hering/commit/1ea3ef0898f9b320afabcf48c34830702a5cd6a2) - fix usage of updated non-root web server image *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v3.3.0] - 2026-01-11
### :sparkles: New Features
- [`87b3e1f`](https://github.com/scout-ch/hering/commit/87b3e1ffb2d5ec9e19df62cf38bcce377d0dda18) - added ability to install the Hering as a PWA *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :wrench: Chores
- [`844b463`](https://github.com/scout-ch/hering/commit/844b463a10eb4a5833f0079f8305f20a0403bcbb) - **deps**: update dependency vite to v7.2.4 *(PR [#111](https://github.com/scout-ch/hering/pull/111) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`290ef3e`](https://github.com/scout-ch/hering/commit/290ef3e93e458e5593d140623a20cf1912e43a2b) - **deps**: update actions/checkout action to v6 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`1059021`](https://github.com/scout-ch/hering/commit/105902143d9346ac29f240e5aa887f98fedf8a2c) - **deps**: update dependency @tanstack/react-query to v5.90.11 *(PR [#113](https://github.com/scout-ch/hering/pull/113) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`834b3ab`](https://github.com/scout-ch/hering/commit/834b3abd60b1061b878bbe5d26a981b1db884d18) - **deps**: update dependency @fortawesome/react-fontawesome to v3.1.1 *(PR [#114](https://github.com/scout-ch/hering/pull/114) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`b2b65eb`](https://github.com/scout-ch/hering/commit/b2b65ebf797f4fffb66e2e8da88725c5955da329) - **deps**: update dependency vite to v7.2.6 *(PR [#115](https://github.com/scout-ch/hering/pull/115) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`a9c5008`](https://github.com/scout-ch/hering/commit/a9c50087bc8a3cb30bfad6a0974e8ffc047af023) - **deps**: update dependency i18next to v25.7.1 *(PR [#116](https://github.com/scout-ch/hering/pull/116) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`5580b91`](https://github.com/scout-ch/hering/commit/5580b91bbf1e1decc071b4ad564be199194ad86d) - **deps**: update dependency @tanstack/react-query to v5.90.12 *(PR [#117](https://github.com/scout-ch/hering/pull/117) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`a232aa0`](https://github.com/scout-ch/hering/commit/a232aa05fe8d0e933d08f5fed25b4034d637edc5) - **deps**: update dependency vite to v7.2.7 *(PR [#118](https://github.com/scout-ch/hering/pull/118) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`5fa4ca9`](https://github.com/scout-ch/hering/commit/5fa4ca9e156a77be54f7b80051a710f4676e3a41) - **deps**: update dependency i18next to v25.7.2 *(PR [#119](https://github.com/scout-ch/hering/pull/119) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`9c9107f`](https://github.com/scout-ch/hering/commit/9c9107f67c01f63c13728f5d0ae6950b2a89c52b) - **deps**: update dependency @vitejs/plugin-react to v5.1.2 *(PR [#120](https://github.com/scout-ch/hering/pull/120) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`e007fc6`](https://github.com/scout-ch/hering/commit/e007fc62f18b3ebd3505854bceef21bf94e302b2) - **deps**: update dependency dompurify to v3.3.1 *(PR [#121](https://github.com/scout-ch/hering/pull/121) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`89f89e6`](https://github.com/scout-ch/hering/commit/89f89e65f1005ed2089c6601742d10991ab2dd09) - **deps**: update dependency @types/node to v24.10.2 *(PR [#122](https://github.com/scout-ch/hering/pull/122) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`6790e29`](https://github.com/scout-ch/hering/commit/6790e29a164dc00643db392d66d68a9e7fb35274) - **deps**: update dependency @types/node to v24.10.3 *(PR [#123](https://github.com/scout-ch/hering/pull/123) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`0af788f`](https://github.com/scout-ch/hering/commit/0af788f11884337ecf1921dca118fab54db68ef1) - **deps**: update dependency @types/node to v24.10.4 *(PR [#126](https://github.com/scout-ch/hering/pull/126) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`545fd0c`](https://github.com/scout-ch/hering/commit/545fd0cfedc22448d2f7cd2f0d3e381791f9386b) - **deps**: update dependency less to v4.5.1 *(PR [#127](https://github.com/scout-ch/hering/pull/127) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`4ca15dc`](https://github.com/scout-ch/hering/commit/4ca15dcce7ffcb012d092a25096b99bb829daf67) - **deps**: update dependency i18next to v25.7.3 *(PR [#129](https://github.com/scout-ch/hering/pull/129) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`bbb31e9`](https://github.com/scout-ch/hering/commit/bbb31e9ef8e17ac866e12c7d2d473a95764879b5) - **deps**: update dependency vite to v7.3.0 *(PR [#130](https://github.com/scout-ch/hering/pull/130) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`8dccc19`](https://github.com/scout-ch/hering/commit/8dccc192cb795ecd9ce1e146fbec2e5df09ccabe) - **deps**: update dependency @tanstack/react-query to v5.90.13 *(PR [#131](https://github.com/scout-ch/hering/pull/131) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`c21e980`](https://github.com/scout-ch/hering/commit/c21e98052e62dc4a53f73c87f79cb4bf248a3b85) - **deps**: update dependency @tanstack/react-query to v5.90.14 *(PR [#132](https://github.com/scout-ch/hering/pull/132) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`d0f0313`](https://github.com/scout-ch/hering/commit/d0f0313f2d8d92211f5600f43e9b1ce1b154b96b) - **deps**: update dependency @tanstack/react-query to v5.90.15 *(PR [#133](https://github.com/scout-ch/hering/pull/133) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`91b0232`](https://github.com/scout-ch/hering/commit/91b0232095f54a5ab5bf72bf8a9497abd73f5402) - **deps**: update dependency @tanstack/react-query to v5.90.16 *(PR [#134](https://github.com/scout-ch/hering/pull/134) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`2858fc4`](https://github.com/scout-ch/hering/commit/2858fc463e65fcf9f95b8389666a5ba845249355) - **deps**: update actions/cache action to v5 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`bfb21e9`](https://github.com/scout-ch/hering/commit/bfb21e9e10b9d75fbfcde56511ee029fe2429227) - **deps**: update github artifact actions *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`1b50753`](https://github.com/scout-ch/hering/commit/1b50753f121fa26558428ba9bc03e31ea4dcf485) - **deps**: update dependency vite to v7.3.1 *(PR [#135](https://github.com/scout-ch/hering/pull/135) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`3d46343`](https://github.com/scout-ch/hering/commit/3d46343c90ea2d4cd2a4bcb37cfc14a1e30bff75) - **deps**: update dependency i18next to v25.7.4 *(PR [#136](https://github.com/scout-ch/hering/pull/136) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`e3a8f4e`](https://github.com/scout-ch/hering/commit/e3a8f4e9c560e680798e21ab5bb1e7330bdeb9b7) - **deps**: update react-router monorepo to v6.30.3 *(PR [#137](https://github.com/scout-ch/hering/pull/137) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`dc9ad4c`](https://github.com/scout-ch/hering/commit/dc9ad4c2246ce88ebd95ac1ee41e12e4edc2b4ae) - **deps**: update dependency @types/node to v24.10.6 *(PR [#138](https://github.com/scout-ch/hering/pull/138) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`fcc6336`](https://github.com/scout-ch/hering/commit/fcc6336c8334bafd45ba7f2f906c0adfe5f732ff) - **deps**: update dependency @types/node to v24.10.7 *(PR [#139](https://github.com/scout-ch/hering/pull/139) by [@renovate[bot]](https://github.com/apps/renovate))*


## [v3.2.3] - 2025-11-20
### :bug: Bug Fixes
- [`8d11a7c`](https://github.com/scout-ch/hering/commit/8d11a7ca6689d3704be321c6e077b20f3e9594d8) - convert dates to UTC when passing them to `exeljs` for proper date handling [#110](https://github.com/scout-ch/hering/pull/110) *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :wrench: Chores
- [`dd8015a`](https://github.com/scout-ch/hering/commit/dd8015a02c18fae94226ee6f282741fa6125d5f5) - **deps**: update react-router monorepo to v6.30.2 *(PR [#105](https://github.com/scout-ch/hering/pull/105) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`d690452`](https://github.com/scout-ch/hering/commit/d69045241fb422ddcdc651d9e4de40921c9d3196) - **deps**: update dependency @tanstack/react-query to v5.90.9 *(PR [#106](https://github.com/scout-ch/hering/pull/106) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`0fdc3db`](https://github.com/scout-ch/hering/commit/0fdc3db6ec431332019586699af344687f0ebbbb) - **deps**: update dependency @tanstack/react-query to v5.90.10 *(PR [#107](https://github.com/scout-ch/hering/pull/107) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`2dd7122`](https://github.com/scout-ch/hering/commit/2dd7122d88ab30f0169c83f0f1f502aff787e4a1) - **deps**: update dependency @types/react to v18.3.27 *(PR [#108](https://github.com/scout-ch/hering/pull/108) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`9bba9fb`](https://github.com/scout-ch/hering/commit/9bba9fb57db8b9970f32db37553d79af13c3e7c7) - **deps**: update dependency i18next to v25.6.3 *(PR [#109](https://github.com/scout-ch/hering/pull/109) by [@renovate[bot]](https://github.com/apps/renovate))*


## [v3.2.2] - 2025-11-12
### :bug: Bug Fixes
- [`c84270c`](https://github.com/scout-ch/hering/commit/c84270c484bb8addca6e9b4c985c014d45baecc9) - update dependencies in useEffect to watch for sectionsById *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v3.2.1] - 2025-11-12
### :bug: Bug Fixes
- [`9f5ffa8`](https://github.com/scout-ch/hering/commit/9f5ffa8ace459891695edd69e4471c577f1e8568) - limit max width of images *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`2f5927f`](https://github.com/scout-ch/hering/commit/2f5927f05a6daca724a5d70938b74613fdc127bf) - updated image alt text parsing of width and height with a new format *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`3b0d4e2`](https://github.com/scout-ch/hering/commit/3b0d4e2e520ed5ab78ad3b3b74e1415414833120) - improved redirect handling for unknown languages *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`43b8036`](https://github.com/scout-ch/hering/commit/43b8036a866701cfb6e647de9a4e27d113db877b) - use page menu names from client side translations *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`e3c0b13`](https://github.com/scout-ch/hering/commit/e3c0b13dd4e2a68a2c0089a216315908158c4abe) - add artificial calendar task update delay only after first render *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :zap: Performance Improvements
- [`69f64c8`](https://github.com/scout-ch/hering/commit/69f64c8e3bc456246ba2b9d570956668741d2e44) - load search page content from directly from translations instead of parsing JSON *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`1d29c91`](https://github.com/scout-ch/hering/commit/1d29c915c0aa8db756a333bf0798c6a2cf6142fc) - optimized loading of components and API responses *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :wrench: Chores
- [`1a60aea`](https://github.com/scout-ch/hering/commit/1a60aea87632569d0f9b358afcabd3e7ba17397b) - **deps**: update dependency i18next to v25.6.2 *(PR [#101](https://github.com/scout-ch/hering/pull/101) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`e2cb7f0`](https://github.com/scout-ch/hering/commit/e2cb7f0892ccc1b2563a8e9724418b042eadb743) - **deps**: update dependency @types/node to v24.10.1 *(PR [#102](https://github.com/scout-ch/hering/pull/102) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`2b271a8`](https://github.com/scout-ch/hering/commit/2b271a8569d8afe038dc70a8d0043035bece7b96) - **deps**: update dependency @vitejs/plugin-react to v5.1.1 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`3bd64eb`](https://github.com/scout-ch/hering/commit/3bd64ebbca8082b81ab6c43f329fe0cc7c5ecb43) - **deps**: update dependency @tanstack/react-query to v5.90.8 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*


## [v3.2.0] - 2025-11-09
### :sparkles: New Features
- [`cb57aea`](https://github.com/scout-ch/hering/commit/cb57aeab80b12ddb2357dd90f3df283f1958f545) - use new API endpoint to load single page information *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :wrench: Chores
- [`11a80a8`](https://github.com/scout-ch/hering/commit/11a80a8eb9c6d8b687df1979f4d6008ad1c5c771) - **deps**: update dependency @types/node to v24.7.0 *(PR [#73](https://github.com/scout-ch/hering/pull/73) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`e0cb9ce`](https://github.com/scout-ch/hering/commit/e0cb9ce2c61aee1d42273dba8ab2a6db95cfe0a8) - **deps**: update dependency less to v4.4.2 *(PR [#74](https://github.com/scout-ch/hering/pull/74) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`b267707`](https://github.com/scout-ch/hering/commit/b267707733d6c972935489df6c310bf952c3cad8) - **deps**: update dependency @types/react to v18.3.26 *(PR [#75](https://github.com/scout-ch/hering/pull/75) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`e125482`](https://github.com/scout-ch/hering/commit/e125482dd7977a84d056ae8aa0fc32e66ff0c54a) - **deps**: update dependency @types/node to v24.7.1 *(PR [#76](https://github.com/scout-ch/hering/pull/76) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`89465f2`](https://github.com/scout-ch/hering/commit/89465f263d7a39ab0fc0fdf559f263b495d0d7db) - **deps**: update dependency i18next to v25.6.0 *(PR [#77](https://github.com/scout-ch/hering/pull/77) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`01a174c`](https://github.com/scout-ch/hering/commit/01a174c73bc24599f111f13b1f6f2a05d7346eb1) - **deps**: update dependency react-tooltip to v5.30.0 *(PR [#78](https://github.com/scout-ch/hering/pull/78) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`555b4fb`](https://github.com/scout-ch/hering/commit/555b4fb94f87fb09aad5769ea3e24e2fae395874) - **deps**: update dependency @types/node to v24.7.2 *(PR [#79](https://github.com/scout-ch/hering/pull/79) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`189a65f`](https://github.com/scout-ch/hering/commit/189a65f4c4e0dc697280d2806fc18f00fe183a84) - **deps**: update stefanzweifel/git-auto-commit-action action to v7 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`3af94e5`](https://github.com/scout-ch/hering/commit/3af94e5829350ba79fbad00bc67baf407f0df429) - **deps**: update dependency dompurify to v3.3.0 *(PR [#81](https://github.com/scout-ch/hering/pull/81) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`b28b5ff`](https://github.com/scout-ch/hering/commit/b28b5ff31d2d76cb49d5f785df295dd2f76cbec9) - **deps**: update actions/setup-node action to v6 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`427b506`](https://github.com/scout-ch/hering/commit/427b506525153063e255527f523451c909cc9d06) - **deps**: update dependency vite to v7.1.10 *(PR [#83](https://github.com/scout-ch/hering/pull/83) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`4a4cd17`](https://github.com/scout-ch/hering/commit/4a4cd173fcc230f27342534bbc8fafe194830730) - **deps**: update dependency @types/node to v24.8.0 *(PR [#84](https://github.com/scout-ch/hering/pull/84) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`62561b2`](https://github.com/scout-ch/hering/commit/62561b231b4b5ebc05976aedd76e52e387592a75) - **deps**: update dependency @types/node to v24.8.1 *(PR [#85](https://github.com/scout-ch/hering/pull/85) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`eb34f44`](https://github.com/scout-ch/hering/commit/eb34f44175568691dfad78662fdaf8c8f5633c2f) - **deps**: update dependency vite to v7.1.11 *(PR [#86](https://github.com/scout-ch/hering/pull/86) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`3b678ea`](https://github.com/scout-ch/hering/commit/3b678eabeeaba84ea0019d36738ff72159c1cb09) - **deps**: update dependency @types/node to v24.9.0 *(PR [#87](https://github.com/scout-ch/hering/pull/87) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`97071eb`](https://github.com/scout-ch/hering/commit/97071ebfb2c9446e35d7240dda3a9de63aafcb77) - **deps**: update dependency @types/node to v24.9.1 *(PR [#88](https://github.com/scout-ch/hering/pull/88) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`0a6a3e7`](https://github.com/scout-ch/hering/commit/0a6a3e77c2e640e40660d98e1c7817a165125dfc) - **deps**: update dependency vite to v7.1.12 *(PR [#89](https://github.com/scout-ch/hering/pull/89) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`1a83c80`](https://github.com/scout-ch/hering/commit/1a83c80c32c9f21e9890ac1838aca887e47ba48e) - **deps**: update dependency @vitejs/plugin-react to v5.1.0 *(PR [#90](https://github.com/scout-ch/hering/pull/90) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`d2e5b58`](https://github.com/scout-ch/hering/commit/d2e5b5835c1d7c8eaf00ff88e5f1dad1067af1e6) - **deps**: update github artifact actions *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`9ca137a`](https://github.com/scout-ch/hering/commit/9ca137a2edf6be5d7a37fc269706a11d33d6f0d2) - **deps**: update dependency axios to v1.13.0 *(PR [#92](https://github.com/scout-ch/hering/pull/92) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`4543154`](https://github.com/scout-ch/hering/commit/4543154954d156734b04622e47e7279c850c2f9c) - **deps**: update dependency @types/node to v24.9.2 *(PR [#93](https://github.com/scout-ch/hering/pull/93) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`5c5dd36`](https://github.com/scout-ch/hering/commit/5c5dd3634b4072b4a5f222b06302fe89034ea8a3) - **deps**: update dependency axios to v1.13.1 *(PR [#94](https://github.com/scout-ch/hering/pull/94) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`57b4de9`](https://github.com/scout-ch/hering/commit/57b4de95825e7d6669263ec0693a4ca4de31c519) - **deps**: update dependency @types/node to v24.10.0 *(PR [#95](https://github.com/scout-ch/hering/pull/95) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`91153be`](https://github.com/scout-ch/hering/commit/91153beccf6839e0dc95ea9952bbcd248b5e0371) - **deps**: update dependency axios to v1.13.2 *(PR [#96](https://github.com/scout-ch/hering/pull/96) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`b47ba40`](https://github.com/scout-ch/hering/commit/b47ba40bd06d418caed6786464395b9212e2135f) - **deps**: update dependency vite to v7.2.0 *(PR [#97](https://github.com/scout-ch/hering/pull/97) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`e649138`](https://github.com/scout-ch/hering/commit/e649138be9b669f1923d0f622b4772e1a79fd615) - **deps**: update dependency vite to v7.2.1 *(PR [#98](https://github.com/scout-ch/hering/pull/98) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`0836551`](https://github.com/scout-ch/hering/commit/0836551ead39cf21e26b5c266cdbb882a5b0bdc2) - **deps**: update dependency i18next to v25.6.1 *(PR [#99](https://github.com/scout-ch/hering/pull/99) by [@renovate[bot]](https://github.com/apps/renovate))*
- [`05b3762`](https://github.com/scout-ch/hering/commit/05b376268bbf1beaf6efa08357aa2f519ad47c2b) - **deps**: update dependency vite to v7.2.2 *(PR [#100](https://github.com/scout-ch/hering/pull/100) by [@renovate[bot]](https://github.com/apps/renovate))*


## [v3.1.1] - 2025-10-05
### :bug: Bug Fixes
- [`701b8ff`](https://github.com/scout-ch/hering/commit/701b8ff65cdb32cc4fec844f573e4c7066ad31e0) - **deps**: update dependency @fortawesome/react-fontawesome to v0.2.6 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`8363b6c`](https://github.com/scout-ch/hering/commit/8363b6c0d0e1fee714fd7334c8088e1d42a63489) - **deps**: update dependency i18next to v25 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`1be510b`](https://github.com/scout-ch/hering/commit/1be510b2eacdfd0e6b1f0af696a9a85d8d4e3141) - **deps**: update dependency react-markdown to v10 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`4c53a4e`](https://github.com/scout-ch/hering/commit/4c53a4ea1112c86d1f3f4d02f14684f1147b3f19) - **deps**: update font awesome *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`d679673`](https://github.com/scout-ch/hering/commit/d6796731f0cb304819972344b867bc09ebb19646) - **deps**: update dependency react-i18next to v15.7.3 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`929a9aa`](https://github.com/scout-ch/hering/commit/929a9aa90f6d395742d48340987b272376a3088a) - **deps**: update dependency i18next to v25.5.2 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`5631010`](https://github.com/scout-ch/hering/commit/563101084571dbae4c23ec8b3d0a303de4569c01) - **deps**: update dependency axios to v1.12.0 [security] *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`e1d7154`](https://github.com/scout-ch/hering/commit/e1d7154503692cbad54d6c9cb81ebb0695ad6792) - **deps**: update dependency dompurify to v3.2.7 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`5fbf649`](https://github.com/scout-ch/hering/commit/5fbf6490b763cfdcdb6b9bcddf03bb1d41b04da7) - **deps**: update dependency axios to v1.12.2 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*

### :wrench: Chores
- [`257a4c4`](https://github.com/scout-ch/hering/commit/257a4c4f143d62dad75bfb805762aeabed2828f7) - **deps**: update dependency @types/node to v22.18.0 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`012b63f`](https://github.com/scout-ch/hering/commit/012b63fa92323bdf24a37e3474dced190b85b2fe) - **deps**: update dependency @types/react to v18.3.24 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`328a193`](https://github.com/scout-ch/hering/commit/328a193a0a12eeb0b0ac074534048ba754384ec3) - **deps**: update dependency less to v4.4.1 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`20092bf`](https://github.com/scout-ch/hering/commit/20092bf20c97bbff5a7614b8fa0f1a99220d18a8) - **deps**: update actions/checkout action to v5 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`fd81ed6`](https://github.com/scout-ch/hering/commit/fd81ed648824c8819a627fcfb2a6359cd39759a8) - **deps**: update actions/download-artifact action to v5 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`8a10a4a`](https://github.com/scout-ch/hering/commit/8a10a4aab894a9f69a562828fd2b22ab327959f8) - **deps**: update node.js to v22 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`39e3939`](https://github.com/scout-ch/hering/commit/39e39395b8accdefaea99e2d024795b9b1d03a16) - **deps**: update actions/setup-node action to v5 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`a813cf9`](https://github.com/scout-ch/hering/commit/a813cf9dff007e3f7a6893d2fcde6e19a4db75a3) - **deps**: update actions/github-script action to v8 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`eb62726`](https://github.com/scout-ch/hering/commit/eb6272638a02e224c38b7662f5a4afe9f6eb006c) - **deps**: update dependency vite to v7.1.5 [security] *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`6d7f7e6`](https://github.com/scout-ch/hering/commit/6d7f7e61c37c48ac52c2f7a22354a28362d2522d) - **deps**: update dependency @vitejs/plugin-react to v5.0.3 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`f3a2035`](https://github.com/scout-ch/hering/commit/f3a203582121e7668f4556b49efb172459c133b9) - **deps**: update dependency @types/node to v22.18.6 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`6351298`](https://github.com/scout-ch/hering/commit/6351298d8fff4da2b4e9f1d71e5126ae9b8f7f34) - **deps**: update node.js to v22.20.0 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`6979536`](https://github.com/scout-ch/hering/commit/6979536d931133a89427c30adaac7b6fe90ef136) - **deps**: update dependency vite to v7.1.7 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`a6e80f2`](https://github.com/scout-ch/hering/commit/a6e80f2ebc7d8e6e342bc5ff980065d65088b77e) - **deps**: update dependency react-i18next to v15.7.4 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`552be5c`](https://github.com/scout-ch/hering/commit/552be5c7a19e54e8ecf2f3def8d3f337f9c9c63c) - **deps**: update dependency @vitejs/plugin-react to v5.0.4 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`8a589e6`](https://github.com/scout-ch/hering/commit/8a589e610a488880791cf376cf54e24ad30b1263) - **deps**: update dependency @types/react to v18.3.25 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`5c460c2`](https://github.com/scout-ch/hering/commit/5c460c24581cae704439c1dc139c31711dfaf6c4) - **deps**: update dependency @types/node to v22.18.8 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`fbebc09`](https://github.com/scout-ch/hering/commit/fbebc094c335aa16fb630225977d6c41d927340d) - **deps**: update dependency typescript to v5.9.3 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`6412e88`](https://github.com/scout-ch/hering/commit/6412e88fd2d0c6a319ba1e0681ca06200efb505f) - **deps**: update dependency i18next to v25.5.3 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`92550f6`](https://github.com/scout-ch/hering/commit/92550f624140263342c1dc69af7de66d05c00b98) - **deps**: update dependency vite to v7.1.9 *(commit by [@renovate[bot]](https://github.com/apps/renovate))*
- [`1f3cf96`](https://github.com/scout-ch/hering/commit/1f3cf963229799d74f98d10599b452d81c8c13fd) - **deps**: update font awesome *(commit by [@renovate[bot]](https://github.com/apps/renovate))*


## [v3.1.0] - 2025-08-20
### :sparkles: New Features
- [`92af8bc`](https://github.com/scout-ch/hering/commit/92af8bc976f26a0a32fbe9f397313fd853d5918d) - use a fixed pattern to update the document title for pages and current chapters *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :bug: Bug Fixes
- [`c5decd3`](https://github.com/scout-ch/hering/commit/c5decd3cd10235f6dd3755a60ed67283a3b6aee4) - fix missing translations for holiday modal *(commit by [@mario-zelger](https://github.com/mario-zelger))*
- [`f4fad09`](https://github.com/scout-ch/hering/commit/f4fad09b30303eef28631465117fc64443797479) - make sure translations are initialized before showing content *(commit by [@mario-zelger](https://github.com/mario-zelger))*

### :recycle: Refactors
- [`127f059`](https://github.com/scout-ch/hering/commit/127f059060a6bba0439f4030b2ef500497726dc1) - created method to more clearly indicate language redirect intent *(commit by [@mario-zelger](https://github.com/mario-zelger))*


## [v3.0.2] - 2025-08-17
### :bug: Bug Fixes
- [`a557df3`](https://github.com/scout-ch/hering/commit/a557df3f3c6bb924c5301487b8f9f52b7559cec4) - use explicit base path for SPA *(commit by [@mario-zelger](https://github.com/mario-zelger))*


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
[v3.0.2]: https://github.com/scout-ch/hering/compare/v3.0.1...v3.0.2
[v3.1.0]: https://github.com/scout-ch/hering/compare/v3.0.2...v3.1.0
[v3.1.1]: https://github.com/scout-ch/hering/compare/v3.1.0...v3.1.1
[v3.2.0]: https://github.com/scout-ch/hering/compare/v3.1.1...v3.2.0
[v3.2.1]: https://github.com/scout-ch/hering/compare/v3.2.0...v3.2.1
[v3.2.2]: https://github.com/scout-ch/hering/compare/v3.2.1...v3.2.2
[v3.2.3]: https://github.com/scout-ch/hering/compare/v3.2.2...v3.2.3
[v3.3.0]: https://github.com/scout-ch/hering/compare/v3.2.3...v3.3.0
[v3.3.1]: https://github.com/scout-ch/hering/compare/v3.3.0...v3.3.1
[v3.4.0]: https://github.com/scout-ch/hering/compare/v3.3.1...v3.4.0
