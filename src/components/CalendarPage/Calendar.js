import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import Toolbar from 'react-big-calendar';
import axios from 'axios'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = Calendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);


class CalendarPage extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Event example"
      }
    ]
  };
  
  

  handleSelect = ({ start, end }) => {
    const title = window.prompt('Name your appointement');
    const tattoistId= this.props.currentUser._id;
    const startDate = start;
    const endDate = end;
    if (title){
      const slot = {startDate, endDate, title}
      axios.post(`/eventcreated/${tattoistId}`, slot, {withCredentials: true} )
      .then(response => {
        
        this.setState({
          events: [
            ...this.state.events,
            {
              start: startDate,
              end: endDate,
              title,
            },
          ],
        })
      })
      .catch(err => console.log(err))
    }
  };

  onSelectEvent(pEvent) {
    const shouldBeRemoved = window.confirm("Would you like to remove this event?")
    if(shouldBeRemoved){
      
      this.setState((prevState, props) => {
        const events = [...prevState.events]
        const idx = events.indexOf(pEvent)
        events.splice(idx, 1);
        return { events };
      });
    }
  }

  

  // moveEvent({ event, startDate, endDate, isAllDay: droppedOnAllDaySlot }) {
  //   const { events } = this.state

  //   const idx = events.indexOf(event)
  //   let allDay = event.allDay

  //   if (!event.allDay && droppedOnAllDaySlot) {
  //     allDay = true
  //   } else if (event.allDay && !droppedOnAllDaySlot) {
  //     allDay = false
  //   }

  //   const updatedEvent = { ...event, startDate, endDate, allDay }

  //   const nextEvents = [...events]
  //   nextEvents.splice(idx, 1, updatedEvent)

  //   this.setState({
  //     events: nextEvents,
  //   })

  //   alert(`${event.title} was dropped onto ${updatedEvent.startDate}`)
  // }

  // resizeEvent = ({ event, startDate, endDate }) => {
  //   const { events } = this.state

  //   const nextEvents = events.map(existingEvent => {
  //     return existingEvent.id == event.id
  //       ? { ...existingEvent, startDate, endDate }
  //       : existingEvent
  //   })

  //   this.setState({
  //     events: nextEvents,
  //   })

  //   alert(`${event.title} was resized to ${startDate}-${end}`)
  // }

  // newEvent(event) {
  //   let idList = this.state.events.map(a => a.id)
  //   let newId = Math.max(...idList) + 1
  //   let hour = {
  //     id: newId,
  //     title: 'New Event',
  //     allDay: event.slots.length == 1,
  //     startDate: event.startDate,
  //     endDate: event.end,
  //   }
  //   this.setState({
  //     events: this.state.events.concat([hour]),
  //   })
  // }

  render() {
    return (
      <div className="App">
        <Calendar
          min={new Date(2017, 10, 0, 8, 0, 0)}
          max={new Date(2017, 10, 0, 23, 0, 0)} 
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
           views= {['month', 'day', 'week']}
          events={this.state.events}
          style={{ height: "100vh" }}
          onSelectEvent = {event => this.onSelectEvent(event)}
          onSelectSlot={this.handleSelect}
          
         onEventDrop={event => event.moveEvent}
         resizable
         onEventResize={this.resizeEvent}


    
        />
      </div>
    );
  }
}


export default CalendarPage;