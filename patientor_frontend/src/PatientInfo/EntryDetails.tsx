import React from 'react';
import {Entry, EntryType} from '../types';
import {Icon} from 'semantic-ui-react';
import {SemanticCOLORS, SemanticICONS} from 'semantic-ui-react/dist/commonjs/generic';
import {useStateValue} from '../state';

const EntryDetails: React.FC<{entry: Entry}> = ({entry})=>{
    const [state] = useStateValue();
    let entryIconName: SemanticICONS;
    const ratingColors: SemanticCOLORS[] = ['green', 'blue', 'yellow', 'red'];

    function assertNever(value: never): never {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
    }

    switch (entry.type){
        case EntryType.HealthCheck:{
            entryIconName = 'doctor';
            break;
        }
        case EntryType.Hospital:{
            entryIconName = 'hospital symbol';
            break;
        }
        case EntryType.OccupationalHealthcare:{
            entryIconName='stethoscope';
            break;
        }
        default:
            assertNever(entry);
    }

    return(
        <div style={{border: '1px solid gray', borderRadius: '2px', margin: '5px', padding: '4px'}}>
            <div>{entry.date} <Icon name={entryIconName}/></div>
            <p>{entry.description}</p>
            <ul>
                {entry.diagnosisCodes?.map(code =>
                    <li key={code}>{code} {state.diagnosis[code].name}</li>
                )}
            </ul>
            {entry.type==='HealthCheck' && <Icon name='heart' color={ratingColors[entry.healthCheckRating]}/>}
        </div>
    )
}

export default EntryDetails;