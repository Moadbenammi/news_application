import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import Post from "./Post";

export default function Posts({ posts, loading, setPostId }) {
  if (loading) {
    return <CircularProgress color='dark' />;
  }

  return (
    <Grid container justify='center' spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} sm={9} md={6}>
          <Post key={post.id} post={post} setPostId={setPostId}></Post>
        </Grid>
      ))}
    </Grid>
  );
}
