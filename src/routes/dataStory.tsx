import { createRoute } from '@tanstack/react-router';
import type { AnyRootRoute } from '@tanstack/react-router';

export function DataStory() {
  return (
    <iframe
      src='https://geosmart.undp.org/arcgis/apps/storymaps/stories/ed987731512b45a3b41353a8b32e1806'
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
