import {
  Footer,
  FooterLogoUnit,
  FooterCopyrightUnit,
  FooterContent,
} from '@undp/design-system-react/Footer';

export default function FooterEl() {
  return (
    <Footer>
      <FooterContent>
        <FooterLogoUnit link='https://www.undp.org/' />
        <FooterCopyrightUnit>
          <a
            href='https://www.undp.org/copyright-terms-use'
            target='_blank'
            className='text-primary-white'
          >
            Terms Of Use
          </a>
        </FooterCopyrightUnit>
      </FooterContent>
    </Footer>
  );
}
