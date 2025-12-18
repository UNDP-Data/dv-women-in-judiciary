import {
  Header,
  HeaderLogoUnit,
  HeaderMainNavUnit,
  HeaderMenuUnit,
} from '@undp/design-system-react/Header';
import { Link } from '@tanstack/react-router';

export default function HeaderEl() {
  return (
    <Header className='justfify-between'>
      <HeaderLogoUnit
        hyperlink='./'
        siteName='Women in Judiciary'
        siteSubName='Policy Centre for Governance'
      />
      <HeaderMainNavUnit>
        <HeaderMenuUnit className='md:justify-end'>
          <Link to='/data-explorer'>Data explorer</Link>
          <Link to='/country-insights'>Country insights</Link>
          <Link to='/resources'>Resources</Link>
          <Link to='/about'>About</Link>
        </HeaderMenuUnit>
      </HeaderMainNavUnit>
    </Header>
  );
}
