import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTeamData, fetchStandings, fetchDraftResults, finalData, panelData, nameState} from '../actions/getActions';
import $ from 'jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class panel extends Component{

    getPointTotal = (val) => {
        var curr_arr = this.props.final_data[val]
        var point_counter = 0
        for (let i=0; i<curr_arr["team"].length; i++){
            point_counter+=curr_arr["points_won"][i]
        }
        return point_counter;
    }

    createTable = (val) => {
        const uuidv1 = require('uuid/v1');
        var curr_arr = this.props.final_data[val]
        var table = [
            <tr key={uuidv1()}>
                <td className='cell'><b>Team</b></td>
                <td className='cell'><b>Bet</b></td>
                <td className='cell'><b>Current Record</b></td>
                <td className='cell'><b>Projected Record</b></td>
                <td className='cell'><b>Over/Under Points</b></td>
            </tr>
        ]
        for (let i=0; i<curr_arr["team"].length; i++){
            const row_color = {
                background: ( parseFloat(curr_arr["points_won"][i]) >= 0) ?  '#cdffcd': '#ff9a9a',
                color: "black"
            };    

            var fa;
            if (curr_arr["streak"][i]){
                fa = <FontAwesomeIcon icon="fire" />;
            }
            else{
                fa = <FontAwesomeIcon icon="igloo" />;
            }
        
            table.push(
                <tr key={uuidv1()} className='tablerow'>
                    <td className='cell'>{curr_arr["team"][i].toUpperCase()} {fa}</td>
                    <td className='cell'>{curr_arr["over_under"][i].toUpperCase()}<br></br>{curr_arr["points"][i]} </td>
                    <td className='cell'>{curr_arr["win_loss"][i]} </td>
                    <td className='cell'>{curr_arr["proj_win_loss"][i]} </td>
                    <td className='cell' style={row_color}>{curr_arr["points_won"][i] } </td>
                </tr>
            )
        }
        return table
    }

    createPanel = () => {
        const uuidv1 = require('uuid/v1');
        panel=[]
        var panel_style = {'height':0}
        if ($(window).width()>600){
            panel_style['height'] = $(window).height()/4;
        }
        else{
            panel_style['height'] = $(window).height();
        }
        var colors = ["#353941","#26282b", "#2D634A", "#3B8490", "#0B3878","#393e6f", "#3d2e4f", "#321d2f"];

        var people = Object.keys(this.props.final_data);
        people.sort();
        people.splice((people.indexOf("Fans")), 1);
        people.push("Fans");

        for (let i=0; i<people.length; i+=2){

            //https://www.transparenttextures.com/
            var panel_background_1 = {'background': colors[i], 'background-image': 'url("https://www.transparenttextures.com/patterns/3px-tile.png")'};
            var panel_background_2 = {'background': colors[i+1], 'background-image': 'url("https://www.transparenttextures.com/patterns/3px-tile.png")'};

            var stats_table_1 = this.createTable(people[i]);
            var stats_table_2 = this.createTable(people[i+1]);

            this.props.panel_data[people[i]] = stats_table_1;
            this.props.panel_data[people[i+1]] = stats_table_2;

            panel.push(
                <div key={ uuidv1() } className='row'>
                    <div className='col-lg-6'>
                        <div className='panel row' style={panel_style}>
                            <div id={people[i]} className='panel-part1 col-lg-3' style={panel_background_1}
                                onClick={() => changeSomething(this.props, people[i],)}
                            >
                                <div className='subpanel'>
                                    <h1 className='title'>{people[i]}</h1> 
                                    <h1>{ this.getPointTotal(people[i]) }</h1>
                                    <h6>Total Points</h6>
                                </div>
                            </div>
                            <div id='hide_mobile' className='panel-part2 col-lg-9'>
                                <table className='mytable'>
                                    <tbody>
                                        {stats_table_1}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='panel row' style={panel_style}>
                        <div className='panel-part1 col-lg-3' style={panel_background_2}>
                            <div className='subpanel'>
                                <h1 className='title'>{people[i+1]}</h1> 
                                <h1>{ this.getPointTotal(people[i+1]) }</h1>
                                <h6>Total Points</h6>
                            </div>
                            </div>
                            <div id='hide_mobile' className='panel-part2 col-lg-9'>
                                <table className='mytable'>
                                    <tbody>
                                        {stats_table_2}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return panel
    }

    render(){
        var entire_panel = this.createPanel();
        // var myJSON = JSON.stringify(ReactDOMServer.renderToStaticMarkup(entire_panel));
        // var targetUrl = "http://137.201.50.151:5000/api/"+myJSON
        // fetch(targetUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         firstParam: 'yourValue',
        //         secondParam: 'yourOtherValue',
        //     })
        // })

        // console.log(this.props.name_state["name"])
        return(
            entire_panel
        )
    }
}

panel.propTypes = {
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


export default connect(mapStateToProps, {fetchTeamData, fetchStandings, fetchDraftResults, finalData, panelData, nameState})(panel)

function changeSomething(props, name){
    props.name_state["name"] = name
}