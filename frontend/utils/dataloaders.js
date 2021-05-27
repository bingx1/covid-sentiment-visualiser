import Axios from 'axios';
import {getDateOfISOWeek} from './helpers';

const stateToCity = {
    'New South Wales' : 'sydney',
    'Victoria' : 'melbourne',
    'Queensland': 'brisbane',
    'South Australia': 'adelaide',
    'Western Australia' : 'perth'
  }

// Retrieve the array of suburb geojson data for Australia
export function getGeoJSONArray(){
    let melb_geo =  require('../data/state-suburbs/melbourne.json');
    let adelaide_geo = require('../data/state-suburbs/adelaide.json');
    let perth_geo = require('../data/state-suburbs/perth.json');
    let sydney_geo = require('../data/state-suburbs/sydney.json');
    let brisbane_geo = require('../data/state-suburbs/brisbane.json');
    return [melb_geo, adelaide_geo, perth_geo, sydney_geo, brisbane_geo]
  }

export function loadCovidData(){
  let confirmed = require('../data/covid19/cumulative_cases.json');
  let deaths = require('../data/covid19/cumulative_deaths.json');
  return [confirmed, deaths];
}

export function getSuburbAURINData(){
    let melb_aurin = require('../data/AURIN/melbourne_aurin.json');
    let adelaide_aurin = require('../data/AURIN/adelaide_aurin.json');
    let perth_aurin = require('../data/AURIN/perth_aurin.json');
    let sydney_aurin = require('../data/AURIN/sydney_aurin.json');
    let brisbane_aurin = require('../data/AURIN/brisbane_aurin.json');
    return {
        ...melb_aurin,
        ...adelaide_aurin,
        ...perth_aurin,
        ...sydney_aurin,
        ...brisbane_aurin
    }
}

  // Combine city geojson data with city sentiment data
export function getCityData(){
    const states = require('../data/states.json');
    for (let i = 0; i < states.features.length; i++){
      let state_name = states["features"][i]["properties"]["STATE_NAME"];
      let sentiment = {};
      if (state_name in stateToCity){
        // console.log("Time series data is available for this city ", state_name);
        // Change this line to a GET request to retrieve from the database.
        const weekly = require(`../data/Weekly/${stateToCity[state_name]}_byWeek.json`);
        let rows = weekly.rows;
        rows.forEach((row) => {
          let city_name = row["key"][0];
          let year = row["key"][1];
          let month = row["key"][2];
          let average_sentiment = row["value"]["sum"] / row["value"]["count"]
          row["value"]["average_sentiment"] = average_sentiment; //Add average sentiment
          // row["key"] = [year, month]; // Don't need the city name in the key
          sentiment[[year, month]] = row["value"];
        })
      
      }
      // Fake data so that sentiment isn't empty for any state
      sentiment[[2018, 0]] = {"sum":72.92009999999999,"min":-0.9249,"max":0.9686,"count":581,"sumsqr":81.17477417};
      states["features"][i]["properties"]["SENTIMENT"] = sentiment;
    }
    return states;
  }

  export function getTimeSeriesData(){
    let all_timeseries = {}
    let melb = require('../data/Weekly/melbourne_byWeek.json');
    let sydney = require('../data/Weekly/sydney_byWeek.json');
    let brisbane = require('../data/Weekly/brisbane_byWeek.json');
    let perth = require('../data/Weekly/perth_byWeek.json');
    let adelaide =require('../data/Weekly/adelaide_byWeek.json');
    let all = [melb, sydney, brisbane, perth, adelaide];
    for (let i = 0; i < all.length; i++){
      let state_name = all[i].rows[0].key[0];
      let rows = [];
      all[i].rows.forEach((row) => {
        let year = row.key[1]
        let week_no = row.key[2]
        let date = getDateOfISOWeek(week_no, year);
        let avg_sent = row.value.sum / row.value.count
        let new_row = {'x': date.toLocaleDateString(), 'y': avg_sent}
        rows.push(new_row);
      });
      all_timeseries[state_name] = rows;
    }
    return all_timeseries;
  }

  // Takes in city-name in lower-case - i.e. 'melbourne'
  export function getCityTimeSeriesData(city_name){
    let output = {}
    let data = require(`../data/Weekly/${city_name}_byWeek.json`);
    let rows = [];
    data.rows.forEach((row) => {
      let year = row.key[1]
      let week_no = row.key[2]
      let date = getDateOfISOWeek(week_no, year);
      let avg_sent = row.value.sum / row.value.count
      let new_row = {'x': date.toLocaleDateString(), 'y': avg_sent}
      rows.push(new_row);
    });
    output[city_name] = rows;
    return output;
  }

  export function getAURINDataForAnalysis(){
    let melb_aurin = require('../data/AURIN/analysis/melbourne_aurin_analysis.json');
    let adelaide_aurin = require('../data/AURIN/analysis/adelaide_aurin_analysis.json');
    let perth_aurin = require('../data/AURIN/analysis/perth_aurin_analysis.json');
    let sydney_aurin = require('../data/AURIN/analysis/sydney_aurin_analysis.json');
    let brisbane_aurin = require('../data/AURIN/analysis/brisbane_aurin_analysis.json');
    
    let cleaned_aurin_data = {}

    cleaned_aurin_data["melbourne"] = melb_aurin;
    cleaned_aurin_data["adelaide"] = adelaide_aurin;
    cleaned_aurin_data["perth"] = perth_aurin;
    cleaned_aurin_data["sydney"] = sydney_aurin;
    cleaned_aurin_data["brisbane"] = brisbane_aurin;

    return cleaned_aurin_data;
}