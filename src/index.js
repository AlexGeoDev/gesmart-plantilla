// Internet Explorer 11 requires polyfills and partially supported by this project.
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import './i18n';
import './styles/app-base.css';
import './styles/app-components.css';
import './styles/app-utilities.css';
import ReactDOM from 'react-dom';
import App from 'app/App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.gesmart-urbaser.com'

ReactDOM.render(
  <App />, // Do not forget "," becasue render recive two params: 1. is the App (or the wrapper of App), 
  document.getElementById('root') //2. It is where the elements will be rendered
);

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
