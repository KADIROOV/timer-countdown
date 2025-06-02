import React, { useEffect, useState } from "react";
import orangeBg from "../assets/orange-background.jpg";
import purpleBg from "../assets/purple-desktop-image.jpg";
import greenBg from "../assets/green-background.jpg";

function ColorSelector({ setColor }) {
  const [selectedColor, setSelectedColor] = useState(purpleBg);

  const handleChange = (e) => {
    setSelectedColor(e.target.value);
    setColor(e.target.value);
  };

  useEffect(() => {
    setColor(purpleBg);
  }, []);

  return (
    <div>
      <select name="select" onChange={handleChange} value={selectedColor}>
        <option value="" disabled>
          Themes
        </option>
        <option value={orangeBg}>Black Hole</option>
        <option value={purpleBg}>Purple</option>
        <option value={greenBg}>Dark Leaves</option>
      </select>
    </div>
  );
}

export default ColorSelector;
