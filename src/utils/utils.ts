const utils = {
    /**
     * 获取uuid
     */
    getUUID: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            // @ts-ignore
            return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16);
        })
    },
    verifyNull: (val: any) => {
        return val == null || val == '';
    }
};
export default utils;
