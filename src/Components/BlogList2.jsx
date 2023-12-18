import { Link } from 'react-router-dom';


// This componet creates the look for all of the blogs on the home page
const BlogList2 = ({ blogs }) => {
  
  const newPage = async(id) => {
    // const blogsData = await fetch('http://localhost:9000/users/blog', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // const blogsOutput = await blogsData.json();
    // let finalBlogs = blogsOutput.x.filter(blog => blog._id === id);
    localStorage.setItem('viewBlog', id);
  }

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog._id}>
          <Link to={'/blog'} onClick={newPage(blog._id)}>{blog.title}</Link>
          {/* {blog.img && <img src={blog.img} alt="Blog" />} */}
          {/* <p>{blog.content}</p> */}
          {/* <p>Author: {blog.author}</p> */}
        </li>
      ))}
    </ul>
  );
};

export default BlogList2;
