"use client";

import { events } from './eventsData';

import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import { Box, Stack } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Checkbox, ListItemText } from '@mui/material';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';  
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';  // For icon-only buttons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // Back arrow icon
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';  // Forward arrow icon
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import { getEvents, postEvents } from './requests';

import dayjs, { Dayjs } from "dayjs";  // Import Dayjs

import DialogModal from "./components/DialogModal";
import DayColumn from './components/DayColumn';  
import Banner from "./components/Banner";

export interface Event {
  id: number;
  title: string;
  startTime: string;
  endTime: string;  
  description: string;
  host: string;
  imageUrl?: string;  
}

// const SERVER_URL = 'http://events.chinosu.com';
console.log(events)

// Placeholder data for event types and societies
const eventTypes = ['Workshop', 'Free BBQ', 'Social', 'Competition'];
const societies = ['CSESoc', 'DataSoc', 'DevSoc', 'BSoc'];

const bannerImgUrl = "https://scriptmag.com/.image/t_share/MjAxMjYxODQ3NzgzOTQxNjMz/touchinggrass-canva.png";  // Replace with the actual URL

const Home = () => {
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
    // fetchEvents(day);
    return events.filter(event => {
      const eventDay = dayjs(event.startTime).startOf('day').isSame(day.startOf('day'));
      return eventDay;
    });
  };

  // async function fetchEvents(day: Dayjs) {
  //   try {
  //     // Set start and end time for the specific day (midnight to midnight)
  //     const startDate = day.startOf('day').toISOString();
  //     const endDate = day.endOf('day').toISOString();
  
  //     // Fetch events for this day using the API
  //     const response = await fetch(`/api/event?startDate=${startDate}&endDate=${endDate}`);
  //     const data = await response.json();  // Assuming the API returns a string
      
  //     console.log(data);
  //     // // Parse the string into events
  //     // const parsedEvents = parseEventsString(data);
  
  //     // // Filter events that belong to the specific day
  //     // return parsedEvents.filter(event => {
  //     //   const eventDay = dayjs(event.startTime).startOf('day').isSame(day.startOf('day'));
  //     //   return eventDay;
  //     // });
  //     return [];
  //   } catch (error) {
  //     console.error('Error fetching events:', error);
  //     return [];
  //   }
  // };

  return (
    <Container maxWidth={false}>
      {/* Banner component */}
      <Banner   
        imageUrl={bannerImgUrl} 
        title="Edit this to whatever our app name is" 
        subtitle="" 
      />

      <Main>
        <Container maxWidth={false}>
          {/* Current month display */}
          {/* <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{currentMonth}</h1> */}

          {/* Header row: "Upcoming Events" on the left, Filters on the right */}
          <HeaderRow>
            <UpcomingText>Upcoming Events</UpcomingText>
            <FiltersWrapper>
              <FilterContainer>
                {/* Multi-Select for Event Type */}
                <StyledFormControl variant="outlined">
                  <InputLabel sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'black' }}>
                    <EventIcon sx={{ marginRight: '8px' }} /> Event Type
                  </InputLabel>
                  <Select
                    multiple
                    value={selectedTypes}
                    onChange={handleTypeChange}
                    label="Event Type"
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: 'white',  // White background for dropdown
                          color: 'black',    // Black text color
                        },
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
                  <InputLabel sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'black' }}>
                    <GroupIcon sx={{ marginRight: '8px' }} /> Society
                  </InputLabel>
                  <Select
                    multiple
                    value={selectedSocieties}
                    onChange={handleSocietyChange}
                    label="Society"
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: 'white',  // White background for dropdown
                          color: 'black',    // Black text color
                        },
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
            </FiltersWrapper>
          </HeaderRow>

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
                  padding: '6px',
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#F8F8FB',
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '24px', // Adjust the gap below the box
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",  // Added subtle shadow
                  }}
                >
                  <DayOfWeek>{day.format('ddd').toUpperCase()}</DayOfWeek>
                  <DayOfMonth isCurrentDay={dayIndex === currentDayIndex}>
                    {day.format('D')}
                  </DayOfMonth>
                </Box>

                {/* Only display events for this specific day */}
                <DayColumn events={getEventsForDay(day)} onEventClick={handleEventClick} />
              </Grid>
            ))}
          </Grid>

          {/* Modal for event details */}
          <DialogModal open={open} event={selectedEvent} handleClose={handleClose} />
        </Container>
      </Main>
    </Container>
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
  color: isCurrentDay ? 'white' : theme.palette.text.primary,
  backgroundColor: isCurrentDay ? theme.palette.primary.main : 'transparent',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  lineHeight: '40px',
  margin: 'auto',
}));

const SelectWeekArrow = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main, // This will automatically switch between light and dark mode
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F8F8FB',  // White background
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

const HeaderRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',  // Ensures text is on the left, filters on the right
  alignItems: 'center',
  padding: '20px 0',
});

const UpcomingText = styled('h2')(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2.5rem',  // Increased size for bigger text
  color: theme.palette.secondary.main,       // You can adjust the color as needed
  margin: 0,
  display: 'flex',     // Flexbox for better alignment
  alignItems: 'center',  // Center the text vertically
}));


const FiltersWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',  // Stacking filters on top of each other
  alignItems: 'flex-end',  // Align filters to the right
});

const FilterContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  // marginBottom: '20px',
});

export const Main = styled(Stack)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(20, 32),
}));

export default Home;
