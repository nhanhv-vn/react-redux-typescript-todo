## Upgrade redux version(7.2)

## Todo list practice

- An example to apply new concepts in redux

### Structure folders & files

```
.
├── App.css
├── App.tsx
├── components
│   ├── EditModal
│   │   ├── index.styles.ts
│   │   └── index.tsx
│   ├── Form
│   │   ├── index.styles.ts
│   │   └── index.tsx
│   └── Item
│       ├── index.styles.ts
│       └── index.tsx
├── constants
│   └── index.ts
├── index.css
├── index.tsx
├── logo.svg
├── models
│   ├── index.ts
│   └── todo.model.ts
├── pages
│   └── todos
│       └── index.tsx
├── react-app-env.d.ts
├── redux-store.ts
├── serviceWorker.ts
├── setupTests.ts
└── store
    ├── index.ts
    ├── root-reducers.ts
    └── todo
        ├── actions.ts
        ├── index.ts
        ├── reducers.ts
        └── types.ts
```

### Install and run example

- Install [json-server](https://github.com/typicode/json-server) to your machine

- Run server: `cd redux-todo && json-server --watch db.json --port 4000`. Use port 4000 to avoid conflict with react app. Default json-server run on port 3000

- Run app: `cd redux-todo && yarn && yarn start`

#### Some keywords need notes when use Hooks and React redux

- useSelector()
- useDispatch()
- Removed useActions()
- useStore()

## Reference

- Build base project React & Redux & Typescript: https://github.com/z1digitalstudio/react-ts-starter
- Using Hooks in a React Redux App: https://react-redux.js.org/api/hooks
- Fake REST API: https://github.com/typicode/json-server
- Material-UI: https://material-ui.com/
- Promise based HTTP client: https://github.com/axios/axios
- Redux DevTools extension. http://extension.remotedev.io
