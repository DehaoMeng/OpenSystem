import {ref} from "vue";
import type {Semester} from "@/types/course";

export const initSemester = (): [string, Semester[]] => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    let items = ref<Semester[]>([]);
    let time = ref<string>()
    let semester
    if (currentMonth <= 11 && currentMonth >= 6) { // 本年7月到12月 代表本学年第二学期
        semester = currentYear.toString() + '-' + (currentYear + 1).toString() + '-' + '2'
    } else if (currentMonth <= 5 && currentMonth >= 1) {  // 本年2月到6月 代表本学年第一学期
        semester = currentYear.toString() + '-' + (currentYear + 1).toString() + '-' + '1'
    } else { //本年1月 代表 上一学年的第二学期
        semester = (currentYear - 1).toString() + '-' + currentYear.toString() + '-' + '2'
    }
    items.value.push({
        value: semester,
        label: semester
    })
    time.value = items.value[0].value
    if (semester.substring(semester.length - 1) == '2') {
        items.value.push({
            value: semester.substring(0, semester.length - 1) + '1',
            label: semester.substring(0, semester.length - 1) + '1'
        })
    }
    for (let i = 0; i < 10; i++) {
        semester = (parseInt(semester.substring(0, 4)) - 1).toString() + '-'
            + (parseInt(semester.substring(5, 9)) - 1).toString() + '-' + '2'
        for (let j = 2; j > 0; j--) {
            items.value.push({
                value: semester,
                label: semester
            })
            semester = semester.substring(0, semester.length - 1) + '1'
        }
    }
    return [time.value as string, items.value]
}
