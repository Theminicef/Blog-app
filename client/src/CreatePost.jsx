import { useContext, useState } from "react";
import { userContext } from './App';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const user = useContext(userContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('email', user.email);
        formData.append('file', file);

        fetch('http://localhost:3001/create', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data === 'Success') {
                window.location.href = "/";
            }
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="post_container">
            <div className="post_form">
                <form onSubmit={handleSubmit}>
                    <h2>Create Post</h2>
                    <input 
                        type="text" 
                        placeholder="Enter Title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        name="desc"
                        id="desc"
                        cols="30"
                        rows="10"
                        placeholder="Enter Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    <input 
                        type="file" 
                        className="file" 
                        placeholder="Select File" 
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <button>Post</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
