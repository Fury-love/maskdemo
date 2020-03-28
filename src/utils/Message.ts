import {Notify} from 'vant';

const message = {
    success:(message: any)=>{
        Notify({
            message: message,
            color: '#ffffff',
            background: '#30f194',
            duration: 1000
        })
    },
    error:(message: any)=> {
        Notify({
            message: message,
            color: '#ffffff',
            background: '#ff1f1f',
            duration: 1000
        })
    },
    warning:(message: any)=> {
        Notify({
            message: message,
            color: '#ffffff',
            background: '#f3e891',
            duration: 1000
        })
    },
    info:(message: any)=> {
        Notify({
            message: message,
            color: '#ffffff',
            background: '#a5fff4',
            duration: 1000
        })
    }
};
export default message;
