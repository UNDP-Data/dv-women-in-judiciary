import { createRoute, getRouteApi } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import type { AnyRootRoute } from '@tanstack/react-router';
import { Spinner } from '@undp/design-system-react/Spinner';
import { H2, P } from '@undp/design-system-react/Typography';
import { Spacer } from '@undp/design-system-react/Spacer';
import { DropdownSelect } from '@undp/design-system-react/DropdownSelect';
import { UnitChart } from '@undp/data-viz/UnitChart';
import {
  GroupedBarGraph,
  SimpleBarGraph,
  StackedBarGraph,
} from '@undp/data-viz/BarGraph';
import { MultiLineAltChart } from '@undp/data-viz/MultiLineAltChart';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { TriangleAlert } from 'lucide-react';
import { useEffect } from 'react';

import DataDownloadCard from '@/components/DataDownloadCard';
import { getData } from '@/QueryFn/getData';
import {
  useCountry,
  useCountryInsightsActions,
  useCourtType,
} from '@/stores/countryInsightsStore';
import CountryProfileCard from '@/components/CountryProfileCard';

function useData() {
  return useQuery({
    queryKey: ['get-data'],
    queryFn: getData,
  });
}

export function CountryInsights() {
  const { data, isLoading, isError } = useData();
  const routeApi = getRouteApi('/country-insights');
  const navigate = routeApi.useNavigate();
  const search = routeApi.useSearch();

  const { updateCountry, updateCourtType } = useCountryInsightsActions();
  useEffect(() => {
    updateCountry(search.country || 'Albania');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.country]);
  const country = useCountry();
  const courtType = useCourtType();

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
        onChange={(d: any) => {
          navigate({
            search: {
              ...search,
              country: d.value || undefined,
            },
            replace: true,
          });
          updateCourtType({
            label: 'All courts',
            value: 'total',
          });
          updateCountry(d.value);
        }}
        value={{ label: country, value: country }}
        options={[...new Set(data.completeData.map(d => d.GeoAreaName))]
          .sort((a, b) => a.localeCompare(b))
          .map(d => ({
            label: d,
            value: d,
          }))}
        size='sm'
        variant='light'
        isSearchable
      />
      <Spacer size='xl' />
      <div className='flex gap-4 flex-wrap items-stretch'>
        <div className='bg-[#F96445] grow shrink-0 w-[calc(33.33%-0.5rem)] min-h-[320px] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <div className='flex gap-2 items-center'>
            <P className='text-[var(--white)]' marginBottom='none' size='xl'>
              Women representation
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
          {latestDataAllCourt?.femalePercentage !== undefined &&
          latestDataAllCourt?.femalePercentage !== null ? (
            <UnitChart
              backgroundColor={false}
              data={[
                {
                  label: 'Women',
                  value: latestDataAllCourt?.femalePercentage || 0,
                },
                {
                  label: 'Men',
                  value: latestDataAllCourt?.malePercentage || 0,
                },
              ]}
              colors={['#FFFFFF', '#FFFFFF50']}
              showColorScale={false}
              showStrokeForWhiteDots={false}
            />
          ) : null}
        </div>
        <div className='grow shrink-0 w-[calc(66.66%-0.5rem)] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <SimpleBarGraph
            graphTitle='Women representation over time'
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
            leftMargin={20}
            rightMargin={100}
            maxValue={100}
            noOfTicks={3}
            showValues
            barPadding={0.1}
            colors='#F96445'
            refValues={[{ value: 50, text: 'Gender parity' }]}
          />
        </div>
        <div className='grow shrink-0 w-[calc(66.66%-0.5rem)] min-w-[320px] min-h-[320px] bg-[var(--gray-100)] p-4'>
          <div className='flex gap-2 justify-between items-center mb-5'>
            <P marginBottom='none'>No. of judges over time</P>
            <DropdownSelect
              className='w-[240px]'
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(d: any) => updateCourtType(d)}
              value={courtType}
              options={[
                {
                  label: 'All courts',
                  value: 'total',
                },
                {
                  label: 'Lower courts',
                  value: 'low',
                },
                {
                  label: 'High courts',
                  value: 'high',
                },
                {
                  label: 'Supreme courts',
                  value: 'supreme',
                },
              ]}
              size='sm'
              variant='light'
            />
          </div>
          {countryData.filter(d => d.court === courtType.value).length > 0 ? (
            <GroupedBarGraph
              backgroundColor={false}
              data={transformDataForGraph(
                countryData.filter(d => d.court === courtType.value),
                'groupedBarChart',
                [
                  {
                    chartConfigId: 'label',
                    columnId: 'TimePeriod',
                  },
                  {
                    chartConfigId: 'size',
                    columnId: ['male', 'female'],
                  },
                ],
              )}
              orientation='vertical'
              showTicks={false}
              leftMargin={20}
              rightMargin={20}
              showValues
              height={320}
              colorDomain={['Men', 'Women']}
              colors={['#296DDF', '#04BAAB']}
            />
          ) : (
            <div className='flex flex-col gap-4 items-center justify-center min-h-[240px]'>
              <TriangleAlert
                size={48}
                className='stroke-primary-gray-500'
                strokeWidth={1.5}
              />
              <P
                className='text-primary-gray-550'
                marginBottom='none'
                size='lg'
              >
                No data available for this court type
              </P>
            </div>
          )}
        </div>
        <div className='bg-[#296DDF] flex flex-col grow shrink-0 w-[calc(33.33%-0.5rem)] min-w-[320px] bg-[var(--gray-100)] p-4'>
          <div className='flex gap-2 items-center'>
            <P className='text-[var(--white)]' marginBottom='none' size='xl'>
              SDG indicator 16.7.1
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
            Representation of women in the judiciary is an SDG indicator. It
            measures the proportion of women in the judiciary relative to the
            share of women in the working age population
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
            graphTitle='Women representation by court'
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
            suffix='%'
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
            graphTitle='Women representation by court over time'
            backgroundColor={false}
            data={transformDataForGraph(
              countryData.map(d => ({
                ...d,
                court:
                  d.court === 'total'
                    ? 'All courts'
                    : d.court === 'high'
                      ? 'Higher courts'
                      : d.court === 'low'
                        ? 'Lower courts'
                        : 'Supreme courts',
              })),
              'multiLineAltChart',
              [
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
              ],
            )}
            refValues={[{ value: 50, text: 'Gender parity' }]}
            showColorScale
            suffix='%'
            colors={['#296DDF', '#04BAAB', '#934DB0', '#F96445']}
            colorDomain={[
              'All courts',
              'Supreme courts',
              'Higher courts',
              'Lower courts',
            ]}
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
            suffix='%'
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
            suffix='%'
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
      <div className='flex gap-6 flex-wrap'>
        <DataDownloadCard />
        <CountryProfileCard />
      </div>
      <Spacer size='7xl' />
    </div>
  );
}

export default function createCountryInsightsRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/country-insights',
    component: CountryInsights,
    getParentRoute: () => parentRoute,
    validateSearch: (search: { country?: string }) => search,
  });
}
