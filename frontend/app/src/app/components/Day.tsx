import { useState, useEffect } from 'react';
import Event from './Event';


// AP: idk if this is correct - trying lol
const SERVER_URL = `http://events.chinosu.com`;

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
          // NOTE: the "/api" prefix is rewritten in next.config.mjs to http://events.chinosu.com/ to avoid a CORS (security) error from the browser
          `/api/event?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
          // `/api/helloworld`
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
        // events.map((event) => <Event event={event} />)
        events.map((event) => <p>{event}</p>)
      ) : (
        <p>No events for this day.</p>
      )}
    </div>
  );
}

export default Day;
