import { createRoute } from '@tanstack/react-router';
import type { AnyRootRoute } from '@tanstack/react-router';
import { H2 } from '@undp/design-system-react/Typography';
import { Spacer } from '@undp/design-system-react/Spacer';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from '@undp/design-system-react/Card';
import { Button } from '@undp/design-system-react/Button';

export function Resources() {
  return (
    <div className='page-container px-4 sm:px-24 my-16'>
      <Spacer size='7xl' />
      <H2 className='font-heading uppercase' marginBottom='none'>
        Resources
      </H2>
      <Spacer size='4xl' />
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
        {' '}
        <Card
          backgroundColor='gray'
          size='full'
          variant='with-image'
          className=' border-none hover:bg-primary-gray-300'
        >
          <CardHeader>
            <CardImage className='h-fit' src='./imgs/publication.webp' />
            <CardTitle>Card title</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              blandit augue eu sagittis facilisis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button padding='none' variant='link'>
              Read more
            </Button>
          </CardFooter>
        </Card>
        <Card
          backgroundColor='gray'
          size='full'
          variant='with-image'
          className=' border-none hover:bg-primary-gray-300'
        >
          <CardHeader>
            <CardImage className='h-fit' src='./imgs/publication.webp' />
            <CardTitle>Card title</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              blandit augue eu sagittis facilisis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button padding='none' variant='link'>
              Read more
            </Button>
          </CardFooter>
        </Card>
        <Card
          backgroundColor='gray'
          size='full'
          variant='with-image'
          className=' border-none hover:bg-primary-gray-300'
        >
          <CardHeader>
            <CardImage className='h-fit' src='./imgs/publication.webp' />
            <CardTitle>Card title</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              blandit augue eu sagittis facilisis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button padding='none' variant='link'>
              Read more
            </Button>
          </CardFooter>
        </Card>
        <Card
          backgroundColor='gray'
          size='full'
          variant='with-image'
          className=' border-none hover:bg-primary-gray-300'
        >
          <CardHeader>
            <CardImage className='h-fit' src='./imgs/publication.webp' />

            <CardTitle>Card title</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              blandit augue eu sagittis facilisis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button padding='none' variant='link'>
              Read more
            </Button>
          </CardFooter>
        </Card>
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
