import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvent: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: ( state, { payload = [] }) => {
      state.isLoadingEvent = false;
      payload.forEach(event => {
        const exists = state.events.some(dbEvent => dbEvent.id === event.id);
        if( !exists) {
          state.events.push( event );
        }
      });
    },
    onLogoutCalendar: ( state ) => {
      console.log(state)
      state.events = [],
      state.activeEvent = null,
      state.isLoadingEvent = false;
    }
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } =
  calendarSlice.actions;
