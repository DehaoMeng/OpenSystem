import {defineStore} from "pinia";
import {ref} from "vue";
import type {student, updateStudent} from "@/types/student";
import type {teacher, updateTeacher} from "@/types/teacher";

export const useUpdateMessageStore = defineStore('updaateMessage', () => {

    const updateMessage = ref<updateStudent | updateTeacher>()

    const update_Message = async (data: updateStudent | updateTeacher) => {
        updateMessage.value = JSON.parse(JSON.stringify(data))
        updateMessage.value!.password = ''
    }
    const change_sexy = (val: string) => {
        updateMessage.value!.sexy = val
    }

    return {updateMessage, update_Message, change_sexy}
})
