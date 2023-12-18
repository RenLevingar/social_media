import { Link } from 'react-router-dom';
import '../Styles/css/allBlogs.css';
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
    <div className='blogCardContainer'>
      <div className='blogCard'>
        {blogs.map((blog) => (
          <div key={blog._id}>
            <Link to={'/blog'}>
              <button onClick={()=>newPage(blog._id)}>
                {blog.img && <img src={blog.img} alt="Blog" />}
                <br />
                {blog.title}
                <p>Author: {blog.author}</p>
              </button>
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList2;
