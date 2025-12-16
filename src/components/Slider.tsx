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
        slides={[
          {
            content: (
              <div className='flex flex-col'>
                <P className='font-bold text-[24px]!'>
                  Globally, women remain underrepresented in the judiciary.
                  Current women representation ratios stand at just 0.90,
                  falling short of reaching parity.
                </P>
                <P>
                  This gap is especially pronounced in some regions of the
                  world. Regions such as Central, Southern and Western Asia and
                  Northern Africa have very low representation of women. In
                  contrast, Europe and North America have achieved parity, or
                  even a slight overrepresentation.
                </P>
              </div>
            ),
            viz: (
              <div className='w-full h-full bg-primary-white min-h-[500px]'>
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
                      'Ratio of women’s representation in public service and the judiciary relative to their share of the working age population',
                    orientation: 'horizontal',
                    colors: ['#8D8DFF'],
                    customLayers: [
                      {
                        position: 'before',
                        layer: (
                          <svg>
                            <defs>
                              <pattern
                                id='pattern-stripe'
                                width='4'
                                height='4'
                                patternUnits='userSpaceOnUse'
                                patternTransform='rotate(45)'
                              >
                                <rect
                                  width='1'
                                  height='4'
                                  transform='translate(0,0)'
                                  fill='white'
                                />
                              </pattern>
                              <mask id='mask-stripe'>
                                <rect
                                  x='0'
                                  y='1'
                                  width='100%'
                                  height='100%'
                                  fill='url(#pattern-stripe)'
                                />
                              </mask>
                            </defs>
                          </svg>
                        ),
                      },
                      {
                        position: 'before',
                        layer: (
                          <svg>
                            <defs>
                              <pattern
                                id='pattern-stripe'
                                width='4'
                                height='4'
                                patternUnits='userSpaceOnUse'
                                patternTransform='rotate(45)'
                              >
                                <rect
                                  width='1'
                                  height='4'
                                  transform='translate(0,0)'
                                  fill='white'
                                />
                              </pattern>
                              <mask id='mask-stripe'>
                                <rect
                                  x='0'
                                  y='1'
                                  width='100%'
                                  height='100%'
                                  fill='url(#pattern-stripe)'
                                />
                              </mask>
                            </defs>
                            <rect
                              className='hbar'
                              x='0'
                              y='72.2581'
                              width='324.75'
                              height='27.09677419354839'
                            />
                          </svg>
                        ),
                      },
                    ],
                    refValues: [
                      {
                        value: 1,
                        text: 'Gender Parity',
                        color: '#000',
                      },
                    ],
                    showTicks: false,
                    leftMargin: 220,
                    sources: [
                      {
                        source: 'UNDP',
                        link: 'www.example.com',
                      },
                    ],
                    footNote: (
                      <div>
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
                                SDG indicator 16.7.1 is based on the ratio
                                between the share of a specific population group
                                in parliament (a), public service (b), and
                                judiciary (c), and the share of the same group
                                in the population. A value of 1 indicates
                                parity, while a value under 1 indicates
                                underrepresentation and over 1 indicates
                                overrepresentation. Estimates are derived based
                                on 155 countries for the public service
                                institutions and 105 countries for the judiciary
                                using the latest available data in the period
                                2015-2024. Previously published estimates were
                                based on 126 countries for public service and 78
                                countries for the judiciary. Regional estimates
                                for 16.7.1b and 16.7.1c are based on the
                                following number of countries respectively:
                                Northern America and Europe (43 and 45), Latin
                                America and the Caribbean (19 and 9), Eastern
                                Asia and South-Eastern Asia (15 and 6),
                                Sub-Saharan Africa (36 and 12), Oceania (14 and
                                10), Western Asia and Northern Africa (16 and
                                17), Central Asia and Southern Asia (12 and 7).
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
                  Furthermore, analysis by income level reveals that gender
                  parity is primarily achieved in high-income countries while
                  middle and low-income countries continue to struggle with
                  unequal representation.
                </P>
                <P>
                  This gap is especially pronounced in some regions of the
                  world. Regions such as Central, Southern and Western Asia and
                  Northern Africa have very low representation of women. In
                  contrast, Europe and North America have achieved parity, or
                  even a slight overrepresentation.
                </P>
              </div>
            ),
            viz: (
              <div className='w-full h-full bg-primary-white min-h-[500px]'>
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
                      'Ratio of women’s representation in public service and the judiciary relative to their share of the working age population',
                    orientation: 'horizontal',
                    colors: ['#F96445'],
                    refValues: [
                      {
                        value: 1,
                        text: 'Gender Parity',
                        color: '#000',
                      },
                    ],
                    showTicks: false,
                    leftMargin: 120,
                    sources: [
                      {
                        source: 'UNDP',
                        link: 'www.example.com',
                      },
                    ],
                    footNote: (
                      <div>
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
                                SDG indicator 16.7.1 is based on the ratio
                                between the share of a specific population group
                                in parliament (a), public service (b), and
                                judiciary (c), and the share of the same group
                                in the population. A value of 1 indicates
                                parity, while a value under 1 indicates
                                underrepresentation and over 1 indicates
                                overrepresentation. Estimates are derived based
                                on 155 countries for the public service
                                institutions and 105 countries for the judiciary
                                using the latest available data in the period
                                2015-2024. Previously published estimates were
                                based on 126 countries for public service and 78
                                countries for the judiciary. Data for the
                                judiciary from low-income countries are not
                                sufficient to produce an estimate. Estimates by
                                country’s income level for 16.7.1b and 16.7.1c
                                are based on the following number of countries
                                respectively: High income (53 and 55), Upper
                                middle income (39 and 301), Lower middle income
                                (40 and 19), Low income (26 and no estimate was
                                produced for the judiciary).
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
                  Women in the judiciary are disproportionately concentrated in
                  lower-level courts and remain underrepresented in senior and
                  high-level judicial positions.
                </P>
                <P>
                  Disaggregated data from select countries reveal clear vertical
                  segregation within judicial systems. This trend suggests the
                  possible presence of a persistent glass ceiling that prevents
                  career advancement for women. Addressing these disparities is
                  critical. It requires targeted, evidence-based policy
                  interventions designed to dismantle these barriers and pave
                  the way for more inclusive policies and decision making.
                </P>
              </div>
            ),
            viz: (
              <div className='w-full h-full bg-primary-white min-h-[500px]'>
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
                      'Ratio of women’s representation in public service and the judiciary relative to their share of the working age population, by level of court',
                    orientation: 'horizontal',
                    colors: ['#296DDF'],
                    refValues: [
                      {
                        value: 1,
                        text: 'Gender Parity',
                        color: '#000',
                      },
                    ],
                    showTicks: false,
                    leftMargin: 180,
                    sources: [
                      {
                        source: 'UNDP',
                      },
                    ],
                    footNote: (
                      <div>
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
                                SDG indicator 16.7.1 is based on the ratio
                                between the share of a specific population group
                                in parliament (a), public service (b), and
                                judiciary (c), and the share of the same group
                                in the population. A value of 1 indicates
                                parity, while a value under 1 indicates
                                underrepresentation and over 1 indicates
                                overrepresentation. Estimates are derived based
                                on 155 countries for the public service
                                institutions and 105 countries for the judiciary
                                using the latest available data in the period
                                2015-2024. Previously published estimates were
                                based on 126 countries for public service and 78
                                countries for the judiciary. Data for the
                                judiciary from low-income countries are not
                                sufficient to produce an estimate. Estimates by
                                country’s income level for 16.7.1b and 16.7.1c
                                are based on the following number of countries
                                respectively: High income (53 and 55), Upper
                                middle income (39 and 301), Lower middle income
                                (40 and 19), Low income (26 and no estimate was
                                produced for the judiciary).
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
