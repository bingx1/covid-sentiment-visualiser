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
const melb_aurin = require('../../data/AURIN/analysis/melbourne_aurin_analysis.json');
const melb_ts = require('../../data/Weekly/melbourne_byWeek.json');

export async function getStaticProps(context) {
    console.log("Fetching time series data for analytics for Melbourne")
  
    const tsData = formatTimeSeriesData(melb_ts);
  
    return {
      props: {tsData, melb_aurin} 
    }
  }

export default function AnalyticsHome(props) {
    const vars = ["housing_stress_30_40_rule", "median_age", "median_weekly_personal_income", "percent_nonreligious", "percent_unemployed", "poverty_rate"];
    const tsData = props.tsData;
    const aurinData = props.melb_aurin;

    return (
        <AnalyticsPage city="Melbourne" tsData={tsData} aurinData={aurinData} regressionVars={vars}/>
    )
}