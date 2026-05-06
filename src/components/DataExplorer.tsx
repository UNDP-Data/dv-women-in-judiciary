import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@undp/design-system-react/Spinner';
import {
  VisualizationWidget,
  VisualizationWidgetBody,
  VisualizationWidgetBodyContent,
  VisualizationWidgetBodySidebar,
  VisualizationWidgetHeader,
  VisualizationWidgetHeaderItem,
} from '@undp/design-system-react/VisualizationWidget';
import { ChartBarBig, ChartLine, Map, TextAlignStart } from 'lucide-react';
import { Activity } from 'react';
import { DropdownSelect } from '@undp/design-system-react/DropdownSelect';
import { Switch } from '@undp/design-system-react/Switch';
import { H6, P } from '@undp/design-system-react/Typography';
import { Spacer } from '@undp/design-system-react/Spacer';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { ChoroplethMap } from '@undp/data-viz/ChoroplethMap';
import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { SimpleLineChart } from '@undp/data-viz/SimpleLineChart';
import { MultiLineAltChart } from '@undp/data-viz/MultiLineAltChart';
import { DumbbellChart } from '@undp/data-viz/DumbbellChart';
import { SegmentedControl } from '@undp/design-system-react/SegmentedControl';
import { numberFormattingFunction } from '@undp/data-viz/utils';

import { getData } from '@/QueryFn/getData';
import {
  useCountries,
  useCountriesForTrendLines,
  useCourtType,
  useDataExplorerActions,
  useDisaggregationType,
  useFilterByWomenChiefJustice,
  useIndicator,
  useRegion,
  useTab,
} from '@/stores/dataExplorerStore';
import { DISAGGREGATION_CONFIG, INDICATORS_OPTIONS } from '@/constants';
import { getChiefJusticeData } from '@/QueryFn/getChiefJusticeData';

function useData() {
  const dataQuery = useQuery({
    queryKey: ['get-data'],
    queryFn: getData,
  });

  const chiefJusticeQuery = useQuery({
    queryKey: ['get-chief-justice-data'],
    queryFn: getChiefJusticeData,
  });

  return { dataQuery, chiefJusticeQuery };
}
function DataExplorerWidget() {
  const { dataQuery, chiefJusticeQuery } = useData();
  const tab = useTab();
  const indicator = useIndicator();
  const courtType = useCourtType();
  const region = useRegion();
  const countries = useCountries();
  const disaggregationType = useDisaggregationType();
  const filterByWomenChiefJustice = useFilterByWomenChiefJustice();
  const {
    updateTab,
    updateCourtType,
    updateRegion,
    updateCountries,
    updateIndicator,
    updateDisaggregationType,
    updateCountriesForTrendLines,
    updateFilterByWomenChiefJustice,
  } = useDataExplorerActions();
  const countriesForTrendLines = useCountriesForTrendLines();
  if (dataQuery.isLoading || chiefJusticeQuery.isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (dataQuery.isError || chiefJusticeQuery.isError) return <div>Error</div>;
  if (!dataQuery.data) return <div>No data</div>;

  const ColorDot = ({ color }: { color: string }) => (
    <span
      className='inline-block w-2.5 h-2.5 rounded-full'
      style={{ backgroundColor: color }}
    />
  );

  return (
    <>
      <VisualizationWidget>
        <VisualizationWidgetHeader
          defaultValue='map'
          className='border-primary-gray-300 border-b-1'
          onChange={d => {
            updateTab(d);
          }}
        >
          <VisualizationWidgetHeaderItem value='map'>
            <Map />
            Global map
          </VisualizationWidgetHeaderItem>
          <VisualizationWidgetHeaderItem value='ranks'>
            <ChartBarBig />
            Relative Position
          </VisualizationWidgetHeaderItem>
          <VisualizationWidgetHeaderItem value='trends'>
            <ChartLine />
            Trends
          </VisualizationWidgetHeaderItem>
          <VisualizationWidgetHeaderItem value='disaggregations'>
            <TextAlignStart />
            Disaggregations
          </VisualizationWidgetHeaderItem>
        </VisualizationWidgetHeader>
        <VisualizationWidgetBody className='h-none md:h-[80vh]'>
          <VisualizationWidgetBodySidebar className='h-full'>
            <div className='flex flex-col h-full'>
              <div className='w-full grow'>
                <H6>Settings & Filters</H6>
                <Activity
                  mode={tab === 'disaggregations' ? 'visible' : 'hidden'}
                >
                  <P size='xs' marginBottom='2xs'>
                    Disaggregated proportion of judges by
                  </P>
                  <SegmentedControl
                    onValueChange={d =>
                      updateDisaggregationType(d as 'gender' | 'age')
                    }
                    value={disaggregationType}
                    options={[
                      {
                        label: 'Gender',
                        value: 'gender',
                      },
                      {
                        label: 'Age',
                        value: 'age',
                      },
                    ]}
                    size='sm'
                    variant='light'
                  />
                </Activity>
                <Activity
                  mode={tab === 'disaggregations' ? 'hidden' : 'visible'}
                >
                  <P size='xs' marginBottom='2xs'>
                    Select indicator
                  </P>
                  <DropdownSelect
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(d: any) => updateIndicator(d)}
                    options={INDICATORS_OPTIONS}
                    value={indicator}
                    size='sm'
                    variant='light'
                  />
                </Activity>
                <Spacer size='xl' />
                <P size='xs' marginBottom='2xs'>
                  Select court type
                </P>
                <DropdownSelect
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
                <Activity mode={tab === 'trends' ? 'hidden' : 'visible'}>
                  <Spacer size='xl' />
                  <P size='xs' marginBottom='2xs'>
                    Filter by region
                  </P>
                  <DropdownSelect
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(d: any) => updateRegion(d?.value)}
                    value={
                      region ? { value: region, label: region } : undefined
                    }
                    options={[
                      ...new Set(dataQuery.data?.latestData.map(d => d.Region)),
                    ].map(d => ({
                      label: d,
                      value: d,
                    }))}
                    size='sm'
                    variant='light'
                    isClearable
                  />
                  <Spacer size='xl' />
                  <div className='flex flex-col gap-2 justify-between w-full'>
                    <P size='sm' marginBottom='none'>
                      Highlight countries with woman chief justice
                    </P>
                    <Switch
                      onCheckedChange={d => {
                        updateFilterByWomenChiefJustice(d);
                      }}
                      checked={filterByWomenChiefJustice}
                      size='small'
                    />
                  </div>
                </Activity>
                <Activity
                  mode={
                    tab === 'map' || tab === 'trends' ? 'hidden' : 'visible'
                  }
                >
                  <Spacer size='xl' />
                  <P size='xs' marginBottom='2xs'>
                    Highlight country(ies)
                  </P>
                  <DropdownSelect
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(d: any) =>
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      updateCountries(d.map((el: any) => el.value))
                    }
                    value={countries?.map(d => ({ value: d, label: d }))}
                    options={[
                      ...new Set(
                        dataQuery.data?.latestData.map(d => d.GeoAreaName),
                      ),
                    ].map(d => ({
                      label: d,
                      value: d,
                    }))}
                    size='sm'
                    variant='light'
                    isClearable
                    isMulti
                    isSearchable
                  />
                </Activity>
              </div>
              {tab === 'map' || tab === 'ranks' || tab === 'disaggregations' ? (
                <div className='h-fit pr-10 text-primary-gray-600'>
                  <P size='xs' marginBottom='none'>
                    Data last updated 10 March, 2026
                    <br />
                    <br />
                    The visualization shows the most recent data available for
                    each country, so the years may differ between countries.
                    Hover over a country to see its data details.
                  </P>
                </div>
              ) : null}
            </div>
          </VisualizationWidgetBodySidebar>
          <VisualizationWidgetBodyContent>
            <div className='h-full w-full bg-white'>
              <div className='h-full p-4'>
                {tab === 'map' && (
                  <ChoroplethMap
                    data={transformDataForGraph(
                      dataQuery.data.latestData.filter(
                        d => d.court === courtType.value,
                      ),
                      'choroplethMap',
                      [
                        {
                          chartConfigId: 'id',
                          columnId: 'ISOalpha3',
                        },
                        {
                          chartConfigId: 'x',
                          columnId: indicator.value,
                        },
                      ],
                    )}
                    colorDomain={
                      indicator.value === 'SDG1671C_Female'
                        ? [0.5, 0.75, 0.9, 1.1, 1.25, 1.5]
                        : [20, 40, 60, 80]
                    }
                    dimmedOpacity={0.1}
                    zoomAndCenterByHighlightedIds
                    footNote={
                      <P
                        size='xs'
                        marginBottom='none'
                        className='text-primary-gray-600'
                      >
                        Countries without available data are shown in light
                        grey.
                        <br />
                        The designations employed and the presentation of
                        material on this map do not imply the expression of any
                        opinion whatsoever on the part of the Secretariat of the
                        United Nations or UNDP concerning the legal status of
                        any country, territory, city or area or its authorities,
                        or concerning the delimitation of its frontiers or
                        boundaries.
                      </P>
                    }
                    mapNoDataColor='var(--gray-200)'
                    graphTitle={
                      <div className='flex gap-2 items-center'>
                        <P size='base' marginBottom='none'>
                          {indicator.label}
                          <span className='px-3 py-1 rounded-[4px] bg-primary-gray-200 text-primary-gray-600'>
                            {courtType.label}
                          </span>
                        </P>
                      </div>
                    }
                    graphDownload
                    backgroundColor={false}
                    highlightedIds={
                      region || filterByWomenChiefJustice
                        ? dataQuery.data?.latestData
                            .filter(d => (region ? d.Region === region : true))
                            .filter(d =>
                              filterByWomenChiefJustice
                                ? chiefJusticeQuery.data?.some(
                                    cj =>
                                      cj.GeoAreaName === d.GeoAreaName &&
                                      cj.sex_chief_justice === 'FEMALE',
                                  )
                                : true,
                            )
                            .map(d => d.ISOalpha3)
                        : undefined
                    }
                    styles={{ tooltip: { padding: 0 } }}
                    tooltip={d => {
                      return (
                        <div className='w-[280px] bg-primary-white'>
                          <div className='font-bold p-2 bg-primary-gray-300 uppercase text-xs'>
                            {d.data.GeoAreaName}
                          </div>
                          <Spacer size='base' />
                          <div className='flex gap-4 justify-between p-2'>
                            <P marginBottom='none' size='sm'>
                              {indicator.label} - {courtType.label} (
                              {d.data.TimePeriod})
                            </P>
                            <P
                              marginBottom='none'
                              size='sm'
                              className='font-bold'
                            >
                              {numberFormattingFunction(
                                d.data[indicator.value],
                                'NA',
                                1,
                                undefined,
                                '%',
                              )}
                            </P>
                          </div>
                          <div className='p-2'>
                            <SimpleLineChart
                              height={150}
                              backgroundColor={false}
                              data={transformDataForGraph(
                                dataQuery.data?.completeData.filter(
                                  el =>
                                    el.court === courtType.value &&
                                    el.GeoAreaName === d.data.GeoAreaName,
                                ),
                                'lineChart',
                                [
                                  {
                                    chartConfigId: 'date',
                                    columnId: 'TimePeriod',
                                  },
                                  {
                                    chartConfigId: 'y',
                                    columnId: indicator.value,
                                  },
                                ],
                              )}
                              maxValue={100}
                              noOfXTicks={2}
                              noOfYTicks={2}
                              lineColor='var(--gray-600)'
                            />
                          </div>
                        </div>
                      );
                    }}
                  />
                )}
                {tab === 'ranks' && (
                  <SimpleBarGraph
                    data={transformDataForGraph(
                      dataQuery.data.latestData.filter(
                        d =>
                          d.court === courtType.value &&
                          (region ? d.Region === region : true) &&
                          ((countries || []).length > 0
                            ? (countries || []).includes(d.GeoAreaName)
                            : true),
                      ),
                      'barChart',
                      [
                        {
                          chartConfigId: 'label',
                          columnId: 'GeoAreaName',
                        },
                        {
                          chartConfigId: 'size',
                          columnId: indicator.value,
                        },
                      ],
                    )}
                    highlightedDataPoints={
                      filterByWomenChiefJustice
                        ? dataQuery.data?.latestData
                            .filter(d =>
                              filterByWomenChiefJustice
                                ? chiefJusticeQuery.data?.some(
                                    cj =>
                                      cj.GeoAreaName === d.GeoAreaName &&
                                      cj.sex_chief_justice === 'FEMALE',
                                  )
                                : true,
                            )
                            .map(d => d.GeoAreaName)
                        : undefined
                    }
                    orientation='horizontal'
                    graphTitle={
                      <div className='flex gap-2 items-center'>
                        <P size='base' marginBottom='none'>
                          {indicator.label}
                          <span className='px-3 py-1 rounded-[4px] bg-primary-gray-200 text-primary-gray-600'>
                            {courtType.label}
                          </span>
                        </P>
                      </div>
                    }
                    height={
                      dataQuery.data.latestData.filter(
                        d =>
                          d.court === courtType.value &&
                          (region ? d.Region === region : true) &&
                          ((countries || []).length > 0
                            ? (countries || []).includes(d.GeoAreaName)
                            : true),
                      ).length * 40
                    }
                    leftMargin={100}
                    suffix='%'
                    maxValue={100}
                    styles={{ tooltip: { padding: 0 } }}
                    tooltip={d => {
                      return (
                        <div className='w-[280px] bg-primary-white'>
                          <div className='font-bold p-2 bg-primary-gray-300 uppercase text-xs'>
                            {d.data.GeoAreaName}
                          </div>
                          <Spacer size='base' />
                          <div className='flex gap-4 justify-between p-2'>
                            <P marginBottom='none' size='sm'>
                              {indicator.label} - {courtType.label} (
                              {d.data.TimePeriod})
                            </P>
                            <P
                              marginBottom='none'
                              size='sm'
                              className='font-bold'
                            >
                              {numberFormattingFunction(
                                d.data[indicator.value],
                                'NA',
                                1,
                                undefined,
                                '%',
                              )}
                            </P>
                          </div>
                          <div className='p-2'>
                            <SimpleLineChart
                              height={150}
                              backgroundColor={false}
                              data={transformDataForGraph(
                                dataQuery.data.completeData.filter(
                                  el =>
                                    el.court === courtType.value &&
                                    el.GeoAreaName === d.data.GeoAreaName,
                                ),
                                'lineChart',
                                [
                                  {
                                    chartConfigId: 'date',
                                    columnId: 'TimePeriod',
                                  },
                                  {
                                    chartConfigId: 'y',
                                    columnId: indicator.value,
                                  },
                                ],
                              )}
                              maxValue={100}
                              noOfXTicks={2}
                              noOfYTicks={2}
                              lineColor='var(--gray-600)'
                            />
                          </div>
                        </div>
                      );
                    }}
                    graphDownload
                    bottomMargin={0}
                    truncateBy={20}
                    sortData='desc'
                    backgroundColor={false}
                    showTicks={false}
                    colors='#296DDF'
                    animate={{
                      duration: 0.5,
                      once: true,
                      amount: 0,
                    }}
                  />
                )}
                {tab === 'trends' && (
                  <div className='flex flex-col gap-4 h-full'>
                    <div className='flex gap-2 items-center'>
                      <P size='base' marginBottom='none'>
                        {indicator.label} over time
                        <span className='px-3 py-1 rounded-[4px] bg-primary-gray-200 text-primary-gray-600'>
                          {courtType.label}
                        </span>
                      </P>
                    </div>
                    <div>
                      <P size='xs' marginBottom='2xs'>
                        Select country(ies)
                      </P>
                      <DropdownSelect
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(d: any) =>
                          updateCountriesForTrendLines(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            d.map((el: any) => el.value),
                          )
                        }
                        value={countriesForTrendLines?.map(d => ({
                          value: d,
                          label: d,
                        }))}
                        options={[
                          ...new Set(
                            dataQuery.data.latestData.map(d => d.GeoAreaName),
                          ),
                        ].map(d => ({
                          label: d,
                          value: d,
                        }))}
                        size='sm'
                        variant='light'
                        isClearable
                        isMulti
                        isSearchable
                      />
                    </div>
                    <MultiLineAltChart
                      graphTitle={
                        <div className='flex gap-2 items-center'>
                          <P size='base' marginBottom='none'>
                            Trend over time for {indicator.label}
                          </P>
                          <span className='px-3 py-1 rounded-[4px] bg-primary-gray-200 text-primary-gray-600'>
                            {courtType.label}
                          </span>
                        </div>
                      }
                      data={transformDataForGraph(
                        dataQuery.data.completeData.filter(
                          d =>
                            d.court === courtType.value &&
                            d.TimePeriod >= 2015 &&
                            (region ? d.Region === region : true) &&
                            ((countriesForTrendLines || []).length > 0
                              ? (countriesForTrendLines || []).includes(
                                  d.GeoAreaName,
                                )
                              : true),
                        ),
                        'multiLineAltChart',
                        [
                          {
                            chartConfigId: 'label',
                            columnId: 'GeoAreaName',
                          },
                          {
                            chartConfigId: 'y',
                            columnId: indicator.value,
                          },
                          {
                            chartConfigId: 'date',
                            columnId: 'TimePeriod',
                          },
                        ],
                      )}
                      animate
                      suffix='%'
                      graphDownload
                      backgroundColor={false}
                      colors={['#296DDF']}
                      showDots
                      highlightedLines={
                        countries?.length !== 0 ? countries : undefined
                      }
                    />
                  </div>
                )}
                {tab === 'disaggregations' && (
                  <DumbbellChart
                    graphDownload
                    data={transformDataForGraph(
                      dataQuery.data.latestData.filter(
                        d =>
                          d.court === courtType.value &&
                          (region ? d.Region === region : true) &&
                          ((countries || []).length > 0
                            ? (countries || []).includes(d.GeoAreaName)
                            : true),
                      ),
                      'dumbbellChart',
                      [
                        {
                          chartConfigId: 'label',
                          columnId: 'GeoAreaName',
                        },
                        {
                          chartConfigId: 'x',
                          columnId:
                            disaggregationType === 'gender'
                              ? ['malePercentage', 'femalePercentage']
                              : [
                                  'age_under_35Percentage',
                                  'between_35_44Percentage',
                                  'between_45_54Percentage',
                                  'between_55_64Percentage',
                                  'above_65Percentage',
                                ],
                        },
                      ],
                    )}
                    leftMargin={100}
                    maxBarThickness={40}
                    truncateBy={20}
                    suffix='%'
                    highlightedDataPoints={
                      filterByWomenChiefJustice
                        ? dataQuery.data?.latestData
                            .filter(d =>
                              filterByWomenChiefJustice
                                ? chiefJusticeQuery.data?.some(
                                    cj =>
                                      cj.GeoAreaName === d.GeoAreaName &&
                                      cj.sex_chief_justice === 'FEMALE',
                                  )
                                : true,
                            )
                            .map(d => d.GeoAreaName)
                        : undefined
                    }
                    styles={{ tooltip: { padding: 0 } }}
                    tooltip={d => {
                      const { labels, colors, showNA } =
                        DISAGGREGATION_CONFIG[
                          disaggregationType as 'gender' | 'age'
                        ];

                      return (
                        <div className='w-[280px] bg-primary-white'>
                          <div className='font-bold p-2 bg-primary-gray-300 uppercase text-xs'>
                            {d.data.GeoAreaName}
                          </div>

                          <Spacer size='base' />

                          <P marginBottom='none' size='sm' className='p-2'>
                            Disaggregated proportion of judges by{' '}
                            {disaggregationType} ({d.data.TimePeriod})
                          </P>

                          {labels.map((label, index: number) => {
                            const value = d.x?.[index];

                            if (!showNA && value == null) return null;

                            return (
                              <div
                                key={label}
                                className='flex items-center gap-4 justify-between p-2'
                              >
                                <div className='flex items-center gap-2'>
                                  <ColorDot color={colors[index]} />
                                  <P marginBottom='none' size='sm'>
                                    {label}
                                  </P>
                                </div>

                                <P
                                  marginBottom='none'
                                  size='sm'
                                  className='font-bold'
                                >
                                  {numberFormattingFunction(
                                    value,
                                    'NA',
                                    1,
                                    undefined,
                                    '%',
                                  )}
                                </P>
                              </div>
                            );
                          })}

                          <div className='p-2' />
                        </div>
                      );
                    }}
                    graphTitle={
                      <div className='flex gap-2 items-center'>
                        <P size='base' marginBottom='none'>
                          Disaggregated proportion of judges by{' '}
                          {disaggregationType}
                        </P>
                        <span className='px-3 py-1 rounded-[4px] bg-primary-gray-200 text-primary-gray-600'>
                          {courtType.label}
                        </span>
                      </div>
                    }
                    height={
                      dataQuery.data.latestData.filter(
                        d =>
                          d.court === courtType.value &&
                          (region ? d.Region === region : true) &&
                          ((countries || []).length > 0
                            ? (countries || []).includes(d.GeoAreaName)
                            : true),
                      ).length *
                        40 +
                      32
                    }
                    backgroundColor={false}
                    animate={{
                      duration: 0.5,
                      once: true,
                      amount: 0,
                    }}
                    colorDomain={
                      disaggregationType === 'gender'
                        ? ['Men', 'Women']
                        : [
                            'Age under 35',
                            'Age 35-44',
                            'Age 45-54',
                            'Age 55-64',
                            'Age 65+',
                          ]
                    }
                    colors={[
                      '#296DDF',
                      '#04BAAB',
                      '#934DB0',
                      '#F96445',
                      '#c4c4c4',
                    ]}
                    connectorStrokeWidth={1}
                    orientation='horizontal'
                    showValues={false}
                    radius={5}
                    maxValue={100}
                  />
                )}
              </div>
            </div>
          </VisualizationWidgetBodyContent>
        </VisualizationWidgetBody>
      </VisualizationWidget>
    </>
  );
}

export default DataExplorerWidget;
