# MedWiz 3.2 QA.1 — Development bugfix verification

Дата: 25.08.2026
Статус: исправления подготовлены для повторного Testing & QA. Это не Release.

## BUG-001 — PASS на уровне Development verification
- Fresh migration 3.1 создаёт legacy Review с `reviewMode: FULL_TOPIC`.
- Existing `medwizDataV2` из QA v1 нормализуется: legacy Review с пустым `weakQuestionIds` получает `FULL_TOPIC`.
- `startReview()` разрешает запуск полного Topic Test, если для темы есть вопросы.
- Для `heart-anatomy` доступны 4 утверждённых вопроса пилотной темы.
- Логика завершения сохранена: успешный retest → `REVIEWED` / `COMPLETED`; ошибки → Review по новым `weakQuestionIds`.

## BUG-002 — PASS на уровне Development verification
Проверен deterministic mapping для legacy Anatomy:
- `circulation` → `anatomy-heart`
- `heart-anatomy` → `anatomy-heart`
- `nephron` → `anatomy-legacy-section`
- `airways` → `anatomy-legacy-section`

Та же нормализация применяется к уже созданному buggy `medwizDataV2` из первой QA-сборки.

## Совместимость
- `localStorage.medviz3` не изменяется.
- stable Topic ID `heart-anatomy` не изменён.
- schemaVersion остаётся `2`.
- существующий `medwizDataV2` обновляется только нормализацией структуры/legacy Review без сброса Notes, Favorites, Progress, Attempts и Review dates.
- Service Worker cache key изменён на `medwiz3-2-qa-v2`.

## Выполненные статические проверки
- `node --check app.js` — PASS.
- Unit-like migration check на legacy-наборе `circulation / heart-anatomy / nephron / airways` — PASS.
- Repair check для состояния, созданного QA v1 — PASS.

## Требуется повторный QA
Testing & QA должен повторить реальные пользовательские сценарии BUG-001/BUG-002 и regression migration → Review → retest → backup/restore. PWA/iPhone и exact Medical Content checks остаются отдельными обязательными Release Gate.
