import React, {useState, useEffect} from 'react';
import Base from '../../components/Base';
import {Button, TextField} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import Loading from 'react-fullscreen-loading';
import {useSelector} from 'react-redux';
import {Selectors} from '../../utils/Selectors';
import DispatchEvents from '../../utils/Dispatchs';
import logo from '../../assets/github.png';
import axios from 'axios';
import {git_user_url} from '../../utils/Apis';

export default withRouter(function Login(props) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('aldoaltamira');
  const selectors = useSelector(Selectors);
  const {login} = DispatchEvents();
  const searchUserName = () => {
    setLoading(true);
    axios.get(`${git_user_url}/${username}`).then((resp) => {
      setLoading(false);
      let user = resp.data;
      if (!user.name) {
        user.name = username;
      }
      console.log('resp', resp);
      login(user);
    }).catch((err) => {
      setLoading(false);
      console.log('error', err);
    })
  };

  useEffect(() => {
    if (selectors.userReducer.currentUser){
      console.log('selectors.userReducer.currentUser', selectors.userReducer.currentUser)
      if (selectors.userReducer.currentUser.name) {
        props.history.push('/');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectors.userReducer]);

  return (
    <div>
      <Loading loading={loading} background="#2ecc71" loaderColor="#3498db" />
      <Base loading={loading}>
        <div className="App-header">
          <div className="login-box">
            <img src={logo} className="github-logo" alt="logo" />
            <TextField value={username} label="Username" onChange={(ev) => setUsername(ev.target.value)}/>
            <Button variant="contained" color="primary" onClick={searchUserName}>
              Iniciar
            </Button>
          </div>
        </div>
      </Base>
    </div>
  );
})