"use client"

import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Event } from '../browse/page';  // Updated import for Event type

const DialogModal = ({ open, event, handleClose }: { open: boolean, event: Event | null, handleClose: () => void }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{event?.title}</DialogTitle>
      <DialogContent>
        <p>Start Time: {event?.startTime}</p>
        <p>End Time: {event?.endTime}</p> {/* New display for end time */}
        <p>{event?.description}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;
