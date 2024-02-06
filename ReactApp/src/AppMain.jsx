import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom'

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import AutomationStudioContext from './React-Automation-Studio/components/SystemComponents/AutomationStudioContext';
import AlarmHandler from './React-Automation-Studio/components/AlarmHandler/AlarmHandler'

const Main = () => {

  let enableDemos =
  typeof import.meta.env.VITE__DISABLE_DEMOS !== "undefined"
    ? !(import.meta.env.VITE__DISABLE_DEMOS.toUpperCase() === "TRUE")
    : true;
  const context = useContext(AutomationStudioContext)

  const username = useMemo(() => {
    return context.userData.username
  }, [context.userData.username])

  const roles = useMemo(() => {
    return context.userData.roles
  }, [context.userData.roles])

  const isAlarmAdmin = useMemo(() => {
    const isLoggedIn = username !== undefined
    return isLoggedIn
      ? roles.includes("alarmAdmin")
      : false
  }, [username, roles])

  const vaultDemo = enableDemos && isAlarmAdmin
    ? (
      <ListItem button component={Link} to="/VaultDemo" target="_blank">
        <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
        <ListItemText primary="Vault Demo" />
      </ListItem>
    )
    : null

  return (
    <AlarmHandler
      titleProps={{
        title: "Demo Alarm Handler",
        alignTitle: "center",
        titleVariant: "h6",
        titleTextStyle: { textTransform: 'uppercase' },
        drawerItems: vaultDemo,
        hideDrawerAfterItemClick: true
      }}
      alarmDatabaseName="demoAlarmDatabase"
    />
  )
}
export default Main;
