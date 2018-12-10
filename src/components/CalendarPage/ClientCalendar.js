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

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer



let CustomView =  props  => (
    
    <BigCalendar
      events={events}
      localizer={localizer}
      defaultView={BigCalendar.Views.WEEK}
      defaultDate={new Date()}
      views={{week: MyWeek }}
    />
)

export default CustomView



