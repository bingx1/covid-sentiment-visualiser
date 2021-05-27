/*  
COMP90024 Cloud Computing Project 2
  Team 40:
  Mark Drvodelic, 1068574
  Colton Carner, 693280
  Bing Xu, 833684
  Zihao Zhang, 1151006
  Brandon Lulham, 1162377
*/
import {getTimeSeriesData} from '../../utils/dataloaders';
import AnalyticsPage from '../../components/AnalyticsPage';
const perth_aurin = require('../../data/AURIN/analysis/perth_aurin_analysis.json');

export async function getStaticProps(context) {
    console.log("Fetching time series data for analytics for Perth")
  
    const all_timeseries = getTimeSeriesData();
    
    return {
      props: {tsData: all_timeseries, aurinData: perth_aurin} 
    }
  }

export default function AnalyticsHome({tsData, aurinData}) {
    const vars = ["percent_citizenship","homeless_rate","gini_coefficient","average_life_satisfaction_score"];
    return (
        <AnalyticsPage city="Perth" tsData={tsData} aurinData={perth_aurin} regressionVars={vars}/>
    )
}