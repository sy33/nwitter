import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

export default () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <Switch>
                { isLoggedIn ? 
                <>
                <Route>
                    
                </Route>
                </> : <Route> <Auth /></Route>}
            </Switch>
        </Router>
    )
}