"use client"

import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';  
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';  // Checkbox component for multi-select
import ListItemText from '@mui/material/ListItemText';  // For rendering text next to the checkbox
import IconButton from '@mui/material/IconButton';  // For icon-only buttons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // Back arrow icon
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';  // Forward arrow icon
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';

import dayjs, { Dayjs } from "dayjs";  // Import Dayjs

import { Main } from "../page";
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

// Placeholder events
const events: Event[] = [
  { id: 1, title: "Event 1", startTime: "2024-10-18T10:00", endTime: "2024-10-18T11:00", description: "Description for Event 1", imageUrl: imgUrl },
  { id: 2, title: "Event 2", startTime: "2024-10-19T12:00", endTime: "2024-10-19T13:30", description: "Description for Event 2", imageUrl: imgUrl },
  { id: 3, title: "Event 3", startTime: "2024-10-20T09:00", endTime: "2024-10-20T10:00", description: "Description for Event 3", imageUrl: imgUrl },
  { id: 4, title: "Event 4", startTime: "2024-10-21T13:00", endTime: "2024-10-21T14:00", description: "Description for Event 4", imageUrl: imgUrl },
];

const Page = () => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);  // Multi-select for event types
  const [selectedSocieties, setSelectedSocieties] = useState<string[]>([]);  // Multi-select for societies

  const [weekDays, setWeekDays] = useState<Dayjs[]>([]);  // Store Dayjs objects instead of strings
  const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);  // Indicates the current day 
  const [currentMonth, setCurrentMonth] = useState<string>('');  // Current month
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);  // Track the current week offset

  const lastMonth = dayjs().subtract(1, 'month').endOf('month');
  const nextMonth = dayjs().add(1, 'month').startOf('month');

  useEffect(() => {
    calculateCurrentWeek(currentWeekOffset);
  }, [currentWeekOffset]);

  // Function to calculate the current week based on the offset
  const calculateCurrentWeek = (weekOffset: number) => {
    const today = dayjs();
    const monday = today.startOf('week').add(1, 'day').add(weekOffset, 'week');  
    const days = Array.from({ length: 7 }, (_, i) => monday.add(i, 'day'));  
    setWeekDays(days);

    const currentDay = today.day();  
    const currentDayIndex = currentDay === 0 ? 6 : currentDay - 1;  
    setCurrentDayIndex(weekOffset === 0 ? currentDayIndex : null);  // Unhighlight if it's not the current week
    setCurrentMonth(monday.format('MMMM'));  
  };

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

  // Move to the next week
  const handleNextWeek = () => {
    const nextMonday = dayjs().startOf('week').add(1, 'day').add(currentWeekOffset + 1, 'week');
    if (nextMonday.isBefore(nextMonth)) {
      setCurrentWeekOffset(currentWeekOffset + 1);  
      console.log("Fetching events for the next week...");
    }
  };

  // Move to the previous week
  const handlePreviousWeek = () => {
    const previousMonday = dayjs().startOf('week').add(1, 'day').add(currentWeekOffset - 1, 'week');
    if (previousMonday.isAfter(lastMonth)) {
      setCurrentWeekOffset(currentWeekOffset - 1);  
      console.log("Fetching events for the previous week...");
    }
  };

  // Filter events that belong to the current day
  const getEventsForDay = (day: Dayjs) => {
    return events.filter(event => {
      const eventDay = dayjs(event.startTime).startOf('day').isSame(day.startOf('day'));
      return eventDay;
    });
  };

  return (
    <Main>
      <Container maxWidth={false}>
        {/* Current month display */}
        {/* <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{currentMonth}</h1> */}

        <FilterContainer>
          {/* Multi-Select for Event Type */}
          <StyledFormControl variant="outlined">
            <InputLabel sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <EventIcon sx={{ marginRight: '8px' }} /> Event Type
            </InputLabel>
            <Select
              multiple
              value={selectedTypes}
              onChange={handleTypeChange}
              label="Event Type"
              renderValue={(selected) => (selected as string[]).join(', ')}
              sx={{
                '& .MuiSelect-icon': {
                  color: 'primary.main',  // Use the theme's primary color
                },
              }}
            >
              {eventTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={selectedTypes.indexOf(type) > -1} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          {/* Multi-Select for Society */}
          <StyledFormControl variant="outlined" sx={{ marginLeft: '20px' }}>
            <InputLabel sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <GroupIcon sx={{ marginRight: '8px' }} /> Society
            </InputLabel>
            <Select
              multiple
              value={selectedSocieties}
              onChange={handleSocietyChange}
              label="Society"
              renderValue={(selected) => (selected as string[]).join(', ')}
              sx={{
                '& .MuiSelect-icon': {
                  color: 'primary.main',  // Use the theme's primary color
                },
              }}
            >
              {societies.map((society) => (
                <MenuItem key={society} value={society}>
                  <Checkbox checked={selectedSocieties.indexOf(society) > -1} />
                  <ListItemText primary={society} />
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </FilterContainer>


        {/* Divider */}
        <Divider style={{ margin: '20px 0' }} />

        {/* Week navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <SelectWeekArrow 
            onClick={handlePreviousWeek} 
            disabled={dayjs().startOf('week').add(1, 'day').add(currentWeekOffset - 1, 'week').isBefore(lastMonth)}
          >
            <ArrowBackIcon />
          </SelectWeekArrow>

          <SelectWeekArrow 
            onClick={handleNextWeek} 
            disabled={dayjs().startOf('week').add(1, 'day').add(currentWeekOffset + 1, 'week').isAfter(nextMonth)}
          >
            <ArrowForwardIcon />
          </SelectWeekArrow>
        </div>

        {/* Event Columns */}
        <Grid container spacing={2}>
          {weekDays.map((day, dayIndex) => (
            <Grid
              size={12 / 7}
              key={dayIndex}
              sx={{
                padding: '2px',
                textAlign: 'center',
              }}
            >
              <DayOfWeek>{day.format('ddd').toUpperCase()}</DayOfWeek>  
              <DayOfMonth isCurrentDay={dayIndex === currentDayIndex}>
                {day.format('D')}
              </DayOfMonth>

              {/* Only display events for this specific day */}
              <DayColumn events={getEventsForDay(day)} onEventClick={handleEventClick} />
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
const DayOfWeek = styled('div')(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: theme.palette.text.primary, // This will automatically switch between light and dark mode
}));

// Styled component for Day of the Month (e.g., 18)
const DayOfMonth = styled('div')<{ isCurrentDay: boolean }>(({ isCurrentDay, theme }) => ({
  fontSize: '1.5rem',
  fontWeight: isCurrentDay ? 'bold' : 'normal',
  color: isCurrentDay ? '#ffffff' : theme.palette.text.primary,
  backgroundColor: isCurrentDay ? "#7041ea" : 'transparent',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  lineHeight: '40px',
  margin: 'auto',
}));

const SelectWeekArrow = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary, // This will automatically switch between light and dark mode
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main, // Default border color
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main, // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark, // Border color on focus
    },
  },
}));

const FilterContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: '20px',
});

export default Page;
