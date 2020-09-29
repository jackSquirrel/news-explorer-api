# news-explorer-api
Сервер приложения, позволяющего искать и сохранять любимые статьи
## адреса для api
130.193.36.199

https://api.explorenews.gq/

https://www.api.explorenews.gq/
## Версия 
v1.0.0
## Технологии, использованные в проекте
JS, express.js, GIT, npm, pm2
## Локальная работа с сервером
`npm run start` запуск сервера на localhost:3000  

`npm run dev` запуск сервера на localhost:3000 с хот релоудом 
## Запросы к API
`GET /users/me` возвращает информацию о пользователе (email, name)
 
`GET /articles` возвращает список статей, сохраненных пользователем

`POST /articles` добавляет новую статью

`DELETE /articles/:articleId` удаляет статью по Id

`POST /signup` создает нового пользователя

`POST /signin` выполняет авторизацию пользователя

