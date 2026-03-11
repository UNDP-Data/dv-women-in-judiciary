import { SingleGraphDashboard } from '@undp/data-viz/SingleGraphDashboard';
import { P } from '@undp/design-system-react/Typography';
import { VizCarousel } from '@undp/design-system-react/VizCarousel';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';

export default function Slider() {
  return (
    <div className='pt-6'>
      <VizCarousel
        slideNo
        autoScroll
        styles={{
          progressBar: {
            display: 'none',
          },
          progressBarBg: {
            display: 'none',
          },
        }}
        slides={[
          {
            content: (
              <div className='flex flex-col'>
                <P className='font-bold text-[24px]!'>
                  Globally, women remain underrepresented in the judiciary with
                  significant regional variation.
                </P>
                <P>
                  Globally, current women representation in the judiciary stands
                  at 0.88 falling short of reaching parity of 1. This gap is
                  especially pronounced in some regions of the world. Regions
                  such as Central, Southern and Western Asia and Northern Africa
                  and Oceania have very low representation of women. In
                  contrast, Europe and North America have achieved parity, or
                  even a slight overrepresentation.
                </P>
              </div>
            ),
            viz: (
              <div className='w-full h-full bg-primary-gray-100 min-h-[500px]'>
                <SingleGraphDashboard
                  dataSettings={{
                    dataURL: './data/slider/slide-01.csv',
                  }}
                  graphType='barChart'
                  graphDataConfiguration={[
                    { columnId: 'RegionName', chartConfigId: 'label' },
                    { columnId: 'avarage_value', chartConfigId: 'size' },
                  ]}
                  graphSettings={{
                    graphTitle:
                      'Ratio of women’s representation in the judiciary relative to their share of the working age population, by region (2024 or latest data available)',
                    orientation: 'horizontal',
                    colors: ['#04BAAB'],
                    animate: true,
                    refValues: [
                      {
                        value: 1,
                        text: 'Gender parity',
                        color: '#000',
                      },
                    ],
                    showTicks: false,
                    leftMargin: 220,
                    footNote: (
                      <div>
                        <P
                          size='sm'
                          marginBottom='xs'
                          className='text-primary-gray-550'
                        >
                          Source: UNDP
                        </P>
                        <TooltipProvider>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <P
                                size='sm'
                                marginBottom='none'
                                className='text-primary-gray-550 border-b border-dashed w-fit border-accent-dark-red border-b-2'
                              >
                                Notes
                              </P>
                            </TooltipTrigger>
                            <TooltipContent>
                              <P
                                size='sm'
                                className='max-w-[500px]'
                                marginBottom='none'
                              >
                                Representation in the judiciary is based on the
                                ratio between the share of a specific population
                                group in the judiciary and the share of the same
                                group in the population. A value of 1 indicates
                                parity, while a value under 1 indicates
                                underrepresentation and over 1 indicates
                                overrepresentation. Estimates are derived based
                                on 131 countries for the judiciary using the
                                latest available data in the period 2015-2025.
                                Regional estimates are based on the following
                                number of countries respectively: Northern
                                America and Europe (45), Latin America and the
                                Caribbean (19), Eastern Asia and South-Eastern
                                Asia (6), Sub-Saharan Africa (24), Oceania,
                                Australia and New Zealand (10), Western Asia and
                                Northern Africa (20), Central Asia and Southern
                                Asia (7).
                              </P>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ),
                    padding: '1.5rem',
                  }}
                />
              </div>
            ),
          },
          {
            content: (
              <div className='flex flex-col'>
                <P className='font-bold text-[24px]!'>
                  Gender parity is primarily achieved in high-income countries
                  while middle and low-income countries continue to face unequal
                  representation.
                </P>
                <P>
                  Available data show that high-income countries have largely
                  achieved gender balance in the judiciary, with an overall
                  representation ratio of 1.07. In contrast, low and
                  lower-middle-income countries record the lowest levels of
                  women’s representation on the bench. At the same time,
                  significant data gaps persist in low-income countries,
                  limiting a full and accurate understanding of gender
                  disparities in judicial systems worldwide.
                </P>
              </div>
            ),
            viz: (
              <div className='w-full h-full bg-primary-gray-100 min-h-[500px]'>
                <SingleGraphDashboard
                  dataSettings={{
                    dataURL: './data/slider/slide-02.csv',
                  }}
                  graphType='barChart'
                  graphDataConfiguration={[
                    { columnId: 'income_group', chartConfigId: 'label' },
                    { columnId: 'average_value', chartConfigId: 'size' },
                  ]}
                  graphSettings={{
                    graphTitle:
                      'Ratio of women’s representation in the judiciary relative to their share of the working age population, by income (2024 or latest data available)',
                    orientation: 'horizontal',
                    colors: ['#F96445'],
                    animate: true,
                    refValues: [
                      {
                        value: 1,
                        text: 'Gender parity',
                        color: '#000',
                      },
                    ],
                    showTicks: false,
                    leftMargin: 120,
                    footNote: (
                      <div>
                        <P
                          size='sm'
                          marginBottom='xs'
                          className='text-primary-gray-550'
                        >
                          Source: UNDP
                        </P>
                        <TooltipProvider>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <P
                                size='sm'
                                marginBottom='none'
                                className='text-primary-gray-550 border-b border-dashed w-fit border-accent-dark-red border-b-2'
                              >
                                Notes
                              </P>
                            </TooltipTrigger>
                            <TooltipContent>
                              <P
                                size='sm'
                                marginBottom='none'
                                className='max-w-[500px]'
                              >
                                Representation in the judiciary is based on the
                                ratio between the share of a specific population
                                group in the judiciary and the share of the same
                                group in the population. A value of 1 indicates
                                parity, while a value under 1 indicates
                                underrepresentation and over 1 indicates
                                overrepresentation. Estimates are derived based
                                on 131 countries for the judiciary using the
                                latest available data in the period 2015-2025.
                                Estimates by country’s income level are based on
                                the following number of countries respectively:
                                High income (61), Upper middle income (34),
                                Lower middle income (25), Low income (11).
                              </P>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ),
                    padding: '1.5rem',
                  }}
                />
              </div>
            ),
          },
          {
            content: (
              <div className='flex flex-col'>
                <P className='font-bold text-[24px]!'>
                  Women remain disproportionately concentrated in lower-level
                  courts within the judiciary.
                </P>
                <P>
                  Disaggregated data by court level provide critical insight
                  into the career progression barriers and leadership
                  bottlenecks women often face. Even in high-income countries,
                  women continue to be significantly underrepresented in
                  constitutional and supreme courts—pointing to the persistence
                  of a glass ceiling that limits women’s advancement to the
                  highest judicial positions.
                </P>
              </div>
            ),
            viz: (
              <div className='w-full h-full bg-primary-gray-100 min-h-[500px]'>
                <SingleGraphDashboard
                  dataSettings={{
                    dataURL: './data/slider/slide-03.csv',
                  }}
                  graphType='barChart'
                  graphDataConfiguration={[
                    { columnId: 'category', chartConfigId: 'label' },
                    { columnId: 'average_value', chartConfigId: 'size' },
                  ]}
                  graphSettings={{
                    graphTitle:
                      'Ratio of women’s representation in the judiciary relative to their share of the working age population, by level of court (2025 or latest data available)',
                    orientation: 'horizontal',
                    colors: ['#296DDF'],
                    animate: true,
                    refValues: [
                      {
                        value: 1,
                        text: 'Gender parity',
                        color: '#000',
                      },
                    ],
                    showTicks: false,
                    leftMargin: 180,
                    footNote: (
                      <div>
                        <P
                          size='sm'
                          marginBottom='xs'
                          className='text-primary-gray-550'
                        >
                          Source: UNDP
                        </P>
                        <TooltipProvider>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <P
                                size='sm'
                                marginBottom='none'
                                className='text-primary-gray-550 border-b border-dashed w-fit border-accent-dark-red border-b-2'
                              >
                                Notes
                              </P>
                            </TooltipTrigger>
                            <TooltipContent>
                              <P
                                size='sm'
                                marginBottom='none'
                                className='max-w-[500px]'
                              >
                                Representation in the judiciary is based on the
                                ratio between the share of a specific population
                                group in the judiciary and the share of the same
                                group in the population. A value of 1 indicates
                                parity, while a value under 1 indicates
                                underrepresentation and over 1 indicates
                                overrepresentation. Global estimates are based
                                on 117 countries for constitutional/Supreme
                                courts, 96 countries for high-level courts and
                                83 countries for low-level courts using the
                                latest available data in the period 2015-2025.
                                The majority of data are for high and
                                upper-middle income countries.
                              </P>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ),
                    padding: '1.5rem',
                  }}
                />
              </div>
            ),
          },
        ]}
        vizWidth='base'
      />
    </div>
  );
}
