export const GetCourseID = (courseid: number) => {
    return String(Math.floor(courseid / 1000000)) + '-'
        + String(Math.floor(courseid % 1000000 / 1000))
        + '-' + String(PrefixInteger(Math.floor(courseid % 1000)))
}
const PrefixInteger = (num: number) => {
    return (Array(3).join('0') + num).slice(-3);
}
