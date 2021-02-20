import './App.css';
import React, {lazy, useState, Suspense} from "react";
import {Redirect, Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import {LayoutPage} from "./hoc";
import { Dashboard, Login, NewPost, Post, Posts, Profile} from "./pages";
// const Dashboard = lazy(() => import("./pages/index"));


function App() {

    return (
        <div className="App">
            <Switch>
                <Route exact path={"/login"} component={Login}/>

                <LayoutPage>
                    <Redirect from="/*" to={"/dashboard"}/>
                    <Route exact path={"/dashboard"}  component={Dashboard}/>
                    <Route exact path={"/blog/:id"} component={Post}/>
                    <Route exact path={"/posts"} component={Posts}/>
                    <Route exact path={"/profile"} component={Profile}/>
                    <Route exact path={"/login"} component={Login}/>
                    <Route exact path={"/newpost"} component={NewPost}/>
                </LayoutPage>
            </Switch>
        </div>
    );
}

export default App;
