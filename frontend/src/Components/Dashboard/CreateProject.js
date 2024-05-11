import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../Layout/MetaData/MetaData'
import Sidebar from './Sidebar'
import { Button } from '@material-ui/core'
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import DescriptionIcon from '@material-ui/icons/Description';
import './CreateProject.css';
import { createProjectAction , clearErrors } from '../../actions/projectsAction';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { CREATE_PROJECT_RESET } from '../../constants/projectConstants';
import {useNavigate} from 'react-router-dom';
import CategoryIcon from '@material-ui/icons/Category';

const CreateProject = () => {

    const [imagesPreview , setImagesPreview] = useState([]);
    const [category,setCategory] = useState("");
    const [description,setDescription] = useState("");
    const [name,setName] = useState("");
    const [techStack,setTechStack] = useState("");
    const [images, setImages] = useState([]);


    const {loading,success,error} = useSelector((state)=>state.deleteProjects);
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();

    
    const categories = [
      "Design","Social Media","Software","Web","Corporates","International Projects","Others"
  ]


const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  
const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name",name);
    myForm.set("description",description);
    myForm.set("techStack",techStack);
    myForm.set("category",category);
    images.forEach((image) => {
        myForm.append("images", image);
      });
    
      dispatch(createProjectAction(myForm));
};

useEffect(()=>{
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    };
    if (success) {
        alert.success(`Project Created Successfully`);
        history(`/dashboard`);
        dispatch({
            type:CREATE_PROJECT_RESET
        })
    }
},[alert,error,dispatch,success,history]);
  return (
    <Fragment>
    <MetaData title="Create Product" />
    <div className="dashboard">
      <Sidebar />
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <h1>Create Product</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Project Name"
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div>
            <IndeterminateCheckBoxIcon />
            <input
              type="text"
              placeholder="Tech Stack"
              required
              value={techStack}
              onChange={(e)=>setTechStack(e.target.value)}
            />
          </div>

          <div>
            <DescriptionIcon />
            <textarea
              placeholder="Project Description"
              cols="30"
              rows="1"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>

          <div>
            <CategoryIcon/>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

         

          <div id="createProductFormFile">
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
            />
          </div>

          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Create Project
          </Button>
        </form>
      </div>
    </div>
  </Fragment>
  )
}

export default CreateProject