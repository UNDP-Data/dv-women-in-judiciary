import { Link } from '@tanstack/react-router';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@undp/design-system-react/Card';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, H2, H4 } from '@undp/design-system-react/Typography';
import { ChevronDown } from 'lucide-react';

const cards = [
  {
    id: 2,
    tag: 'Analytics',
    title: 'Worldwide Data',
    description:
      'Dive deep into data on gender representation in the judiciary worldwide.',
    link: 'Explore data',
    route: '/data-explorer',
    glowColor: 'glow-warm',
  },
  {
    id: 3,
    tag: 'Regional',
    title: 'Country Insights',
    description:
      'Explore trends and patterns on judicial gender representation across countries.',
    link: 'View insights',
    route: '/country-insights',
    glowColor: 'glow-purple',
  },
  {
    id: 4,
    tag: 'Resources',
    title: 'Resources',
    description:
      'Access reports, research papers, and additional materials about women in judiciary systems globally.',
    link: 'Access resources',
    route: '/resources',
    glowColor: 'glow-blue',
  },
];

function App() {
  return (
    <div>
      <div className='min-h-[600px] flex flex-col justify-center bg-cover bg-center bg-no-repeat bg-[url("/imgs/hero-bg.webp")]'>
        <div className='px-6 sm:px-36 w-[70%]'>
          <H1
            marginBottom='none'
            className='font-heading text-[1.8rem] sm:text-[4.25rem]! leading-[1.1] text-primary-gray-700'
          >
            Women in Judiciary
          </H1>
          <Spacer size='2xl' />
          <H4
            marginBottom='none'
            className='text-primary-gray-700 leading-[1.4]'
          >
            Explore comprehensive data on gender representation in judicial
            positions worldwide.
          </H4>
          <Spacer size='4xl' />
          <div className='rounded-full bg-[var(--gray-700)] p-2 w-fit'>
            <ChevronDown stroke='white' />
          </div>
        </div>
      </div>
      <div className='py-16 px-4 sm:px-16 mx-auto max-w-[1980px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <H2>Key Findings</H2>
          <div className='md:col-span-2 lg:col-span-3 rounded-[8px] h-[300px] bg-primary-gray-200 w-full flex items-center justify-center text-primary-gray-500'>
            Placeholder for content
          </div>
        </div>
      </div>
      <div className='py-16 px-4 sm:px-16 min-h-[400px] mx-auto max-w-[1980px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:!grid-cols-4 gap-6'>
          <H2>What You Can Explore</H2>
          {cards.map(card => (
            <div key={card.id} className='flex justify-between items-stretch'>
              <Link to={card.route}>
                <Card
                  backgroundColor='gray'
                  size='full'
                  variant='without-image'
                  className={`rounded-[8px] border-none hover:bg-primary-gray-200 h-full pt-4 min-h-[300px] relative overflow-hidden glow-hover ${card.glowColor}`}
                >
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
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
