import React from 'react';
import Part from './Part';
import {CoursePart} from '../types';


const Content: React.FC<{ courseParts: CoursePart[] }> = ({courseParts}) => {
    return (
        <div>
            {
                courseParts.map(cp =>
                    <div key={cp.name}>
                        <Part cp={cp}/>
                    </div>
                )
            }
        </div>
    );
};

export default Content;