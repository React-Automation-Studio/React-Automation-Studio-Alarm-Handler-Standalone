import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import AutomationStudioContext from './React-Automation-Studio/components/SystemComponents/AutomationStudioContext';
import AlarmHandler from './React-Automation-Studio/components/AlarmHandler/AlarmHandler'

const Main = () => {

  let enableDemos = typeof process.env.REACT_APP_DISABLE_DEMOS !== 'undefined' ? !(process.env.REACT_APP_DISABLE_DEMOS.toUpperCase() === 'TRUE') : true;

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
