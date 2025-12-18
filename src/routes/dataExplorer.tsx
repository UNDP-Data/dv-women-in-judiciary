import { createRoute } from '@tanstack/react-router';
import type { AnyRootRoute } from '@tanstack/react-router';
import { H2 } from '@undp/design-system-react/Typography';
import { Spacer } from '@undp/design-system-react/Spacer';

import DataExplorerWidget from '@/components/DataExplorer';
import DataDownloadCard from '@/components/DataDownloadCard';

export function DataExplorer() {
  return (
    <>
      <div className='page-container px-4 sm:px-24 my-16'>
        <Spacer size='7xl' />
        <H2 className='font-heading uppercase' marginBottom='none'>
          Data Explorer
        </H2>
        <Spacer size='4xl' />
        <DataExplorerWidget />
        <Spacer size='4xl' />
        <DataDownloadCard />
        <Spacer size='7xl' />
      </div>
    </>
  );
}
export default function createDataExplorerRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/data-explorer',
    component: DataExplorer,
    getParentRoute: () => parentRoute,
  });
}
