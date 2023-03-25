import axios from 'axios'
import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore()

import { BASE_URL, TIMEOUT } from './config'
class HYaxios {
    constructor(baseURL, timeout = 8000) {
        this.instance = axios.create({
            baseURL: baseURL,
            timeout: timeout
        })

        this.instance.interceptors.request.use((config) => {
            mainStore.isLoading = true;
            return config
        }, (err) => {
            return err
        })

        this.instance.interceptors.response.use((res) => {
            mainStore.isLoading = false;
            return res
        }, (err) => {
            mainStore.isLoading = false;
            return err
        })
    }

    request(config){
        return new Promise((resolve, reject) => {
            this.instance.request(config).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    get(config) {
        return this.request({ ...config, method: 'get' })
    }

    post(config) {
        return this.request({ ...config, method: 'post' })
    }
}

export default new HYaxios(BASE_URL, TIMEOUT)