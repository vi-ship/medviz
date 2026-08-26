# MedWiz 3.2 QA — журнал изменений Development

## 1. Миграция данных 3.1 → schema v2
**Задача:** сохранить пользовательские данные при переходе к новой модели.  
**Реализация:** `medviz3` не перезаписывается; новая схема хранится в `medwizDataV2`. Сохраняются stable Topic ID, favorites, notes, reviews, legacy progress, theme и last topic.  
**Затронутые функции:** запуск, локальное хранение, backup/import, Progress, Review, Notes, Favorites.  
**Что протестировать:** миграцию существующей 3.1; повторный запуск; сохранность данных; отсутствие изменения `medviz3`.

## 2. Обязательный Section
**Задача:** реализовать Subject → Section → Topic.  
**Реализация:** добавлена сущность Section; пилотная тема находится в `anatomy-heart`, Topic ID остаётся `heart-anatomy`.  
**Затронутые функции:** Знания, Subject, Section, Topic, Search.  
**Что протестировать:** переходы, stable IDs, отсутствие потерянных тем после миграции.

## 3. Навигация по утверждённому UX
**Задача:** привести основной маршрут к UX Architecture 1.0.  
**Реализация:** нижняя навигация — Главная / Знания / Повторение / Экзамен; Search и Управление вынесены наверх.  
**Затронутые функции:** shell/navigation, Home, Search, Management.  
**Что протестировать:** 4 вкладки, возвраты, Search, Управление, мобильное отображение.

## 4. Topic «Камеры и клапаны сердца»
**Задача:** реализовать Topic как набор ContentBlocks.  
**Реализация:** stable ID `heart-anatomy`, learning objectives, ContentBlocks, Sources/Verification, Notes/Favorites.  
**Затронутые функции:** Topic, Notes, Favorites, Sources, Progress.  
**Что протестировать:** порядок блоков, заметки, избранное, источник, повторное открытие.

## 5. Topic Test → Result
**Задача:** реализовать проверку знаний с фиксацией ошибок.  
**Реализация:** 4 single-choice вопроса; ответы не раскрываются до выбора; после выбора показывается explanation; QuestionAttempt сохраняется.  
**Затронутые функции:** Questions, Attempts, Progress, Result.  
**Что протестировать:** правильный/ошибочный ответ; результат 4/4 и результат с ошибками; сохранение attempts.

## 6. Error → Progress → Review → Retest
**Задача:** замкнуть учебный цикл.  
**Реализация:** ошибка переводит Topic в WEAK и создаёт Review по слабым вопросам; успешный retest завершает Review и переводит Topic в REVIEWED.  
**Затронутые функции:** Progress, Review, Home weak/due, Result, Retest.  
**Что протестировать:** появление weak/review; запуск из Result и Home; успешный retest; сохранение после перезапуска.

## 7. Backup / Import
**Задача:** сохранить восстановимость и обратную совместимость.  
**Реализация:** экспорт envelope с `backupVersion`, `schemaVersion`, `knowledgeData`, `learningData`, `userData`, `legacy31`; импорт принимает v2 и legacy 3.1 JSON; перед импортом создаётся recovery snapshot.  
**Затронутые функции:** Управление → Backup/Restore, migration, storage.  
**Что протестировать:** экспорт; импорт v2; импорт 3.1; повреждённый файл; восстановление данных.

## 8. PWA cache
**Задача:** исключить конфликт с кэшем 3.1.  
**Реализация:** отдельный cache key `medwiz3-2-qa-v1`.  
**Затронутые функции:** offline/PWA.  
**Что протестировать:** первый online launch; второй offline launch; отсутствие белого экрана.

## 9. BUG-001 — legacy Review после миграции
**Задача:** устранить P1-регрессию, из-за которой Review из MedWiz 3.1 с пустым `weakQuestionIds` нельзя было пройти.  
**Реализация:** legacy Review получает `reviewMode: FULL_TOPIC`. Для уже созданного `medwizDataV2` режим добавляется при нормализации. `startReview()` запускает полный Topic Test, если Review пришёл из legacy-сценария и для темы существует банк вопросов. После успешного прохождения Review получает `COMPLETED`, Progress — `REVIEWED`; при ошибках формируется обычный Review только по слабым вопросам.  
**Затронутые функции:** migration 3.1 → v2, normalizeV2, Review list, startReview, Topic Test, Progress.  
**Что протестировать:** DUE и SCHEDULED legacy Review для `heart-anatomy`; запуск полного теста; успешный retest → REVIEWED/COMPLETED; retest с ошибкой → новый Review по weakQuestionIds; сохранение после перезапуска; отсутствие изменения `localStorage.medviz3`.

## 10. BUG-002 — секции legacy-тем Анатомии
**Задача:** устранить P2-регрессию, помещавшую все legacy-темы Анатомии в «Сердечно-сосудистую систему».  
**Реализация:** добавлен нейтральный раздел `anatomy-legacy-section` («Материалы MedWiz 3.1»). Детерминированный mapping оставляет `heart-anatomy` и `circulation` в `anatomy-heart`; `nephron`, `airways` и другие нераспределённые legacy-темы направляются в нейтральный раздел. `normalizeV2()` также исправляет данные, уже мигрированные первой QA-сборкой. Stable Topic IDs не меняются.  
**Затронутые функции:** migration 3.1 → v2, normalizeV2, Subject → Section → Topic, Knowledge, Search.  
**Что протестировать:** после миграции в `anatomy-heart` находятся только кардиоваскулярные темы; `nephron` и `airways` находятся в `anatomy-legacy-section`; существующий buggy `medwizDataV2` автоматически исправляется; notes/favorites/progress/reviews сохраняются; `heart-anatomy` остаётся неизменным.

## 11. PWA cache для исправленной QA-сборки
**Задача:** исключить выдачу старого JavaScript после установки bugfix-сборки.  
**Реализация:** cache key изменён с `medwiz3-2-qa-v1` на `medwiz3-2-qa-v2`.  
**Затронутые функции:** Service Worker / PWA cache.  
**Что протестировать:** обновление с предыдущей QA-сборки; удаление старого cache; online launch; повторный offline launch.

# MedWiz 3.2 QA.2 — second bugfix cycle
Дата: 26.08.2026
Статус: QA build, НЕ Release.
База пользовательских данных: MedWiz 3.1 (`localStorage.medviz3`) — не перезаписывается.
Объект исправления: MedWiz 3.2 QA.1 / schema v2.

## BUG-003 — Review navigation
**Причина:** экран вопроса в режиме повторения не имел явных действий возврата/выхода.

**Исправление:** в режиме повторения добавлена закреплённая панель «← К повторению» / «Выйти». Выход возвращает к списку повторений, не удаляет Review, Progress, ранее сохранённые QuestionAttempt или пользовательские данные. Завершённый Review по-прежнему закрывается только штатным завершением теста.

**Затронутые файлы/функции:** `app.js` → `testPage()`, `startReview()`; `styles.css` → `.review-nav`.

**Риск регрессии:** средний — навигация внутри тестовой сессии и повторения.

**Что передать QA:** проверить выход до ответа, после одного ответа, возврат к повторению, повторный запуск Review, завершение 100%, статус завершения после перезапуска.

## BUG-004 — Localization
**Причина:** внутренние enum/type/status значения модели выводились напрямую в пользовательский UI.

**Исправление:** добавлен presentation mapping внутренних значений на русские labels. Локализованы типы блоков, статусы верификации, Review, статусы объектов и технические подписи. Внутренняя data model не изменена. Бренд `MedWiz` сохранён.

**Затронутые файлы/функции:** `app.js` → `UI_LABELS`, `uiBlockType()`, `uiVerification()`, `uiReviewStatus()`, `uiObjectStatus()`, `topicPage()`, `home()`, `reviewPage()`, `manage()`, `drawConstructor()`, `drawData()`, `exam()`.

**Риск регрессии:** низкий — presentation layer; риск пропуска отдельного технического label.

**Что передать QA:** пройти все пользовательские экраны и проверить отсутствие `Table`, `keyPoint`, `definition`, `structure`, `diagram`, `Weak`, `Verification`, `SourceChecked`, `Backup/Restore`, `Subject/Section/Topic` и аналогичных технических labels.

## BUG-005 — Content presentation
**Причина:** утверждённые ContentBlocks пилотной темы отображались едиными плотными абзацами.

**Исправление:** изменён только renderer. Исходные `HEART_BLOCKS`, медицинские формулировки, вопросы, ответы и источник не переписывались. Определения отображаются отдельными строками; структурные и табличные блоки — отдельными факт-карточками; ключевые моменты — пунктами; направление крови — пошаговой вертикальной схемой.

**Затронутые файлы/функции:** `app.js` → `renderBlockContent()`, `topicPage()`; `styles.css` → `.readable-*`, `.fact-*`, `.flow-*`.

**Риск регрессии:** низкий/средний — мобильная верстка и визуальная читаемость.

**Что передать QA:** сверить текст символ-в-символ с QA.1/утверждённым Medical Content и отдельно проверить читаемость на реальном iPhone в light/dark.

## BUG-006 — Favorites & Notes discoverability
**Причина:** данные сохранялись, но доступ к ним был спрятан в «Управлении»; отдельного понятного списка заметок не было.

**Исправление:** на Главной добавлена «Моя библиотека» с явными входами «Избранное» и «Заметки» и счётчиками. Добавлены отдельные пользовательские экраны списков. В «Управлении» также добавлена вкладка «Заметки». Используются существующие `learningData.favorites` и `learningData.notes`; формат хранения не менялся.

**Затронутые файлы/функции:** `app.js` → `home()`, `favoritesPage()`, `notesPage()`, `drawFavorites()`, `drawNotes()`, `manage()`, `render()`; `styles.css` → `.library-card`, `.note-card`.

**Риск регрессии:** средний — переходы к теме и отображение legacy избранного/заметок.

**Что передать QA:** создать favorite/note, перезапустить PWA, найти оба объекта через Главную, открыть тему, удалить/добавить favorite и проверить сохранность backup/restore.

## BUG-007 — Incomplete legacy topics
**Причина:** legacy-темы после миграции имели `active` status, хотя у них отсутствовали утверждённые v2 ContentBlocks/Questions; пользователь мог попасть в неполный сценарий.

**Исправление:** без создания медицинского контента добавлен presentation-level readiness check. Тема доступна к обучению только при наличии ContentBlocks и Questions. Неполные legacy-темы отображаются как «Контент готовится» / «Недоступно» и не открывают сломанный вертикальный сценарий. `heart-anatomy` остаётся доступной.

**Затронутые файлы/функции:** `app.js` → `isTopicReady()`, `openTopic()`, `sectionPage()`, `favoritesPage()`, `notesPage()`; `styles.css` → `.disabled-topic`, `.coming-soon`.

**Риск регрессии:** средний — доступность legacy topics после миграции.

**Что передать QA:** мигрировать реальный набор 3.1; убедиться, что `heart-anatomy` доступна, а `circulation` и другие неполные темы не запускают пустой сценарий; проверить поиск/избранное/последнюю тему.

## Регрессия, которую нельзя сломать
- миграция MedWiz 3.1 → schema v2;
- `localStorage.medviz3` остаётся неизменным;
- stable Topic ID `heart-anatomy`;
- Progress;
- Notes storage;
- Favorites storage;
- Review, включая legacy FULL_TOPIC fallback;
- Backup/Restore + recovery snapshot;
- Light/Dark;
- PWA offline;
- пилотный тест и результат 100%.

## Backlog
- 3D Atlas — **не реализован**, перенесён в backlog до отдельного утверждения Strategy/Architecture/UX/Medical Content.
