import React from 'react'
import {useSelector} from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {FaCheck, FaTimes} from 'react-icons/fa';


export default function DashUsers() {
    const { currentUser } = useSelector((state)=>state.user)
    const [user, setUserPosts] = useState([])
    const [showMore, setShowMore] = useState(true);
    const [showModal,setShowModal]=useState(false);
    const [postIdDelete, setPostIdToDelete] = useState(''');
    console.log(userPosts);
    useEffect(()=>{
        const fetchPosts=async()=>{
            try {
                const res = await fetch('/api/user/getusers?userId='${currentUser._id})
                const data = await res.json()
                if(res.ok){
                    setUsers(data.users)
                    if(data.users.length<5){
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message)
                
            }
        }

    },[currentUser.isAdmin]{
        fetchUsers()}
    )
    const handleShowMore = async () =>{
        const startIndex = users.length;
        try {
            const res = await fetch(`api/user/getusers?startIndex=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.json();
            if(res.ok){
                setUsers((prev)=> [...prev,...data.users]);
                if(data.posts.length<9){
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
            
        }
    }
    const handleDeleteUser = async() =>{
        try {
            const res = await fetch(`/api/user/${userIdToDelete)`, {
                    method: 'DELETE',
                });
                const data =await res.json(); 
                if(res.ok){
                    setUsers((prev)=>prev.filter((user)=>user._id !==userIdToDelete));
                    setShowModal(false);
                }else{
                    console.log(data.message);
                }
        } catch (error) {
            console.log(error.message);
            
        }
    }
        setShowModal(false);
        try {
            const res = await fetch(`/api/user/deleteuser/${userIdToDelete}/${currentUser._id}`,{
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
  const handleDeleteUser = async () =>{}; 
  }
  return (
    <di className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100-thumb-slate dark:scrollbar-track-slate-700 dark'>
        {currentUser.isAdmin && userPosts.length>0 ? (
            <>
            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date Updated</Table.HeadCell>
                    <Table.HeadCell>User image</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Admin</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>

                </Table.Head>
                {users.map((user))=>(
                  <Table.Body className='divide-y' key={user._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                            
                                <img>
                                    src={user.profilePicture}
                                    alt={user.username}
                                    className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                                </img>
                           
                        </Table.Cell>
                        <Table.Cell>
                            {user.username}
                        </Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.isAdmin ? (<FaCheck className="text-green-500"/>) : (<FaTimes className="text-red-500"/>)}</Table.Cell>
                            <Table.Cell>
                                <span onClick={()=>
                                    setShowModal(true);
                                    setUserIdToDelete(user._id);
                                }className='font-medium text-red-500 hover:underline cursor-pointer'>
                                    Delete
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
            <p>You have no users yet</p>
        )}
        <Modal show={showModal} onClose={()=> setShowModal(false)} popup size='md'>
        <Modal.Header/>
          <Modal.body>
            <div className="text-center">
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:gray-400'>are you sure you want to delete this post?</h3>
              <div className="flex justify-center gap-4">
                <Button color = "failure" onClick={handleDeleteUser}>
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
