import { createRoute } from '@tanstack/react-router';
import type { AnyRootRoute } from '@tanstack/react-router';
import { H2 } from '@undp/design-system-react/Typography';
import { Spacer } from '@undp/design-system-react/Spacer';
import {
  Card,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from '@undp/design-system-react/Card';
import { Button } from '@undp/design-system-react/Button';

const resources = [
  {
    title: 'UNDP women in justice in Africa',
    image: './imgs/publications/01.webp',
    url: 'https://www.undp.org/sites/g/files/zskgke326/files/2024-09/undp-unwomen-women-in-justice-in-africa.pdf',
  },
  {
    title: 'UNDP Gender and Judicial Excellence Report 2022',
    image: './imgs/publications/02.webp',
    url: 'https://www.undp.org/sites/g/files/zskgke326/files/2022-10/UNDP-Gender-and-Judicial-Excellence-2022.pdf',
  },
  {
    title: 'Gender Justice Platform Annual Report 2024',
    image: './imgs/publications/03.webp',
    url: 'https://www.undp.org/publications/gender-justice-platform-annual-report-2024',
  },
];

export function Resources() {
  return (
    <div className='page-container px-4 sm:px-24 my-16'>
      <Spacer size='7xl' />
      <H2 className='font-heading uppercase' marginBottom='none'>
        Resources
      </H2>
      <Spacer size='4xl' />
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
        {resources.map((resource, index) => (
          <Card
            key={index}
            backgroundColor='gray'
            size='full'
            variant='with-image'
            className=' border-none hover:bg-primary-gray-300'
          >
            <CardHeader>
              <CardImage className='h-fit' src={resource.image} />
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardFooter>
              <a href={resource.url} target='_blank' rel='noopener noreferrer'>
                <Button
                  padding='none'
                  variant='link'
                  className='cursor-pointer'
                >
                  Read more
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Spacer size='7xl' />
    </div>
  );
}
export default function createResourcesRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/resources',
    component: Resources,
    getParentRoute: () => parentRoute,
  });
}
