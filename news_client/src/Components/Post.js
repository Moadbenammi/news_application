import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 300,
  },
  media: {
    height: 200,
  },
});

export default function Post({ post, setPostId }) {
  const classes = useStyles();

  const showMore = () => {
    setPostId(post.id);
  };

  return (
    <Card onClick={() => showMore()} className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={post.imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {post.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
