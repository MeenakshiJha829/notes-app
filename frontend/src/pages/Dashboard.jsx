import {useState,useEffect} from "react";
import axios from "axios";


function Dashboard() {
    const [notes,setNotes]=useState([]);
    const [title,setTitle]= useState('');
    const [content,setContent]=useState('');
    const [editingId,seteditingId]=useState(null);
    const token=localStorage.getItem('token');

    const logout=()=>{
        localStorage.removeItem('token');
        window.location.href='/';
    };

    const fetchNotes =async()=>{
        try{
            const token=localStorage.getItem('token');
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/notes`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setNotes(res.data);
        }catch(err){
            console.log(err);
        }
    };


    const createNote=async(e)=>{
        e.preventDefault();
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`,
                {
                title,
                content
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
    setTitle('');
    setContent('');
    fetchNotes();
        }catch(err){
            console.log(err);
        
    }

    };

    const deleteNote=async(id)=>{
        try{
            await axios.delete( `${import.meta.env.VITE_API_URL}/api/notes/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            fetchNotes();
        }catch(err){
        console.log(err);
    }
    };

    const updateNote=async(e)=>{
        e.preventDefault();
        try{
            await axios.put(`${import.meta.env.VITE_API_URL}/api/notes/${editingId}`,
                {
                    title,
                    content
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            setTitle('');
            setContent('');
            seteditingId(null);
            fetchNotes();
        }catch(err){
            console.log(err);
        }
    };




    useEffect(()=>{
        fetchNotes();

    },[]);
  return (
    <div className="min-h-screen bg-zinc-100 p-14 pt-32">
        <div className="max-w-4xl mx-auto px-4">
            <h1 style={{color: "black",fontSize: "50px",textAlign: "center",marginBottom: "50px" ,fontWeight: "bold" ,marginTop: "0px",}}>My Notes</h1>
        <form onSubmit={editingId? updateNote :createNote}
        className="bg-white p-6 rounded-xl shadow-md mb-8"
        >
            <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border p-3 rounded mb-4"/>
            
            <textarea placeholder="content" value={content} onChange={(e)=>setContent(e.target.value)} className="w-full border p-3 rounded mb-4"/>
                
            <div className="flex gap-4 justify-center mt-4">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded">{editingId ? 'updateNote' : 'Add Note'}</button>
                
                
                <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
            </div>

        </form>
        <hr></hr>
        {
            notes.map((note)=>(
                <div key={note.id} className="bg-white p-6 rounded-xl shadow-md mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 text-center">{note.title}</h3>
                    <p className="mt-2 text-gray-600 text-center">{note.content}</p>
                    <div className="mt-4 flex  justify-center gap-2">
                    <button onClick={() => {
                        setTitle(note.title);
                        setContent(note.content);
                        seteditingId(note.id);
                    }} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit
                    </button>
                    <button onClick={()=>deleteNote(note.id)} className= "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                    
                    </div>
                    </div>
            ))
        }
        </div>
      
    </div>
  )
}

export default Dashboard
