import React from 'react';

interface Props {
  date: {
    year: number;
    month: number;
  };
  setDate: React.Dispatch<
    React.SetStateAction<{
      year: number;
      month: number;
    }>
  >;
}

const FIRST_MONTH = 1;
const LAST_MONTH = 12;

const Header = ({ date, setDate }: Props) => {
  const nextMonth = () => {
    setDate((d) => ({
      year: d.month === LAST_MONTH ? d.year + 1 : d.year,
      month: (d.month % LAST_MONTH) + 1,
    }));
  };

  const backMonth = () => {
    setDate((d) => ({
      year: d.month === FIRST_MONTH ? d.year - 1 : d.year,
      month: d.month === FIRST_MONTH ? LAST_MONTH : d.month - 1,
    }));
  };

  return (
    <main className="w-full h-[44px] flex justify-between items-center">
      <button
        aria-label="Previous Month"
        className="w-[44px] h-[44px] flex justify-center items-center cursor-pointer bg-white hover:bg-[#e6e6e6]"
        onClick={backMonth}
      >
        {'‹'}
      </button>
      <div className="header__content">{`${date.year}年${date.month}月`}</div>
      <button
        aria-label="Next Month"
        className="w-[44px] h-[44px] flex justify-center items-center cursor-pointer bg-white hover:bg-[#e6e6e6]"
        onClick={nextMonth}
      >
        {'›'}
      </button>
    </main>
  );
};

export default Header;
