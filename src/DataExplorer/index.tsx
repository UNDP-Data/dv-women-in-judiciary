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
import { Activity, useEffect, useMemo } from 'react';
import { DropdownSelect } from '@undp/design-system-react/DropdownSelect';
import { P } from '@undp/design-system-react/Typography';
import { Spacer } from '@undp/design-system-react/Spacer';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { ChoroplethMap } from '@undp/data-viz/ChoroplethMap';
import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { MultiLineAltChart } from '@undp/data-viz/MultiLineAltChart';
import { DumbbellChart } from '@undp/data-viz/DumbbellChart';
import { SegmentedControl } from '@undp/design-system-react/SegmentedControl';

import { getData } from '@/QueryFn/getData';
import {
  useCountries,
  useCourtType,
  useDataExplorerActions,
  useDisaggregationType,
  useIndicator,
  useRegion,
  useTab,
  useYear,
} from '@/stores/dataExplorerStore';
import { INDICATORS_OPTIONS } from '@/constants';

function useData() {
  return useQuery({
    queryKey: ['get-data'],
    queryFn: getData,
  });
}
function DataExplorer() {
  const { isLoading, isError, data } = useData();
  const tab = useTab();
  const year = useYear();
  const indicator = useIndicator();
  const courtType = useCourtType();
  const region = useRegion();
  const countries = useCountries();
  const disaggregationType = useDisaggregationType();
  const {
    updateYear,
    updateTab,
    updateCourtType,
    updateRegion,
    updateCountries,
    updateIndicator,
    updateDisaggregationType,
  } = useDataExplorerActions();
  const latestYear = useMemo(() => {
    if (!data) return;
    return Math.max(...data.map(d => d.TimePeriod));
  }, [data]);

  useEffect(() => {
    updateYear(latestYear || 2025);
  }, [latestYear, updateYear]);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error</div>;
  if (!data) return <div>No data</div>;
  return (
    <>
      <VisualizationWidget>
        <VisualizationWidgetHeader
          defaultValue='map'
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
            Ranks
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
        <VisualizationWidgetBody>
          <VisualizationWidgetBodySidebar>
            <div className='w-full'>
              <Activity mode={tab === 'disaggregations' ? 'visible' : 'hidden'}>
                <P size='xs' marginBottom='2xs'>
                  Disaggregated proportion of judges by
                </P>
                <SegmentedControl
                  onValueChange={d =>
                    updateDisaggregationType(d as 'sex' | 'age')
                  }
                  value={disaggregationType}
                  options={[
                    {
                      label: 'Gender',
                      value: 'sex',
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
              <Activity mode={tab === 'disaggregations' ? 'hidden' : 'visible'}>
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
              <Activity mode={tab === 'trends' ? 'hidden' : 'visible'}>
                <Spacer size='xl' />
                <P size='xs' marginBottom='2xs'>
                  Select year
                </P>
                <DropdownSelect
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(d: any) => updateYear(d.value)}
                  value={{ label: year.toString(), value: year }}
                  options={[...new Set(data.map(d => d.TimePeriod))]
                    .sort((a, b) => b - a)
                    .map(d => ({
                      label: d.toString(),
                      value: d,
                    }))}
                  size='sm'
                  variant='light'
                  isDisabled={tab === 'trends'}
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
              <Spacer size='xl' />
              <P size='xs' marginBottom='2xs'>
                Filter by region
              </P>
              <DropdownSelect
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(d: any) => updateRegion(d?.value)}
                value={region ? { value: region, label: region } : undefined}
                options={[...new Set(data.map(d => d.Region))].map(d => ({
                  label: d,
                  value: d,
                }))}
                size='sm'
                variant='light'
                isClearable
              />
              <Activity mode={tab === 'map' ? 'hidden' : 'visible'}>
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
                  options={[...new Set(data.map(d => d.GeoAreaName))].map(
                    d => ({
                      label: d,
                      value: d,
                    }),
                  )}
                  size='sm'
                  variant='light'
                  isClearable
                />
              </Activity>
            </div>
          </VisualizationWidgetBodySidebar>
          <VisualizationWidgetBodyContent>
            <div className='h-[576px] w-full bg-white'>
              <div className='h-full p-4'>
                {tab === 'map' && (
                  <ChoroplethMap
                    data={transformDataForGraph(
                      data.filter(
                        d =>
                          d.TimePeriod === year && d.court === courtType.value,
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
                    footNote=''
                    backgroundColor={false}
                    highlightedIds={
                      region
                        ? data
                            .filter(d => (region ? d.Region === region : true))
                            .map(d => d.ISOalpha3)
                        : []
                    }
                  />
                )}
                {tab === 'ranks' && (
                  <SimpleBarGraph
                    data={transformDataForGraph(
                      data.filter(
                        d =>
                          d.TimePeriod === year &&
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
                    orientation='horizontal'
                    height={
                      data.filter(
                        d =>
                          d.TimePeriod === year && d.court === courtType.value,
                      ).length * 40
                    }
                    leftMargin={100}
                    bottomMargin={0}
                    truncateBy={20}
                    sortData='desc'
                    backgroundColor={false}
                    animate={{
                      duration: 0.5,
                      once: true,
                      amount: 0.1,
                    }}
                  />
                )}
                {tab === 'trends' && (
                  <MultiLineAltChart
                    data={transformDataForGraph(
                      data.filter(
                        d =>
                          d.court === courtType.value &&
                          (region ? d.Region === region : true),
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
                    backgroundColor={false}
                    showDots
                    highlightedLines={countries}
                  />
                )}
                {tab === 'disaggregations' && (
                  <DumbbellChart
                    data={transformDataForGraph(
                      data.filter(
                        d =>
                          d.TimePeriod === year && d.court === courtType.value,
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
                            disaggregationType === 'sex'
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
                    truncateBy={20}
                    height={
                      data.filter(
                        d =>
                          d.TimePeriod === year &&
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
                      amount: 0.1,
                    }}
                    colorDomain={
                      disaggregationType === 'sex'
                        ? ['Male', 'Female']
                        : [
                            'Age under 35',
                            'Age 35-44',
                            'Age 45-54',
                            'Age 55-64',
                            'Age 65+',
                          ]
                    }
                    orientation='horizontal'
                    showValues={false}
                    radius={5}
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

export default DataExplorer;
