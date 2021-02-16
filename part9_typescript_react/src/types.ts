interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface ContainsDescription extends CoursePartBase{
    description: string;
}

interface CoursePartOne extends ContainsDescription {
    name: "Fundamentals";
    description: string;
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends ContainsDescription {
    name: "Deeper type usage";
    description: string;
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends ContainsDescription {
    name: "Nothing";
}
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
