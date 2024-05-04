import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userContext } from './App'

function Post() {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    const user = useContext(userContext)

    useEffect(() => {
        fetch('http://localhost:3001/getpostbyid/' + id)
            .then(response => response.json())
            .then(result => setPost(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        fetch('http://localhost:3001/deletepost/' + id, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                navigate('/')
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(err => console.error('Error:', err));
    }

    return (
        <div className='post_container'>
            <div className='post_post'>
                <img src={`http://localhost:3001/Images/${post.file}`} alt="" />
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <div>
                    {
                        user.email === post.email ?
                            <>
                                <Link to={`/editpost/${post._id}`}>Edit</Link>
                                <button onClick={e => handleDelete(post._id)}>Delete</button>
                            </> : <></>
                    }

                </div>
            </div>
        </div>
    )
}

export default Post;
