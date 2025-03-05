import { cn } from '@/src/lib/utils';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
  day: number;
  date: dayjs.Dayjs;
  isActiveDay?: boolean;
  isCurrentMonthDay?: boolean;
  isToday?: boolean;
  onClick?: (date: dayjs.Dayjs) => void;
}

const Date = (props: Props) => {
  const {
    day,
    date,
    onClick,
    isActiveDay = false,
    isCurrentMonthDay = false,
    isToday = false,
  } = props;
  return (
    <div
      className={cn(
        'w-[50px] h-9 flex justify-center items-center cursor-pointer',
        isToday && 'bg-[#ffff76]',
        isActiveDay
          ? 'bg-[#006edc] text-white'
          : !isCurrentMonthDay
            ? 'text-[#757575] cursor-no-drop'
            : ' hover:bg-[#e6e6e6] hover:text-black',
      )}
      {...(onClick && { onClick: () => onClick(date) })}
    >
      {`${day}日`}
    </div>
  );
};

export default Date;
