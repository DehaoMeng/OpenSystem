import {defineStore} from "pinia";
import {ref} from "vue";


export const useSchoolStore = defineStore('school', () => {
    const school_name = ref<string>('xx大学')

    return {school_name}
})
