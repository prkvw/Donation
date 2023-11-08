import React from 'react';
import {Header} from '../components';
import {ScheduleComponent, ViewsDirective,ViewDirective, Day, Week, Workweek,Month,Agenda,Inject,Resize,DragandDrop} from '@syncfusion/ej2-react-schedule';
import PropTypes from 'prop-types'

const Calendar = props => {
  return (
    <div className= "m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="App" title="Calendar" /> 
        <ScheduleComponent>

        </ScheduleComponent>
        </div>
  )
}

Calendar.propTypes = {}

export default Calendar