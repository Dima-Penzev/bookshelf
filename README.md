# Bookshelf (приложение для поиска книг)

Приложение осуществляет поиск книг по названию, добавление понравившихся в избранное и сохранение истории поиска. Для последних двух опций необходина регистрация.

Реализованы следующие требования к функциональности:

## 1 уровень

- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используется LocalStorage.

#### React

- [x] Функциональные компоненты c хуками в приоритете над классовыми [[components](https://github.com/Dima-Penzev/bookshelf/tree/main/src/components)];
- [x] Разделение на умные и глупые компоненты:
- Умные: [[Register](https://github.com/Dima-Penzev/bookshelf/blob/main/src/pages/register/register.tsx), [Login](https://github.com/Dima-Penzev/bookshelf/blob/main/src/pages/login/login.tsx), [SearchForm](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/search-form/search-form.tsx), [BookItem](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/book-item/book-item.tsx)];
- Глупые: [[BooksList](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/books-list/books-list.tsx), [HistoryList](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/history-list/history-list.tsx), [BookDetails](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/book-details/book-details.tsx)];
- [x] Рендеринг списков:[[BooksList](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/books-list/books-list.tsx), [HistoryList](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/history-list/history-list.tsx)];
- [x] Реализована хотя бы одна форма: [[SearchForm](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/search-form/search-form.tsx), [Register](https://github.com/Dima-Penzev/bookshelf/blob/main/src/pages/register/register.tsx), [Login](https://github.com/Dima-Penzev/bookshelf/blob/main/src/pages/login/login.tsx)];
- [x] Есть применение Контекст API: используется в [[Main](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/main/main.tsx)];
- [x] Есть применение предохранителя: [[Main](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/main/main.tsx)];
- [x] Есть хотя бы один кастомный хук: [[useDebounce](https://github.com/Dima-Penzev/bookshelf/blob/feature/context-api/src/hooks/use-debounce.tsx)];
- [x] Хотя бы несколько компонентов используют PropTypes: [[BookDetails](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/book-details/book-details.tsx), [ButtonDelete](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/button-delete/button-delete.tsx), [HistoryItem](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/history-item/history-item.tsx)];
- [x] Поиск не должен триггерить много запросов к серверу: [[useDebounce](https://github.com/Dima-Penzev/bookshelf/blob/feature/context-api/src/hooks/use-debounce.tsx)] используется в [[SearchForm](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/search-form/search-form.tsx)];
- [x] Есть применение lazy + Suspense: [[Main](https://github.com/Dima-Penzev/bookshelf/blob/main/src/components/main/main.tsx)];

#### Redux

- [x] Используем Modern Redux with Redux Toolkit: [[store](https://github.com/Dima-Penzev/bookshelf/blob/main/src/redux/store.tsx)];
- [x] Используем слайсы: [[userRegisterSlice](https://github.com/Dima-Penzev/bookshelf/blob/main/src/redux/user-register-slice.tsx), [userLoginSlice](https://github.com/Dima-Penzev/bookshelf/blob/main/src/redux/user-login-slice.tsx)];
- [x] Есть хотя бы одна кастомная мидлвара: [[updateLocalStorageMiddleware](https://github.com/Dima-Penzev/bookshelf/blob/main/src/redux/update-local-storage-middleware.tsx)];
- [x] Используется RTK Query: [[booksApi](https://github.com/Dima-Penzev/bookshelf/blob/main/src/redux/books-api.tsx)];
- [x] Используется Transforming Responses: [[booksApi](https://github.com/Dima-Penzev/bookshelf/blob/main/src/redux/books-api.tsx)];

## 2 уровень

- [x] Используется TypeScript;
