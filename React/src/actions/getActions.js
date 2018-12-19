import {FETCH_TEAM_DATA, FETCH_STANDINGS, FETCH_DRAFT_RESULTS, FINAL_DATA, PANEL_DATA, NAME_STATE} from './types';

export function fetchTeamData(){
    return function(dispatch){
        // Fetching Team Data
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        var targetUrl = 'https://data.nba.net/prod/v2/2018/teams.json'
        fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => {
            var new_state = {};
            for(let i =0; i<data.league.standard.length; i++){
                var val = data.league.standard[i];
                if (val.isNBAFranchise === true){
                    new_state[val.tricode] = {'fullName': val.fullName, 'teamId': val.teamId}
                }
            }
            dispatch({
                type: FETCH_TEAM_DATA,
                payload: new_state,
            })
        })
    }
}

export function fetchStandings(){
    return function(dispatch){
        // Fetching Team Standings
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        var targetUrl = "https://data.nba.net/prod/v1/current/standings_all.json"
        fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => {
            var new_state = {};
            for(let i =0; i<data.league.standard.teams.length; i++){
                var val = data.league.standard.teams[i];
                new_state[val.teamId] = val;
            }
            dispatch({
                type: FETCH_STANDINGS,
                payload: new_state,
            })
        })
    }
}

export function fetchDraftResults(){
    return function(dispatch){
        // Fetching Draft Results
        var targetUrl = "http://137.201.50.151:5000/api/get_draft_results"
        fetch(targetUrl)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: FETCH_DRAFT_RESULTS,
                payload: data,
            })
        })
    }
}

export function finalData(){
    return function(dispatch){
        dispatch({
            type: FINAL_DATA,
            payload: {},
        })
    }
}

export function panelData(){
    return function(dispatch){
        dispatch({
            type: PANEL_DATA,
            payload: {},
        })
    }
}

export function nameState(){
    return function(dispatch){
        dispatch({
            type: NAME_STATE,
            payload: {},
        })
    }
}