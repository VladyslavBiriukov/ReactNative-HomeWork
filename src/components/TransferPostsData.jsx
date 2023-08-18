const postsData = {
  posts: [],
  addPost: (newPost) => {
    postsData.posts.push(newPost);
  },
  getPosts: () => {
    return postsData.posts;
  },
};

export default postsData;
