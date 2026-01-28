import { Link } from '@tanstack/react-router';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@undp/design-system-react/Card';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, H2, H5, H6, P } from '@undp/design-system-react/Typography';
import { ChevronDown } from 'lucide-react';
import { Button } from '@undp/design-system-react/Button';

import Slider from './components/Slider';
import AnimatedGrid from './components/AnimatedGrid';

const cards = [
  {
    id: 2,
    tag: 'Analytics',
    title: 'Worldwide Data',
    description:
      'Dive deep into data on gender representation in the judiciary worldwide.',
    link: 'Explore data',
    route: '/data-explorer',
    icon: '/imgs/icon-01.svg',
  },
  {
    id: 3,
    tag: 'Regional',
    title: 'Country Insights',
    description:
      'Explore trends and patterns on judicial gender representation across countries.',
    link: 'View insights',
    route: '/country-insights',
    icon: '/imgs/icon-02.svg',
  },
  {
    id: 4,
    tag: 'Resources',
    title: 'Resources',
    description:
      'Access reports, research papers, and additional materials about women in judiciary systems globally.',
    link: 'Access resources',
    route: '/resources',
    icon: '/imgs/icon-03.svg',
  },
];

function App() {
  return (
    <div>
      <div className='relative bg-primary-gray-200'>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.7] z-10
             bg-[url('imgs/texture.png')] bg-repeat mix-blend-overlay"
          style={{
            backgroundSize: '128px 128px',
          }}
        />
        <div className='min-h-[700px] flex flex-col gap-10 sm:flex-row justify-center items-center px-4 sm:px-24 mx-auto max-w-[1980px]'>
          <div className='w-[100%] sm:w-[50%]'>
            <H1
              marginBottom='none'
              className='font-heading text-[2rem] sm:text-[4rem]! leading-[1.1] text-primary-gray-700'
            >
              Women's Representation in Judiciary
            </H1>
            <Spacer size='2xl' />
            <H5
              marginBottom='none'
              className='text-primary-gray-700 leading-[1.4] w-[100%] sm:w-[80%]'
            >
              Explore data on women's representation in the judiciary
            </H5>
            <Spacer size='4xl' />
            <div className='rounded-full bg-[var(--gray-700)] p-2 w-fit'>
              <ChevronDown stroke='white' />
            </div>
          </div>
          <div className='w-[100%] sm:w-[50%]'>
            <AnimatedGrid />
          </div>
        </div>
      </div>
      <div className='relative h-fit sm:h-[700px] bg-primary-white flex items-center px-4 sm:px-[288px] pb-60 sm:pb-20 pt-20 mx-auto max-w-[1980px]'>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.7] z-10
             bg-[url('imgs/texture.png')] bg-repeat mix-blend-overlay"
          style={{
            backgroundSize: '128px 128px',
          }}
        />
        <img
          className='absolute top-10 left-0 hidden sm:block'
          alt='abstract shapes'
          src='/imgs/shape-01.svg'
        />
        <img
          className='absolute bottom-0 right-[0]'
          alt='abstract shapes'
          src='/imgs/shape-02.svg'
        />
        <div className='gap-6 z-10'>
          <H2>
            Women remain underrepresented in top decision-making positions in
            the judiciary.
          </H2>
          <P size='base-responsive' marginBottom='none'>
            Globally, women remain underrepresented in the judiciary, with
            representation ratio of 0.90, falling short of achieving parity of
            1. This gap is especially pronounced in some regions of the world.
            In regions such as Central Asia and Southern Asia along with Western
            Asia and Northern Africa and Oceania, women are significantly
            underrepresented, while Europe and North America exhibit a slight
            over-representation. Furthermore, additional data reveal that women
            remain significantly underrepresented in higher-level judiciary
            roles pointing to the existence of a "glass ceiling".
          </P>
        </div>
      </div>
      <div className='relative flex flex-col justify-between gap-8 box-border pt-8 pb-[220px] sm:py-16 bg-[var(--gray-200)] min-w-[240px] basis-[calc(50%-12px)] grow'>
        <div
          className='absolute inset-0 pointer-events-none opacity-[0.7] z-10 bg-[url("imgs/texture.png")] bg-repeat mix-blend-overlay'
          style={{
            backgroundSize: '128px 128px',
          }}
        />
        <img
          className='absolute bottom-0 right-0'
          alt='abstract shapes'
          src='/imgs/downloadCardPattern.svg'
        />
        <div className='py-20 px-4 sm:px-24 mx-auto max-w-[1980px]'>
          <H2 className='font-center'>Why Representation Matters?</H2>
          <P size='base-responsive' marginBottom='none'>
            Who sits on the bench matters. A judiciary that includes different
            backgrounds and experiences helps ensure that laws are applied more
            evenly and that justice works for everyone - not just a few. When
            judges reflect the diversity of the society they serve, people are
            more likely to trust the courts and believe that decisions are fair.
            In this way, representation strengthens confidence in the justice
            system and supports equal treatment before the law.
          </P>
        </div>
      </div>
      <div className='flex flex-col py-20 px-4 sm:px-24 mx-auto max-w-[1980px]'>
        <H2>Key Findings</H2>
        <Slider />
      </div>
      <div className='bg-primary-gray-200'>
        <div className='py-20 px-4 sm:px-24 min-h-[400px] mx-auto max-w-[1980px]'>
          <div className='gap-6 z-10'>
            <H2>What can we do?</H2>
            <P size='base-responsive' marginBottom='none'>
              Strengthening women’s representation in the judiciary starts with
              better evidence and better use of it. Data can illuminate where
              gaps exist, why they persist, and which interventions work. To
              move forward:
            </P>
            <div className='grid grid-cols-1 lg:!grid-cols-3 gap-6 mt-8'>
              <Card
                size='full'
                variant='without-image'
                className='relative bg-primary-white border-none h-full pt-4 min-h-[300px] relative overflow-hidden'
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.7] z-10 bg-[url('imgs/texture.png')] bg-repeat mix-blend-overlay"
                  style={{
                    backgroundSize: '128px 128px',
                  }}
                />
                <CardHeader>
                  <CardTitle>
                    <strong>Turn existing data into actionable insight</strong>
                  </CardTitle>
                  <CardDescription className='mb-8'>
                    Many countries already collect judicial data, but it often
                    remains unused or fragmented. Systematically analysing what
                    exists can quickly uncover structural barriers and
                    opportunities for reform.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card
                size='full'
                variant='without-image'
                className='relative bg-primary-white border-none h-full pt-4 min-h-[300px] relative overflow-hidden'
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.7] z-10 bg-[url('imgs/texture.png')] bg-repeat mix-blend-overlay"
                  style={{
                    backgroundSize: '128px 128px',
                  }}
                />
                <CardHeader>
                  <CardTitle>
                    <strong>Expand and standardize disaggregated data</strong>
                  </CardTitle>
                  <CardDescription className='mb-8'>
                    Data broken down by court level, reveals where women are
                    missing. Without this granularity, patterns of exclusion
                    remain invisible.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card
                size='full'
                variant='without-image'
                className='relative bg-primary-white border-none h-full pt-4 min-h-[300px] relative overflow-hidden'
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.7] z-10 bg-[url('imgs/texture.png')] bg-repeat mix-blend-overlay"
                  style={{
                    backgroundSize: '128px 128px',
                  }}
                />
                <CardHeader>
                  <CardTitle>
                    <strong>Data should guide interventions</strong>
                  </CardTitle>
                  <CardDescription className='mb-8'>
                    Evidence‑driven policies can help dismantle the barriers
                    that limit women’s advancement to top judicial roles.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className='py-20 px-4 sm:px-24 min-h-[400px] mx-auto max-w-[1980px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:!grid-cols-4 gap-6'>
          <H2>What You Can Explore</H2>
          {cards.map(card => (
            <div key={card.id} className='flex justify-between items-stretch'>
              <Link to={card.route}>
                <Card
                  size='full'
                  variant='without-image'
                  className='relative bg-primary-gray-200 border-none h-full pt-4 min-h-[300px] relative overflow-hidden'
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.7] z-10 bg-[url('imgs/texture.png')] bg-repeat mix-blend-overlay"
                    style={{
                      backgroundSize: '128px 128px',
                    }}
                  />
                  <CardHeader>
                    <img
                      src={card.icon}
                      alt=''
                      className='w-20 h-20 mx-6 mt-2'
                      aria-hidden
                    />
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription className='mb-8'>
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button padding='none' variant='link'>
                      Explore
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-primary-gray-200'>
        <div className='py-20 px-4 sm:px-24 mx-auto max-w-[1980px]'>
          <div className='flex flex-wrap'>
            <div className='basis-1/3'>
              <H6>In collaboration with</H6>
              <img
                src='/imgs/logos/logo-01.webp'
                alt='un women logo'
                style={{ height: 115 }}
              />
            </div>
            <div className='basis-2/3'>
              <H6>With the support from</H6>
              <div className='flex flex-wrap gap-12'>
                <img
                  src='/imgs/logos/logo-02.webp'
                  alt='german cooperation logo'
                  style={{ height: 115 }}
                />
                <img
                  src='/imgs/logos/logo-03.webp'
                  alt='kingdom of netherlands logo'
                  style={{ height: 115 }}
                />
                <img
                  src='/imgs/logos/logo-04.webp'
                  alt='norway logo'
                  style={{ height: 115 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
