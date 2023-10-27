import React, { useContext } from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom'


// demos
import MainDashboard from './React-Automation-Studio/components/UI/MainDashboard';
import Vault from './React-Automation-Studio/components/AlarmHandler/Vault';
//system
import Login from "./React-Automation-Studio/components/SystemComponents/Login";
import Probe from "./React-Automation-Studio/components/SettingsPages/Probe";
import Help from "./React-Automation-Studio/components/docs/Help";
import Main from "./Main";
import AutomationStudioContext from "React-Automation-Studio/components/SystemComponents/AutomationStudioContext";
import Administrator from "React-Automation-Studio/components/Administrator/Administrator.js";
import UserProfile from "React-Automation-Studio/components/SystemComponents/userProfiles/UserProfile";
import ProtectedRoute from "React-Automation-Studio/components/SystemComponents/ProtectedRoute";

const Routes = (props) => {
  const context = useContext(AutomationStudioContext);
  /* eslint-disable-next-line no-unused-vars */
  const userData = context.userData;
  /* eslint-disable-next-line no-unused-vars */
  const roles = context.userData.roles;
  
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" component={Main} />
        <ProtectedRoute exact path="/MainDashboard" component={MainDashboard} />
        <ProtectedRoute
          exact
          path="/Administrator"
          component={Administrator}
          roles={["admin"]}
        />
        <ProtectedRoute path="/UserProfile" component={UserProfile} />
        {process.env.REACT_APP_EnableLogin === "true" && (
          <Route
            exact
            path="/Login"
            component={() => (
              <Login
                version="V4.0.3"
                timeout={5000}
              />
            )}
          />
        )}
        <ProtectedRoute path="/Probe" component={Probe} />
        <ProtectedRoute path="/Help" component={Help} />
        {/*system end*/}

        {/*staging start*/}
        <ProtectedRoute path="/VaultDemo" component={Vault} />
        {/*staging end*/}
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
