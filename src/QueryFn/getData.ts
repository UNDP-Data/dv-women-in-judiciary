import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';

import { DataType } from '@/types';

const getPercentage = (value?: number, total?: number) =>
  value != null &&
  total != null &&
  value != undefined &&
  total != undefined &&
  total !== 0
    ? (value / total) * 100
    : undefined;

export const getData = async () => {
  const response = await fetchAndParseCSV(
    'https://raw.githubusercontent.com/UNDP-Data/dv-women-in-judiciary-data/refs/heads/main/data/data.csv',
  );
  const completeData = (response as DataType[])
    .filter(d => d.Typeofoccupation === 'Judges')
    .map(d => {
      const ageTotal =
        (d.age_under_35 || 0) +
        (d.between_35_44 || 0) +
        (d.between_45_54 || 0) +
        (d.between_55_64 || 0) +
        (d.above_65 || 0);
      return {
        ...d,
        malePercentage: d.male_share ? d.male_share * 100 : undefined,
        femalePercentage: d.female_share ? d.female_share * 100 : undefined,
        age_under_35Percentage: getPercentage(d.age_under_35, ageTotal),
        between_35_44Percentage: getPercentage(d.between_35_44, ageTotal),
        between_45_54Percentage: getPercentage(d.between_45_54, ageTotal),
        between_55_64Percentage: getPercentage(d.between_55_64, ageTotal),
        above_65Percentage: getPercentage(d.above_65, ageTotal),
        disabledPercentage: getPercentage(d.disabled, d.total),
        group_aPercentage: getPercentage(d.group_a, d.total),
        group_bPercentage: getPercentage(d.group_b, d.total),
        group_cPercentage: getPercentage(d.group_c, d.total),
      };
    });
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
