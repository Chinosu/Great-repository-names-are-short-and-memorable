"use client"

import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid2'
import Divider from '@mui/material/Divider';  // Material-UI Divider component
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/system';
import { Main } from "../page";
import dayjs from "dayjs";  // Day.js for date manipulation

import DialogModal from '../components/DialogModal';  // Updated import for DialogModal
import DayColumn from '../components/DayColumn';    // Updated import for DayColumn

export interface Event {
  id: number;
  title: string;
  startTime: string;  // Format: "HH:mm"
  endTime: string;  
  description: string;  
  imageUrl?: string;  // Placeholder for the event image URL
}

// Placeholder data for event types and societies
const eventTypes = ['Workshop', 'Free BBQ', 'Social', 'Competition'];
const societies = ['CSESoc', 'DataSoc', 'DevSoc', 'BSoc'];

const imgUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv-0bTXuP2zW4S23dYBit2kCp_Ha9FRdECcA&s"

const events: Event[][] = [
  // Sample events for each of the 7 days with end times
  [
    { id: 1, title: "Event 1", startTime: "10:00", endTime: "11:00", description: "Description for Event 1", imageUrl: imgUrl },
    { id: 2, title: "Event 2", startTime: "12:00", endTime: "13:30", description: "Description for Event 2", imageUrl: imgUrl },
    { id: 2, title: "Event 2", startTime: "12:00", endTime: "13:30", description: "Description for Event 2", imageUrl: imgUrl },
  ],
  [
    { id: 3, title: "Event 3", startTime: "09:00", endTime: "10:00", description: "Description for Event 3", imageUrl: imgUrl },
    { id: 4, title: "Event 4", startTime: "13:00", endTime: "14:00", description: "Description for Event 4", imageUrl: imgUrl },
  ],
  // Add more events...
];


const Page = () => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');  // State for selected event type
  const [selectedSociety, setSelectedSociety] = useState<string>('');  // State for selected society

  useEffect(() => {
    const calculateCurrentWeek = () => {
      const today = dayjs();
      const monday = today.startOf('week').add(1, 'day');  // Get the Monday of the current week
      const days = Array.from({ length: 7 }, (_, i) => monday.add(i, 'day').format("dddd, MMM D"));  // Generate the days (Monday to Sunday)
      setWeekDays(days);
    };

    calculateCurrentWeek();
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setOpen(true);  // Open the modal when an event is clicked
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);  // Clear the selected event when the modal closes
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as string);
  };

  const handleSocietyChange = (event: SelectChangeEvent) => {
    setSelectedSociety(event.target.value as string);
  };

  return (
    <Main>
      <Container maxWidth={false}>
        <FilterContainer>
          <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <InputLabel>Event Type</InputLabel>
            <Select value={selectedType} onChange={handleTypeChange} label="Event Type">
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {eventTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ minWidth: 200, marginLeft: '20px' }}>
            <InputLabel>Society</InputLabel>
            <Select value={selectedSociety} onChange={handleSocietyChange} label="Society">
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {societies.map((society) => (
                <MenuItem key={society} value={society}>
                  {society}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FilterContainer>

        {/* Divider */}
        <Divider style={{ margin: '20px 0' }} />

        {/* Event Columns */}
        <Grid container spacing={2}>
          {weekDays.map((day, dayIndex) => (
            <Grid size={12 / 7} key={dayIndex} >
              <h2>{day}</h2> {/* Display the heading for each day */}
              <DayColumn events={events[dayIndex]} onEventClick={handleEventClick}/>
            </Grid>
          ))}
        </Grid>

        {/* Modal for event details */}
        <DialogModal open={open} event={selectedEvent} handleClose={handleClose} />
      </Container>
    </Main>
  );
};

const FilterContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: '20px',
});

export default Page;
