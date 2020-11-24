import React, { useEffect, useReducer } from 'react';
import './App.css';
import { Card, Box, Container, Grid } from '@material-ui/core';
// import Counter from './components/Counter';
import Item from './components/Item';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import useStyles from './styles/AppStyles';
import { PostData } from './types/Tstypes';
import Fuse from 'fuse.js';

const initialState = {
  // isLoading: true,
  data: [],
  search: '',
  searchData: [],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    // return { ...state, data: action.payload, isLoading: false };
    case 'SEARCH_INPUT':
      return { ...state, search: action.payload };
    case 'SEARCH_DATA':
      return { ...state, searchData: action.payload };
    default:
      throw new Error();
  }
};

//Set Fuse search rules
const options = {
  // useExtendedSearch: true,
  // isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  useExtendedSearch: true,
  ignoreLocation: true,
  // ignoreFieldNorm: false,
  maxPatternLength: 32,

  // Search in `author` and in `tags` array
  keys: ['title', 'body'],
};

//Declare API url
const API = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com`,
});

const App = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  //Get data list here
  const getTableData = async () => {
    API.get('/posts')
      .then((response) => {
        dispatch({ type: 'SET_DATA', payload: response.data });
        // console.log(response);
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log('Error');
      });
  };

  //Refresh get api
  useEffect(() => {
    getTableData();
  }, []);

  const handleInput = (e: { target: { value: any } }) => {
    //Declare for input value
    let str = e.target.value;

    //Call case on reducer
    dispatch({ type: 'SEARCH_INPUT', payload: str });

    let list = state.data;
    let fuse = new Fuse(list, options);
    const results = fuse.search(str);

    console.log(results);
    const newArr = results.map((result: any) => {
      //Highlight related search words
      let newTitle = result.item.title.replace(
        new RegExp(str, 'gi'),
        (match: any) =>
          `<mark style="background: #2769AA; color: white;">${match}</mark>`
      );
      let newBody = result.item.body.replace(
        new RegExp(str, 'gi'),
        (match: any) =>
          `<mark style="background: #2769AA; color: white;">${match}</mark>`
      );

      let matchScore = result.score;

      console.log(matchScore.toFixed(1));

      return {
        ...result.item,
        title: newTitle,
        body: newBody,
        similarity: matchScore.toFixed(1),
      };
    });

    // const newArr = state.data
    //   //Perform search action
    //   .filter(
    //     (item: TitleData) =>
    //       item.title.toLowerCase().includes(str.toLowerCase()) ||
    //       item.body.toLowerCase().includes(str.toLowerCase())
    //   )
    //   .map((item: TitleData) => {
    //     //Highlight related search words
    //     let newTitle = item.title.replace(
    //       new RegExp(str, 'gi'),
    //       (match: any) =>
    //         `<mark style="background: #2769AA; color: white;">${match}</mark>`
    //     );
    //     let newBody = item.body.replace(
    //       new RegExp(str, 'gi'),
    //       (match: any) =>
    //         `<mark style="background: #2769AA; color: white;">${match}</mark>`
    //     );

    //     //Get similarity rate
    //     let similarityOne = stringSimilarity.compareTwoStrings(str, item.title);
    //     let similarityTwo = stringSimilarity.compareTwoStrings(str, item.body);

    //     //Sumboth multiple content
    //     let sortedData = (similarityOne + similarityTwo) * 100;

    //     //Fixed the decimal to 1 decimal place
    //     let similarData = sortedData.toFixed(1);

    //     //Convert similarity rate to number
    //     let similarValue = parseFloat(similarData);

    //     return {
    //       ...item,
    //       title: newTitle,
    //       body: newBody,
    //       similarity: similarValue,
    //     };
    //   });

    //Sort Data based on Similarity Rate
    const sortedData = newArr.sort(function (
      a: { similarity: number },
      b: { similarity: number }
    ) {
      return a.similarity - b.similarity;
    });

    console.log(newArr);
    //Display search results
    dispatch({ type: 'SEARCH_DATA', payload: sortedData });
  };

  return (
    <div className="App">
      <Container>
        <Box mt="10px" pt="20px">
          <Card className={classes.tableCard}>
            <Box m="0.5em" p="0.5em">
              <Grid container>
                <Grid container item xs={12} alignItems="center">
                  <Grid item xs={12}>
                    <SearchBar onInput={(e: any) => handleInput(e)} />
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.itemContainer}>
                  {state.isLoading ? (
                    <p>Loading...</p>
                  ) : state.search.length > 0 ? (
                    state.searchData.map((post: PostData) => (
                      <Item
                        key={post.id}
                        user={post.userId}
                        title={post.title}
                        body={post.body}
                        similarity={post.similarity}
                      />
                    ))
                  ) : (
                    state.data.map((post: PostData) => (
                      <Item
                        key={post.id}
                        user={post.userId}
                        title={post.title}
                        body={post.body}
                        similarity={post.similarity}
                      />
                    ))
                  )}
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default App;
