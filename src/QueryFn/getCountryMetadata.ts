import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';

export const getCountryMetadata = async () => {
  const response = await fetchAndParseJSON(
    'https://raw.githubusercontent.com/UNDP-Data/country-taxonomy-from-azure/main/country_territory_groups.json',
  );
  return response;
};
