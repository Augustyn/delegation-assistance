import { ACTIONS } from "../actions/checklistTemplate.action";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { toast } from "react-toastify";
import { notify } from "../helpers/notifications";

const initialState = {
  fetching: false,
  globalTemplate: [],
  umodifiedTemplate: [],
  error: null
};

const arrayMove = (array, from, to) => {
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
};

const updatePriority = array => {
  for (let index = 0; index < array.length; index++) {
    array[index].priority = index + 1;
  }
  return array;
};

const checklistTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.GET_GLOBAL_TEMPLATE}_${PENDING}`:
    case `${ACTIONS.SAVE_GLOBAL_TEMPLATE}_${PENDING}`:
      return {
        ...state,
        fetching: true
      };

    case `${ACTIONS.GET_GLOBAL_TEMPLATE}_${FULFILLED}`:
    case `${ACTIONS.SAVE_GLOBAL_TEMPLATE}_${FULFILLED}`: {
      const template = action.payload.data.activities.sort((a, b) => a.priority - b.priority);
      return {
        ...state,
        fetching: false,
        globalTemplate: template,
        umodifiedTemplate: template
      };
    }

    case `${ACTIONS.GET_GLOBAL_TEMPLATE}_${REJECTED}`:
    case `${ACTIONS.SAVE_GLOBAL_TEMPLATE}_${REJECTED}`: {
      notify(`Error during template processing: ${action.payload.response.data.errorMessage}`, toast.TYPE.ERROR);
      return {
        ...state,
        fetching: false,
        errors: action.payload.response.data,
        globalTemplate: state.umodifiedTemplate
      };
    }

    case ACTIONS.REORDER_GLOBAL_TEMPLATE:
      return {
        ...state,
        globalTemplate: updatePriority(
          arrayMove([...state.globalTemplate], action.payload.oldIndex, action.payload.newIndex)
        )
      };
    case ACTIONS.RESTORE_GLOBAL_TEMPLATE:
      return {
        ...state,
        globalTemplate: state.umodifiedTemplate
      };
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        globalTemplate: updatePriority([
          ...state.globalTemplate.filter(task => state.globalTemplate.indexOf(task) !== action.payload.index)
        ])
      };
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        globalTemplate: updatePriority([{ ...action.payload }].concat(...state.globalTemplate))
      };
    case ACTIONS.EDIT_TASK:
      return {
        ...state,
        globalTemplate: [
          ...state.globalTemplate
            .filter(task => task.id !== action.payload.id)
            .concat({ ...action.payload })
            .sort((a, b) => a.priority - b.priority)
        ]
      };

    default:
      return state;
  }
};

export default checklistTemplateReducer;
