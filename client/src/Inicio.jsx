import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Inicio() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/getposts')
    .then(response => response.json())
    .then(data => {
      setPosts(data);
    })
    .catch(error => console.error('Error:', error));
  }, [])

  return (
    <div className='posts_container'>
      {
        posts.map(post => (
          <Link key={post._id} to={`/post/${post._id}`} className='post'> 
            <img src={`http://localhost:3001/Images/${post.file}`} alt="" />
            <div className='post_text'>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Inicio;