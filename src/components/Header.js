import React, { useEffect, useState } from 'react';
import "./Header.css"
import logo from '../logo192.png';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Divider from '@material-ui/core/Divider';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import Card from './Card'

export default function Header(props) {
    const [item, setCurrentItem] = useState(null);
    const [count, setCount] = useState(0);
    const [checked, setChecked] = useState(false)
    const [progress, setProgress] = useState(0);
    const [items, ItemsList] = useState([])
    const [val, keyVal] = useState(0)

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => {
        setState({ open: true, ...newState });
    };
    const handleClose = () => {
        setState({ ...state, open: false });
    };

    useEffect(() => { calProgress() }, [count, items.length])
    function search() {
        //alert(song)
        if (item !== null && item.trim().length > 0) {
            ItemsList([...items, { key: val, value: item, checked: checked }])
            keyVal(p => p + 1)
            //alert(val)
            setCurrentItem("")
        }
        else {
            //alert("Run")
            //handleClick()
            handleClick({ vertical: 'top', horizontal: 'center' })
            setCurrentItem("")
        }


    }
    function calProgress() {
        //alert()
        //alert("call")
        setProgress((count / items.length) * 100)
    }
    function rmItem(key, checked) {

        ItemsList(items.filter(x => x.key !== key))
        if (checked) {
            //alert("yes")
            setCount(p => p - 1)
        }

        //calProgress()
    }

    function totalChecked(isChecked, curr) {
        //alert(isChecked)
        //setChecked(isChecked)
        let idx = items.findIndex(e => e.key == curr)
        items[idx].checked = isChecked
        if (isChecked) {
            setCount(p => p + 1)

        }
        else {
            setCount(p => p - 1)
        }
        //alert(count)


    }
    return <div className="container">

        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            autoHideDuration={3000}
            message="Cannot add empty to-do"
            key={vertical + horizontal}
        />

        <div id="imgWrapper">
            <img src={logo} height="100" width="100" />
        </div>

        <div className="searchLayout">
            <input type="search" placeholder="Add item" value={item} className="_box" onChange={(e) => setCurrentItem(e.target.value)} />
            <button onClick={search} className="search">Add</button>
        </div>

        <div className="mainBody">
            <Card className="fGrow">
                
                {items.length > 0 ? <ul type="none" style={{ padding: "10px" }}>

                    {items.map(obj => {
                        return (
                            <li key={obj.key}>
                                <Card className="item">
                                    <div>
                                        {obj.value}
                                    </div>

                                    <div>
                                        <input type="checkbox" onChange={(e) => totalChecked(e.target.checked, obj.key)
                                        } />
                                        <IconButton onClick={() => { rmItem(obj.key, obj.checked) }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>




                                </Card>
                                <Divider />

                            </li>

                        )
                    })}

                </ul> :

                    <div className="inner">
                        <h1>To-do List</h1>
                        <HourglassEmptyIcon style={{ fontSize: 100 }} />
                        <p>Todo list empty &nbsp;&nbsp;</p>

                    </div>

                }
            </Card>

            <Card className="fGrow">
                <div className="inner" style={{backgroundColor:"#fccbcb"}}>
                    <h1>To-do progress stats</h1>
                </div>

                {items.length > 0 ?


                    <div className="right">

                        <div className="inner">

                            <h3>Completion percentage</h3>
                            <CircularProgressWithLabel value={progress} />
                            <p>Total tasks completed:{count}/{items.length}</p>

                        </div>
                        <div className="inner">
                            <h3>Remaining taks percentage</h3>
                            <CircularProgressWithLabel value={100 - progress} />
                            <p>Remaining tasks:{items.length - count}</p>
                        </div>
                    </div> :
                    <div className="inner" style={{backgroundColor:"#fccbcb"}}>
                        <DateRangeIcon style={{ fontSize: 100 }} />
                        <p> Your progress stats will be shown here.</p>
                    </div>}

            </Card>


        </div>



    </div>

}