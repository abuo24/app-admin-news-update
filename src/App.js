import './App.css';
import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {LayoutPage} from "./hoc";
import {Dashboard, Login, Message, NewCategory, NewPost, Post, Posts, Profile, ShortNews, Video} from "./pages";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCategories, getNewsByViewsCount} from "./redux/action/posts";
import 'react-toastify/dist/ReactToastify.css';
import {getMe, getMeByToken} from "./redux/action/authApis";
import {getTags} from "./redux/action/tagsApi";
import {getMessage} from "./redux/action/messageApi";

const App = (props) => {

    const [isLogged, setIsLogged] = useState(false);

    console.log(props);
    console.log(localStorage.getItem("token"));
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLogged(true);
            props.getMe().then().catch(
                err => {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            );
            props.getNewsByViewsCount();
            props.getCategories();
            props.getTags();
            props.getMessage();
            props.getMe();

        } else {
            setIsLogged(false)
        }
    }, []);

    if (!isLogged) {
        return (
            <Login/>
        )
    }

    if (props.toggle_reducer && props.toggle_reducer.toggle) {
        <Redirect to={"/profile"}/>
    }

    return (
        <div className="App">

            <Switch>
                <LayoutPage>
                    <Route exact path={"/"} component={Dashboard}/>
                    <Route exact path={"/blog/:id"} component={Post}/>
                    <Route exact path={"/posts"} component={Posts}/>
                    <Route exact path={"/profile"} component={Profile}/>
                    <Route exact path={"/login"} component={Login}/>
                    <Route exact path={"/shortnews"} component={ShortNews}/>
                    <Route exact path={"/newpost"} component={NewPost}/>
                    <Route exact path={"/newcategori"} component={NewCategory}/>
                    <Route exact path={"/message"} component={Message}/>
                    <Route exact path={"/video"} component={Video}/>
                    {/*<Redirect from="/" to={"/dashboard"}/>*/}

                </LayoutPage>
            </Switch>
        </div>
    );
}

const mstp = state => (state);

const mdtp = (dispatch) => (bindActionCreators({
    getMe,
    getMeByToken,
    getNewsByViewsCount,
    getCategories,
    getTags,
    getMessage
}, dispatch));

export default connect(mstp, mdtp)(App);
