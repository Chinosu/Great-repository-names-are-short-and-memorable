import { Dayjs } from "dayjs";
import { create } from "domain";
import { useState } from "react";

interface EventData {
  title: string;
  description: string;
  host: string;
  start: string;
  end: string;
  location: string;
}

export const postEvents = async (event: EventData) => {
  try {
    const response = await fetch('/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Event created successfully:', result);
    } else {
      console.error('Error creating event:', response.status);
    }
  } catch (error) {
    console.error('Error submitting the form:', error);
  };
};

export const getEvents = async (day: Dayjs) => {
  try {
    // Set start and end time for the specific day (midnight to midnight)
    const startDate = day.startOf('day').toISOString();
    const endDate = day.endOf('day').toISOString();

    // Fetch events for this day using the API
    const response = await fetch(`/api/event?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();  // Assuming the API returns a string
    
    console.log(data);
    // // Parse the string into events
    // const parsedEvents = parseEventsString(data);

    // // Filter events that belong to the specific day
    // return parsedEvents.filter(event => {
    //   const eventDay = dayjs(event.startTime).startOf('day').isSame(day.startOf('day'));
    //   return eventDay;
    // });
    return [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};