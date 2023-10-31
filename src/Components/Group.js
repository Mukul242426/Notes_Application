import React, { useState,useEffect } from 'react'
import '../Styling/Group.css'

function Group({groupDetails,selectedGroup,setSelectedGroup}) {

let [colour,setColour]=useState("");  
  
const handleClick=()=>{
  setSelectedGroup(groupDetails);
}


useEffect(()=>{
  if(selectedGroup && selectedGroup.id===groupDetails.id)
  {
      setColour("#F7ECDC");
  }
  else
  {
      setColour("");
  }
},[selectedGroup])

  return (
    <div className='team' onClick={handleClick} style={{backgroundColor:colour}}>
      <div className='box-1' style={{backgroundColor:groupDetails.colour}}>
       {groupDetails.iconText}
      </div>
      <div className="box-2">
       {groupDetails.groupName}
      </div>
    </div>
  )
}

export default Group
