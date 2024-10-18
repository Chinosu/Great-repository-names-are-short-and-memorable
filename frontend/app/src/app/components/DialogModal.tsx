"use client"

import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Fade from "@mui/material/Fade";  // Import the Fade transition
import Button from "@mui/material/Button";
import { styled } from '@mui/system';
import { Event } from '../browse/page';  // Updated import for Event type
import dayjs from 'dayjs';

// Format function for date display
const formatDate = (timeString: string) => {
  return dayjs(timeString).format('MMM D, h:mma').replace(':00', '');
};

const DialogModal = ({ open, event, handleClose }: { open: boolean, event: Event | null, handleClose: () => void }) => {
  return (
    <CenteredDialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      TransitionComponent={Fade}  // Use Fade for smoother transitions
    >
      <ImageSection>
        <img src={event?.imageUrl || "https://via.placeholder.com/800x300"} alt={event?.title} />
      </ImageSection>
      <DialogContent>
        <DateSection>{formatDate(event?.startTime || "")} - {formatDate(event?.endTime || "")}</DateSection>
        <TitleSection>{event?.title}</TitleSection>
        <DescriptionSection>{event?.description}</DescriptionSection>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </CenteredDialog>
  );
};

// Styled components for the modal

const CenteredDialog = styled(Dialog)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiDialog-paper": {
    margin: 0,
    width: "100%",  // Ensure it takes the full width
    maxHeight: "90vh",  // Adjust the modal height to fit the viewport
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",  // Fix position issues during transitions
    backgroundColor: "#ffffff",
  },
}));

const ImageSection = styled("div")({
  width: "100%",
  height: "30%",  // Banner takes 30% of the modal height
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const TitleSection = styled("div")({
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#000000",
  textAlign: "center",
  marginTop: "16px",
});

const DateSection = styled("div")({
  fontSize: "1.2rem",
  color: "#555",
  textAlign: "center",
  whiteSpace: "nowrap",  // Prevent text from wrapping
  marginTop: "8px",
  overflow: "hidden",    // Ensure the text stays in one line
  textOverflow: "ellipsis",  // Add ellipsis if the text overflows
});

const DescriptionSection = styled("div")({
  fontSize: "1rem",
  color: "#333",
  textAlign: "left",
  marginTop: "16px",
  overflowY: "auto",
  maxHeight: "250px",  // Make the description area scrollable if it's too long
  paddingRight: "10px",  // Padding to avoid text touching the scrollbar
});

export default DialogModal;
