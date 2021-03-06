import {
  SIGN_IN_OK, 
  SIGN_OUT_OK, 
  CREATE_STREAM, 
  FETCH_STREAMS, 
  FETCH_STREAM, 
  DELETE_STREAM, 
  EDIT_STREAM} 
  from './types'

  import history from "../history"
import streamsapi from "../api/streamsapi"

export const signInOK = (userId) => {
  return {
    type: SIGN_IN_OK,
    payload: userId
  }
}

export const signOutOK = () => {
  return {
    type: SIGN_OUT_OK,
  }
}

export const createStream = (formValues) => async (dispatch, getState )=> {
  const {userId} = getState().auth
  const response = await streamsapi.post('/streams', {...formValues, userId})
  dispatch({type: CREATE_STREAM, payload: response.data})
  history.push('/')
  
}

export const fetchStreams = () => async dispatch => {
  const response = await streamsapi.get('/streams')
  dispatch({type: FETCH_STREAMS, payload:response.data})
  
}

export const fetchStream = (id) => async dispatch => {
  const response = await streamsapi.get(`/streams/${id}`)
  dispatch({type: FETCH_STREAM, payload:response.data})
}

export const editStream = (id, formValues) => async dispatch => {
  const response = await streamsapi.patch(`/streams/${id}`, formValues)
  dispatch({type: EDIT_STREAM, payload: response.data})
  history.push('/')

}

export const deleteStream = (id) => async dispatch => {
  await streamsapi.delete(`/streams/${id}`)
  dispatch({type: DELETE_STREAM, payload: id})
  history.push('/')
}