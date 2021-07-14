import{ CREATE_ORDER_REQUEST, CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS,
    MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants';


export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading : false
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading : false,
                product : action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading : true,
                error : action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
};


