"use client"

import React from 'react';
import { Event } from '../page';
import EventTile from '../components/EventTile';
import { styled } from '@mui/system';

const DayColumn = ({ events, onEventClick }: { events: Event[], onEventClick: (event: Event) => void }) => {
  // Check if the events array is defined and not empty before sorting
  const sortedEvents = events ? [...events].sort((a, b) => (a.startTime > b.startTime ? 1 : -1)) : [];

  // If no events exist, return null (which renders nothing)
  if (sortedEvents.length === 0) {
    return null;
  }

  return (
    <ColumnContainer>
      {sortedEvents.map((event) => (
        <EventTile key={event.id} event={event} onClick={() => onEventClick(event)} />
      ))}
    </ColumnContainer>
  );
};

const ColumnContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

export default DayColumn;

