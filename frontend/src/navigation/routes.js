import { Switch, Route } from 'react-router-dom';

import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home}/>
            <Route component={NotFound} />
        </Switch>
    )
}