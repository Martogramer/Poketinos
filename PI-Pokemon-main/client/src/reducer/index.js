

export const rootReducer=(state=initialState, action)=>{
    switch(action.type){
        case 'GET_TYPE':
            return{
                ...state,
                pokemonsTypes: action.payload
            }
        case 'GET_POKEMONS':
            state.pokemonsFilter=[];
            return{
                ...state,
                pokemonsTotal: action.payload
            }
        case 'GET_POKEMON_NAME':
            return{
                ...state,
                pokemonsFilter: action.payload
            }
        case 'GET_POKEMON_DETAIL':
            return{
                ...state,
                pokemonDetail: action.payload
            }
        case 'POKEMON_FILTER_TYPE':
            return{
                ...state,
                pokemonsFilter: action.payload
            }
            
            case 'FILTER':{
                if(action.order ==='none')return{
                    ...state,
                    loads:[]
            }
                if(action.order === 'ASC'){
                    return{
                    ...state,
                    loads: [...state.loads].sort((a,b) => {if (a[action.fil] > b[action.fil]){
                        return 1;
                    }
                    if (a[action.fil] < b[action.fil]) {
                        return -1;
                    }
                    return 0;})
            }}
                else if(action.order === 'DESC'){
                    return{
                        ...state,
                        loads: [...state.loads].sort((a,b) => {if (a[action.fil] < b[action.fil]) {
                            return 1;
                        }
                        if (a[action.fil] > b[action.fil]) {
                            return -1;
                        }
                        return 0;})
                }
            }
            return{
                ...state,
                loads: [...state.all]
            }
            }

            case 'FILTERCREATE':{
                if(action.fil === 'cre'){
                return{
                    ...state,
                    loads:[...state.all].filter(e => {
                        if(typeof e.id === 'string'){
                        return true;
                    }
                return false;})
            }}
            else if(action.fil === 'ncre'){
                return{
                    ...state,
                    loads:[...state.all].filter(e => {
                        if(typeof e.id === 'number'){
                            return true;
                        }
                    return false;})
                }
            }
            break;
        }
        
        default: return state;
    }
};

const initialState={
    pokemonsTotal: [],
    pokemonDetail: {},
    pokemonsTypes: [],
    pokemonsFilter: []
};
