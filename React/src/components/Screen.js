import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTeamData, fetchStandings, fetchDraftResults, finalData, panelData, nameState} from '../actions/getActions';
import $ from 'jquery';

import Panel from './Panel'

class screen extends Component{
    componentWillMount(){
        this.props.finalData()
        this.props.fetchTeamData()
        this.props.fetchStandings()
        this.props.fetchDraftResults()
        this.props.panelData();
        this.props.nameState();
    }

    componentDidMount() {
        $('.intro_page').css('margin-top', ( $(window).height()- ( $('.main_title').height() + $('.main_sub').height() + $('.loading_text').height()) )/2 )
    }

    render(){
        var finished = [typeof this.props.team_data, typeof this.props.standings_data, typeof this.props.draft_results]
        if(!finished.includes("undefined")){
            var results = prepare_data(this.props.team_data,this.props.standings_data,this.props.draft_results);
            for (let [key, value] of Object.entries(results)){
                this.props.final_data[key] = value;
            }
            return(<Panel team={"hey"} />)    
        }
        else{
            var row_style = {
                "height": $(window).height()
            }
            return (
                <div className='row' style={row_style}>
                    <div className='col-lg-12 intro_page'>
                        <h1 className='main_title'>Buckets</h1>
                        <h3 className='main_sub'>Over/Under Bet</h3>
                        <div>
                            <p className='loading_text'>Requesting data <br/> from data.nba.net</p>
                        </div>
                        <div className='loader_container'>
                            <div className="load-bar">
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                        </div>                       
                    </div>
                </div>
            )
        }
    }
}  

screen.propTypes = {
    fetchTeamData: PropTypes.func.isRequired,
    fetchStandings: PropTypes.func.isRequired,
    fetchDraftResults: PropTypes.func.isRequired,
    finalData: PropTypes.func.isRequired,
    panelData: PropTypes.func.isRequired,
    nameState: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    team_data: state.reduce.team_data,
    standings_data: state.reduce.standings_data,
    draft_results: state.reduce.draft_results,
    final_data: state.reduce.final_data,
    panel_data: state.reduce.panel_data,
    name_state: state.reduce.name_state,
});


export default connect(mapStateToProps, {fetchTeamData, fetchStandings, fetchDraftResults, finalData, panelData, nameState})(screen)

function prepare_data(team_data, standings_data, draft_data){
    var results_dict = {}
    for(let i=0; i<draft_data.length; i++){
        const number_of_games = 82;
        var team_tri = draft_data[i].team;
        var team_id = team_data[team_tri].teamId;
        var team_dict = standings_data[team_id];
        var wins = team_dict.win;
        var losses = team_dict.loss;
        var win_percent = parseFloat(team_dict.winPct);
        var proj_wins = Math.round(number_of_games*win_percent);
        var proj_losses = number_of_games-proj_wins;
        var over_under = draft_data[i].over_under;
        var spread = draft_data[i].points;
        var points_won = 0;
        var is_win_streak = standings_data[team_id].isWinStreak;
        if (proj_wins-spread > 0 && over_under === "Over") points_won = proj_wins-spread;
        else if (proj_wins-spread > 0 && over_under === "Under") points_won = -1*(proj_wins-spread);
        else if (proj_wins-spread < 0 && over_under === "Under") points_won = -1*(proj_wins-spread);
        else if (proj_wins-spread < 0 && over_under === "Over") points_won = (proj_wins-spread);

        // owner in dict
        if(draft_data[i].owner in results_dict){
            results_dict[draft_data[i].owner] = {
                "team": results_dict[draft_data[i].owner].team.concat([team_tri]),
                "win_loss": results_dict[draft_data[i].owner].win_loss.concat([wins.toString() +"-"+ losses.toString()]),
                "proj_win_loss": results_dict[draft_data[i].owner].proj_win_loss.concat([proj_wins.toString() +"-"+ proj_losses.toString()]),
                "points": results_dict[draft_data[i].owner].points.concat([spread]),
                "over_under": results_dict[draft_data[i].owner].over_under.concat([over_under]),
                "points_won": results_dict[draft_data[i].owner].points_won.concat([points_won]),
                "streak": results_dict[draft_data[i].owner].streak.concat([is_win_streak]),
            }
        }
        // owner not in dict
        else{
            results_dict[draft_data[i].owner] = {
                "team": [team_tri],
                "win_loss": [wins.toString() +"-"+ losses.toString()],
                "proj_win_loss": [proj_wins.toString() +"-"+ proj_losses.toString()],
                "points": [spread],
                "over_under": [over_under],
                "points_won": [points_won],
                "streak": [is_win_streak]
            }
        }
    }
    return results_dict
}
