import request from '@/utils/request'

// 查询公共文件夹
export function ggwjj() {
    return request({
        url: 'archives/ggwjj',
        method: 'get'
    })
}
export function wjjList() {
    return request({
        url: 'archives/wjjList',
        method: 'get'
    })
}
export function addJsc() {
    return request({
        url: 'jsc/addJsc',
        method: 'get'
    })
}

export function options() {
    return request({
        url: 'freckle/options',
        method: 'get'
    })
}

export function exportproblem(params) {
    return request({
        url: 'freckle/problem/export',
        method: 'get',
        params: params,
        timeout: 300000,
    })
}

export function update() {
    return request({
        url: 'problemPatch/update',
        method: 'put'
    })
}


export function areas() {
    return request({
        url: 'freckle/problem/areas',
        method: 'get',

    })
}


export function getproblemTypes() {
    return request({
        url: 'freckle/problem/problemTypes',
        method: 'put'
    })
}

export function addProblemPatch(params) {
    return request({
        url: 'problemPatch/ProblemSpotList',
        method: 'get',
        params: params,
    })
}

export function batchImport(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);

    return request({
        url: 'problemPatch/batchImport',
        method: 'post',
        data: formData,
        onUploadProgress: onUploadProgress,
        timeout: 300000, // 设置超时时间为5分钟
    });
}

export function listfileList(params) {
    return request({
        url: 'fileList/list',
        method: 'get',
        params: params
    })
}
export function dataDetection(file, onUploadProgress) {
    const formData = new FormData();
    formData.append('file', file);

    return request({
        url: 'problemPatch/dataDetection',
        method: 'post',
        data: formData,
        onUploadProgress: onUploadProgress,
    });
}

export function checkList(params) {
    return request({
        url: 'dataCheckList/checkList',
        method: 'get',
        params: params,
    })
}

export function importList(params) {
    return request({
        url: 'dataCheckList/importList',
        method: 'get',
        params: params,
    })
}

export function tdwpWjjList() {
    return request({
        url: 'TdwpWjj/tdwpWjjList',
        method: 'get',

    })
}

export function zsgzWjjList() {
    return request({
        url: 'ZxgzWjj/zsgzWjjList',
        method: 'get',
    })
}

export function cwpWjjList() {
    return request({
        url: 'KcwpWjj/cwpWjjList',
        method: 'get',
    })
}



export function kcwpId(params) {
    return request({
        url: 'KcwpWjj/kcwpId',
        method: 'get',
        params: params
    })
}
export function zxgzId(params) {
    return request({
        url: 'ZxgzWjj/zxgzId',
        method: 'get',
        params: params
    })
}

export function tdwpId(params) {
    return request({
        url: 'TdwpWjj/tdwpId',
        method: 'get',
        params: params
    })
}

export function kcwpFile(formData) {
    return request({
        url: 'KcwpWjj/upload/kcwpFile',
        method: 'post',
        data: formData,
    });
}

export function zxgzFile(formData) {
    return request({
        url: 'ZxgzWjj/upload/zxgzFile',
        method: 'post',
        data: formData,
    });
}

export function tdwpFile(formData) {
    return request({
        url: 'TdwpWjj/upload/tdwpFile',
        method: 'post',
        data: formData,
    });
}

export function kcwpFileInfo(params) {
    return request({
        url: 'KcwpWjj/kcwpFileInfo',
        method: 'get',
        params: params
    });
}
export function zxgzFileInfo(params) {
    return request({
        url: 'ZxgzWjj/zxgzFileInfo',
        method: 'get',
        params: params
    });
}
export function tdwpFileInfo(params) {
    return request({
        url: 'TdwpWjj/tdwpFileInfo',
        method: 'get',
        params: params
    });
}

export function updateKcwp(data) {
    return request({
        url: 'KcwpWjj/updateKcwp',
        method: 'put',
        data: data,
    });
}

export function updateTdwp(data) {
    return request({
        url: 'TdwpWjj/updateTdwp',
        method: 'put',
        data: data,
    });
}
export function updateZxgz(data) {
    return request({
        url: 'ZxgzWjj/updateZxgz',
        method: 'put',
        data: data,
    });
}


export function generateReport(params) {
    return request({
        url: 'WorkReport/generateReport',
        method: 'get',
        params: params,
    });
}
const config = {
    //地图内容
    map: {
        styles: {}
    },
    user: {
        funIds: [],
    }
};
export default config;
