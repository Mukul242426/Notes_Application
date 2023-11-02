import React, { useState,useEffect} from "react";
import "../Styling/Home.css";
// import image1 from '../assets/image 1.png'
// import image2 from '../assets/Vector (4).png'
import Group from "../Components/Group";
import Default from "../Components/Default";
import Notes from "../Components/Notes";
import {v4 as uuidv4} from "uuid";

function Home() {
  // localStorage.clear();

  let [click, setClick] = useState(false);
  let [grpName, setGrpName] = useState("");
  const [selectedColor, setSelectedColor] = useState({
    id: 0,
    colored: "",
  });

  let [group, setGroup] = useState(
    localStorage.getItem("createdGroups")
      ? JSON.parse(localStorage.getItem("createdGroups"))
      : []
  );

  let [selectedGroup,setSelectedGroup] = useState();
  useEffect(()=>{
    if(selectedGroup)
    {
      console.log("Selected Group is",selectedGroup);
    }
  },[selectedGroup])
  // console.log(selectedGroup);

  const bgColors = [
    { id: 1, bgColor: "#B38BFA" },
    { id: 2, bgColor: "#FF79F2" },
    { id: 3, bgColor: "#43E6FC" },
    { id: 4, bgColor: "#F19576" },
    { id: 5, bgColor: "#0047FF" },
    { id: 6, bgColor: "#6691FF" },
  ];

  const handleClick = () => {
    if (grpName.length > 0 && selectedColor.id > 0) {
      setClick(!click);
      setGrpName("");
      const uniqueId=uuidv4();
      const obj = {
        id:uniqueId,
        iconText: grpName.slice(0, 2).toUpperCase(),
        colour: selectedColor.colored,
        groupName: grpName
      };
      localStorage.setItem("createdGroups", JSON.stringify([obj, ...group]));
      setGroup(JSON.parse(localStorage.getItem("createdGroups")));
      setSelectedGroup();
      setSelectedColor({...selectedColor,id:0,colored:""});
    }
  };

  return (
    <>
      <div className="home">
        {/* <div className="left"> */}
        <div className={selectedGroup===undefined?'left mobile-view':'left Hide'}>
          <div className="heading">Pocket Notes</div>
          <div className="sub-heading" onClick={() => setClick(!click)}>
            + Create Notes group
          </div>
          <div className="groups">
            {group.map((groupDetails, index) => (
              <Group
                key={index}
                groupDetails={groupDetails}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
              />
            ))}
          </div>
        </div>
        {/* <div className="right"> */}
          {selectedGroup === undefined ? (
            <Default />
          ) : (
            <Notes key={selectedGroup.id} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
          )}
          {/* <Default /> */}
          {/* <div className='first'>
             <div className='part-1'>
               <img src={image1} alt="default" className='notebook'/>
             </div>
             <div className='part-2'>
              Pocket Notes
             </div>
             <div className='part-3'>
             Send and receive messages without keeping your phone online.
             Use Pocket Notes on up to 4 linked devices and 1 mobile phone
             </div>
            </div>
            <div className='second'>
                <div className='locker'>
                <img src={image2} alt="locker"/>
                </div>
                <div className='encryption'>
                end-to-end encrypted
                </div>
            </div> */}
        </div>
      {/* </div> */}
      {click && (
        <div className="wrapper" onClick={()=>setClick(!click)}>
          <div className="popup" onClick={(event)=>event.stopPropagation()}>
            <div className="row-1">Create New Notes group</div>
            <div className="row-2">
              <div className="grp-title">Group Name</div>
              <div className="input-box">
                <input
                  type="text"
                  value={grpName}
                  onChange={(event) => setGrpName(event.target.value)}
                  id="group-name"
                  placeholder="Enter your group name...."
                />
              </div>
            </div>
            <div className="row-3">
              <div className="color-heading">Choose Color</div>
              <div className="colour-box">
                {bgColors.map((colour) => (
                  <div
                    key={colour.id}
                    className={
                      selectedColor.id === colour.id
                        ? "circular-dynamic"
                        : "circular"
                    }
                    style={{ backgroundColor: colour.bgColor }}
                    onClick={() => {
                      setSelectedColor({
                        ...selectedColor,
                        id: colour.id,
                        colored: colour.bgColor,
                      });
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="row-4">
              <div className="create-btn" onClick={handleClick}>
                Create
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
