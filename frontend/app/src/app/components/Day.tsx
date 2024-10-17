import { useState, useEffect } from 'react';
import Event from './Event';


// AP: idk if this is correct - just copied
const URL: string = 'https://api.example.com'
const PORT: number = 31415; // just Pi for now
const SERVER_URL = `${URL}:${PORT}`;


type DayProps = {
  date: Date;
};

function Day({ date }: DayProps) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Format startDate and endDate from midnight to midnight
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const response = await fetch(
          `${SERVER_URL}/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
          // `https://api.example.com/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}` // AP: original
        );
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [date]);

  return (
    <div className="day">
      <h2>{date.toDateString()}</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length > 0 ? (
        // events.map((event) => <Event key={event.id} event={event} />) // AP: has key id which doesn't exist
        events.map((event) => <Event event={event} />)
      ) : (
        <p>No events for this day.</p>
      )}
    </div>
  );
}

export default Day;
