import React from 'react';
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';

import AlarmHandler from './React-Automation-Studio/components/AlarmHandler/AlarmHandler'

const Main = () => {

  let enableDemos = typeof process.env.REACT_APP_DISABLE_DEMOS !== 'undefined' ? !(process.env.REACT_APP_DISABLE_DEMOS.toUpperCase() === 'TRUE') : true;

  const vaultDemo = enableDemos
    ? (
      <ListItem button component={Link} to="/VaultDemo" target="_blank">
        <ListItemIcon><AccountCircle /></ListItemIcon>
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
