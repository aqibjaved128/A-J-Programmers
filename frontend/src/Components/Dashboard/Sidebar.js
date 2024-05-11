import React, { Fragment } from 'react'
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';
import {TreeView,TreeItem} from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddIcon from '@material-ui/icons/Add';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DashboardIcon from '@material-ui/icons/Dashboard';
import './Sidebar.css';



const Sidebar = () => {
  return (
    
    <Fragment>
    <div className="sidebar">
        <Link to={"/"}>
            <img src={logo} alt="AJ Logo" />
        </Link>
        <Link to={"/dashboard"}>
            <p>
                <DashboardIcon/> Dashboard
            </p>
        </Link>
        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ImportExportIcon/>}
            >
            <TreeItem nodeId='1' label="Home">
            <Link to={"/admin/homes"}>
            <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>} />
            </Link>
            <Link to={"/admin/home"}>
                <TreeItem nodeId='3' label="Create" icon={<AddIcon/>} />
            </Link>
            </TreeItem>
            </TreeView>
        </Link>
        
        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ImportExportIcon/>}
            >
            <TreeItem nodeId='1' label="Services">
            <Link to={"/admin/services"}>
            <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>} />
            </Link>
            <Link to={"/admin/service"}>
                <TreeItem nodeId='3' label="Create" icon={<AddIcon/>} />
            </Link>
            </TreeItem>
            </TreeView>
        </Link>
     
        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ImportExportIcon/>}
            >
            <TreeItem nodeId='1' label="Projects">
            <Link to={"/admin/projects"}>
            <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>} />
            </Link>
            <Link to={"/admin/project"}>
                <TreeItem nodeId='3' label="Create" icon={<AddIcon/>} />
            </Link>
            </TreeItem>
            </TreeView>
        </Link>
        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ImportExportIcon/>}
            >
            <TreeItem nodeId='1' label="Team Members">
            <Link to={"/admin/members"}>
            <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>} />
            </Link>
            <Link to={"/admin/member"}>
                <TreeItem nodeId='3' label="Create" icon={<AddIcon/>} />
            </Link>
            </TreeItem>
            </TreeView>
        </Link>   
        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ImportExportIcon/>}
            >
            <TreeItem nodeId='1' label="Client Feedback">
            <Link to={"/admin/feedbacks"}>
            <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>} />
            </Link>
            <Link to={"/admin/feedback"}>
                <TreeItem nodeId='3' label="Create" icon={<AddIcon/>} />
            </Link>
            </TreeItem>
            </TreeView>
        </Link>   
        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ImportExportIcon/>}
            >
            <TreeItem nodeId='1' label="Feedback Cards">
            <Link to={"/admin/cards"}>
            <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>} />
            </Link>
            <Link to={"/admin/card"}>
                <TreeItem nodeId='3' label="Create" icon={<AddIcon/>} />
            </Link>
            </TreeItem>
            </TreeView>
        </Link>   

        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ImportExportIcon/>}
            >
            <TreeItem nodeId='1' label="Contact Us">
            <Link to={"/admin/contacts"}>
            <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>} />
            </Link>
            <Link to={"/admin/contact"}>
                <TreeItem nodeId='3' label="Create" icon={<AddIcon/>} />
            </Link>
            </TreeItem>
            </TreeView>
        </Link> 
        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ImportExportIcon/>}
            >
            <TreeItem nodeId='1' label="Footer Details">
            <Link to={"/admin/footers"}>
            <TreeItem nodeId='2' label="Change" icon={<PostAddIcon/>} />
            </Link>
           
            </TreeItem>
            </TreeView>
        </Link> 

        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ImportExportIcon/>}
            >
            <TreeItem nodeId='1' label="About Video">
            <Link to={"/admin/videos"}>
            <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>} />
            </Link>
            <Link to={"/admin/video"}>
                <TreeItem nodeId='3' label="Create" icon={<AddIcon/>} />
            </Link>
            </TreeItem>
            </TreeView>
        </Link>
        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ImportExportIcon/>}
            >
            <TreeItem nodeId='1' label="Social Media">
            <Link to={"/admin/medias"}>
            <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>} />
            </Link>
            <Link to={"/admin/media"}>
                <TreeItem nodeId='3' label="Create" icon={<AddIcon/>} />
            </Link>
            </TreeItem>
            </TreeView>
        </Link> 
    </div>
 </Fragment>
  )
}

export default Sidebar