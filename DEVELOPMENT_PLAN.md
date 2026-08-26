# MedWiz 3.2 QA — технический план

Статус: Development build, не Release.  
База: стабильная MedWiz 3.1.

## Цель версии
Реализовать полный вертикальный сценарий утверждённого UX для пилотной темы «Камеры и клапаны сердца», не меняя утверждённые Architecture / UX / Medical Content и не разрушая пользовательские данные MedWiz 3.1.

## План
1. Оставить `localStorage.medviz3` неизменяемым legacy-источником.
2. Ввести `localStorage.medwizDataV2` со `schemaVersion=2`.
3. Выполнить детерминированную миграцию Subject → Topic в Subject → Section → Topic с сохранением Topic ID.
4. Разделить Knowledge Data и Learning/User Data.
5. Реализовать нижнюю навигацию: Главная / Знания / Повторение / Экзамен; Search и Управление — сверху.
6. Реализовать вертикальный маршрут: Home → Knowledge → Subject → Section → Topic → ContentBlocks → Test → Result → Weak/Review → Retest → Progress → Home.
7. Сохранить Notes, Favorites, Review, legacy Progress, theme и last topic.
8. Сохранять QuestionAttempt и связи ошибок с learning objectives.
9. Добавить backup envelope schema v2 и импорт v2 + legacy 3.1 JSON.
10. Использовать отдельный PWA cache key `medwiz3-2-qa-v1`.

## Не входит
- Release / GitHub Pages publication.
- Новая формула masteryScore.
- Полный spaced-repetition engine.
- AI, cloud/sync, Knowledge Graph.
- Расширение Exam сверх утверждённого пространства.
- Изменение медицинского содержания пилотной темы.
