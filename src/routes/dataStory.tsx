import { createRoute } from '@tanstack/react-router';
import type { AnyRootRoute } from '@tanstack/react-router';

export function DataStory() {
  return (
    <iframe
      src='https://geosmart.undp.org/arcgis/apps/storymaps/stories/21637bc10c3342a195169071f4925888'
      width='100%'
      className='data-story-frame'
      frameBorder='0'
      allowFullScreen
    />
  );
}
export default function createDataStoryRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/data-story',
    component: DataStory,
    getParentRoute: () => parentRoute,
  });
}
