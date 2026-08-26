# QA.2 Static Verification

- APP_VERSION: 3.2-QA.2.
- JavaScript syntax: проверяется `node --check app.js`.
- Medical data constants (`HEART_OBJECTIVES`, `HEART_BLOCKS`, `HEART_QUESTIONS`, `HEART_SOURCE`) не менялись в bugfix-cycle; изменён renderer.
- Storage keys не менялись: legacy `medviz3`, v2 `medwizDataV2`.
- Stable ID `heart-anatomy` не менялся.
- Service Worker cache обновлён только для принудительной доставки QA.2 (`medwiz3-2-qa-v3`).
- 3D Atlas не реализован; backlog.
