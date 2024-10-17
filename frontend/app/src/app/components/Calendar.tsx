import { useState, useEffect } from 'react';
import Day from './Day';

function Calendar() {
  // State for the selected month, year, and week start date
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [weekStart, setWeekStart] = useState<Date | null>(null);
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    if (weekStart) {
      // Populate weekDates with 7 dates from the selected start date
      const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        return date;
      });
      setWeekDates(dates);
    }
  }, [weekStart]);

  // Helper function to get the number of days in a month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper function to get all Sundays in the selected month
  const getSundaysInMonth = (month: number, year: number) => {
    const sundays = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month, getDaysInMonth(month, year));

    for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
      if (day.getDay() === 0) { // 0 indicates Sunday
        sundays.push(new Date(day));
      }
    }

    return sundays;
  };

  // Event handler for month selection change
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(e.target.value, 10));
    setWeekStart(null); // Reset week start when month changes
  };

  // Event handler for week start selection change
  const handleWeekStartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = new Date(e.target.value);
    setWeekStart(selectedDate);
  };

  const sundaysInMonth = getSundaysInMonth(month, year);

  return (
    <div className="calendar">
      <div className="selectors">
        <select value={month} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(year, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>

        <select
          value={weekStart ? weekStart.toISOString() : ''}
          onChange={handleWeekStartChange}
        >
          <option value="" disabled>
            Select start of the week
          </option>
          {sundaysInMonth.map((sunday) => (
            <option key={sunday.toISOString()} value={sunday.toISOString()}>
              {sunday.toDateString()}
            </option>
          ))}
        </select>
      </div>

      <div className="days">
        {weekDates.map((date) => (
          <Day key={date.toDateString()} date={date} />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
