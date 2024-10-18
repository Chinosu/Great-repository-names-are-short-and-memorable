import React, { useState } from 'react';
import DialogModal from './DialogModal';
import { Event } from '../page';

interface EventModalHandlerProps {
  events: Event[];
}

const EventModalHandler: React.FC<EventModalHandlerProps> = ({ events }) => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <DialogModal open={open} event={selectedEvent} handleClose={handleClose} />
    </>
  );
};

export default EventModalHandler;
