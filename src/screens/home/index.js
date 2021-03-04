import React, {useState, useEffect} from 'react';
import Base from '../../components/Base';
import {withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Selectors} from '../../utils/Selectors';
import logo from '../../assets/github.png';

export default withRouter(function Home(props) {
  const selectors = useSelector(Selectors);
  const [user, setUser] = useState(selectors.userReducer.currentUser);

  useEffect(() => {
    if (selectors.userReducer.currentUser){
      if (!selectors.userReducer.currentUser.name) {
        props.history.push('/login');
      }
      if (JSON.stringify(selectors.userReducer.currentUser) !== JSON.stringify(user)) {
        setUser(selectors.userReducer.currentUser);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectors.userReducer]);

  return (
    <div>
      <Base>
        <div className="App-header">
          <div className="login-box">
            <img src={user.avatar_url ? user.avatar_url : logo} className="github-logo" alt="logo" />
            <div>
              <p className="user-info">{user.name}</p>
              <p className="user-info">{user.company ? user.company : 'Sin compañia'}</p>
              <p className="user-info">{user.email ? user.email : 'Sin email'}</p>
              <p className="user-info">{user.bio ? user.bio : 'Sin biografia'}</p>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
})