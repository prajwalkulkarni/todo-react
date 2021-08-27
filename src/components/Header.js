import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "./Header.css"
import logo from '../logo192.png';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} size="10rem"/>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary" variant="h3">{isNaN(props.value)?'':`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
export default function Header(props) {
    const [item, setCurrentItem] = useState(null);
    const [count,setCount] = useState(0);
    const [checked,setChecked] = useState(false)
    const [progress,setProgress] = useState(0);
    const [items, ItemsList] = useState([])
    const [val, keyVal] = useState(0)

    useEffect(()=>{calProgress()},[count,items.length])
    function search() {
        //alert(song)
        ItemsList([...items, { key: val, value: item,checked:checked }])
        keyVal(p => p + 1)
        //alert(val)
        setCurrentItem("")

    }
    function calProgress(){
        //alert()
        //alert("call")
        setProgress((count/items.length)*100)
    }
    function rmItem(key,checked) {

        ItemsList(items.filter(x => x.key !== key))
        if(checked){
            //alert("yes")
            setCount(p=>p-1)
        }
        
        //calProgress()
    }

    function totalChecked(isChecked,curr){
        //alert(isChecked)
        //setChecked(isChecked)
        let idx = items.findIndex(e=>e.key==curr)
        items[idx].checked = isChecked
        if(isChecked){
            setCount(p=>p+1)

        }
        else{
            setCount(p=>p-1)
        }
        //alert(count)
        
        
    }
    return <div className="container">

        <div id="imgWrapper">
            <img src={logo} height="100" width="100" />
        </div>

        <div className="searchLayout">
            <input type="search" placeholder="Add item" value={item} className="_box" onChange={(e) => setCurrentItem(e.target.value)} />
            <button onClick={search} className="search">Add</button>
        </div>

        <div className="mainBody">
            <div className="fGrow">
            <ul type="none" style={{padding:"10px"}}>
                
                {items.map(obj => {
                    return (
                        <li key={obj.key}>
                            <div className="item">
                                <div>
                                    {obj.value}
                                </div>

                                <div>
                                    <input type="checkbox" onChange={(e)=>totalChecked(e.target.checked,obj.key)
                                    } />
                                    <IconButton onClick={() => { rmItem(obj.key,obj.checked) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>




                            </div>
                            
                        </li>

                    )
                })}
                
            </ul>
            </div>

            <div className="fGrow">
            <h1>To-do progress stats</h1>
                <div className="right">
                    
                    <div>
                        <CircularProgressWithLabel value={progress} />
                    </div>
                </div>
            </div>

            
        </div>



    </div>

}