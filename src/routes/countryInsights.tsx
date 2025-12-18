import { createRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import type { AnyRootRoute } from '@tanstack/react-router';
import { Spinner } from '@undp/design-system-react/Spinner';
import { H2, P } from '@undp/design-system-react/Typography';
import { Spacer } from '@undp/design-system-react/Spacer';
import { DropdownSelect } from '@undp/design-system-react/DropdownSelect';
import { UnitChart } from '@undp/data-viz/UnitChart';
import { SimpleBarGraph, StackedBarGraph } from '@undp/data-viz/BarGraph';
import { MultiLineAltChart } from '@undp/data-viz/MultiLineAltChart';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { transformDataForGraph } from '@undp/data-viz/transformData';

import DataDownloadCard from '@/components/DataDownloadCard';
import { getData } from '@/QueryFn/getData';
import {
  useCountryInsightsActions,
  useCountryInsightsStore,
} from '@/stores/countryInsightsStore';

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
  const countryData = data.completeData
    .filter(d => d.GeoAreaName === country)
    .sort((a, b) => a.TimePeriod - b.TimePeriod);
  const countryLatestData = data.latestData.filter(
    d => d.GeoAreaName === country,
  );
  const latestDataAllCourt = countryLatestData.find(d => d.court === 'total');
  const ageDistributionData = [
    latestDataAllCourt?.age_under_35Percentage,
    latestDataAllCourt?.between_35_44Percentage,
    latestDataAllCourt?.between_45_54Percentage,
    latestDataAllCourt?.between_55_64Percentage,
    latestDataAllCourt?.above_65Percentage,
  ].filter(d => d !== undefined && d !== null);
  return (
    <div className='page-container px-4 sm:px-24 my-16'>
      <Spacer size='7xl' />
      <H2 className='font-heading uppercase' marginBottom='none'>
        Country Insights
      </H2>
      <Spacer size='4xl' />
      <DropdownSelect
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(d: any) => updateCountry(d.value)}
        value={{ label: country, value: country }}
        options={[...new Set(data.completeData.map(d => d.GeoAreaName))].map(
          d => ({
            label: d,
            value: d,
          }),
        )}
        size='sm'
        variant='light'
        isSearchable
      />
      <Spacer size='xl' />
      <div className='flex gap-4 flex-wrap items-stretch'>
        <div className='bg-[#F96445] grow shrink-0 w-[calc(33.33%-0.5rem)] min-h-[320px] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <div className='flex gap-2 items-center'>
            <P className='text-[var(--white)]' marginBottom='none' size='xl'>
              Female representation{' '}
            </P>
            <div>
              {latestDataAllCourt?.TimePeriod && (
                <span className='text-primary-white px-2 text-sm rounded-[2px] bg-[rgba(255,255,255,0.2)]'>
                  {latestDataAllCourt.TimePeriod}
                </span>
              )}
            </div>
          </div>
          <Spacer size='lg' />
          <H2 className='text-[var(--white)]' marginBottom='base'>
            {numberFormattingFunction(
              latestDataAllCourt?.femalePercentage,
              'NA',
              1,
              undefined,
              '%',
            )}
          </H2>
          {latestDataAllCourt?.femalePercentage && (
            <UnitChart
              backgroundColor={false}
              data={[
                {
                  label: 'Female',
                  value: latestDataAllCourt?.femalePercentage || 0,
                },
                {
                  label: 'Male',
                  value: latestDataAllCourt?.malePercentage || 0,
                },
              ]}
              colors={['#FFFFFF', '#FFFFFF50']}
              showColorScale={false}
              showStrokeForWhiteDots={false}
            />
          )}
        </div>
        <div className='grow shrink-0 w-[calc(66.66%-0.5rem)] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <SimpleBarGraph
            graphTitle='Female representation over time'
            backgroundColor={false}
            data={transformDataForGraph(
              countryData.filter(d => d.court === 'total'),
              'barChart',
              [
                {
                  chartConfigId: 'label',
                  columnId: 'TimePeriod',
                },
                {
                  chartConfigId: 'size',
                  columnId: 'femalePercentage',
                },
              ],
            )}
            orientation='vertical'
            suffix='%'
            leftMargin={100}
            rightMargin={100}
            maxValue={100}
            noOfTicks={3}
            showValues={false}
            barPadding={0.1}
            colors='#F96445'
            refValues={[{ value: 50, text: 'Gender parity' }]}
          />
        </div>
        <div className='grow shrink-0 w-[calc(66.66%-0.5rem)] min-w-[320px] min-h-[320px] bg-[var(--gray-100)] p-4'>
          <SimpleBarGraph
            graphTitle='SDG indicator 16.7.1 over time'
            backgroundColor={false}
            data={transformDataForGraph(
              countryData.filter(d => d.court === 'total'),
              'barChart',
              [
                {
                  chartConfigId: 'label',
                  columnId: 'TimePeriod',
                },
                {
                  chartConfigId: 'size',
                  columnId: 'SDG1671C_Female',
                },
              ],
            )}
            orientation='vertical'
            maxValue={2}
            noOfTicks={3}
            showValues={false}
            leftMargin={100}
            rightMargin={100}
            height={320}
            colors='#296DDF'
            refValues={[{ value: 1, text: 'Gender parity' }]}
          />
        </div>
        <div className='bg-[#296DDF] flex flex-col grow shrink-0 w-[calc(33.33%-0.5rem)] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <div className='flex gap-2 items-center'>
            <P className='text-[var(--white)]' marginBottom='none' size='xl'>
              SDG indicator 16.7.1{' '}
            </P>
            <div>
              {latestDataAllCourt?.TimePeriod && (
                <span className='text-primary-white px-2 text-sm rounded-[2px] bg-[rgba(255,255,255,0.2)]'>
                  {latestDataAllCourt.TimePeriod}
                </span>
              )}
            </div>
          </div>
          <P
            size='base'
            marginBottom='none'
            className='text-primary-white opacity-[0.6]'
          >
            Proportions of positions in national and local institutions,
            including (a) the legislatures; (b) the public service; and (c) the
            judiciary, compared to national distributions by sex
          </P>
          <div className='grow items-center flex'>
            <H2 className='text-[var(--white)]' marginBottom='base'>
              {numberFormattingFunction(
                latestDataAllCourt?.SDG1671C_Female,
                'NA',
                2,
              )}
            </H2>
          </div>
        </div>
        <div className='grow shrink-0 w-[calc(33.33%-0.5rem)] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <SimpleBarGraph
            graphTitle='Female representation by court'
            backgroundColor={false}
            orientation='horizontal'
            data={
              countryLatestData.length > 0
                ? [
                    {
                      label: 'All courts',
                      size:
                        countryLatestData.find(d => d.court === 'total')
                          ?.femalePercentage || 0,
                    },
                    {
                      label: 'Supreme courts',
                      size: countryLatestData.find(d => d.court === 'supreme')
                        ?.femalePercentage,
                    },
                    {
                      label: 'Higher courts',
                      size: countryLatestData.find(d => d.court === 'high')
                        ?.femalePercentage,
                    },
                    {
                      label: 'Lower courts',
                      size: countryLatestData.find(d => d.court === 'low')
                        ?.femalePercentage,
                    },
                  ]
                : []
            }
            maxValue={100}
            height={320}
            colors='#04BAAB'
            showValues
            showTicks={false}
            labelOrder={[
              'All courts',
              'Supreme courts',
              'Higher courts',
              'Lower courts',
            ]}
            refValues={[{ value: 50, text: 'Gender parity' }]}
          />
        </div>
        <div className='grow shrink-0 w-[calc(66.66%-0.5rem)] min-w-[320px] min-h-[320px] bg-[var(--gray-100)] p-4'>
          <MultiLineAltChart
            graphTitle='Female representation by court over time'
            backgroundColor={false}
            data={transformDataForGraph(countryData, 'multiLineAltChart', [
              {
                chartConfigId: 'label',
                columnId: 'court',
              },
              {
                chartConfigId: 'color',
                columnId: 'court',
              },
              {
                chartConfigId: 'y',
                columnId: 'femalePercentage',
              },
              {
                chartConfigId: 'date',
                columnId: 'TimePeriod',
              },
            ])}
            refValues={[{ value: 50, text: 'Gender parity' }]}
            showColorScale
            colors={['#296DDF', '#04BAAB', '#934DB0', '#F96445']}
            colorDomain={['total', 'supreme', 'high', 'low']}
            noOfYTicks={3}
            showDots
            rightMargin={125}
            maxValue={100}
            showNAColor={false}
          />
        </div>
        <div className='grow shrink-0 w-[calc(66.66%-0.5rem)] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <StackedBarGraph
            graphTitle='Age distribution over time (All courts)'
            backgroundColor={false}
            orientation='vertical'
            colors={['#296DDF', '#04BAAB', '#934DB0', '#F96445', '#c4c4c4']}
            data={
              ageDistributionData.length > 0
                ? transformDataForGraph(
                    countryData.filter(d => d.court === 'total'),
                    'stackedBarChart',
                    [
                      {
                        chartConfigId: 'label',
                        columnId: 'TimePeriod',
                      },
                      {
                        chartConfigId: 'size',
                        columnId: [
                          'age_under_35Percentage',
                          'between_35_44Percentage',
                          'between_45_54Percentage',
                          'between_55_64Percentage',
                          'above_65Percentage',
                        ],
                      },
                    ],
                  )
                : []
            }
            maxValue={100}
            height={320}
            colorDomain={[
              'Under 35',
              'Between 35-44',
              'Between 45-54',
              'Between 55-64',
              'Above 65',
            ]}
          />
        </div>
        <div className='grow shrink-0 w-[calc(33.33%-0.5rem)] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <SimpleBarGraph
            graphTitle='Age distribution (All courts)'
            backgroundColor={false}
            orientation='horizontal'
            data={
              ageDistributionData.length > 0
                ? [
                    {
                      label: 'Under 35',
                      size: latestDataAllCourt?.age_under_35Percentage,
                    },
                    {
                      label: 'Between 35-44',
                      size: latestDataAllCourt?.between_35_44Percentage,
                    },
                    {
                      label: 'Between 45-54',
                      size: latestDataAllCourt?.between_45_54Percentage,
                    },
                    {
                      label: 'Between 55-64',
                      size: latestDataAllCourt?.between_55_64Percentage,
                    },
                    {
                      label: 'Above 65',
                      size: latestDataAllCourt?.above_65Percentage,
                    },
                  ]
                : []
            }
            labelOrder={[
              'Under 35',
              'Between 35-44',
              'Between 45-54',
              'Between 55-64',
              'Above 65',
            ]}
            maxValue={100}
            height={320}
            colors='#296DDF'
          />
        </div>
      </div>
      <Spacer size='4xl' />
      <DataDownloadCard />
      <Spacer size='7xl' />
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
