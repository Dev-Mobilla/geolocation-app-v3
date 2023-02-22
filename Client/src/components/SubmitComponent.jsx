import { useState } from "react";
import { DataContext } from "../App";

function SubmitComponent() {
  const contextData = useContext(DataContext);
  
  console.log()
  return <div>SubmitComponent</div>;
}
export default SubmitComponent;
