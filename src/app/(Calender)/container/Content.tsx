import React, { useCallback, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import {
  getMonthFirstDay,
  getMonthLastDate,
  getMonthLastDay,
} from '@/src/lib/helper';
import Date from '../components/Date';

interface Props {
  date: {
    year: number;
    month: number;
  };
}

const Content = ({ date: { year, month } }: Props) => {
  const [tempDate, setTempDate] = useState<dayjs.Dayjs[]>([]);
  const [firstClickCalendar, setFirstClickCalendar] = useState<boolean>(true);

  const dateClick = useCallback(
    (date: dayjs.Dayjs) => {
      setFirstClickCalendar(false);

      if (firstClickCalendar) {
        setTempDate([date]);
      } else {
        if (tempDate.length === 2 || tempDate[0].isAfter(date)) {
          setTempDate([date]);
        } else if (tempDate[0].isBefore(date)) {
          setTempDate((prevDates) => [...prevDates, date]);
        }
      }
    },
    [firstClickCalendar, tempDate],
  );

  const isActiveDay = useCallback(
    (date: dayjs.Dayjs) => {
      switch (tempDate.length) {
        case 1:
          return date.isSame(tempDate[0]);
        case 2:
          return (
            (date.isAfter(tempDate[0]) && date.isBefore(tempDate[1])) ||
            date.isSame(tempDate[0]) ||
            date.isSame(tempDate[1])
          );
        default:
          return false;
      }
    },
    [tempDate],
  );

  const calendarDates = useMemo(() => {
    const blankMonthLastDate = getMonthLastDate(month - 1, year);
    const blankDays = Array(getMonthFirstDay(month, year))
      .fill(0)
      .map((_, i) => {
        const day = blankMonthLastDate - i;
        const date = dayjs(`${year}-${month - 1}-${day}`);
        return (
          <Date
            key={`blank-${i}`}
            day={day}
            date={date}
            isActiveDay={isActiveDay(date)}
          />
        );
      });

    const daysInMonth = Array(getMonthLastDate(month, year))
      .fill(0)
      .map((_, i) => {
        const day = i + 1;
        const date = dayjs(`${year}-${month}-${day}`);
        const isToday = date.isSame(dayjs(), 'day');
        return (
          <Date
            key={`current-${day}`}
            day={day}
            date={date}
            onClick={dateClick}
            isToday={isToday}
            isActiveDay={isActiveDay(date)}
            isCurrentMonthDay
          />
        );
      });

    const lastDays = Array(6 - getMonthLastDay(month, year))
      .fill(0)
      .map((_, i) => {
        const day = i + 1;
        const date = dayjs(`${year}-${month + 1}-${day}`);
        return (
          <Date
            key={`last-${day}`}
            date={date}
            day={day}
            isActiveDay={isActiveDay(date)}
          />
        );
      });

    return [...blankDays, ...daysInMonth, ...lastDays];
  }, [month, year, dateClick, isActiveDay]);

  return <main className="grid grid-cols-7">{calendarDates}</main>;
};

export default Content;
