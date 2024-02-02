import {ref, computed, type Ref} from 'vue'
import {defineStore} from 'pinia'

export const useTokenStore = defineStore('token', () => {
    const token: Ref<string | null> = ref(null)
    const root: Ref<string | null> = ref(null)

    const flushToken = () => {
        token.value = localStorage.getItem('token')
        root.value = localStorage.getItem('root')
    }
    const exit = () => {
        localStorage.clear()
        flushToken()
    }

    const setToken = (data: string, manager:string) => {
        localStorage.setItem('token', data)
        localStorage.setItem('root', manager)
        flushToken()
    }
    flushToken()
    return {token, setToken, root, exit}
})
