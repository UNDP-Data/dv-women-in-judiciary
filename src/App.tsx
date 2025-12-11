import { Link } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@undp/design-system-react/Card';
import { H1, H5 } from '@undp/design-system-react/Typography';

function App() {
  const cards = [
    {
      id: 1,
      tag: 'Interactive',
      title: 'Story',
      description:
        'Discover compelling narratives about women in judicial positions across different regions and time periods.',
      link: 'Read the story',
      route: '/story',
    },
    {
      id: 2,
      tag: 'Analytics',
      title: 'Data Explorer',
      description:
        'Dive deep into comprehensive datasets and statistics on gender representation in the judiciary worldwide.',
      link: 'Explore data',
      route: '/data-explorer',
    },
    {
      id: 3,
      tag: 'Regional',
      title: 'Country Insights',
      description:
        'Compare judicial gender representation across countries and understand regional trends and patterns.',
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
  return (
    <div className='min-h-[calc(100vh-115px)] flex flex-col justify-between px-6 sm:px-16'>
      <div className='flex-1 flex flex-col justify-center min-h-[500px]'>
        <H1 className='font-heading text-[4.25rem]! text-primary-gray-700'>
          Women in Judiciary
        </H1>
        <H5 className='text-primary-gray-700'>
          Explore comprehensive data on gender representation in judicial
          positions worldwide.
        </H5>
      </div>

      <div className='pb-8'>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
          {cards.map(card => (
            <div key={card.id} className='flex justify-between'>
              <Card
                backgroundColor='transparent'
                border
                size='full'
                variant='without-image'
              >
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button padding='none' variant='link'>
                    <Link to={card.route}>{card.link}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
