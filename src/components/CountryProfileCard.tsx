import { Button } from '@undp/design-system-react/Button';
import { H4, P } from '@undp/design-system-react/Typography';
import { ChevronRightIcon } from 'lucide-react';

export default function CountryProfileCard() {
  return (
    <a
      href='https://www.undp.org/rolhr/justice/gender-justice'
      target='_blank'
      rel='noopener noreferrer'
      className='basis-[calc(50%-12px)] grow min-w-[240px]'
    >
      <div className='relative flex flex-col justify-between gap-8 box-border pt-8 px-6 pb-[220px] sm:px-8 sm:py-16 min-w-[240px]  bg-[var(--gray-200)]'>
        <div
          className='absolute inset-0 pointer-events-none opacity-[0.7] z-10 bg-[url("imgs/texture.png")] bg-repeat mix-blend-overlay'
          style={{
            backgroundSize: '128px 128px',
          }}
        />
        <img
          className='absolute bottom-0 right-0'
          alt='abstract shapes'
          src='/imgs/CountryInfoCardPattern.svg'
        />
        <div>
          <H4 marginBottom='xs'>Learn More</H4>
          <P marginBottom='none' size='xl' className='pr-4'>
            Explore our work on Gender Justice and related initiatives
          </P>
        </div>
        <Button
          variant='link-without-icon'
          className='cursor-pointer w-fit p-0 m-0'
        >
          Explore
          <ChevronRightIcon color='#D12800' strokeWidth={2} />
        </Button>
      </div>
    </a>
  );
}
