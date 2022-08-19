import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from '../api'
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

  const distpatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = (calendarEvent) => {
    distpatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {

    try {

      if (calendarEvent.id) {
        await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
        distpatch( onUpdateEvent({ ...calendarEvent, user }) );
        return;
      }

      const { data } = await calendarApi.post('/events', calendarEvent);
      distpatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
      
    } catch (error) {
      console.log(error);
      Swal.fire('Wrong', error.response.data?.msg, 'error');
    }

  };

  const startDeletingEvent = async () => {

    try {
      await calendarApi.delete(`/events/${ activeEvent.id }`);
      distpatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Wrong', error.response.data?.msg, 'error');
    }
  };

  const startLoadingEvents = async() => {

    try {

      const { data } = await calendarApi.get('/events');

      const events = convertEventsToDateEvents( data.events );
      distpatch( onLoadEvents(events) )
      
    } catch (error) {
        console.log('error to load events');
        console.log(error);
    }

  }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent && activeEvent.id,

    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  };
};
