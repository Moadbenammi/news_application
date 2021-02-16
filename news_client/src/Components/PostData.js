import React from "react";
import {
  Container,
  createMuiTheme,
  MuiThemeProvider,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import "./postData.css";

//Some styling for responsive font sizes
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function PostData({ postData}) {
  

  return (
    <Container maxWidth='md'>
        <div className='container'>
        <MuiThemeProvider theme={theme}>
            <div id="title-holder">
            <Typography variant='h3' component='h2' align='center' gutterBottom>
            {postData.title}
            </Typography>
            </div>
            
            <img src= {postData.imageUrl} />
            <div className='text-container'>
            <Typography variant='subtitle1' gutterBottom>
                {postData.body}
            </Typography>
            </div>
        </MuiThemeProvider>
        </div>
    </Container> 
  );
}
