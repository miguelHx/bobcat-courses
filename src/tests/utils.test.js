import { getMon } from '../utils/DayOfWeekFinder';

it('gets monday of week given date', () => {
  const mondayJanFirst = 1;
  const dateOfInterest = new Date(`2018-01-05T16:08:00-07:00`); // friday Jan
  const monday = getMon(dateOfInterest);
  expect(monday.getDate()).toEqual(mondayJanFirst);
});

