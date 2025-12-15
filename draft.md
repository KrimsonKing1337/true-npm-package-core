# Как создать свой npm-пакет c React, Typescript, SCSS и Redux store

Я постарался наиболее наглядно продемонстрировать как можно добиться результата с актуальными версиями пакетов (на данный момент). 

Долгое время я пытался решить задачу именно с помощью Webpack - это было ошибкой.

Webpack требуется для создания бандла, т.е. для упаковки приложения в один файл и последующей загрузки на сервер.
Он не является таск-менеджером типа того же Rollup или Gulp.

Впрочем, мы можем обойтись вообще без всего этого.

Итак, какой результат нам нужен?

От пакета мы хотим получить набор функций и компонентов для переиспользования с типизацией.

То есть, чтобы мы могли написать так:
```
import { Accordion } from 'techgate-ui';
```

На самом деле, ничего прям дико сложного нет, но почему-то единой актуальной инструкции я не смог найти, пришлось по крупицам то там, то там информацию брать.
Я не претендую на 100% лучшие практики или что-то такое, но хотя бы можно будет с чего-то начать (этакий бойлерплейт, если угодно).

В первую очередь, необходимо установить Typescript:
```
npm i -D typescript
```

Далее, на что хочется обратить внимание - это файл package.json, уверен, что вы с ним знакомы.

Сейчас нам нужны опции для указания зависимостей. В dependencies указываем зависимости, без которых наш пакет не будет работать.\
А в devDependencies то, без чего мы не сможем наш пакет разрабатывать - эти зависимости не будут устанавливаться у пользователей.

Я бы ещё рекомендовал указать следующие поля:
```
"engines": {
  "node": ">=16.0.0",
  "npm": ">=6.5.0"
}
```
и
```
"main": "./"
```

engines нужны для указания какой версии node и npm необходимы для корректной работы нашего пакета.\
main - это относительный путь к корню файлов.

Ещё я могу посоветовать называть пакет через собачку (@)  в начале.
Это даёт единый namespace всем нашим будущим пакетам.
И позволяет в .npmrc переопределить registry для одного namespace, а не всех пакетов целиком (это работает только с собачкой в начале).

Например:
```
@techgate:registry=https://art.lmru.tech/artifactory/api/npm/npm-finops/
registry = https://art.lmru.tech/api/npm/npm-microfronts
```

Такая запись позволит устанавливать пакеты от @techgate из одного пути, а все остальные из другого.

**Внимание!** Порядок важен! Располагаем кастомные registry перед основным.

Далее, помимо package.json нам понадобится Typescript. Я использовал 5-ую версию (последняя на текущий момент).\
Наш TS необходимо настроить. В этом нам поможет файл tsconfig.json со следующим содержимым:
```
{
  "$schema": "https://json.schemastore.org/tsconfig#",
  "compilerOptions": {
    "strictPropertyInitialization": false,
    "strict": true,
    "esModuleInterop": true,
    "pretty": false,
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "lib",
    "sourceMap": true,
    "declaration": true,
    "jsx": "react-jsx",
    "baseUrl": "./",
    "paths": {
      "assets": ["./src/assets"],
      "assets/*": ["./src/assets/*"],
      "components": ["./src/components"],
      "components/*": ["./src/components/*"],
      "hooks": ["./src/hooks"],
      "hooks/*": ["./src/hooks/*"],
      "utils": ["./src/utils/*"],
      "utils/*": ["./src/utils/*"]
    },
    "lib": ["es2015", "dom"],
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "allowJs": true,
    "noEmit": false,
    "allowSyntheticDefaultImports": true,
  },
  "include": ["d.ts", "src/**/*"],
  "exclude": ["node_modules", "build", "dist", "public", "webpack", "jest", "lib", "lib-esm"]
}
```

Естественно - настройки могут варьироваться от того, что вам нужно.

Опишу поля, которые я считаю важными для упоминания:\
начнём с sourceMap и declaration. Именно они позволяют генерировать типы наших файлов.

Теперь если дать команду tcs - Typescript автоматически сгенерирует типы.

Готовый результат, согласно конфигу, будет в папке ./lib.

Далее - это поле noEmit со значением false. Без этого файлы не будут копироваться.

А с помощью полей target, module и lib мы дали понять, что хотим на выходе получить common-js пакет es5-ой версии.\
В данном случае наш Typescript выступит в роли babel и помимо типов ещё выдаст нам обычные js-файлы вместо ts (транспилирует / скомпилирует).

И последнее - нужно создать файлик index.ts, который будет точкой входа в наш пакет.\
В нём необходимо заимпортить всё, что нам нужно отдавать конечному пользователю пакета.

Результат работы можно посмотреть, дав команду tcs или npm run ts.

После этого, нужно собрать наш npm-пакет с помощью команды:
```
npm run pack
```

Эта команда создаст файл .tgz, который и является нашим готовым npm-пакетом.

Теперь попробуем установить его в каком-нибудь проекте. Для этого не обязательно размещать пакет в артифактори, нексусе или npmjs.

Можем просто написать так в package.json:
```
"@techgate/ui": "file:D:\\Projects\\lerua\\lmru-cloud--marketplace-techgate-ui\\techgate-ui-0.0.39.tgz"
```

И дать команду `npm install`.\
Таким образом npm установит наш пакет прямо с нашей файловой системы.

И попробуем как оно работает:
```
import { Accordion } from '@techgate/ui';
```

Если вебпак не даёт ошибок при сборке, и в браузере всё отображается корректно - значит мы всё сделали как надо!

**Но можно будет наткнуться на некоторые проблемы.**

1) Typescript не понимает алиасов.\
То есть, мы хотим так же как при использовании Webpack, писать так:
```
import DelIcon from 'assets/i-del.svg';
```
а не так:
```
import DelIcon from '../../../../self-service/accordion/assets/icons/i-del.svg';
```

Для этого есть поле paths в tsconfig.json. Там прописываем где искать относительные пути, которые начинаются не с точки.

Например:
```
"paths": {
      "assets": ["./src/assets"],
      "assets/*": ["./src/assets/*"],
      "components": ["./src/components"],
      "components/*": ["./src/components/*"],
      "hooks": ["./src/hooks"],
      "hooks/*": ["./src/hooks/*"],
      "utils": ["./src/utils/*"],
      "utils/*": ["./src/utils/*"]
    },
```

В моём случае, я захотел использовать перечисленные директории, лежащие в src.\
Приходится дублировать каждую, добавляя слэш и здёздочку. Иначе Typescript будет пытаться импортить из корня папки напрямую, не следуя по пути дальше.

Но в целом, синтаксис очень схож с resolve у Webpack.

Теперь мы можем удобно делать импорт без заборчиков (../../../../../).

2) При попытке скомпилироваться, Typescript может упасть с ошибкой, что он не знает что такое .svg, .scss и прочие типы файлов, которые мы пытаемся где-нибудь заимпортить.
Для этого нужно задекларировать эти типы модулей.

Создаём в корне проекта файл d.ts и пишем там следующее:
```
declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';

  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.jpg';
declare module '*.png';
```

Теперь наш TS знает, что такое svg, scss, jpg и png. Принцип, думаю, ясен.

3) В собранный пакет попадают файлы, которые мы не хотим.
Например, tsconfig, Jenkinsfile или исходники, которые лежат в ./src.

Чтобы это решить, создадим файлик .npmignore со следующим содержимым:
```
.*
tsconfig.json
webpack.config.js
Jenkinsfile
babel.config.js
node_modules
src
!lib/src
!lib-esm/src
```

В либу не попадут все файлы из корня пакета с любым расширением, tsconfig, node_modules и src.\
Но при этом lib/src в либу всё же попадёт.

Если файл .npmignore отсутствует, то npm берёт информацию о файлах, которые нужно игнорировать из .gitignore.

#) Пишет, что не может перезаписать файлы или файлы просто молча не меняются (речь про outDir).

Для этого нужно очистить (удалить) папку назначения. Я использую пакет rimraf (кроссплатформенная реализация rm -Rf):
```
"clean": "rimraf dist lib lib-esm"
```

4) Пути к не-ts файлам неверны, или же они вовсе отсутствуют в outDir.\
   Это svg, png, scss и так далее.\
   Проблема в том, что TS занимается только .ts/.tsx файлами.

Чтобы это решить, воспользуемся ещё двумя пакетами: copyfiles и tsc-alias.

Устанавливаем их:
```
npm i -D copyfiles tsc-alias
```

и даём такие команды:
```
copyfiles -u 1 -s src/**/*.* lib/src/ -e src/**/*.ts -e src/**/*.tsx
```
и
```
tsc-alias
```

**Внимание!** Порядок важен! Сначала копируем, потом фиксим пути к файлам.

Первая команда скопирует всех файлы из указанной маски (то есть, всё что находится внутри директории /src, кроме файлов .ts/.tsx - их не трогаем, ими пусть занимается сам Typescript).

Вторая команда чинит нам пути к нашей статике. И если до этого у нас было так:
```
var i_del_svg_1 = __importDefault(require("assets/icons/i-del.svg"));
```

То станет так:
```
var i_del_svg_1 = __importDefault(require("../../../../self-service/accordion/assets/icons/i-del.svg"));
```

5) Мы хотим импортировать удобно из нашего пакета, как это происходит у, например, material-ui:
```
import { AccordionSummary } from '@mui/material';
```
То есть, не просто из корня, а указывая путь.

Это может быть полезно при пересечениях названий компонентов. Например, какой-нибудь Item.tsx, который может лежать в директории компонента Dropdown, и с точно таким же названием может лежать в Member.\
Да и просто, так может быть удобнее при больших количествах файлов.

Чтобы достичь этой цели, нам необходимо удалить наш index.ts (опционально), чтобы пользователь не мог больше импортировать прямо из корня пакета, а указывал конкретный путь.

Вообще, пути пакета резолвятся через свойство main в файле package.json.\
По умолчанию он у нас ссылается на корень пакета.\
Но что если нам нужно читать так: `./ = ./src`?

Мы можем просто скопировать всё из папки src прямо в корень пакета при его установке.\
Для этого, воспользуемся postinstall - это будет отрабатываться после установки пакета.

Создаём файл postinstall.js со следующим содержимым:
```
const fs = require('fs');
if (fs.existsSync('./tsconfig.json') === false) {
  fs.cpSync('./lib/src', './', {recursive: true});
  fs.rmSync('./lib', {recursive: true});
}
```

И в поле scripts добавляем:
```
"postinstall": "node ./postinstall.js"
```

Postinstall срабатывает даже если дать команду npm install локально, для установки какого-либо пакета в наш npm-пакет.\
И чтобы он не срабатывал локально, я проверяю в скрипте существования файла tsconfig.json, который даёт понять, что мы находимся локально, а не у кого-то в node_modules.

Теперь мы можем спокойно импортировать таким образом:
```
import { Accordion } from '@techgate/ui/components/Accordion';
```

Итого, у нас получаются такие команды для сборки пакета:
```
"scripts": {
    "make": "npm run clean && npm run copy-files && npm run ts && tsc-alias && npm run packaging",
    "clean": "rimraf dist lib lib-esm",
    "ts": "tsc && tsc -m es6 --outDir lib-esm",
    "build": "webpack",
    "copy-files": "copyfiles -u 1 -s src/**/*.* lib/src/ -e src/**/*.tsx",
    "packaging": "npm pack",
    "prepublishOnly": "npm run packaging",
    "version:upd": "npm version --no-git-tag-version patch",
    "postpublish": "npm run version:upd",
    "test": "echo \"Error: no test specified\" && exit 1",
    "postinstall": "node ./postinstall.js"
  },
```

Теперь можно дать команду `npm run make` и получить готовый .tgz, который далее мы можем либо установить локально, либо загрузить в хранилище пакетов.

Команды разрастаются и уверен, что я не покрыл всех кейсов использования.\
Для удобства можно использовать таск-менеджеры, о которых я упоминал выше (Rollup, Gulp, etc.). Они могут помочь с автоматизацией рутинных операций.

Кстати, какой таск-менеджер по вашему мнению тут бы подошёл лучше всего?

6) Позже я добавил первые стили в проект, для подключения шрифтов. И столкнулся с новой проблемой.

Если в случае с css-in-js - это решается за счёт того же Тайпскрипта,- то отдельные SCSS файлы может понадобиться как-то превратить в обычные CSS.

Для этого установим node-sass (можно, наверное, и обычный sass установить, просто я привык к node-sass).

```
npm i -D node-sass
```

и добавляем такую команду в блок скриптов:
```
"scss": "node-sass ./src --output ./src"
```

Эта команда рекурсивно пройдётся по всей директории src и скомпилирует все SCSS файлы в CSS.

Теперь нужно добавить это в команду make:
```
"make": "npm run clean && npm run scss && npm run copy-files && npm run ts && tsc-alias && npm run packaging"
```

Но если мы хотим иметь на выходе один файл .css со всеми стилями глобально - нужно создать файл styles.scss, которая будет как точка входа для SCSS.

В него импортируем все файлы .scss, которые нам требуются. И node-sass уже натравливаем только на этот файл:
```
"scss": "node-sass ./src/styles.scss --output ./src/styles.css"
```

Тут нужно помнить, что если мы хотим глобальные стили - нельзя пользоваться css-модулями.

То есть, придётся по-старинке писать все стили через БЭМ например и вместо:
```
import styles from './Component.scss'
```

Писать так в нашу единую точку входа для стилей:
```
import './src./Component.scss';
```

Тогда css-файлы будут компилироваться без изменений в названиях css-классов.

7) Как сократить команду в package.json

Чтобы избавиться от огромного количества амперсандов и длиннющей строки, можно все эти операции вынести в отдельный js-файл, который будет удобнее читать.

Для этого в папке scripts создаём новый файл make.js, в который пишем следующее:
```
const { execSync } = require('child_process');

execSync('npm run clean'); 
execSync('npm run scss');
execSync('npm run copy-files');
execSync('npm run ts');
execSync('tsc-alias');
execSync('npm run up');
execSync('npm run packaging');
```

Здесь мы синхронно запускаем команды через шелл. То есть, ждём завершение одной команды, только потом запускаем следующую.

И теперь можно сократить строчку в package.json:
```
"make": "node ./scripts/make.js"
```

Стало выглядеть намного лаконичнее.

8) Как экспортировать компонент, использующий store нашего пакета

Это может понадобиться, если у нас присутствует какая-то непростая логика.\
Или если мы хотим с минимальными усилиями скопировать часть кода в отдельную репу практически без изменений.\
Или что угодно - это уже на усмотрение разработчика.

Для этого нам нужно создать контекст нашего стора и провайдер, который "прокинет" стор в конечное приложение.

Сначала добавим пути в tsconfig:
```
"store": ["./src/store"],
"store/*": ["./src/store/*"]
```

Затем создадим директорию, в которой будем держать наш стор.\
У меня это /src/store.

В нём создадим один простенький редьюсер, в моём случае это counter.

Дальше всё как обычно - используя redux toolkit, инициализируем наш стор.

А теперь самое интересное.

Если мы так и оставим и попробуем обернуть Provider приложения в ещё один - результат будет не такой, как мы ожидаем.

В зависимости от вложенности у нас будет всё равно лишь один стор - либо тот, который мы хотим экспортировать, либо тот, который используется в приложении.\
Они никак не объединятся.

Для того, чтобы решить эту проблему, нам помогут 4 всадника счастья:
```
createContext,
createStoreHook,
createDispatchHook,
createSelectorHook
```

Полный пример кода:
```
import { createContext } from 'react';

import {
  type ReactReduxContextValue,
  createStoreHook,
  createDispatchHook,
  createSelectorHook
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { counterReducer } from './counter';

const reducer = {
  counter: counterReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export const storeContext = createContext<ReactReduxContextValue>({
  store,
  storeState: reducer,
});

export const useStore = createStoreHook(storeContext);
export const useDispatch = createDispatchHook(storeContext);
export const useSelector = createSelectorHook(storeContext);
```

И провайдер:
```
import { Provider } from 'react-redux';

import { store, storeContext } from './store';

export const StoreProvider = ({ children } : { children: React.ReactNode }) => {
  return (
    <Provider context={storeContext} store={store}>
      {children}
    </Provider>
  );
}
```

Теперь мы можем экспортировать наш провайдер и обернуть в него всё остальное приложение с его стором - оба хранилища будут работать изолированно друг от друга.

И ещё один момент. Для обращения в стор пакета, нам необходимо использовать наши кастомные хуки из store.ts:
```
export const useStore = createStoreHook(storeContext);
export const useDispatch = createDispatchHook(storeContext);
export const useSelector = createSelectorHook(storeContext);
```

То есть, в создаваемом нами пакете, нужно обращаться к useDispatch и useSelector из store.ts, а не react-redux.

Такая же история и в конечном приложении. Если там нам необходимо обратиться к стору из пакета, то нужно использовать хуки оттуда, а не из react-redux.\
Поскольку контексты разные - один не увидит информацию из другого.

Для удобства, я создал два репозитория, в которых это всё уже реализовано.
Один - пример создания пакета (условное ядро):\
https://github.com/KrimsonKing1337/true-npm-package-core

И другой - пример использования пакета в конечном приложении (условный клиент):\
https://github.com/KrimsonKing1337/true-npm-package-client

Надеюсь, было полезно. А возможно вы даже узнали что-то новое.

Любая конструктивная критика и не менее конструктивные пулл-реквесты приветствуются. :)

P.S.:
И ещё раз напомню: я не претендую на лучшие практики в последней инстанции.
