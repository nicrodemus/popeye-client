import React from 'react'
import dates from 'date-arithmetic'
import events from './events'
import BigCalendar from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import moment from "moment"




class MyWeek extends React.Component {
  render() {
    let { date } = this.props
    let range = MyWeek.range(date)

    return <TimeGrid {...this.props} range={range} eventOffset={15} 
    />
  }
}



MyWeek.range = date => {
  let start = date
  let end = dates.add(start, 2, 'day')

  let current = start
  let range = []

  while (dates.lte(current, end, 'day')) {
    range.push(current)
    current = dates.add(current, 1, 'day')
  }

  return range
}

MyWeek.navigate = (date, action) => {
  switch (action) {
    case BigCalendar.Navigate.PREVIOUS:
      return dates.add(date, -3, 'day')

    case BigCalendar.Navigate.NEXT:
      return dates.add(date, 3, 'day')

    default:
      return date
  }
}

MyWeek.title = date => {
  return `My awesome week: ${date.toLocaleDateString()}`
}




class CustomView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "days")),
          title: "Event example"
        }
      ]
     }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('Name your appointement')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  };


  onSelectEvent(pEvent) {
    const r = window.confirm("Would you like to remove this event?")
    if(r === true){
      
      this.setState((prevState, props) => {
        const events = [...prevState.events]
        const idx = events.indexOf(pEvent)
        events.splice(idx, 1);
        return { events };
      });
    }
  }



  render() { 
    const localizer = BigCalendar.momentLocalizer(moment);// or globalizeLocalizer
    return ( 
      <BigCalendar
      min={new Date(2017, 10, 0, 9, 0, 0)}
      max={new Date(2017, 10, 0, 18, 0, 0)} 
      selectable
      localizer={localizer}
      defaultDate={new Date()}
      defaultView={BigCalendar.Views.WEEK}
      views={{week: MyWeek }}
      events={this.state.events}
      style={{ height: "350px", width: "500px" }}
      onSelectEvent = {event => this.onSelectEvent(event)}
      onSelectSlot={this.handleSelect}
      resizable
      selectRangeFormat= {({start, end}, culture, localizer) =>
      localizer.format(start, { date: 'short' }, culture) + ' — ' +
      localizer.format(end, { date: 'short' }, culture)
  }
    />
     );
  }
}
 
export default CustomView;





