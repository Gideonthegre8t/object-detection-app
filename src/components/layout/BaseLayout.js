import React from "react";
import Detection from "../detection/Detection"


const  BaseLayout = (props) => {
    return(
      <div>  <Detection />
      {props.children}</div>
    

    );
}

export default BaseLayout;




