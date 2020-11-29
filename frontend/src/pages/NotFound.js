import history from '../navigation/history';

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <button type="button" onClick={() => history.push('/')}>Go Home</button>
  </div>
);

export default NotFound;