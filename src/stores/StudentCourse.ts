import {defineStore} from "pinia";
import {ref} from "vue";
import type {course, EvaCourse} from "@/types/course";
import {GetCourseID} from "@/utils/course";

export const useStudentCourseStore =
    defineStore('student-course', () => {
        const datas = ref<EvaCourse[][]>([])
        const semesters = ref<string[]>([])

        const addData = (data: EvaCourse[], semester: string) => {
            for (let i = 0; i < data.length; i++) {
                data[i].course.courseid = GetCourseID(data[i].course.courseid as number)
            }
            console.log(data)
            datas.value.push(data)
            addSemester(semester)
        }

        const addSemester = (semester: string) => {
            semesters.value.push(semester)
        }

        const GetIndex = (semester: string) => {
            return semesters.value.indexOf(semester)
        }

        const getData = (semester: string): EvaCourse[] | null => {
            let index = GetIndex(semester)

            if (index > datas.value.length) return null
            return datas.value[index]
        }
        return {addData, getData}
    })
