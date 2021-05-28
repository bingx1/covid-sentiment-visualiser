import Layout from "../components/Layout";
import {
  Container,
  Button,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  btn: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  img: {
    width: "100%",
    height: "auto",
    boxShadow: "0px 2px 20px rgba(0,0,0,0.4)",
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: `7em`,
    [theme.breakpoints.down("md")]: {
      marginBottom: "4em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "2em",
    },
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <Layout title="About" description="A tool to visualise sentiment">
      <div className={classes.toolbarMargin} />
      <Container maxWidth="md">
        <Typography
          variant="h1"
          align="center"
          gutterBottom
          style={{ marginBottom: "0.7em" }}
        >
          About
        </Typography>
        <hr />
        <br />
        <Grid container direction="column" alignItems="flex-start" spacing={5}>
          <Grid item>
            <Container maxWidth="md">
              <Typography variant="h2" align="left" gutterBottom={true}>
                Description
              </Typography>
              <div>
                <p style={{ fontSize: 16 }}>
                  Tweets were harvested and a sentiment score was extracted for
                  each tweet by parsing the contents of the tweet. Only
                  geo-tagged tweets were kept, and the rest discarded. This
                  sentiment data is then combined with COVID-19 and other
                  economic data. The results of this analysis is displayed
                  graphically in the form on an interactive map on the{" "}
                  <Link href="/">Home</Link> page, which provides two views:
                  <ol style={{lineHeight: 2}}>
                    <li>
                      {" "}
                      A high-level view of sentiment over time in each
                      Australian state (bar the Northern Territory and
                      Tasmania).
                    </li>
                    <li>
                      {" "}
                      A detailled view of sentiment by suburb for every state.
                    </li>
                  </ol>
                </p>
              </div>{" "}
            </Container>
          </Grid>
          <Grid item>
            <Container maxWidth="md">
              <Typography variant="h2" align="left" gutterBottom={true}>
                Data
              </Typography>
              <br />
              <Typography variant="h3" align="left" gutterBottom={true}>
                Twitter data
              </Typography>
              <div>
                <p style={{ fontSize: 16 }}>
                  A large corpus of tweets was downloaded from the Twitter API
                  to provide historical tweet data. This consisted of roughly
                  1.5 million tweets, starting from January 2020. These tweets
                  formed the bulk of the data displayed on the homepage.
                  However, tweets were also concurrently collected using the
                  Twitter streaming API. All of the more recent tweets displayed
                  are sourced in this manner.
                </p>
              </div>
              <br />
              <Typography variant="h3" align="left" gutterBottom={true}>
                Economic data
              </Typography>
              <div>
                <p style={{ fontSize: 16 }}>
                  A number of datasets containing economic data regarding
                  Australian suburbs were also downloaded. This data was sourced
                  from <a href="https://aurin.org.au/">AURIN</a>, which provides
                  open-access to researchers across Australia.
                </p>
              </div>
              <br />
              <Typography variant="h3" align="left" gutterBottom={true}>
                Coronavirus data
              </Typography>
              <div>
                <p style={{ fontSize: 16 }}>
                  Data concerning the number of infections (by state) and number
                  of deaths was downloaded from{" "}
                  <a href="https://github.com/CSSEGISandData/COVID-19">
                    GitHub
                  </a>
                  . This data has been provided by the Center for Systems
                  Science and Engineering (CSSE) at John Hopkins University for
                  public use.
                </p>
              </div>
            </Container>
          </Grid>

        </Grid>
      </Container>
      <div className={classes.toolbarMargin} />
    </Layout>
  );
}

{
  /* <Grid item>
<Button
  component={"a"}
  target="_blank"
  rel="noreferrer noopener"
  href="https://github.com/SatoruAkiyama/nextjs-and-material-ui-template-with-header-and-footer/"
  className={classes.btn}
>
  Get Started
</Button>
</Grid> */
}
