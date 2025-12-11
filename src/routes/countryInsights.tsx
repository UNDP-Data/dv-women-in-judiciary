import { createRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import type { AnyRootRoute } from '@tanstack/react-router';
import { Spinner } from '@undp/design-system-react/Spinner';
import { H1 } from '@undp/design-system-react/Typography';
import { Spacer } from '@undp/design-system-react/Spacer';
import { DropdownSelect } from '@undp/design-system-react/DropdownSelect';
import { DonutChart } from '@undp/data-viz/DonutChart';
import { SimpleBarGraph } from '@undp/data-viz/BarGraph';

import DataDownloadCard from '@/components/DataDownloadCard';
import { getData } from '@/QueryFn/getData';
import {
  useCountryInsightsActions,
  useCountryInsightsStore,
} from '@/stores/countryInsightsStore';
import { FormattedDataType } from '@/types';

function useData() {
  return useQuery({
    queryKey: ['get-data'],
    queryFn: getData,
  });
}

export function CountryInsights() {
  const { data, isLoading, isError } = useData();

  const { updateCountry } = useCountryInsightsActions();
  const country = useCountryInsightsStore(s => s.country);

  if (isLoading) return <Spinner size='lg' className='my-20 m-auto' />;

  if (isError) return <>Error</>;
  if (!data) return <div>No data</div>;
  const countryData = data.filter(d => d.GeoAreaName === country);
  const latestYear = Math.max(...countryData.map(d => d.TimePeriod));
  const latestDataAllCourt = countryData.find(
    d => d.TimePeriod === latestYear && d.court === 'total',
  ) as FormattedDataType;
  const ageDistributionData = [
    latestDataAllCourt.age_under_35Percentage,
    latestDataAllCourt.between_35_44Percentage,
    latestDataAllCourt.between_45_54Percentage,
    latestDataAllCourt.between_55_64Percentage,
    latestDataAllCourt.above_65Percentage,
  ].filter(d => d !== undefined && d !== null);
  return (
    <div className='page-container'>
      <Spacer size='4xl' />
      <H1 marginBottom='none' className='text-[var(--blue-700)]'>
        Country Insights
      </H1>
      <Spacer size='xl' />
      <DropdownSelect
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(d: any) => updateCountry(d.value)}
        value={{ label: country, value: country }}
        options={[...new Set(data.map(d => d.GeoAreaName))].map(d => ({
          label: d,
          value: d,
        }))}
        size='sm'
        variant='light'
        isSearchable
      />
      <Spacer size='xl' />
      <div className='flex gap-4 flex-wrap items-stretch'>
        <div className='grow shrink-0 w-[calc(50%-0.5rem)] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <DonutChart
            graphTitle={`Overall gender distribution (${latestYear})`}
            backgroundColor={false}
            data={[
              {
                label: 'Male',
                size:
                  countryData.find(
                    d => d.TimePeriod === latestYear && d.court === 'total',
                  )?.malePercentage || 0,
              },
              {
                label: 'Female',
                size:
                  countryData.find(
                    d => d.TimePeriod === latestYear && d.court === 'total',
                  )?.femalePercentage || 0,
              },
            ]}
            radius={100}
            strokeWidth={25}
          />
        </div>
        <div className='grow shrink-0 w-[calc(50%-0.5rem)] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <SimpleBarGraph
            graphTitle={`Female Representation by Court Type (${latestYear})`}
            backgroundColor={false}
            orientation='horizontal'
            data={[
              {
                label: 'Supreme Court',
                size:
                  countryData.find(
                    d => d.TimePeriod === latestYear && d.court === 'supreme',
                  )?.femalePercentage || 0,
              },
              {
                label: 'High Court',
                size:
                  countryData.find(
                    d => d.TimePeriod === latestYear && d.court === 'high',
                  )?.femalePercentage || 0,
              },
              {
                label: 'Lower Court',
                size:
                  countryData.find(
                    d => d.TimePeriod === latestYear && d.court === 'low',
                  )?.femalePercentage || 0,
              },
            ]}
            trackColor='#EDEFF0'
            maxValue={100}
            showTicks={false}
            styles={{
              yAxis: {
                axis: { display: 'none' },
              },
            }}
            topMargin={0}
            maxBarThickness={40}
            bottomMargin={0}
          />
        </div>
        <div className='grow shrink-0 w-[calc(50%-0.5rem)] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <SimpleBarGraph
            graphTitle={`Age Distribution (All Judicial Staff) (${latestYear})`}
            backgroundColor={false}
            orientation='horizontal'
            data={
              ageDistributionData.length > 0
                ? [
                    {
                      label: 'Under 35',
                      size: latestDataAllCourt.age_under_35Percentage || 0,
                    },
                    {
                      label: 'Between 35-44',
                      size: latestDataAllCourt.between_35_44Percentage || 0,
                    },
                    {
                      label: 'Between 45-54',
                      size: latestDataAllCourt.between_45_54Percentage || 0,
                    },
                    {
                      label: 'Between 55-64',
                      size: latestDataAllCourt.between_55_64Percentage || 0,
                    },
                    {
                      label: 'Above 65',
                      size: latestDataAllCourt.above_65Percentage || 0,
                    },
                  ]
                : []
            }
            trackColor='#EDEFF0'
            maxBarThickness={40}
          />
        </div>
      </div>
      <Spacer size='4xl' />
      <DataDownloadCard />
      <Spacer size='4xl' />
    </div>
  );
}
export default function createCountryInsightsRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/country-insights',
    component: CountryInsights,
    getParentRoute: () => parentRoute,
  });
}
