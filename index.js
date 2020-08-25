//Подключаем модули
const express = require('express');

//Задаём переменные сервера
const app = express();
const PORT = 8082;

//Проверяем определенны ли переменные окружения
if (!process.env.nodejs_dz2_limit) {
    console.error('Переменная окружения nodejs_dz2_limit не обнаруженна. Старт не возможен')
    exit(1);
}
if (!process.env.nodejs_dz2_delay) {
    console.error('Переменная окружения nodejs_dz2_delay не обнаруженна. Старт не возможен')
    exit(2);
}

//Определяем переменные таймеров из переменных окружения и переводим их в милисекунды
const LIMIT = process.env.nodejs_dz2_limit * 1000;
const DELAY = process.env.nodejs_dz2_delay * 1000;

//функция вывода времени
let showTime = () => {
    let datetime = new Date();
    let datetimeUTC = datetime.toUTCString();
    console.log(`${datetimeUTC}`);
};

let createAndDestroinInterval = (res) => {
    //выполняем в первый раз функцию
    showTime();

    //Задаем интервал чтобы функция выполнялась раз в DELAY секунд и сохроняем переменную интервала
    let interval = setInterval(() => {
        showTime();
    }, DELAY);

    //Через LIMIT милесикунд удаляем интервал и закрываем соединение
    setTimeout(() => {
        clearInterval(interval);
        let datetime = new Date();
        let datetimeUTC = datetime.toUTCString();
        res.write(`${datetimeUTC} - END\n`);
        res.end();
    }, LIMIT);
}

//Обрабатываем все входящие переменные
app.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    createAndDestroinInterval(res);
});

//Стартуем сервер
app.listen(PORT, () => {
    console.log(`сервер запущен на порту: ${PORT}`);
});