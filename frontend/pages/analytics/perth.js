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
const perth_aurin = require('../../data/AURIN/analysis/perth_aurin_analysis.json');
const perth_ts = require('../../data/Weekly/perth_byWeek.json');

export async function getStaticProps(context) {
    console.log("Fetching time series data for analytics for Perth")
  
    const formatted = formatTimeSeriesData(perth_ts);
    
    return {
      props: {tsData: formatted, aurinData: perth_aurin} 
    }
  }

export default function AnalyticsHome({tsData, aurinData}) {
    const vars = ["percent_citizenship","homeless_rate","gini_coefficient","average_life_satisfaction_score"];
    // const formatted = formatTimeSeriesData(perth_ts);

    return (
        <AnalyticsPage city="Perth" tsData={tsData} aurinData={aurinData} regressionVars={vars}/>
    )
}