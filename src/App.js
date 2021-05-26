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

    <div className="container col sm-4">
  <div className="row">
    

      
      <h1 className="heading1">Ouestions Tasks </h1>
      <InfiniteScroll dataLength={api_data.length}
      next={()=>setPage(page+1)}
      hasMore={true}
      loader={<h4>Loading...</h4>}>
      
      <table  className ="table   table-hover">
      <thead   >
              <tr>
                <th scope="col">Author</th>
                <th scope="col">Title</th>
                <th scope="col">Creation Date</th>
                </tr>
                </thead>
                <tbody>
      {api_data.map((i) => {
        return(
          <tr ><td  ><button className=" button_modal" onClick={()=>openModal(i)}>{i.owner.display_name}</button></td>
          <td ><button className=" button_modal" onClick={()=>openModal(i)}>{i.title}</button></td>
          <td ><button className=" button_modal" onClick={()=>openModal(i)}> <Moment format="DD MMM YYYY  h:mm A" utc>
                        {i.creation_date}
                      </Moment></button>  </td>  
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
          <div className="container">
          <div className="row">
            <div className="col-12 ">
              <h2>{head.title}</h2>
              <i
                className="fas fa-times cross"
                onClick={() => setModal(false)}
              ></i>
            </div>
            <div className="anchor">
              <a href={head.link} target="blank" className="linktab">
                Click Me
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
     </div>
   
  );
}

export default App;
