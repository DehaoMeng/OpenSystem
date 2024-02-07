import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {course} from "@/types/course";
import {GetCourseID} from "@/utils/course";

export const useCourseStore = defineStore('Course', () => {
    const courseData = ref<course[]>([])
    const nums = ref<number>(0)
    const loading_pages = ref<number[]>([])
    const size = ref<number>(10)
    const record = ref<number>(0)
    const addData = (data: course) => {
        data.courseid = GetCourseID(data.courseid as number)
        courseData.value.push(data)
    }

    const getPageData = (target_page: number) => {
        return courseData.value.slice((target_page - 1) * size.value, target_page * size.value)
    }

    const record_nums = (num: number, record_num: number | null = null) => {
        if (record_num) {
            record.value = record_num
        }
        nums.value = num
    }

    const clear_filter = () => {
        nums.value = record.value
    }
    const total_nums = computed(() => {
        return nums.value * size.value
    })

    return {courseData, addData, size, getPageData, loading_pages, total_nums, record_nums, nums, clear_filter}
})
