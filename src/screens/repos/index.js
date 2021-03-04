import React, {useState, useEffect} from 'react';
import Base from '../../components/Base';
import {withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Selectors} from '../../utils/Selectors';
import {Button, Card, CardContent, CardActions, Grid, Typography} from '@material-ui/core';
import axios from 'axios';

export default withRouter(function Home(props) {
  const selectors = useSelector(Selectors);
  const [user, setUser] = useState(selectors.userReducer.currentUser);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (selectors.userReducer.currentUser){
      let redUser = selectors.userReducer.currentUser;
      if (!redUser.name) {
        props.history.push('/login');
      } else {
        axios.get(redUser.repos_url).then((res) => {
          console.log('res???', res.data);
          setRepos(res.data);
        }).catch((err) => {
          console.log('error', err);
        });
      }
      if (JSON.stringify(redUser) !== JSON.stringify(user)) {
        setUser(redUser);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectors.userReducer]);

  return (
    <div>
      <Base>
        <div className="App-header">
          {repos.length === 0 && (<Typography>No cuenta con ningun repo</Typography>)}
          <div className="gridCard">
            <Grid container spacing={3}>
              {repos.map((e,i) => (
                <Grid item xs={12} sm={6}>
                  <Card className="card">
                    <CardContent>
                      <Typography className="cardTitle" color="textSecondary" gutterBottom>
                        {e.name}
                      </Typography>
                      <Typography className="cardTitle" color="textSecondary" gutterBottom>
                        Creado por {e.owner.login}
                      </Typography>
                      <Typography className="cardTitle" color="textSecondary" gutterBottom>
                        {e.language ? e.language : <span>&nbsp;</span>}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => {
                        var win = window.open(e.html_url, '_blank');
                        win.focus();
                      }}>ir al repo</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </Base>
    </div>
  );
})