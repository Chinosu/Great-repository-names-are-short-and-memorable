"use client"

import React from 'react';
import { styled } from '@mui/system';
import { Event } from '../browse/page';  // Updated import for Event type

const EventTile = ({ event, onClick }: { event: Event, onClick: () => void }) => {
  return (
    <Tile onClick={onClick}>
      <ImageSection>
        <img src={event.imageUrl || "https://via.placeholder.com/150"} alt={event.title} />
      </ImageSection>
      <TextSection>
        <EventTime>{event.startTime} - {event.endTime}</EventTime> {/* Displaying both start and end times */}
        <EventTitle>{event.title}</EventTitle>
      </TextSection>
    </Tile>
  );
};

const Tile = styled("div")(({ theme }) => ({
  width: "100%",
  height: "auto",
  aspectRatio: "3 / 2",
  backgroundColor: "#f0f0f0",
  borderRadius: "8px",
  margin: theme.spacing(1, 0),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
}));

const ImageSection = styled("div")({
  width: "100%",
  height: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const TextSection = styled("div")({
  width: "100%",
  height: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
});

const EventTime = styled("div")(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
}));

const EventTitle = styled("div")(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: theme.palette.text.primary,
  textAlign: "center",
}));

export default EventTile;
