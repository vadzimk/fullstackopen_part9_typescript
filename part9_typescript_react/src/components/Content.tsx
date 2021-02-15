import React from 'react';
import {CoursePart} from '../types';


const Content: React.FC<{ courseParts: CoursePart[] }> = ({courseParts}) => {
    return (
        <div>
            {
                courseParts.map(cp =>
                    <p key={cp.name}>{cp.name} {cp.exerciseCount}</p>
                )
            }
        </div>
    );
};

export default Content;