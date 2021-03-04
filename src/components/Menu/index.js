import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Selectors} from '../../utils/Selectors';
import {withRouter} from 'react-router-dom';
import {AppBar, Button, Toolbar, Typography, IconButton, SwipeableDrawer} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LoginIcon from '@material-ui/icons/MeetingRoom';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import DispatchEvents from '../../utils/Dispatchs';
import {makeStyles} from '@material-ui/core/styles';

export default withRouter(function Menu(props) {
  const selectors = useSelector(Selectors);
  const [user, setUser] = useState(selectors.userReducer.currentUser);
  const [open, setOpen] = useState(false);
  const {logout} = DispatchEvents();
  const list = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Repos',
      path: '/repos',
    },
    {
      title: 'Eventos',
      path: '/events',
    },
  ];

  useEffect(() => {
    if (selectors.userReducer.currentUser){
      if (JSON.stringify(selectors.userReducer.currentUser) !== JSON.stringify(user)) {
        setUser(selectors.userReducer.currentUser);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectors.userReducer]);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const useStyles = makeStyles({
    paper: {
      background: '#3F50B5',
      color: 'white'
    }
  });

  const styles = useStyles();

  const sessionButton = () => {
    if (user.name) {
      logout();
      props.history.push('/login');
    } else {
      props.history.push('/');
    }
  };

  return (
    <div className={props.loading ? 'hide' : 'menu-root'}>
      <AppBar position="fixed" >
        <React.Fragment key="left">
          <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            classes={{paper: styles.paper}}
          >
            <div className="drawer">
              {list.map((e,i) => (
                <Button key={i} onClick={() => props.history.push(e.path)}>
                  <Typography variant="h6" className='menu-root listTitle'>
                    {e.title}
                  </Typography>
                </Button>
              ))}
            </div>
          </SwipeableDrawer>
        </React.Fragment>
        <Toolbar>
          {user.name && 
            <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" onClick={() => setOpen(!open)}>
              <MenuIcon />
            </IconButton>}
          <Typography variant="h6" className='menu-root'>
            
          </Typography>
          {user.name && (
            <Typography variant="h6">
              {user.name}
            </Typography>
          )}
          <IconButton color="inherit" aria-label="menu" onClick={sessionButton}>
            {user.name ? <LogoutIcon /> : <LoginIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
});
