import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { formatEvents } from "../helpers/formatEvents";

export const setActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventActiveUpdate = (event) => ({
  type: types.eventActiveUpdate,
  payload: event,
});

export const eventDeleted = (event) => ({
  type: types.eventDeleted,
});

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchConToken("/events", event, "POST");
      const body = await resp.json();
      console.log(body);

      if (body.ok) {
        event.id = body.evento._id;
        event.user = { uid: uid, name: name };

        console.log(event);

        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("/events");
      const body = await resp.json();
      const events = formatEvents(body.msg);

      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});


