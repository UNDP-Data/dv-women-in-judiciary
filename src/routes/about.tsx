import { createRoute } from '@tanstack/react-router';
import type { AnyRootRoute } from '@tanstack/react-router';
import { A, H2, P } from '@undp/design-system-react/Typography';
import { Spacer } from '@undp/design-system-react/Spacer';

export function About() {
  return (
    <>
      <div className='page-container px-4 sm:px-24 my-16'>
        <Spacer size='7xl' />
        <H2 className='font-heading uppercase' marginBottom='none'>
          About the Women in the Judiciary Dashboard
        </H2>
        <Spacer size='4xl' />
        <P>
          The Women in the Judiciary Dashboard is a global platform dedicated to
          tracking and visualizing women’s representation in the judiciary
          worldwide across multiple court levels. By compiling and harmonizing
          official country data, the platform provides a globally comparable
          overview of gender representation across judicial benches.
          <br />
          <br />
          Global evidence on women’s representation in the judiciary has
          historically been fragmented and difficult to compare across
          countries. By consolidating official data into a single platform, the
          dashboard helps make gender gaps visible, supports informed policy
          dialogue, and enables governments and partners to track progress
          toward more inclusive justice systems.
          <br />
          <br />
          The dataset includes information on the proportion and number of women
          serving as judges and magistrates across supreme and/or constitutional
          courts, high-level courts, and lower courts, depending on national
          judicial structures and data availability. Data are primarily reported
          by National Statistical Offices, Ministries of Justice, Supreme
          Courts, and Judicial Councils, and are harmonized to ensure
          international comparability while respecting country-specific
          institutional arrangements. The platform currently covers more than
          120 countries across all regions and will continue to expand as
          additional data become available. Detailed information on data
          sources, definitions, and compilation methods is available here.
          <br />
          <br />
          The Women in the Judiciary Dashboard is developed by the{' '}
          <A
            href='https://www.undp.org/policy-centre/governance'
            target='_blank'
          >
            UNDP Global Policy Centre for Governance
          </A>
          , and it is anchored in UNDP’s role as custodian agency for{' '}
          <A
            href='https://unstats.un.org/sdgs/metadata/files/Metadata-16-07-01c.pdf'
            target='_blank'
          >
            SDG indicator 16.7.1(c)
          </A>{' '}
          on representation in the judiciary. The Dashboard is also a core
          contribution of the{' '}
          <A
            href='https://www.undp.org/rolhr/justice/gender-justice'
            target='_blank'
          >
            Gender Justice Platform
          </A>
          , a multi-stakeholder initiative supporting gender-responsive justice
          systems.
        </P>
        <Spacer size='4xl' />
        <P size='base'>
          <span className='font-bold'>
            For data inquiries and collaboration
          </span>
          <br />
          E-mail:{' '}
          <A href='mailto:sdg16indicators@undp.org' target='_blank'>
            sdg16indicators@undp.org
          </A>
          <br />
          Governance Data and Analytics Team (GDA)
          <br />
          UNDP Global Policy Centre for Governance (GPCG)
          <br />
          Kongens Gate 14, 0153 Oslo, Norway
        </P>
        <Spacer size='7xl' />
      </div>
    </>
  );
}
export default function createAboutRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/about',
    component: About,
    getParentRoute: () => parentRoute,
  });
}
