import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {course} from "@/types/course";
import {forEach} from "lodash-es";
import {GetCourseID} from "@/utils/course";

export const useCourseStore = defineStore('Course', () => {
    const courseData = ref<course[]>([])
    const nums = ref<number>(0)
    const loading_pages = ref<number[]>([])
    const size = ref<number>(10)
    const addData = (data: course) => {
        data.courseid = GetCourseID(data.courseid as number)
        courseData.value.push(data)
    }

    const getPageData = (target_page: number) => {
        return courseData.value.slice((target_page - 1) * size.value, target_page * size.value -1)
    }

    const record_nums = (num: number) => {
        nums.value = num
    }

    const total_nums = computed(() => {
        return nums.value * size.value
    })


    return {courseData, addData, size, getPageData, loading_pages, total_nums, record_nums, nums}
})
