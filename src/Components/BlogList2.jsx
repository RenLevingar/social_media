// Import necessary dependencies
import { Link } from 'react-router-dom';
// Import the styles for this component
import '../Styles/css/allBlogs.css';

// Define the BlogList2 component
const BlogList2 = ({ blogs }) => {
  
  // Function to handle opening a new page and storing the blog ID in local storage
  const newPage = (id) => {
    localStorage.setItem('viewBlog', id);
  }

  return (
    <>
      <h1 className='allBlogTitle'>Check Out What's New!</h1>
      <div className='blogCardContainer'>
        {blogs.map((blog) => (
          <div key={blog._id} className='blogCard'>
            <Link to='/blog'>
              <button className='allBlogBtn' onClick={() => newPage(blog._id)}>
                <div className='blogImageContainer'>
                  {blog.img && <img src={blog.img} alt="Blog" />}
                </div>
                <div className='blogInfo'>
                  <h1>{blog.title}</h1>
                  <h3>Author: {blog.author}</h3>
                  <h3>Created: {blog.date}</h3>
                </div>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogList2;
