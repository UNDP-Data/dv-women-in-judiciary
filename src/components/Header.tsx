import {
  Header,
  HeaderLogoUnit,
  HeaderMainNavUnit,
  HeaderMenuUnit,
} from '@undp/design-system-react/Header';
import { Link } from '@tanstack/react-router';

export default function HeaderEl() {
  return (
    <Header>
      <HeaderLogoUnit hyperlink='./' siteName='Women in judiciary' />
      <HeaderMainNavUnit>
        <HeaderMenuUnit>
          <Link to='/'>Data explorer</Link>
          <Link to='/country-insights'>Country insights</Link>
          <Link to='/about'>About</Link>
        </HeaderMenuUnit>
      </HeaderMainNavUnit>
    </Header>
  );
}
