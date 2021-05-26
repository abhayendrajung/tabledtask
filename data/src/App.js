import axios from 'axios';
import { useEffect ,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import Moment from "react-moment"
import './App.css';

function App() {
  const [api_data,setApi_data]=useState([])
  const [page,setPage]= useState (1)
  
  useEffect(()=>{
    axios.get(`https://api.stackexchange.com/2.2/search/advanced?page=${page}&pagesize=20&o%20rder=desc&sort=activity&site=stackoverflow`).then(res=>{
      setApi_data([...api_data,...res.data.items])  
    
    });
  },[page])
 
  
  return (
    <div className="App">
      <h1>Ouestions Tasks </h1>
      <InfiniteScroll dataLength={api_data.length}
      next={()=>setPage(page+1)}
      hasMore={true}
      loader={<h4>Loading...</h4>}>
      
      <table >
      <thead>
              <tr>
                <th>Author</th>
                <th>Title</th>
                <th>Creation Date</th>
                </tr>
                </thead>
                <tbody>
      {api_data.map((i) => {
        return(
          <tr><td><h3>{i.owner.display_name}</h3></td>
          <td><h3>{i.title}</h3></td>
          {/* <td> <Moment format="DD MMM YYYY  h:mm A" utc>
                        {i.creation_date}
                      </Moment></td> */}
          </tr>
          
)

      })}</tbody></table>
      </InfiniteScroll>
      {console.log(api_data)}
    </div>
  );
}

export default App;
