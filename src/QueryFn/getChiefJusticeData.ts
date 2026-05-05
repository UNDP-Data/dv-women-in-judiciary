import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';

import { ChiefJusticeDataType } from '@/types';

export const getChiefJusticeData = async () => {
  const response = await fetchAndParseCSV(
    'https://raw.githubusercontent.com/UNDP-Data/dv-women-in-judiciary-data/refs/heads/main/data/chiefJusticeGenderData.csv',
  );
  return response as ChiefJusticeDataType[];
};
