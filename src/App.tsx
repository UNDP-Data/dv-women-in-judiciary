import { H1, P } from '@undp/design-system-react/Typography';
import { ChevronDown } from 'lucide-react';
import { Spacer } from '@undp/design-system-react/Spacer';

import DataDownloadCard from './components/DataDownloadCard';
import DataExplorer from './DataExplorer';

function App() {
  return (
    <>
      <div className='w-full gap-4 flex flex-col items-center justify-center min-h-[400px] bg-cover bg-center bg-no-repeat bg-[url(./imgs/Header.webp)] py-8'>
        <H1 marginBottom='none' className='text-center text-[var(--blue-700)]'>
          Women in judiciary
        </H1>
        <P
          marginBottom='none'
          className='max-w-[480px] text-center text-[var(--blue-700)]'
        >
          Explore comprehensive data on gender representation in judicial
          positions worldwide.
        </P>
        <div className='rounded-full bg-[var(--blue-700)] p-2'>
          <ChevronDown stroke='white' />
        </div>
      </div>
      <div className='page-container'>
        <Spacer size='4xl' />
        <DataExplorer />
        <Spacer size='4xl' />
        <DataDownloadCard />
        <Spacer size='4xl' />
      </div>
    </>
  );
}

export default App;
