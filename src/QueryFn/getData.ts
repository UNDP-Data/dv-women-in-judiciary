import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';

import { DataType } from '@/types';

const getPercentage = (value?: number, total?: number) =>
  value != null && total != null && value != undefined && total != undefined
    ? (value / total) * 100
    : undefined;

export const getData = async () => {
  const response = await fetchAndParseCSV(
    'https://raw.githubusercontent.com/UNDP-Data/dv-women-in-judiciary-data/refs/heads/main/data/data.csv',
  );
  const completeData = (response as DataType[])
    .filter(d => d.Typeofoccupation === 'Judges')
    .map(d => ({
      ...d,
      malePercentage: getPercentage(d.male, d.total),
      femalePercentage: getPercentage(d.female, d.total),
      age_under_35Percentage: getPercentage(d.age_under_35, d.total),
      between_35_44Percentage: getPercentage(d.between_35_44, d.total),
      between_45_54Percentage: getPercentage(d.between_45_54, d.total),
      between_55_64Percentage: getPercentage(d.between_55_64, d.total),
      above_65Percentage: getPercentage(d.above_65, d.total),
      disabledPercentage: getPercentage(d.disabled, d.total),
      group_aPercentage: getPercentage(d.group_a, d.total),
      group_bPercentage: getPercentage(d.group_b, d.total),
      group_cPercentage: getPercentage(d.group_c, d.total),
    }));
  const uniqueCountries = [...new Set(completeData.map(d => d.ISOalpha3))];
  const courtTypes = [...new Set(completeData.map(d => d.court))];
  const latestData = uniqueCountries
    .map(country => {
      const countryLatestDataByCourts = courtTypes.map(courtType => {
        const countryData = completeData.filter(
          d => d.ISOalpha3 === country && d.court === courtType,
        );
        const latestYear = Math.max(...countryData.map(d => d.TimePeriod));
        const latestData = countryData.find(d => d.TimePeriod === latestYear);
        return latestData;
      });
      return countryLatestDataByCourts;
    })
    .flat()
    .filter(d => d != undefined);
  return { completeData, latestData };
};
