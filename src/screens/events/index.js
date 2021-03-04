import React, {useState, useEffect} from 'react';
import Base from '../../components/Base';
import {withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Selectors} from '../../utils/Selectors';
import {Card, CardContent, Grid, Typography} from '@material-ui/core';
import axios from 'axios';

export default withRouter(function Home(props) {
  const selectors = useSelector(Selectors);
  const [user, setUser] = useState(selectors.userReducer.currentUser);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    if (selectors.userReducer.currentUser){
      let redUser = selectors.userReducer.currentUser;
      if (!redUser.name) {
        props.history.push('/login');
      } else {
        axios.get(redUser.received_events_url).then((res) => {
          console.log('res???', res.data);
          setEventos(res.data);
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
          {eventos.length === 0 && (<Typography>No cuenta con ningun evento</Typography>)}
          <div className="gridCard">
            <Grid container spacing={3}>
              {eventos.map((e,i) => (
                <Grid item xs={12} sm={6}>
                  <Card className="card">
                    <CardContent>
                      <Typography className="cardTitle" color="textSecondary" gutterBottom>
                        Repo: {e.repo.name}
                      </Typography>
                      <Typography className="cardTitle" color="textSecondary" gutterBottom>
                        Actor {e.actor.login}
                      </Typography>
                      <div className="commitList">
                        <Typography className="cardTitle" color="textSecondary" gutterBottom>
                          Commits
                        </Typography>
                        {e.payload.commits.length === 0 && (<Typography>No cuenta con ningun commit</Typography>)}
                        {e.payload.commits.map((f,ind) => (
                          <div key={ind}>
                            <Typography className="cardTitle" color="textSecondary" gutterBottom>
                              Creado por: {f.author.name}
                            </Typography>
                            <Typography className="cardTitle" color="textSecondary" gutterBottom>
                              {f.message}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </CardContent>
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