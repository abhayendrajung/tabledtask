import axios from 'axios';
import { useEffect ,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Moment from "react-moment"
import './App.css';
import Modal from "react-modal"

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
  
};
Modal.setAppElement("body")

function App() {
  const [api_data,setApi_data]=useState([])
  const [page,setPage]= useState (1)
  const [modal,setModal]=useState(false)
  const [head,setHead]=useState([])
  useEffect(()=>{
    axios.get(`https://api.stackexchange.com/2.2/search/advanced?page=${page}&pagesize=15&o%20rder=desc&sort=activity&site=stackoverflow`).then(res=>{
      setApi_data([...api_data,...res.data.items])  
    
    });
  },[page])
  const openModal=(props)=>{
    
    setHead(props)
setModal(true)

  }
 
  
  return (
    <div className="App container">
      
      <h1>Ouestions Tasks </h1>
      <InfiniteScroll dataLength={api_data.length}
      next={()=>setPage(page+1)}
      hasMore={true}
      loader={<h4>Loading...</h4>}>
      
      <table>
      <thead   >
              <tr>
                <th>Author</th>
                <th>Title</th>
                <th>Creation Date</th>
                </tr>
                </thead>
                <tbody>
      {api_data.map((i) => {
        return(
          <tr  ><td><p>{i.owner.display_name}</p></td>
          <td><button onClick={()=>openModal(i)}>{i.title}</button></td>
          <td> <Moment format="DD MMM YYYY  h:mm A" utc>
                        {i.creation_date}
                      </Moment></td>
          </tr>
          
)

      })}</tbody></table> 
      
      </InfiniteScroll>   
     
     <Modal 
     isOpen={modal}
 
     onRequestClose={!modal}
     style={customStyles }
     contentLabel="Example Modal"
     >
       <button className="modall" onClick={()=>setModal(false)}>X</button>
<h2>{head.title}</h2>
<a href={head.link}  target="blank">Click Me</a>

     </Modal>
    </div>
  );
}

export default App;
