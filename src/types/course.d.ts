export interface course {
    id: number
    collegename: string
    coursename: string
    time: string[]
    semester: string
    population: number
    endtime: string
    course: number
    teacher: number
    selected: boolean
    courseid: string | number
}


export interface EvaCourse {
    course,
    evaluate: number | null,
    grade: number | null,
    id: number
}
