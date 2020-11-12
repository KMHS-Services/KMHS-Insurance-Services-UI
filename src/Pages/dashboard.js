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
import Stats from '../components/stats'


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
  const { window, setToken,token } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [path,setPath]=React.useState(localStorage.getItem('path')||'Policy')

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  function signOut() {
    localStorage.removeItem('token')
    setToken(null);
  }
  function chooseComponent(path){
    switch (path) {
      case 'Policy':
        return <PolicyTable />
      case 'Admin':
        return <AdminTable />
      case 'User':
       return <UserTable />
      case 'Staff':
        return <StaffTable />
      case 'Stats':
        return <Stats />
      case 'PickPolicy':
        return <Stats />
      case 'MyPolicies':
        return <Stats />
      default:
        break;
    }
  }
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem selected={path==='Policy'} button key={'Policy'} onClick={()=>{setPath('Policy');localStorage.setItem('path','Policy')}}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'Maintain Policy'} />
        </ListItem>
        <ListItem selected={path==='Admin'} button key={'Admin'} onClick={()=>{setPath('Admin');localStorage.setItem('path','Admin')}}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'Maintain Admins'} />
        </ListItem>
        <ListItem selected={path==='Staff'} button key={'Staff'} onClick={()=>{setPath('Staff');localStorage.setItem('path','Staff')}}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'Maintain Staff'} />
        </ListItem>
        <ListItem selected={path==='User'} button key={'User'} onClick={()=>{setPath('User');localStorage.setItem('path','User')}}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'Maintain User'} />
        </ListItem>
        <ListItem selected={path==='Stats'} button key={'Stats'} onClick={()=>{setPath('Stats');localStorage.setItem('path','Stats')}}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary={'View Stats'} />
        </ListItem>
      </List>
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
          {`Hello, ${token}   `}
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