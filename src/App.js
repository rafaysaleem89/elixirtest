import React,{useEffect,useState,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import TreeElement from './components/TreeElement'
import xml1 from './data/xml1.json';
import xml2 from './data/xml2.json';
import { Container,Row,Col,Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let firstTree = [];
  let secondTree = [];

  const [tableData,setTableData] = useState([]);
  const [zIndexFixOne,setZIndexFixOne] = useState(0);
  const [zIndexFixTwo,setZIndexFixTwo] = useState(0);


  useEffect(() => {
     
     
  }, [])

  function makeTree(jsonObj){
      
      let treeArray = [];

      for (let index = 0; index < Object.keys(jsonObj).length; index++) {
        const element = Object.keys(jsonObj)[index];
        let nodeArray = [];
        if(isObject(jsonObj[element]) && Object.keys(jsonObj[element]).length>0){
          nodeArray.push(element);
          nodeArray.push(makeTree(jsonObj[element]));
        }

        else{
          nodeArray.push(element);
        }
        treeArray.push(nodeArray);    
      }
      return treeArray;
  }

  function initiateTree(jsonObj,treeNumber){
       let tree = makeTree(jsonObj);
       let treeElems = renderTree(tree,0,'',treeNumber);
       return treeElems;
      
  }


  function renderTree(tree,level,path,treeNumber){

    let renderElements = [];

    for (let index = 0; index < tree.length; index++) {
      const element = tree[index];
      renderElements.push(<TreeElement treeNumber = {treeNumber} ref={React.createRef()} setZIndex = {setZIndex}   getOverLappingElements={getOverLappingElements} title = {element[0]} path = {path+'/'+element[0]} level = {level} key ={path+'/'+element[0]}/>);
      if(element.length>1){
        renderElements.push(...renderTree(element[1],level+1,path+'/'+element[0],treeNumber));
      }
      
    } 
    return renderElements;
  }

  function getOverLappingElements(rect,treeNumber,path){

      let otherTree = treeNumber === 1? secondTree:firstTree;
     
      for (let index = 0; index < otherTree.length; index++) {
        const element = otherTree[index];
        if(areOverlapping(rect, element.ref.current.state.boundingRect)){
          let tableEntry = [];
          if(treeNumber === 1){
            tableEntry.push(path);
            tableEntry.push(element.props.path);
          }
          else{
            tableEntry.push(element.props.path);
            tableEntry.push(path);
          }
          
          setTableData([...tableData,tableEntry]);
          break;
        }
      }
  }

  function areOverlapping(rect1,rect2){
    return !(rect1.right < rect2.left || 
      rect1.left > rect2.right || 
      rect1.bottom < rect2.top || 
      rect1.top > rect2.bottom)
  }




  function isObject(val) {
    return val instanceof Object; 
  }

  function setZIndex(treeNumber){
       if(treeNumber === 1){
         setZIndexFixTwo(-1);
       }
       else if(treeNumber === 2){
         setZIndexFixOne(-1);
       }
       else{
        setZIndexFixTwo(0);
        setZIndexFixOne(0);
       }
  }


  return (
        <div>
       <Container >
         <Row className = "justify-content-md-left">
           <Col style={{zIndex: zIndexFixOne}}>
           <h6>XML1/JSON1</h6>
            {
             firstTree = initiateTree(xml1,1)
            }
           </Col>
           <Col style={{zIndex: zIndexFixTwo}}>
           <h6>XML2/JSON2</h6>
           {
             secondTree = initiateTree(xml2,2)
            }
           </Col>
         </Row>
       </Container>

       <Table striped bordered hover>
          <thead>
           <tr>
            <th>XML1/JSON1</th>
            <th>XML2/JSON2</th>
           </tr>
          </thead>

           <tbody>
              {
                tableData.map((row)=>{
                   return(              
                   <tr>
                    <td>{row[0]}</td>
                   <td>{row[1]}</td>
                  </tr>
                  )
                })
              }

          </tbody>
        </Table>   
       </div>  


  );
}

export default App;
