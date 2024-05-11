import React, { Fragment } from 'react';
import './SkillsCard.css';

const SkillsCard = ({home}) => {
  return (
    <Fragment>
        <div className="skillsCardContainer">
            <img src={ home.skillsImages.url} alt="" />
        </div>
    </Fragment>
  )
}

export default SkillsCard