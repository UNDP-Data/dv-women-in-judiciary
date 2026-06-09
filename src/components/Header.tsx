import {
  Header,
  HeaderLogoUnit,
  HeaderMainNavUnit,
  HeaderMenuUnit,
} from '@undp/design-system-react/Header';
import { Link } from '@tanstack/react-router';

export default function HeaderEl() {
  return (
    <Header className='justify-between'>
      <HeaderLogoUnit
        hyperlink='./'
        siteName='Women in Judiciary'
        siteSubName='Global Policy Centre for Governance'
      />
      <HeaderMainNavUnit>
        <HeaderMenuUnit className='md:justify-end'>
          <Link
            to='/data-explorer'
            className='[&.active]:font-bold [&.active]:text-primary-blue-600'
          >
            Data explorer
          </Link>
          <Link
            to='/country-insights'
            className='[&.active]:font-bold [&.active]:text-primary-blue-600'
          >
            Country insights
          </Link>
          <Link
            to='/resources'
            className='[&.active]:font-bold [&.active]:text-primary-blue-600'
          >
            Resources
          </Link>
          <Link
            to='/data-story'
            className='[&.active]:font-bold [&.active]:text-primary-blue-600'
          >
            Data story
          </Link>
          <Link
            to='/about'
            className='[&.active]:font-bold [&.active]:text-primary-blue-600'
          >
            About
          </Link>
        </HeaderMenuUnit>
      </HeaderMainNavUnit>
    </Header>
  );
}
