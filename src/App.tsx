/* eslint-disable no-irregular-whitespace */
import { Link } from '@tanstack/react-router';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@undp/design-system-react/Card';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, H2, H5, P } from '@undp/design-system-react/Typography';
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
  },
  {
    id: 3,
    tag: 'Regional',
    title: 'Country Insights',
    description:
      'Explore trends and patterns on judicial gender representation across countries.',
    link: 'View insights',
    route: '/country-insights',
  },
  {
    id: 4,
    tag: 'Resources',
    title: 'Resources',
    description:
      'Access reports, research papers, and additional materials about women in judiciary systems globally.',
    link: 'Access resources',
    route: '/resources',
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
              Women in Judiciary
            </H1>
            <Spacer size='2xl' />
            <H5
              marginBottom='none'
              className='text-primary-gray-700 leading-[1.4] w-[100%] sm:w-[80%]'
            >
              Explore comprehensive data on gender representation in judicial
              positions worldwide.
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
      <div className='py-20 px-4 sm:px-24 mx-auto max-w-[1980px]'>
        <div className='gap-6'>
          <H2>
            Women remain underrepresented in top decision-making positions in
            the judiciary
          </H2>
          <P marginBottom='none' className='leading-[1.5]  text-[24px]!'>
            Globally, women remain underrepresented across the public service
            and the judiciary, with representation ratios at 0.80 and 0.90,
            respectively – both falling short of achieving parity. This gap is
            especially pronounced in some regions of the world. In regions such
            as Central Asia and Southern Asia along with Western Asia and
            Northern Africa, women are significantly underrepresented , while
            Europe and North America exhibit a slight overrepresentation.
            Furthermore, additional data reveal that women remain significantly
            underrepresented in senior government positions and higher-level
            judiciary roles , pointing to the existence of a "glass ceiling".
          </P>
        </div>
      </div>
      <div className='bg-primary-gray-200'>
        <div className='flex flex-col py-20 px-4 sm:px-24 mx-auto max-w-[1980px]'>
          <H2>Key Findings</H2>
          <Slider />
        </div>
      </div>
      <div className='py-20 px-4 sm:px-24 min-h-[400px] mx-auto max-w-[1980px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:!grid-cols-4 gap-6'>
          <H2>What You Can Explore</H2>
          {cards.map(card => (
            <div key={card.id} className='flex justify-between items-stretch'>
              <Link to={card.route}>
                <Card
                  size='full'
                  variant='without-image'
                  className='bg-primary-gray-200 border-none h-full pt-4 min-h-[300px] relative overflow-hidden'
                >
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription className='mb-16'>
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
    </div>
  );
}

export default App;
