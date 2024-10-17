"use client"

import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';  
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';  // Checkbox component for multi-select
import ListItemText from '@mui/material/ListItemText';  // For rendering text next to the checkbox
import { styled } from '@mui/system';
import { Main } from "../page";
import dayjs, { Dayjs } from "dayjs";  // Import Dayjs
import DialogModal from '../components/DialogModal';  
import DayColumn from '../components/DayColumn';  

export interface Event {
  id: number;
  title: string;
  startTime: string;
  endTime: string;  
  description: string;  
  imageUrl?: string;  
}

// Placeholder data for event types and societies
const eventTypes = ['Workshop', 'Free BBQ', 'Social', 'Competition'];
const societies = ['CSESoc', 'DataSoc', 'DevSoc', 'BSoc'];

const imgUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv-0bTXuP2zW4S23dYBit2kCp_Ha9FRdECcA&s";

const events: Event[][] = [
  [
    { id: 1, title: "Event 1", startTime: "10:00", endTime: "11:00", description: "Description for Event 1", imageUrl: imgUrl },
    { id: 2, title: "Event 2", startTime: "12:00", endTime: "13:30", description: "Description for Event 2", imageUrl: imgUrl },
  ],
  [
    { id: 3, title: "Event 3", startTime: "09:00", endTime: "10:00", description: "Description for Event 3", imageUrl: imgUrl },
    { id: 4, title: "Event 4", startTime: "13:00", endTime: "14:00", description: "Description for Event 4", imageUrl: imgUrl },
  ],
];

const Page = () => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [weekDays, setWeekDays] = useState<Dayjs[]>([]);  // Store Dayjs objects instead of strings
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);  // Multi-select for event types
  const [selectedSocieties, setSelectedSocieties] = useState<string[]>([]);  // Multi-select for societies
  const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);  // Indicates the current day 
  const [currentMonth, setCurrentMonth] = useState<string>('');  // Current month

  useEffect(() => {
    const calculateCurrentWeek = () => {
      const today = dayjs();
      const monday = today.startOf('week').add(1, 'day');
      const days = Array.from({ length: 7 }, (_, i) => monday.add(i, 'day'));  // Store Dayjs objects
      setWeekDays(days);

      // Calculate the current day index based on the current day of the week
      const currentDay = today.day();  // 0 for Sunday, 1 for Monday, etc.
      const currentDayIndex = currentDay === 0 ? 6 : currentDay - 1;  // Adjust to 0-indexed, Monday = 0
      setCurrentDayIndex(currentDayIndex);
      setCurrentMonth(today.format('MMMM'));  // Get current month in full (e.g., "October")
    };

    calculateCurrentWeek();
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setOpen(true);  
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);  
  };

  const handleTypeChange = (event: SelectChangeEvent<typeof selectedTypes>) => {
    const value = event.target.value;
    setSelectedTypes(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSocietyChange = (event: SelectChangeEvent<typeof selectedSocieties>) => {
    const value = event.target.value;
    setSelectedSocieties(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Main>
      <Container maxWidth={false}>
        <FilterContainer>
          {/* Multi-Select for Event Type */}
          <FormControl variant="outlined" style={{ minWidth: 200 }} >
            <InputLabel>Event Type</InputLabel>
            <Select
              multiple
              value={selectedTypes}
              onChange={handleTypeChange}
              label="Event Type"
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {eventTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={selectedTypes.indexOf(type) > -1} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Multi-Select for Society */}
          <FormControl variant="outlined" style={{ minWidth: 200, marginLeft: '20px' }}>
            <InputLabel>Society</InputLabel>
            <Select
              multiple
              value={selectedSocieties}
              onChange={handleSocietyChange}
              label="Society"
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {societies.map((society) => (
                <MenuItem key={society} value={society}>
                  <Checkbox checked={selectedSocieties.indexOf(society) > -1} />
                  <ListItemText primary={society} />
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
            <Grid
            size={12 / 7}
            key={dayIndex}
            sx={{
              padding: '10px',
              textAlign: 'center',
            }}
          >
            {/* Display Day of the Week (e.g., MON, TUE, WED) */}
            <DayOfWeek>{day.format('ddd').toUpperCase()}</DayOfWeek>  
            
            {/* Display Date of the Month, highlight if it's the current day */}
            <DayOfMonth
              isCurrentDay={dayIndex === currentDayIndex}
            >
              {day.format('D')}
            </DayOfMonth>
            
            {/* Event Column */}
            <DayColumn events={events[dayIndex]} onEventClick={handleEventClick} />
          </Grid>
          ))}
        </Grid>

        {/* Modal for event details */}
        <DialogModal open={open} event={selectedEvent} handleClose={handleClose} />
      </Container>
    </Main>
  );
};

// Styled component for Day of the Week (e.g., MON, TUE)
const DayOfWeek = styled('div')({
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#333',
});

// Styled component for Day of the Month (e.g., 18)
const DayOfMonth = styled('div')<{ isCurrentDay: boolean }>(({ isCurrentDay }) => ({
  fontSize: '1.5rem',
  fontWeight: isCurrentDay ? 'bold' : 'normal',
  color: isCurrentDay ? '#ffffff' : '#333',
  backgroundColor: isCurrentDay ? '#1976d2' : 'transparent',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  lineHeight: '40px',
  margin: 'auto',
}));

const FilterContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: '20px',
});

export default Page;
