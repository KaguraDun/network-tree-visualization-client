# Network tree visualization client
React, Redux, Redux Toolkit, TypeScript, bootstrap
[Репозиторий сервера](https://github.com/KaguraDun/network-tree-visualization-server)

Клиентское приложение расположено на netlify: https://network-tree-visualization.netlify.app/

Там же его можно удобно протестировать.

Если необходимо развернуть приложение локально, с использованием локального сервера из репозитория сервера, то необходимо изменить параметр в 'src/services/NodeApi.ts' на Mode.development;

```js
    this.baseURL = serverURL[Mode.development];
```

Приложение для визуализации дерева сетевых узлов:
- Отображение сетевых узлов в виде древовидного представления;
- Возможность создавать/удалять сетевые узлы;
- Возможноcть просматривать/изменять информацию о сетевых узлах; 
- Динамическая подгрузка данных;

## Развёртывание
Для установки зависимостей
```bash
npm install
```
### Запуск
Для запуска в режиме разработки
```bash
npm run start
```

### Production Билд
```bash
npm run build
```
### Запуск линтера
```bash
npm run lint
```
### Запуск автоматического исправления ошибок линтера
```bash
npm run lint:fix
```

## Зависимости
*  npm : 8.3.1
*  node : 16.14.0
*  @reduxjs/toolkit  :   ^1.6.1  
*  bootstrap  :   ^5.1.3  
*  bootstrap-icons  :   ^1.8.1  
*  classnames  :   ^2.3.1  
*  react  :   ^17.0.2 
*  react-dom  :   ^17.0.2
*  react-redux  :   ^7.2.4
*  react-router-dom  :   ^5.2.1
*  redux  :   ^4.1.1