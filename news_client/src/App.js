import "./App.css";
import Navbar from "./Components/Navbar";
import { Container } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import Posts from "./Components/Posts";
import Pagination from "./Components/Pagination";
import PostData from "./Components/PostData";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function App() {
  const [posts, setPosts] = useState([]);
  const [postData, setPostData] = useState([]);
  const [postId, setPostId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:9090/api/news");
        setPosts(res.data);
      } catch (e) {
        console.log(e.message);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  //Get a single post :
  const fetchOnePost = async (id) => {
    try {
      const res = await axios.get(`http://localhost:9090/api/news/${id}`);
      setPostData(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(
    (id = postId) => {
      if (id != 0) {
        fetchOnePost(id);
      }
    },
    [postId]
  );

  //back to see other posts :
  const backToFeed = () => {
    setPostId(0);
    setPostData([]);
  };

  //Search handling
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  //Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='App'>
      <Navbar handleSearch={handleSearch} />

      {postId == 0 ? (
        <Container maxWidth='md'>
          <h1>Best News App Ever</h1>
          <Posts
            posts={search == "" ? currentPosts : filteredPosts}
            setPostId={setPostId}
            loading={loading}
          />
          {search == "" ? (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          ) : null}
        </Container>
      ) : (
        <div className='postPage-container'>
          <div className='back-arrow-btn' onClick={() => backToFeed()}>
            {" "}
            <ArrowBackIcon fontSize='large' color='default' />{" "}
          </div>
          <PostData postData={postData} />
        </div>
      )}
    </div>
  );
}

export default App;
