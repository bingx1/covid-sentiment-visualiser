/*  
COMP90024 Cloud Computing Project 2
  Team 40:
  Mark Drvodelic, 1068574
  Colton Carner, 693280
  Bing Xu, 833684
  Zihao Zhang, 1151006
  Brandon Lulham, 1162377
*/
import {formatTimeSeriesData} from '../../utils/dataloaders';
import AnalyticsPage from '../../components/AnalyticsPage';
const adelaide_aurin = require('../../data/AURIN/analysis/adelaide_aurin_analysis.json');
const adelaide_ts = require('../../data/Weekly/adelaide_byWeek.json');

export async function getStaticProps(context) {
    console.log("Fetching time series data for analytics for Adelaide")
  
    const tsData = formatTimeSeriesData(adelaide_ts);
    
    return {
      props: {tsData, adelaide_aurin} 
    }
  }

export default function AnalyticsHome(props) {
    const vars = ["average_life_satisfaction_score","percent_nonreligious","percent_unemployed","percent_citizenship"];
    const tsData = props.tsData;
    const aurinData = props.adelaide_aurin;

    return (
        <AnalyticsPage city="Adelaide" tsData={tsData} aurinData={aurinData} regressionVars={vars}/>
    )
}