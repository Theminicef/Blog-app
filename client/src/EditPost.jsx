import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3001/editpost/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        })
        .then(response => response.json())
        .then(data => {
            if (data === 'Success') {
                navigate('/');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        fetch(`http://localhost:3001/getpostbyid/${id}`)
        .then(response => response.json())
        .then(data => {
            setTitle(data.title);
            setDescription(data.description);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="post_container">
            <div className="post_form">
                <form onSubmit={handleSubmit}>
                    <h2>Update Post</h2>
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
                        value={description}
                        placeholder="Enter Description"
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    <button>Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditPost;
