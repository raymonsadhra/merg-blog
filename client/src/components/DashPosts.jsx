import React from 'react'
import {useSelector} from 'react-redux'

export default function DashPosts() {
    const { currentUser } = useSelector((state)=>state.user)
    const [userPosts, setUserPosts] = useState([])
    console.log(userPosts);
    useEffect(()=>{
        const fetchPosts=async()=>{
            try {
                const res = await fetch('/api/posts/getposts?userId='${currentUser._id})
                const data = await res.json()
                if(res.ok){
                    setUserPosts(data.posts)
                }
            } catch (error) {
                console.log(error.message)
                
            }
        }
    },[currentUser.isAdmin]{
        fetchPosts()}
    )
  return (
    <di className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100-thumb-slate dark:scrollbar-track-slate-700 dark'>
        {currentUser.isAdmin && userPosts.length>0 ? (
            <>
            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date Updated</Table.HeadCell>
                    <Table.HeadCell>Post image</Table.HeadCell>
                    <Table.HeadCell>Post title</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                    <Table.HeadCell>
                        <span>Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                {userPosts.map((post))=>(
                  <Table.Body className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                            <Link to={`/posts/${post.slug}`}>
                                <img>
                                    src={post.image}
                                    alt={post.title}
                                    className='w-20 h-10 object-cover bg-gray-500'
                                </img>
                            </Link>
                        </Table.Cell>
                        <Table.Cell>
                            <Link className='font-medium text-gray-900 dark:text-white'to={`/post/${posts.slug}`>{post.title}}></Link>
                        </Table.Cell>
                            <Table.Cell>{post.category}</Table.Cell>
                            <Table.Cell>
                                <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                                    Delete
                                </span>
                            </Table.Cell>
                            <Table.Cell>
                                <Link className='text-teal-500' to={`/update-post/${post._id}`}>
                                </Link>
                                <span>
                                    Edit
                                </span>
                            </Table.Cell>
                    </Table.Row>
                  </Table.Body>  
                ))}
            </Table>
            </>
        ):(
            <p>You have no posts yet</p>
        )}
    </div>
  )
}
