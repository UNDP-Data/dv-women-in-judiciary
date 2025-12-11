import { createRoute } from '@tanstack/react-router';
import type { AnyRootRoute } from '@tanstack/react-router';
import { A, H1, P } from '@undp/design-system-react/Typography';
import { Spacer } from '@undp/design-system-react/Spacer';

export function TanStackQueryDemo() {
  return (
    <>
      <div className='page-container my-16'>
        <H1 marginBottom='none'>About</H1>
        <Spacer size='2xl' />
        <P size='base'>
          Lorem ipsum dolor sit amet consectetur. Pharetra mi purus porttitor
          nibh diam in. Egestas ut id donec diam risus elementum lectus
          facilisis nec. Quis ut amet odio ultrices. Ullamcorper leo consectetur
          auctor in nisl odio ut. Lorem ipsum dolor sit amet consectetur.
          Pharetra mi purus porttitor nibh diam in. Egestas ut id donec diam
          risus elementum lectus facilisis nec. Quis ut amet odio ultrices.
          Ullamcorper.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur. Pharetra mi purus porttitor
          nibh diam in. Egestas ut id donec diam risus elementum lectus
          facilisis nec. Quis ut amet odio ultrices. Ullamcorper leo consectetur
          auctor in nisl odio ut. Lorem ipsum dolor sit amet consectetur.
          Pharetra mi purus porttitor nibh diam in. Egestas ut id donec diam
          risus elementum lectus facilisis nec. Quis ut amet odio ultrices.
          Ullamcorper. Pharetra mi purus porttitor nibh diam in. Egestas ut id
          donec diam risus elementum lectus facilisis nec. Quis ut amet odio
          ultrices. Ullamcorper.Pharetra mi purus porttitor nibh diam in.
          Egestas ut id donec diam risus elementum lectus facilisis nec. Quis ut
          amet odio ultrices. Ullamcorper.
          <br />
          <br />
          Tellus hac orci cras vitae a porttitor ultrices amet. Fermentum eu
          rhoncus facilisis vestibulum vulputate eget amet cursus faucibus.
          Ipsum sed nibh sem laoreet. Eros fermentum aenean venenatis pharetra
          sit. Elementum sit lacinia dignissim elementum nullam dolor eleifend
          dui. Suscipit tristique orci parturient tortor vulputate id semper.
          Amet id tristique rutrum vel at penatibus varius. Malesuada id enim
          nascetur facilisi neque arcu vitae luctus massa. Lacus sit pretium sed
          eget nunc viverra ultricies velit a. Mattis sem quam tempus magna
          scelerisque eget iaculis. Sed ultrices gravida ultricies aliquet
          egestas. Fringilla malesuada posuere scelerisque vulputate sapien diam
          feugiat porttitor vel. Donec dolor lectus nunc ut auctor ultrices
          morbi vitae lorem. Scelerisque id nisi vitae elementum fermentum
          faucibus. Eget turpis nisl nisi ut praesent in.
          <br />
          <br />
          Contact us at <A href='mailto:email@undp.org'>email@undp.org</A>
        </P>
      </div>
    </>
  );
}
export default function createAboutRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/about',
    component: TanStackQueryDemo,
    getParentRoute: () => parentRoute,
  });
}
