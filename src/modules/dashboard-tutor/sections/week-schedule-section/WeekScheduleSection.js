/* Version 1

import React from 'react';
import {Grid,Icon} from 'semantic-ui-react';
import './styles.css';
import { connect } from 'react-redux';
import { MorningSchedule, AfternoonSchedule, EveningSchedule } from './charts'
import moment from 'moment'

// getWeekStartStamp = (anyTime) => {
// 	// let anyTime = Date.now()
// 	const dayOfWeek = moment(anyTime).format('dddd')
// 	let hrs = moment(anyTime).format('HH')
// 	let mins = moment(anyTime).format('mm')
// 	let secs = moment(anyTime).format('ss')

// 	let subDays = getNumberOfDaysSinceStartofWeek(dayOfWeek)

// 	let subHrs = parseInt(hrs)
// 	// console.log(subHrs)

// 	let subMins = parseInt(mins)
// 	// console.log(subMins)

// 	let subSecs = parseInt(secs)
// 	// console.log(secs)

// 	let WeekStartStamp = moment(anyTime)
// 								.add(-subDays,'days')
// 							   .add(-subHrs,'hours')
// 							   .add(-subMins,'minutes')
// 							   .add(-secs,'seconds')
// 							   .valueOf()
// 	return WeekStartStamp
// }



// getNumberOfDaysSinceStartofWeek = (dayOfWeek) => {
// 	switch(dayOfWeek){
// 		case 'Sunday':
// 			return 0
// 		case 'Monday':
// 			return 1
// 		case 'Tuesday':
// 			return 2
// 		case 'Wednesday':
// 			return 3
// 		case 'Thursday':
// 			return 4
// 		case "Friday":
// 			return 5
// 		case 'Saturday':
// 			return 6
// 		default:
// 			return 0
// 	}
// }

class WeekScheduleSection extends React.Component {

	state = {
		schedules:[],
		displayedScheduleSequence:0
	}

	printSchedule = (weekSchedule) => {
		const parsedSchedule = Object.entries(weekSchedule).reduce((f,x)=>{
			f[x[0]] ? f[x[0]] = [...x[1], ...x[1].map(t =>  {
				return { start: moment(t['start-time']).format('dddd HH mm ss') , end: moment(t['end-time']).format('dddd HH mm ss') }
			})] :
			f[x[0]] = x[1].map(t => {
				return { start: moment(t['start-time']).format('dddd HH mm ss') , end: moment(t['end-time']).format('dddd HH mm ss') }
			})
			return f
		},{})
		console.log(JSON.stringify(parsedSchedule,null,4))
	}

	componentDidMount(){
		console.log(this.props.weekSchedule)
		if(!this.props.weekSchedule.data){
			return
		}
		// this.printSchedule(this.props.weekSchedule.data)

		// const weekStartTime = this.getWeekStartStamp(Date.now())
		// const sortByDays = this.getListByDays(this.props.weekSchedule)
		const organizedData = this.sortSchedule(this.props.weekSchedule)
		console.log(organizedData)
		const schedules = [
			{ key: 'morning',sequence:-1, value : <MorningSchedule data={organizedData} /> },
			{ key: 'afternoon',sequence:0,value: <AfternoonSchedule data={organizedData} /> },
			{ key:'evening',sequence:1,value: <EveningSchedule data={organizedData} /> },
		]
		console.log(schedules)
		this.setState({ schedules })
	}

	onNextWeekSchedule = () => {
			// this.setState({ schedules:[] })
	}

	onPreviousWeekSchedule = () => {
		// this.setState({ schedules:[] })
	}

	getListByDays = (weekSchedule) => {
		const denormalized = Object.values(weekSchedule).reduce((grouper,time) => {
			const dayOfWeek = moment(time['start-time']).format('dddd')
			switch(dayOfWeek){
				case 'Sunday':{
					grouper['sun'] ? grouper['sun'] = [ ...grouper['sun'], time ] : grouper['sun'] = time
					return grouper
				}
				case 'Monday':{
					grouper['mon'] ? grouper['mon'] = [ ...grouper['mon'], time ] : grouper['mon'] = time
					return grouper
				}
				case 'Tuesday':{
					grouper['tue'] ? grouper['tue'] = [ ...grouper['tue'], time ] : grouper['tue'] = time
					return grouper
				}
				case 'Wednesday':{
					grouper['wed'] ? grouper['wed'] = [ ...grouper['wed'], time ] : grouper['wed'] = time
					return grouper
				}
				case 'Thursday':{
					grouper['thu'] ? grouper['thu'] = [ ...grouper['thu'], time ] : grouper['thu'] = time
					return grouper
				}
				case "Friday":{
					grouper['fri'] ? grouper['fri'] = [ ...grouper['fri'], time ] : grouper['fri'] = time
					return grouper
				}
				case 'Saturday':{
					grouper['sat'] ? grouper['sat'] = [ ...grouper['sat'], time ] : grouper['sat'] = time
					return grouper
				}
				default:
					return grouper
			}
		},{})

		console.log(denormalized.sun)

		// this.printSchedule(denormalized.sun)
	}

	getDayStartDayTime = (anyTime) => {
		// let anyTime = Date.now()
		const dayOfWeek = moment(anyTime).format('dddd')
		let hrs = moment(anyTime).format('HH')
		let mins = moment(anyTime).format('mm')
		let secs = moment(anyTime).format('ss')

		// let subDays = this.getNumberOfDaysSinceStartofWeek(dayOfWeek)

		let subHrs = parseInt(hrs)
		// console.log(subHrs)

		let subMins = parseInt(mins)
		// console.log(subMins)

		let subSecs = parseInt(secs)
		// console.log(secs)

		let startDayTimeStamp = moment(anyTime)
								   .add(-subHrs,'hours')
								   .add(-subMins,'minutes')
								   .add(-secs,'seconds')
								   .valueOf()
		return startDayTimeStamp
	}


	getParticularDayData = (dayFullSchedule) => {
		if(!dayFullSchedule){
			return { morningData:[], afternoonData:[], eveningData:[]  }
		}
		const startTime = this.getDayStartDayTime(dayFullSchedule[0]['start-time'])
		if(!dayFullSchedule[0]['start-time']){
			return { morningData:[], afternoonData:[], eveningData:[]  }
		}
		const timestamp8AM = moment(startTime).add(8,'hours').valueOf()
		const timestamp4PM = moment(timestamp8AM).add(8,'hours').valueOf()
		const timestamp12AM = moment(timestamp4PM).add(8,'hours').valueOf()

		const morningData = dayFullSchedule.filter(time => time['end-time'] > startTime && time['end-time'] <= timestamp8AM )
		const afternoonData = dayFullSchedule.filter(time => time['end-time'] > timestamp8AM && time['end-time'] <= timestamp4PM )
		const eveningData = dayFullSchedule.filter(time => time['end-time'] > timestamp4PM && time['end-time'] <= timestamp12AM )

		return { morningData,afternoonData,eveningData }
	}

	sortSchedule = (weekSchedule) => {
		console.log(weekSchedule)
		const sunData = this.getParticularDayData(weekSchedule.data.sun)
		const monData = this.getParticularDayData(weekSchedule.data.mon)
		const tueData = this.getParticularDayData(weekSchedule.data.tue)
		const wedData = this.getParticularDayData(weekSchedule.data.wed)
		const thursData = this.getParticularDayData(weekSchedule.data.thu)
		const friData = this.getParticularDayData(weekSchedule.data.fri)
		const satData = this.getParticularDayData(weekSchedule.data.sat)

		return { sunData,monData,tueData,wedData,thursData,friData,satData }
	}

	onIncreseSequence = () => {
		if(this.state.displayedScheduleSequence === 1){
			return
		}
		this.setState({ displayedScheduleSequence: this.state.displayedScheduleSequence + 1 })
	}

	onDecreaseSequence = () => {
		if(this.state.displayedScheduleSequence === -1){
			return
		}
		this.setState({ displayedScheduleSequence: this.state.displayedScheduleSequence - 1 })
	}

	render() {
		const activeSchedule = this.state.schedules.filter(x => x.sequence === this.state.displayedScheduleSequence )[0]
		console.log(activeSchedule)

		return (
				<Grid>
					 <Grid.Row centered textAlign='left'>
						<Grid.Column width={12}>
							<p className='heading' >Week Schedule</p>
						</Grid.Column>
					</Grid.Row>

					{
						<Grid.Row centered>
							<Grid.Column width={1} style={{ marginTop:'20%' }} >
								<Icon name='caret left' size={'huge'} color={'yellow'} onClick={this.onPreviousWeekSchedule} />
							</Grid.Column>

							<Grid.Column width={10} className = 'bar-chart' >
								<Icon name='caret up' size={'huge'} color={'yellow'} onClick={this.onDecreaseSequence} />
								{ activeSchedule?
									activeSchedule.value
									:
									<div>No Schedule for this week yet.</div>
								}
								<Icon name='caret down' size={'huge'} color={'yellow'} onClick={this.onIncreseSequence} />

							</Grid.Column>

							<Grid.Column width={1} style={{ marginTop:'20%' }} >
								<Icon name='caret right' size={'huge'} color={'yellow'} onClick={this.onNextWeekSchedule} />
							</Grid.Column>

						</Grid.Row>

					}


				</Grid>
			)
	}
}

const mapStateToProps = ( {dashboard} ) => {
	let { weekSchedule } = dashboard
	// seed schedule
	// weekSchedule = {
	// 	"previous_week": "https://classporch.com/api/v1/user/:user_id/sessions?timestamp=298328732889",
	// 	"data": {
	// 		"sun":[{
	// 			['start-time']": 1506825000000,
	// 			"end-time": 1506828600000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		},{
	// 			['start-time']": 1506846600000,
	// 			"end-time": 1506853800000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		}],
	// 		"mon":[{
	// 			['start-time']": 1506918600000,
	// 			"end-time": 1506922200000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		},{
	// 			['start-time']": 1506947400000,
	// 			"end-time": 1506958200000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		}],
	// 		"tue":[{
	// 			['start-time']": 1507012200000,
	// 			"end-time": 1507019400000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		},
	// 		// {
	// 		// 	['start-time']": 8271628716782,
	// 		// 	"end-time": 2873782687263,
	// 		// 	"student": {
	// 		// 		"id": 273,
	// 		// 		"full_name": "Flurry Makes",
	// 		// 		"profile_picture": "some://url",
	// 		// 		"type": "student"
	// 		// 	}
	// 		// }
	// 		],
	// 		"wed":[{
	// 			['start-time']": 1507069800000,
	// 			"end-time": 1507077000000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		},{
	// 			['start-time']": 1507087800000,
	// 			"end-time": 1507091400000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		}],
	// 		"thu":[{
	// 			['start-time']": 1507195800000,
	// 			"end-time": 1507206600000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		},
	// 		// {
	// 		// 	['start-time']": 8271628716782,
	// 		// 	"end-time": 2873782687263,
	// 		// 	"student": {
	// 		// 		"id": 273,
	// 		// 		"full_name": "Flurry Makes",
	// 		// 		"profile_picture": "some://url",
	// 		// 		"type": "student"
	// 		// 	}
	// 		// }
	// 		],
	// 		"fri":[{
	// 			['start-time']": 1507257000000,
	// 			"end-time": 1507260600000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		},
	// 		{
	// 			['start-time']": 1507296600000,
	// 			"end-time": 1507303800000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		}
	// 		],
	// 		"sat":[{
	// 			['start-time']": 1507354200000,
	// 			"end-time": 1507357800000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		},{
	// 			['start-time']": 1507365000000,
	// 			"end-time": 1507372200000,
	// 			"student": {
	// 				"id": 273,
	// 				"full_name": "Flurry Makes",
	// 				"profile_picture": "some://url",
	// 				"type": "student"
	// 			}
	// 		}]
	// 	},
	// 	"next_week": "https://classporch.com/api/v1/user/:user_id/sessions?timestamp=298328732889"
	// }

	console.log(weekSchedule)

	return { weekSchedule }
}


export default connect(mapStateToProps, {  })(WeekScheduleSection);



/*


times for sunday
=================
"Sunday, October 01 2017 08 00 00 AM"
1506825000000
"Sunday, October 01 2017 09 00 00 AM"
1506828600000
"Sunday, October 01 2017 14 00 00 PM"
1506846600000
"Sunday, October 01 2017 16 00 00 PM"
1506853800000

times for monday
==================

"Monday, October 02 2017 10 00 00 AM"
1506918600000
"Monday, October 02 2017 11 00 00 AM"
1506922200000
"Monday, October 02 2017 18 00 00 PM"
1506947400000
"Monday, October 02 2017 21 00 00 PM"
1506958200000


times for tueday
======================


"Tuesday, October 03 2017 12 00 00 PM"
1507012200000
"Tuesday, October 03 2017 14 00 00 PM"
1507019400000

times for wednesday
===================
"Wednesday, October 04 2017 04 00 00 AM"
1507069800000
"Wednesday, October 04 2017 06 00 00 AM"
1507077000000
"Wednesday, October 04 2017 09 00 00 AM"
1507087800000
"Wednesday, October 04 2017 10 00 00 AM"
1507091400000

times for thurday
================

//missed
Thursday, October 05 2017 18 00 00 PM"
1507206600000


friday
================
"Friday, October 06 2017 08 00 00 AM"
1507257000000
"Friday, October 06 2017 09 00 00 AM"
1507260600000


"Friday, October 06 2017 19 00 00 PM"
1507296600000
"Friday, October 06 2017 21 00 00 PM"
1507303800000


saturday
================

"Saturday, October 07 2017 11 00 00 AM"
1507354200000
"Saturday, October 07 2017 12 00 00 PM"
1507357800000
"Saturday, October 07 2017 14 00 00 PM"
1507365000000
"Saturday, October 07 2017 16 00 00 PM"
1507372200000

*/

/* Version 2 */

import React from 'react';
import {Grid,Icon} from 'semantic-ui-react';
import './styles.css';
import { connect } from 'react-redux';
import { MorningSchedule, AfternoonSchedule, EveningSchedule } from './charts'
import moment from 'moment'


class WeekScheduleSection extends React.Component {

  state = {
    schedules:[],
    displayedScheduleSequence:0
  }

  componentDidMount(){
    console.log(this.props.weekSchedule.data)
    if(!this.props.weekSchedule.data){
      return
    }
    const parsedSchedule = Object.entries(this.props.weekSchedule.data).reduce((f,x)=>{
      f[x[0]] ? f[x[0]] = [...x[1], ...x[1].map(t => {
          return { start: moment(t['start-time']).format('HH mm ss'), end: moment(t['end-time']).format('HH mm ss') }
        })] :
        f[x[0]] = x[1].map(t => {
          return { start: moment(t['start-time']).format('HH mm ss'), end: moment(t['end-time']).format('HH mm ss') }
        })

      return f
    },{})
    console.log(parsedSchedule)
    const organizedData = this.sortSchedule(this.props.weekSchedule)
    console.log(organizedData)
    const schedules = [
      { key: 'morning',sequence:-1, value : <MorningSchedule data={organizedData} /> },
      { key: 'afternoon',sequence:0,value: <AfternoonSchedule data={organizedData} /> },
      { key:'evening',sequence:1,value: <EveningSchedule data={organizedData} /> },
    ]
    console.log(schedules)
    this.setState({ schedules })
  }

  onFetchPreviousWeek = () => {

  }

  onFetchNextWeek = () => {

  }

  getDayStartDayTime = (anyTime) => {
    // let anyTime = Date.now()
    let hrs = moment(anyTime).format('HH')
    let mins = moment(anyTime).format('mm')
    let secs = moment(anyTime).format('ss')

    let subHrs = parseInt(hrs)
    // console.log(subHrs)

    let subMins = parseInt(mins)
    // console.log(subMins)

    let subSecs = parseInt(secs)
    // console.log(secs)

    let startDayTimeStamp = moment(anyTime)
      .add(-subHrs,'hours')
      .add(-subMins,'minutes')
      .add(-secs,'seconds')
      .valueOf()
    return startDayTimeStamp
  }


  getParticularDayData = (dayFullSchedule) => {
    if(!dayFullSchedule){
      return { morningData:[], afternoonData:[], eveningData:[]  }
    }
    const startTime = this.getDayStartDayTime(dayFullSchedule[0]['start-time'])
    if(!dayFullSchedule[0]['start-time']){
      return { morningData:[], afternoonData:[], eveningData:[]  }
    }
    const timestamp8AM = moment(startTime).add(8,'hours').valueOf()
    const timestamp4PM = moment(timestamp8AM).add(8,'hours').valueOf()
    const timestamp12AM = moment(timestamp4PM).add(8,'hours').valueOf()

    const morningData = dayFullSchedule.filter(time => time['end-time'] > startTime && time['end-time'] <= timestamp8AM )
    const afternoonData = dayFullSchedule.filter(time => time['end-time'] > timestamp8AM && time['end-time'] <= timestamp4PM )
    const eveningData = dayFullSchedule.filter(time => time['end-time'] > timestamp4PM && time['end-time'] <= timestamp12AM )

    return { morningData,afternoonData,eveningData }
  }

  sortSchedule = (weekSchedule) => {
    console.log(weekSchedule)
    const sunData = this.getParticularDayData(weekSchedule.data.sun)
    const monData = this.getParticularDayData(weekSchedule.data.mon)
    const tueData = this.getParticularDayData(weekSchedule.data.tue)
    const wedData = this.getParticularDayData(weekSchedule.data.wed)
    const thursData = this.getParticularDayData(weekSchedule.data.thu)
    const friData = this.getParticularDayData(weekSchedule.data.fri)
    const satData = this.getParticularDayData(weekSchedule.data.sat)

    return { sunData,monData,tueData,wedData,thursData,friData,satData }
  }

  onIncreseSequence = () => {
    if(this.state.displayedScheduleSequence === 1){
      return
    }
    this.setState({ displayedScheduleSequence: this.state.displayedScheduleSequence + 1 })
  }

  onDecreaseSequence = () => {
    if(this.state.displayedScheduleSequence === -1){
      return
    }
    this.setState({ displayedScheduleSequence: this.state.displayedScheduleSequence - 1 })
  }

  render() {
    const activeSchedule = this.state.schedules.filter(x => x.sequence === this.state.displayedScheduleSequence )[0]
    console.log(activeSchedule)

    return (
      <Grid>
        <Grid.Row centered textAlign='left'>
          <Grid.Column width={12}>
            <p className='heading' >Week Schedule</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={1} style={{ marginTop:'20%' }} >
            <Icon name='caret left' size={'huge'} color={'yellow'} onClick={this.OnFetchPreviousWeek} />
          </Grid.Column>

          <Grid.Column width={10} className = 'bar-chart' >
            <Icon name='caret up' size={'huge'} color={'yellow'} onClick={this.onDecreaseSequence} />
            { activeSchedule? activeSchedule.value : null }
            <Icon name='caret down' size={'huge'} color={'yellow'} onClick={this.onIncreseSequence} />

          </Grid.Column>

          <Grid.Column width={1} style={{ marginTop:'20%' }} >
            <Icon name='caret right' size={'huge'} color={'yellow'} onClick={this.onFetchNextWeek} />
          </Grid.Column>

        </Grid.Row>


      </Grid>
    )
  }
}

const mapStateToProps = ( {dashboard} ) => {
  let { weekSchedule } = dashboard
  // seed schedule
  // weekSchedule = {
  // 	"previous_week": "https://classporch.com/api/v1/user/:user_id/sessions?timestamp=298328732889",
  // 	"data": {
  // 		"sun":[{
  // 			['start-time']": 1506825000000,
  // 			"end-time": 1506828600000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		},{
  // 			['start-time']": 1506846600000,
  // 			"end-time": 1506853800000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		}],
  // 		"mon":[{
  // 			['start-time']": 1506918600000,
  // 			"end-time": 1506922200000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		},{
  // 			['start-time']": 1506947400000,
  // 			"end-time": 1506958200000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		}],
  // 		"tue":[{
  // 			['start-time']": 1507012200000,
  // 			"end-time": 1507019400000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		},
  // 		// {
  // 		// 	['start-time']": 8271628716782,
  // 		// 	"end-time": 2873782687263,
  // 		// 	"student": {
  // 		// 		"id": 273,
  // 		// 		"full_name": "Flurry Makes",
  // 		// 		"profile_picture": "some://url",
  // 		// 		"type": "student"
  // 		// 	}
  // 		// }
  // 		],
  // 		"wed":[{
  // 			['start-time']": 1507069800000,
  // 			"end-time": 1507077000000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		},{
  // 			['start-time']": 1507087800000,
  // 			"end-time": 1507091400000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		}],
  // 		"thu":[{
  // 			['start-time']": 1507195800000,
  // 			"end-time": 1507206600000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		},
  // 		// {
  // 		// 	['start-time']": 8271628716782,
  // 		// 	"end-time": 2873782687263,
  // 		// 	"student": {
  // 		// 		"id": 273,
  // 		// 		"full_name": "Flurry Makes",
  // 		// 		"profile_picture": "some://url",
  // 		// 		"type": "student"
  // 		// 	}
  // 		// }
  // 		],
  // 		"fri":[{
  // 			['start-time']": 1507257000000,
  // 			"end-time": 1507260600000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		},
  // 		{
  // 			['start-time']": 1507296600000,
  // 			"end-time": 1507303800000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		}
  // 		],
  // 		"sat":[{
  // 			['start-time']": 1507354200000,
  // 			"end-time": 1507357800000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		},{
  // 			['start-time']": 1507365000000,
  // 			"end-time": 1507372200000,
  // 			"student": {
  // 				"id": 273,
  // 				"full_name": "Flurry Makes",
  // 				"profile_picture": "some://url",
  // 				"type": "student"
  // 			}
  // 		}]
  // 	},
  // 	"next_week": "https://classporch.com/api/v1/user/:user_id/sessions?timestamp=298328732889"
  // }

  console.log(weekSchedule)

  return { weekSchedule }
}


export default connect(mapStateToProps, {  })(WeekScheduleSection);



/*


times for sunday
=================
"Sunday, October 01 2017 08 00 00 AM"
1506825000000
"Sunday, October 01 2017 09 00 00 AM"
1506828600000
"Sunday, October 01 2017 14 00 00 PM"
1506846600000
"Sunday, October 01 2017 16 00 00 PM"
1506853800000

times for monday
==================

"Monday, October 02 2017 10 00 00 AM"
1506918600000
"Monday, October 02 2017 11 00 00 AM"
1506922200000
"Monday, October 02 2017 18 00 00 PM"
1506947400000
"Monday, October 02 2017 21 00 00 PM"
1506958200000


times for tueday
======================


"Tuesday, October 03 2017 12 00 00 PM"
1507012200000
"Tuesday, October 03 2017 14 00 00 PM"
1507019400000

times for wednesday
===================
"Wednesday, October 04 2017 04 00 00 AM"
1507069800000
"Wednesday, October 04 2017 06 00 00 AM"
1507077000000
"Wednesday, October 04 2017 09 00 00 AM"
1507087800000
"Wednesday, October 04 2017 10 00 00 AM"
1507091400000

times for thurday
================

//missed
Thursday, October 05 2017 18 00 00 PM"
1507206600000


friday
================
"Friday, October 06 2017 08 00 00 AM"
1507257000000
"Friday, October 06 2017 09 00 00 AM"
1507260600000


"Friday, October 06 2017 19 00 00 PM"
1507296600000
"Friday, October 06 2017 21 00 00 PM"
1507303800000


saturday
================

"Saturday, October 07 2017 11 00 00 AM"
1507354200000
"Saturday, October 07 2017 12 00 00 PM"
1507357800000
"Saturday, October 07 2017 14 00 00 PM"
1507365000000
"Saturday, October 07 2017 16 00 00 PM"
1507372200000

































*/