import {useState} from 'react';

const EditBlogForm = ({ blog, onUpdate, onCancel }) => {
  // useStates
  const [editedBlog, setEditedBlog] = useState(blog);

  // Resets the input if there are any changes to make sure that only the msot recent version is updated
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  // This saves and then sets the changes made by the user for the specfic post
  const saveChanges = async () => {
    try {
      // calls the function to allow the user to edit the desired function
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
