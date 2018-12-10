import React from 'react'
import moment from "moment";

import dates from 'date-arithmetic'

import BigCalendar from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'

const localizer = BigCalendar.momentLocalizer(moment)


class MyWeek extends React.Component {
  render() {
    let { date } = this.props
    let range = MyWeek.range(date)

    return <TimeGrid {...this.props} range={range} eventOffset={15} />
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

let ClientView = ({ localizer }) => (
  <React.Fragment>
    <BigCalendar
      
      localizer={localizer}
      defaultView={BigCalendar.Views.WEEK}
      defaultDate={new Date()}
      views={{ month: true, week: MyWeek }}
    />
  </React.Fragment>
)

export default ClientView