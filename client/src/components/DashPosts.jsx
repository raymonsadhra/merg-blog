import React from 'react'
import {useSelector} from 'react-redux'

export default function DashPosts() {
    const { currentUser } = useSelector((state)=>state.user)
    const [userPosts, setUserPosts] = useState([])
    const [showMore, setShowMore] = useState(true);
    const [showModal,setShowModal]=useState(false);
    const [postIdDelete, setPostIdToDelete] = useState(''');
    console.log(userPosts);
    useEffect(()=>{
        const fetchPosts=async()=>{
            try {
                const res = await fetch('/api/posts/getposts?userId='${currentUser._id})
                const data = await res.json()
                if(res.ok){
                    setUserPosts(data.posts)
                    if(data.posts.length<9){
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message)
                
            }
        }
    },[currentUser.isAdmin]{
        fetchPosts()}
    )
    const handleShowMore = async () =>{
        const startIndex = userPosts.length;
        try {
            const res = await fetch(`api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.json();
            if(res.ok){
                setUserPosts((prev)=> [...prev,...data.posts]);
                if(data.posts.length<9){
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
            
        }
    }
    const handleDeletePost = async() =>{
        setShowModal(false);
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
                method: 'DELETE',
            });
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }else{
                setUserPosts((prev)=>
                prev.filter((post)=>post._id!==postIdToDelete))
            }
        } catch (error) {
            console.log(error.message);
            
        }

    }
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
                                <span onClick={()=>
                                    setShowModal(true);
                                    setPostIdToDelete(post._id);
                                }className='font-medium text-red-500 hover:underline cursor-pointer'>
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
            {
                showMore && (
                    <button onClick={handleShowMore}className='w-full text-teal-500 self-center text-sm py-7'>
                        Show More
                    </button>
                )
            }
            </>
        ):(
            <p>You have no posts yet</p>
        )}
        <Modal show={showModal} onClose={()=> setShowModal(false)} popup size='md'>
        <Modal.Header/>
          <Modal.body>
            <div className="text-center">
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:gray-400'>are you sure you want to delete your account?</h3>
              <div className="flex justify-center gap-4">
                <Button color = "failure" onClick={handleDeletePost}>
                  Yes, im sure
                </Button>
                <Button color='gray' onClick={()=> setShowModal(false)}>No, cancel</Button>
              </div>
            </div>
          </Modal.body>
        
      </Modal>
    </div>
  );
}
