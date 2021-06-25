import React from 'react';
import { ListItem, ListItemText,  Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function PostListItem({ post, author, timestamp }) {
    const classes = useStyles();
    return (
        <div class="list-items " className = {classes.root} style= {{display:'flex'}}>
            
            <ListItem>
                <ListItemText primary = {post}> </ListItemText>
                <div>
                <ListItemText secondary = {author}></ListItemText>
                <ListItemText secondary = {new Date(timestamp*1000).toString()}></ListItemText>
                </div>
            </ListItem>
            
             {/* <p>{author}</p>
             <p>{post}</p>
             <p>{}</p> */}
        </div>
    );
}

