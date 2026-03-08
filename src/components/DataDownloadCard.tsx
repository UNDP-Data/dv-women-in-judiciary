import { Button } from '@undp/design-system-react/Button';
import { H4, P } from '@undp/design-system-react/Typography';
import { DownloadIcon } from 'lucide-react';

export default function DataDownloadCard() {
  return (
    <a
      href='https://github.com/UNDP-Data/dv-women-in-judiciary-data/blob/main/data/data.csv'
      target='_blank'
      rel='noopener noreferrer'
      className='basis-[calc(50%-12px)] grow min-w-[240px]'
    >
      <div className='relative flex flex-col justify-between gap-8 box-border pt-8 px-6 pb-[220px] sm:px-8 sm:py-16 bg-[var(--gray-200)] basis-[calc(50%-12px)] grow'>
        <div
          className='absolute inset-0 pointer-events-none opacity-[0.7] z-10 bg-[url("imgs/texture.png")] bg-repeat mix-blend-overlay'
          style={{
            backgroundSize: '128px 128px',
          }}
        />
        <img
          className='absolute bottom-0 right-0'
          alt='abstract shapes'
          src='/imgs/downloadCardPattern.svg'
        />
        <div>
          <H4 marginBottom='xs'>Download dataset</H4>
          <P marginBottom='none' size='xl' className='pr-4'>
            Access the full dataset including all countries, indicators, and
            sources.
          </P>
        </div>
        <Button
          variant='link-without-icon'
          className='cursor-pointer w-fit p-0 m-0'
        >
          Download
          <DownloadIcon color='#D12800' strokeWidth={2} />
        </Button>
      </div>
    </a>
  );
}
