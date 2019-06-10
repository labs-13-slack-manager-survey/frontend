import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerSingleDateController } from 'react-dates';
import { isSameDay } from 'date-fns';
import parseISO from 'date-fns/parseISO';

const DayPickerComp = props => (
	<div className="report-results-date-picker">
		<DayPickerSingleDateController
			numberOfMonths={1}
			noBorder={true}
			onDateChange={({ _d }) => {
				const day = isSameDay(parseISO(props.clickedDate), _d) ? null : _d;
				props.filter(day, props.clickedResponder);
			}}
			isDayHighlighted={({ _d }) =>
				isSameDay(parseISO(props.clickedDate), _d) ? true : false
			}
		/>
	</div>
);

export default DayPickerComp;
