import React, {useState} from 'react';
import {Col} from "antd";
import {CardItem} from "../index";
import CategoryPost from "../category/categoryPost";

const Posts = () => {

    const [posts, setPosts] = useState([{
            categoryTitle: "world", posts: [
                {
                    id: 1,
                    title: "blog1",
                    views: 123,
                    likes: 123,
                    date: "07 Yanvar 2020",
                    comments: 1900
                },
                {
                    id: 2,
                    title: "blog2",
                    views: 123,
                    likes: 123,
                    date: "07 Yanvar 2020",
                    comments: 1900
                },
                {
                    id: 3,
                    title: "blog3",
                    views: 123,
                    likes: 123,
                    date: "07 Yanvar 2020",
                    comments: 1900
                }]
        },
            {
                categoryTitle: "business", posts: [
                    {
                        id: 1,
                        title: "blog1",
                        views: 123,
                        likes: 123,
                        date: "07 Yanvar 2020",
                        comments: 1900
                    },
                    {
                        id: 2,
                        title: "blog2",
                        views: 123,
                        likes: 123,
                        date: "07 Yanvar 2020",
                        comments: 1900
                    },
                    {
                        id: 3,
                        title: "blog3",
                        views: 123,
                        likes: 123,
                        date: "07 Yanvar 2020",
                        comments: 1900
                    }]
            },
        ])
    ;

    const getPosts = posts.map((item, key) => (<CategoryPost postList={item.posts} key={key} title={item.categoryTitle}/>));

    return (<div>
        {getPosts}
    </div>);
};

export default Posts;