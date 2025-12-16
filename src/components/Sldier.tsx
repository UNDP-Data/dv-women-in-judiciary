import { P } from '@undp/design-system-react/Typography';
import { VizCarousel } from '@undp/design-system-react/VizCarousel';

export default function Slider() {
  return (
    <div className='pt-6'>
      <VizCarousel
        slideNo
        slides={[
          {
            content: (
              <div className='flex flex-col'>
                <P className='font-bold text-[24px]!'>
                  Globally, women remain underrepresented in the judiciary.
                  Current women representation ratios stand at just 0.90,
                  falling short of reaching parity.
                </P>
                <P>
                  This gap is especially pronounced in some regions of the
                  world. Regions such as Central, Southern and Western Asia and
                  Northern Africa have very low representation of women. In
                  contrast, Europe and North America have achieved parity, or
                  even a slight overrepresentation.
                </P>
              </div>
            ),
            viz: (
              <div className='w-full h-full bg-primary-white min-h-[500px]' />
            ),
          },
          {
            content: (
              <div className='flex flex-col'>
                <P className='font-bold text-[24px]!'>
                  Furthermore, analysis by income level reveals that gender
                  parity is primarily achieved in high-income countries while
                  middle and low-income countries continue to struggle with
                  unequal representation.
                </P>
                <P>
                  This gap is especially pronounced in some regions of the
                  world. Regions such as Central, Southern and Western Asia and
                  Northern Africa have very low representation of women. In
                  contrast, Europe and North America have achieved parity, or
                  even a slight overrepresentation.
                </P>
              </div>
            ),
            viz: (
              <div className='w-full h-full bg-primary-white min-h-[500px]' />
            ),
          },
          {
            content: (
              <div className='flex flex-col'>
                <P className='font-bold text-[24px]!'>
                  Women in the judiciary are disproportionately concentrated in
                  lower-level courts and remain underrepresented in senior and
                  high-level judicial positions.
                </P>
                <P>
                  Disaggregated data from select countries reveal clear vertical
                  segregation within judicial systems. This trend suggests the
                  possible presence of a persistent glass ceiling that prevents
                  career advancement for women. Addressing these disparities is
                  critical. It requires targeted, evidence-based policy
                  interventions designed to dismantle these barriers and pave
                  the way for more inclusive policies and decision making.
                </P>
              </div>
            ),
            viz: (
              <div className='w-full h-full bg-primary-white min-h-[500px]' />
            ),
          },
        ]}
        vizWidth='base'
      />
    </div>
  );
}
