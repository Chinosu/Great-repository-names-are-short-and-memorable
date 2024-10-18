"use client"

import { useState } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Link from "next/link";
import React from "react";

interface StyledIconButtonProps extends ButtonProps {
  active?: boolean;
  onClick?: () => void; // Ensure onClick is properly typed
}

const DarkModeButton: React.FC<StyledIconButtonProps> = ({
  children,
  active,
  onClick, // Receiving onClick from props
  ...otherProps
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [backgroundImageSet, setBackgroundImageSet] = useState(false);

  const handleClick = () => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;

      // If the button is clicked 10 times, set a background image
      if (newCount === 10 && !backgroundImageSet) {
        document.body.style.backgroundImage = "url('/background.png')"; // Change to your image URL
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        setBackgroundImageSet(true);
        return 0; // Reset the counter
      }

      // If it's the 1st click after setting the background, reset to default
      if (backgroundImageSet && newCount === 1) {
        document.body.style.backgroundImage = ""; // Reset the background
        setBackgroundImageSet(false);
      }

      return newCount;
    });

    // Call the onClick passed from props (toggleDarkMode)
    if (typeof onClick === "function") {
      onClick(); // Ensure the dark mode toggle is triggered
    }
  };

  return (
    <Button
      {...otherProps}
      sx={(theme) => ({
        padding: theme.spacing(1),
        minWidth: 0,
      })}
      LinkComponent={Link}
      variant={active ? "contained" : "outlined"}
      color="primary"
      disableElevation
      onClick={handleClick} // Handle click with dark mode toggle
    >
      {children}
    </Button>
  );
};

export default DarkModeButton;
