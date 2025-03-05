'use client';

import React, { useState } from 'react';
import Header from '../container/Header';
import { CURRENT_MONTH, CURRENT_YEAR } from '@/src/lib/helper';
import Content from '../container/Content';

const CalenderContainer = () => {
  const [date, setDate] = useState({
    year: CURRENT_YEAR,
    month: CURRENT_MONTH,
  });
  return (
    <main className="w-[350px] h-60 font-semibold text-base flex flex-col gap-4">
      <Header date={date} setDate={setDate} />
      <Content date={date} />
    </main>
  );
};

export default CalenderContainer;
