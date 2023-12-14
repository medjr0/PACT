const initialState = { votesServices: []}

function chooseLanguage(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      const votePlusServiceIndex = state.votesServices.findIndex(item => item[0] === action.value.id)
      if (votePlusServiceIndex == -1) {
        // Le vote est possible seulement si il n'a pas déjà eu lieu
        nextState = {
          ...state,
          votesServices: [...state.votesServices, [action.value.id,1]] //le 1 signifie un vote positif
        }
      }
      return nextState || state
    case 'ADD_MINUS':
      const voteMinusServiceIndex = state.votesServices.findIndex(item => item[0] === action.value.id)
      if (voteMinusServiceIndex == -1) {
      // Le vote est possible seulement si il n'a pas déjà eu lieu
        nextState = {
          ...state,
          votesServices: [...state.votesServices, [action.value.id,-1]] //le 1 signifie un vote positif
      }
    }
    return nextState || state
  default:
    return state
  }
  }

export default addVote
