import React, { useContext } from "react";

import { Route, BrowserRouter, Routes } from "react-router-dom";

/// demos
import MainDashboard from 'React-Automation-Studio/components/UI/MainDashboard';
import Vault from 'React-Automation-Studio/components/AlarmHandler/Vault';
//system
import Login from "React-Automation-Studio/components/SystemComponents/Login";
import Probe from "React-Automation-Studio/components/SettingsPages/Probe";
import Help from "React-Automation-Studio/components/docs/Help";
import AppMain from "./AppMain";
import AutomationStudioContext from "React-Automation-Studio/components/SystemComponents/AutomationStudioContext";
import Administrator from "React-Automation-Studio/components/Administrator/Administrator";
import UserProfile from "React-Automation-Studio/components/SystemComponents/userProfiles/UserProfile";
import ProtectedRoute from "React-Automation-Studio/components/SystemComponents/ProtectedRoute";


const AppRoutes = (props) => {
  const context = useContext(AutomationStudioContext);
  /* eslint-disable-next-line no-unused-vars */
  const userData = context.userData;
  /* eslint-disable-next-line no-unused-vars */
  const roles = context.userData.roles;
  /* eslint-disable-next-line no-unused-vars */
  const username = context.userData.username;
  let enableDemos =
    typeof import.meta.env.VITE_DISABLE_DEMOS !== "undefined"
      ? !(import.meta.env.VITE_DISABLE_DEMOS.toUpperCase() === "TRUE")
      : true;

  return (
    //For all changes see the migration stragey from V4.0.3 to V5.2.0 in the documentation
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <AppMain />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/MainDashboard"
          element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/Administrator"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Administrator />
            </ProtectedRoute>
          }
        />
        {import.meta.env.VITE__EnableLogin === "true" && (
          <Route
            exact
            path="/Login"
            component={() => (
              <Login
                version="V5.0.0"
                timeout={5000}
              />
            )}
          />
        )}

        <Route
          path="/UserProfile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        {import.meta.env.VITE_EnableLogin === "true" && (
          <Route
            exact
            path="/Login"
            element={<Login version="V6.0.1" timeout={5000} />}
          />
        )}

        <Route
          path="/Probe"
          element={
            <ProtectedRoute>
              <Probe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Help"
          element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          }
        />
        {/*system end*/}

        
        {enableDemos &&  <Route
          path="/VaultDemo"
          element={
            <ProtectedRoute>
              <Vault />
            </ProtectedRoute>
          }
        />}
       
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
