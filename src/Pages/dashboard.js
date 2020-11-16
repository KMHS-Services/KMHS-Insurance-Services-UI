import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PolicyTable from '../components/policyTable';
import AdminTable from '../components/adminTable';
import UserTable from '../components/userTable';
import StaffTable from '../components/staffTable';
import PolicyIcon from '@material-ui/icons/Policy';
import AgeStats from '../components/ageStats'
import RevenueStats from '../components/revenueStats'
import PolicyStats from '../components/policyStats'
import PickPolicy from '../components/pickPolicy'
import MyPolicies from '../components/myPolicies'
import PolicyTaken from '../components/policyTaken'
import AdminPolicyStats from '../components/adminPolicyStats';
import AdminUserStats from '../components/adminUserStats';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }, title: {
    flexGrow: 1,
  }
}));

function DashBoard(props) {
  const { window, setToken, token } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [path, setPath] = React.useState(localStorage.getItem('path') || 'Policy')

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  function signOut() {
    localStorage.removeItem('token')
    setToken(null);
  }
  function chooseComponent(path) {
    switch (path) {
      case 'Policy':
        return <PolicyTable />
      case 'Admin':
        return <AdminTable />
      case 'User':
        return <UserTable />
      case 'Staff':
        return <StaffTable />
      case 'Age Stats':
        return <AgeStats />
      case 'Policy Stats':
        return <PolicyStats />
        case 'Revenue Stats':
          return <RevenueStats/>
          case 'Admin - Policy Stats':
          return <AdminPolicyStats/>
          case 'Admin - User Stats':
          return <AdminUserStats/>
      case 'PolicyTaken':
        return <PolicyTaken />
      case 'PickPolicy':
        return <PickPolicy />
      case 'MyPolicies':
        return <MyPolicies />
      default:
        break;
    }
  }
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />

      {localStorage.getItem('isAdmin') === "true" ? <List><ListItem selected={path === 'Policy'} button key={'Policy'} onClick={() => { setPath('Policy'); localStorage.setItem('path', 'Policy') }}>
        <ListItemIcon><PolicyIcon /></ListItemIcon>
        <ListItemText primary={'Maintain Policy'} />
      </ListItem><ListItem selected={path === 'Admin'} button key={'Admin'} onClick={() => { setPath('Admin'); localStorage.setItem('path', 'Admin') }}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'Maintain Admins'} />
        </ListItem>
        <ListItem selected={path === 'PolicyTaken'} button key={'PolicyTaken'} onClick={() => { setPath('PolicyTaken'); localStorage.setItem('path', 'PolicyTaken') }}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'Maintain Policies Taken'} />
        </ListItem>
        <ListItem selected={path === 'Staff'} button key={'Staff'} onClick={() => { setPath('Staff'); localStorage.setItem('path', 'Staff') }}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'Maintain Staff'} />
        </ListItem>
        <ListItem selected={path === 'User'} button key={'User'} onClick={() => { setPath('User'); localStorage.setItem('path', 'User') }}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'Maintain User'} />
        </ListItem>
        <ListItem selected={path === 'Policy Stats'} button key={'Policy Stats'} onClick={() => { setPath('Policy Stats'); localStorage.setItem('path', 'Policy Stats') }}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'View Policy Stats'} />
        </ListItem>
        <ListItem selected={path === 'Age Stats'} button key={'Age Stats'} onClick={() => { setPath('Age Stats'); localStorage.setItem('path', 'Age Stats') }}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'View Age Stats'} />
        </ListItem>
        <ListItem selected={path === 'Revenue Stats'} button key={'Revenue Stats'} onClick={() => { setPath('Revenue Stats'); localStorage.setItem('path', 'Revenue Stats') }}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'View Revenue Stats'} />
        </ListItem>
        <ListItem selected={path === 'Admin - Policy Stats'} button key={'Admin - Policy Stats'} onClick={() => { setPath('Admin - Policy Stats'); localStorage.setItem('path', 'Admin - Policy Stats') }}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'Admin - Policy Stats'} />
        </ListItem>
        <ListItem selected={path === 'Admin - User Stats'} button key={'Admin - User Stats'} onClick={() => { setPath('Admin - User Stats'); localStorage.setItem('path', 'Admin - User Stats') }}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'Admin - User Stats'} />
        </ListItem>
      </List> : <List><ListItem selected={path === 'PickPolicy'} button key={'PickPolicy'} onClick={() => { setPath('PickPolicy'); localStorage.setItem('path', 'PickPolicy') }}>
        <ListItemIcon><PolicyIcon /></ListItemIcon>
        <ListItemText primary={'Pick Policy'} />
      </ListItem>
          <ListItem selected={path === 'MyPolicies'} button key={'MyPolicies'} onClick={() => { setPath('MyPolicies'); localStorage.setItem('path', 'MyPolicies') }}>
            <ListItemIcon><PolicyIcon /></ListItemIcon>
            <ListItemText primary={'My Policies'} />
          </ListItem></List>
      }

      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            <b>KMHS</b> Insurance Services
          </Typography>
          <b>
            {`Hello, ${localStorage.getItem('username')}   `}
          </b>
          <Button onClick={signOut} color="inherit">Logout</Button>

        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          chooseComponent(path)
        }

      </main>
    </div>
  );
}

DashBoard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashBoard;