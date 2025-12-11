import { Button } from '@undp/design-system-react/Button';
import { H5, P } from '@undp/design-system-react/Typography';
import { Download } from 'lucide-react';

export default function DataDownloadCard() {
  return (
    <div className='flex items-center justify-between gap-4 w-full box-border p-8 bg-[var(--blue-700)]'>
      <div className='flex flex-col gap-2'>
        <H5 className=' text-[var(--white)]' marginBottom='none'>
          Download data
        </H5>
        <P className=' text-[var(--white)]' marginBottom='none' size='sm'>
          Access the full dataset including all countries, indicators, and
          historical data.
        </P>
      </div>
      <Button
        variant='tertiary'
        className='bg-[var(--blue-600)] text-[var(--white)] hover:bg-[var(--blue-500)] cursor-pointer'
      >
        <Download stroke='white' />
        Download data
      </Button>
    </div>
  );
}
