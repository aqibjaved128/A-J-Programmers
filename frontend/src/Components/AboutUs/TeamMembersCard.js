import React, { Fragment, useEffect } from 'react';
import './TeamMemberCard.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TeamMembersCard = ({memberCard}) => {
  useEffect(()=>{
    AOS.init()

  },[])
  return (
    <Fragment>
    <div className="teamMembersCardContainer"  data-aos = "fade-down">
            <div>
                <img src={memberCard.avatar.url} alt={memberCard.name} />
            </div>
            <div>
                <h3>{memberCard.name}</h3>
                <p>{memberCard.title}</p>
            </div>
        </div>
    </Fragment>
  )
}

export default TeamMembersCard