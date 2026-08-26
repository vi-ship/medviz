MEDWIZ 3.2 QA — DEVELOPMENT BUILD

Статус: передача в Testing & QA. НЕ RELEASE.
Стабильная версия MedWiz 3.1 не заменяется и не должна удаляться до завершения QA.

Файлы сборки:
index.html
styles.css
app.js
manifest.webmanifest
service-worker.js
icon-192.png
icon-512.png
DEVELOPMENT_PLAN.md
CHANGELOG_QA.md
QA_HANDOFF.md

Ключ совместимости:
- MedWiz 3.1 остаётся в localStorage.medviz3 без перезаписи.
- QA-сборка использует localStorage.medwizDataV2.
- При первом запуске выполняется детерминированная миграция 3.1 -> schema v2.

QA.1 BUGFIX (25.08.2026)
- BUG-001 P1: legacy Review 3.1 запускается как полный тест темы, если weakQuestionIds отсутствовали.
- BUG-002 P2: legacy Anatomy разделена на anatomy-heart и anatomy-legacy-section.
- Уже созданный medwizDataV2 из предыдущей QA-сборки автоматически нормализуется без изменения localStorage.medviz3.
- PWA cache key: medwiz3-2-qa-v2.

MEDWIZ 3.2 QA.2 — SECOND BUGFIX BUILD
Только для Testing & QA. Не Release.
Исправления: BUG-003 Review navigation, BUG-004 localization, BUG-005 presentation layer, BUG-006 Favorites/Notes discoverability, BUG-007 incomplete legacy topics.
3D Atlas: backlog, не реализован.
