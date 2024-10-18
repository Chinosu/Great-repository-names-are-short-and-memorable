"use client"

import React from 'react';
import { styled } from '@mui/system';
import { Event } from '../page';  // Updated import for Event type
import dayjs from 'dayjs';
import { grey } from '@mui/material/colors';

const formatTime = (timeString: string) => {
  return dayjs(timeString)
    .format('h:mmA') // Removes the space between time and period, and formats it as 'h:mmA'
    .replace(':00', '') // Removes minutes if they are "00"
    .toLowerCase(); // Converts AM/PM to lowercase
};

const EventTile = ({ event, onClick }: { event: Event, onClick: () => void }) => {
  return (
    <Tile onClick={onClick}>
      <ImageSection>
        <img src={event.imageUrl || "https://via.placeholder.com/150"} alt={event.title} />
      </ImageSection>
      <TextSection>
        <EventTime>{formatTime(event.startTime)} - {formatTime(event.endTime)}</EventTime>
        <EventTitle>{event.title}</EventTitle>
      </TextSection>
    </Tile>
  );
};


const Tile = styled("div")(({ theme }) => ({
  width: "100%",
  height: "auto",
  aspectRatio: "2 / 2",
  backgroundColor: "#F8F8FB",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",  // Added subtle shadow
  margin: theme.spacing(1, 0),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
//   transition: "box-shadow 0.3s ease",  // Added smooth shadow transition
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",  // Slightly stronger shadow on hover
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
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
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
  color: grey[900]
}));

const EventTitle = styled("div")(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#000000",
  textAlign: "center",
}));

export default EventTile;
