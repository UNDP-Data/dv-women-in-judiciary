import { Button } from '@undp/design-system-react/Button';
import { H4, P } from '@undp/design-system-react/Typography';
import { Download } from 'lucide-react';

export default function DataDownloadCard() {
  return (
    <div className='relative flex flex-col justify-between gap-8 w-full box-border px-8 py-16 bg-[var(--gray-200)]'>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.7] z-10
             bg-[url('imgs/texture.png')] bg-repeat mix-blend-overlay"
        style={{
          backgroundSize: '128px 128px',
        }}
      />
      <img
        className='absolute bottom-0 right-0'
        alt='abstract shapes'
        src='/imgs/shape-03.svg'
      />
      <div>
        <H4 marginBottom='xs'>Download data</H4>
        <P marginBottom='none'>
          Access the full dataset including all countries, indicators, and
          historical data.
        </P>
      </div>
      <Button
        variant='link-without-icon'
        className='cursor-pointer w-fit p-0 m-0'
      >
        <Download stroke='red' />
        Download data
      </Button>
    </div>
  );
}
