type EventProps = {
  event: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    description: string;
  };
};

function Event({ event }: EventProps) {
  return (
    <div className="event">
      <h3>{event.name}</h3>
      <p>
        {new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}
      </p>
      <p>{event.description}</p>
    </div>
  );
}

export default Event;
