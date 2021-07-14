import axios from "axios";
import {
  LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,
  REGISTER_USER_SUCCESS,REGISTER_USER_FAIL,REGISTER_USER_REQUEST,
  LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST,
  UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,NEW_PASSWORD_SUCCESS,NEW_PASSWORD_FAIL,
  LOGOUT_SUCCESS, LOGOUT_FAIL,
  CLEAR_ERRORS
} from "../constants/userConstants";

// REGISTER

export const register = (userData) => async (dispatch) => {
  try {

      dispatch({ type: REGISTER_USER_REQUEST })

      const config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }

      const { data } = await axios.post('/api/register', userData, config)

      dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: data.user
      })

  } catch (error) {
      dispatch({
          type: REGISTER_USER_FAIL,
          payload: error.response.data.message
      })
  }
}

// LOGIN

export const login = (email, password) => async (dispatch) => {
  try {

      dispatch({ type: LOGIN_REQUEST })

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const { data } = await axios.post('/api/login', { email, password }, config)

      dispatch({
          type: LOGIN_SUCCESS,
          payload: data.user
      })

  } catch (error) {
      dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data.message
      })
  }
}



// LOAD USER(to avoid changing state while refreshing page(user wont logOut))

export const loadUser = () => async (dispatch) => {
  try {

      dispatch({ type: LOAD_USER_REQUEST })

      const { data } = await axios.get('/api/profile')

      dispatch({
          type: LOAD_USER_SUCCESS,
          payload: data.user
      })

  } catch (error) {
      dispatch({
          type: LOAD_USER_FAIL,
          payload: error.response.data.message
      })
  }
}


// UPDATE USER PROFILE

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.put("/api//profile/update", userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({

      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message
    });
  }
};


// UPDATE USER PASSWORD

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.put("/api//password/update", passwords, config);

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({

      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message
    });
  }
};



// FORGOT USER PASSWORD

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post("/api/password/forgot", email, config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({

      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message
    });
  }
};


// PASSWORD RESET

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {

      dispatch({ type: NEW_PASSWORD_REQUEST })

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const { data } = await axios.put(`/api/password/reset/${token}`, passwords, config)

      dispatch({
          type: NEW_PASSWORD_SUCCESS,
          payload: data.success
      })

  } catch (error) {
      dispatch({
          type: NEW_PASSWORD_FAIL,
          payload: error.response.data.message
      })
  }
}


// USER LOGOUT

export const logout = () => async (dispatch) => {
  try {

    await axios.get("/api/logout");

    dispatch({
      type: LOGOUT_SUCCESS,
      product:null
    });
  } catch (error) {

    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// CLEAR ERRORS

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
