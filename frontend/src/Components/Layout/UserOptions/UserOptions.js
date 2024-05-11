import React, { Fragment, useState } from 'react';
import './UserOptions.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {SpeedDial,SpeedDialAction} from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';
import { logoutUserAction  } from '../../../actions/userAction';
import {useDispatch} from 'react-redux';
import {useAlert} from 'react-alert';
import Backdrop from '@material-ui/core/Backdrop';



const UserOptions = ({user}) => {

    const actions = [
        {icon:<DashboardIcon/>,name:"Dashboard",func:dashboardFunction},
        {icon:<HomeIcon/>,name:"Home",func:homeFunction},
        {icon:<AccountBoxIcon/>,name:"Profile",func:profileFunction},
        {icon:<ExitToAppIcon/>,name:"Logout",func:logoutFunction},
    ]
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();
    const alert = useAlert();

    const history = useNavigate();

    function dashboardFunction() {
        history(`/dashboard`)
    };

    function homeFunction() {
        history(`/`)
    };

    function profileFunction() {
        history(`/account`)
    };

    function logoutFunction() {
        dispatch(logoutUserAction());
        history(`/million-dreams-login`);
        alert.success(`Logged Out`)


    }

  return (
<Fragment>
<Backdrop open={open} style={{zIndex : "10"}}/>
  <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={
            <img src={user.avatar.url ? user.avatar.url:"/Profile.png"} alt='Profile' className='speedDailImage'/>
        }
        open={open}
        onOpen={()=>setOpen(true)}
        onClose={()=>setOpen(false)}
        direction="down"
        className='speedDailBhai'

      >
        {actions && actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func} 
          />
        ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions