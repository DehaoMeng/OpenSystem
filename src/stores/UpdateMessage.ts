import {defineStore} from "pinia";
import {ref} from "vue";
import type {student, updateStudent} from "@/types/student";
import type {teacher, updateTeacher} from "@/types/teacher";

export const useUpdateMessageStore = defineStore('updateMessage', () => {

    const updateMessage = ref<updateStudent | updateTeacher>()

    const update_Message = async (data: updateStudent | updateTeacher) => {
        updateMessage.value = JSON.parse(JSON.stringify(data))
        updateMessage.value!.password = ''
    }
    const change_sexy = (val: string) => {
        updateMessage.value!.sexy = val
    }

    const diff = (messages: student | teacher) => {
        return equal(messages,updateMessage.value)
    }

    const equal = (oldV: any, newV: any) => {
        if (typeof newV == typeof oldV){
            if (typeof newV == 'object'){
                let key = Object.keys(oldV)
                for (let i = 0; i < key.length; i++) {
                    if (oldV[key[i]] != newV[key[i]]) {
                        if (typeof oldV[key[i]] == 'object') {
                            if (!equal(oldV[key[i]], newV[key[i]])){
                                continue
                            }
                        }
                        return true
                    }
                }
            }
        }
        return false
    }

    return {updateMessage, update_Message, change_sexy, diff}
})
