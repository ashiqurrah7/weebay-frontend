import { observer } from "mobx-react-lite";
import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { RootStore, RootStoreContext } from "../../store/rootStore";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const store: RootStore =  useContext(RootStoreContext);
  const { isAuthenticated, loadingUser } = store.commonStore;
  return <Route {...rest} render={(routeProps) =>
      {!isAuthenticated && !loadingUser ? (
        <Redirect to="/" />
      ) : (
        <Component {...routeProps} />
      )
    }}
  />; 
};


export default observer(PrivateRoute);
