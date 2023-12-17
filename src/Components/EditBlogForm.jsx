import {useState} from 'react';

const EditBlogForm = ({ blog, onUpdate, onCancel }) => {
  const [editedBlog, setEditedBlog] = useState(blog);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:9000/users/blog/${editedBlog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBlog),
      });
      const updatedBlog = await response.json();
      onUpdate(updatedBlog);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={editedBlog.title}
        onChange={handleInputChange}
      /><br></br>
      <label>Content:</label>
      <textarea
        name="content"
        value={editedBlog.content}
        onChange={handleInputChange}
      /><br></br>
      <label>Image URL:</label>
      <input
        type="text"
        name="img"
        value={editedBlog.img}
        onChange={handleInputChange}
      />
      <button onClick={saveChanges}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditBlogForm;
