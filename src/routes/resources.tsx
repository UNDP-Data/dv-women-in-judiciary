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
    <div className='page-container px-6 sm:px-16 my-16'>
      <Spacer size='2xl' />
      <H2 className='font-heading uppercase' marginBottom='none'>
        Resources
      </H2>
      <Spacer size='4xl' />
      <div className='light undefined bg-primary-white'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {' '}
          <Card backgroundColor='gray' size='full' variant='with-image'>
            <CardHeader>
              <CardImage src='https://plus.unsplash.com/premium_photo-1738857914575-3d3b2fb7064e?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
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
          <Card backgroundColor='gray' size='full' variant='with-image'>
            <CardHeader>
              <CardImage src='https://plus.unsplash.com/premium_photo-1738857914575-3d3b2fb7064e?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
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
          <Card backgroundColor='gray' size='full' variant='with-image'>
            <CardHeader>
              <CardImage src='https://plus.unsplash.com/premium_photo-1738857914575-3d3b2fb7064e?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
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
      </div>
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
