import React,{Component} from 'react'
import Draggable from 'react-draggable';

export default class TreeElement extends Component {

    myRef = React.createRef();

    state = {
        boundingRect: false
    }

   componentDidMount(){
        this.setState({
            boundingRect: this.myRef.current.getBoundingClientRect()
        })
   }
      

    handleStop = (e) =>{
        this.props.getOverLappingElements(e.target.getBoundingClientRect(),this.props.treeNumber,this.props.path);
        this.props.setZIndex(0);

    }

    handleDrag =(e) =>{
    }

    handleStart = (e) =>{
        this.props.setZIndex(this.props.treeNumber);
    }





 render(){
    return (
        <div ref = {this.myRef}  style = {{paddingLeft: 15*this.props.level}}> 
           <Draggable
           defaultPosition={{x: 0, y: 0}}
           position={{x: 0, y: 0}}
           onStart={this.handleStart}
           onDrag={this.handleDrag}
           onStop={this.handleStop}
           >

              <p style={{fontSize:18-(this.props.level+1)}}>{this.props.title}</p>

           </Draggable> 

        </div>
    )
}
}
