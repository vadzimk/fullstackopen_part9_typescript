import React from 'react'
import {CoursePart} from '../types';

const Part: React.FC<{ cp: CoursePart }> = ({cp}) => {
    let paragraph;

    function assertNever(value: never): never {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
    }

    switch (cp.name) {
        case 'Fundamentals':
            paragraph = <p>{cp.name}. {cp.exerciseCount} exercises. {cp.description}</p>;
            break;
        case 'Deeper type usage':
            paragraph =
                <p>{cp.name}. {cp.exerciseCount} exercises. {cp.description} <a href={cp.exerciseSubmissionLink}>Submission
                    link</a></p>;
            break;
        case 'Using props to pass data':
            paragraph = <p>{cp.name}. ${cp.exerciseCount} exercises. ${cp.groupProjectCount} projects.</p>;
            break;
        case 'Nothing':
            paragraph = <p>${cp.name}. ${cp.exerciseCount} exercises. ${cp.description} nothing here</p>;
            break;
        default:
            assertNever(cp);
    }
    return (
        paragraph
    );
};
export default Part;