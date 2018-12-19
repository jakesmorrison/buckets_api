import {FETCH_TEAM_DATA, FETCH_STANDINGS, FETCH_DRAFT_RESULTS, FINAL_DATA, PANEL_DATA, NAME_STATE} from '../actions/types';

const initialState = {
    team_data: {},
    standings_data: {},
    draft_results: [],
    final_data: {},
    panel_data: {},
    name_state: {},
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_TEAM_DATA:
            return{
                ...state,
                team_data: action.payload
            }
        case FETCH_STANDINGS:
            return{
                ...state,
                standings_data: action.payload
            }
        case FETCH_DRAFT_RESULTS:
            return{
                ...state,
                draft_results: action.payload
            }
        case FINAL_DATA:
            return{
                ...state,
                final_data: action.payload
            }
        case PANEL_DATA:
            return{
                ...state,
                panel_data: action.payload
            }
        case NAME_STATE:
            return{
                ...state,
                name_state: action.payload
            }

        default:
            return{

            }
    }
}