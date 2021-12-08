import { Box } from "grommet";

import {
  Footer,
  NightCrawler,
  Section,
  Sign,
  Talents,
} from "../components/landing";

const Landing = () => (
  <>
    <Box align="center" pad="large">
      <NightCrawler size="xlarge" />
      <Sign />
    </Box>
    <Talents />
    <Section>
      <Footer />
    </Section>
  </>
);

export default Landing;
