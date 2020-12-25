import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./reducers";

const middleware = composeWithDevTools(applyMiddleware(promise,thunk));

export default createStore(rootReducer,middleware);

/**
 * Creación del store, createStore puede recibir el reducer y un segundo parámetro para middlewares
 * nota que en este caso son dos: promise y thunk, los llama composeWithDevTools
 * para poder usar la extensión de redux-devtools
 */