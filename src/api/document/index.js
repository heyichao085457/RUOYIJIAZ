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
export function addJsc(data) {
    return request({
        url: 'jsc/addJsc',
        method: 'post',
        data: data
    })
}

export function batchAddWzgTb(data) {
    return request({
        url: 'wzgwttb/batchAddWzgTb',
        method: 'post',
        data: data
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
        url: 'wpzfDictData/tree',
        method: 'get',

    })
}

export function annexUpload(formData) {
    return request({
        url: 'specialAnnex/upload',
        method: 'post',
        data: formData

    })
}

export function dataInspectjzjz(formData) {
    return request({
        url: 'jzjz/dataInspect',
        method: 'post',
        data: formData

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

    });
}

export function listfileList(params) {
    return request({
        url: 'fileList/list',
        method: 'get',
        params: params
    })
}
export function list2023(params) {
    return request({
        url: 'fileList/list2023',
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
export function kcwpId2023(params) {
    return request({
        url: 'KcwpWjj/kcwpId2023',
        method: 'get',
        params: params
    })
}
export function kcwpId2022(params) {
    return request({
        url: 'KcwpWjj/kcwpId2022',
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
export function zxgzId2023(params) {
    return request({
        url: 'ZxgzWjj/zxgzId2023',
        method: 'get',
        params: params
    })
}
export function zxgzId2022(params) {
    return request({
        url: 'ZxgzWjj/zxgzId2022',
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
export function tdwpId2023(params) {
    return request({
        url: 'TdwpWjj/tdwpId2023',
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
export function kcwpFile2023(formData) {
    return request({
        url: 'KcwpWjj/upload/kcwpFile2023',
        method: 'post',
        data: formData,
    });
}
export function kcwpFile2022(formData) {
    return request({
        url: 'KcwpWjj/upload/kcwpFile2022',
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
export function zxgzFile2023(formData) {
    return request({
        url: 'ZxgzWjj/upload/zxgzFile2023',
        method: 'post',
        data: formData,
    });
}
export function zxgzFile2022(formData) {
    return request({
        url: 'ZxgzWjj/upload/zxgzFile2022',
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
export function tdwpFile2023(formData) {
    return request({
        url: 'TdwpWjj/upload/tdwpFile2023',
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
export function kcwpFileInfo2022(params) {
    return request({
        url: 'KcwpWjj/kcwpFileInfo2022',
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
export function zxgzFileInfo2023(params) {
    return request({
        url: 'ZxgzWjj/zxgzFileInfo2023',
        method: 'get',
        params: params
    });
}
export function zxgzFileInfo2022(params) {
    return request({
        url: 'ZxgzWjj/zxgzFileInfo2022',
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
export function tdwpFileInfo2023(params) {
    return request({
        url: 'TdwpWjj/tdwpFileInfo2023',
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

export function jscList() {
    return request({
        url: 'jsc/jscList',
        method: 'get',
    });
}

export function computeList() {
    return request({
        url: 'jsc/computeList',
        method: 'get',
    });
}

export function tree() {
    return request({
        url: 'wpzfDictData/tree',
        method: 'get',
    });
}
export function jscId() {
    return request({
        url: 'jsc/jscId',
        method: 'get',

    });
}

export function downloadlist() {
    return request({
        url: 'download/list',
        method: 'get',

    });
}
//大屏展示

export function dpzs(params) {
    return request({
        url: 'search/count',
        method: 'get',
        params: params,

    });
}

export function exportList(params) {
    return request({
        url: 'jscEcharts2023/exportRhJscEcharts2023',
        method: 'get',
        params: params
    });
}

export function exportSjyt(params) {
    return request({
        url: 'jscEcharts2023/exportTbJscEcharts2023',
        method: 'get',
        params: params
    });
}

export function AnnexWjj(params) {
    return request({
        url: 'specialAnnex/AnnexWjj',
        method: 'get',
        params: params
    });
}
export function AnnexWjj2023(params) {
    return request({
        url: 'specialAnnex/AnnexWjj2023',
        method: 'get',
        params: params
    });
}
export function AnnexWjj2022(params) {
    return request({
        url: 'specialAnnex/AnnexWjj2022',
        method: 'get',
        params: params
    });
}
export function AnnexList(params) {
    return request({
        url: 'specialAnnex/AnnexList',
        method: 'get',
        params: params

    });
}
export function AnnexList2023(params) {
    return request({
        url: 'specialAnnex/AnnexList2023',
        method: 'get',
        params: params

    });
}
export function AnnexList2022(params) {
    return request({
        url: 'specialAnnex/AnnexList2022',
        method: 'get',
        params: params

    });
}
export function upload(formData) {
    return request({
        url: 'specialAnnex/upload',
        method: 'post',
        data: formData,
    });
}

export function specialAnnexdelete(data) {
    return request({
        url: 'specialAnnex/delete',
        method: 'put',
        data: data
    });
}

export function offenceList(params) {
    return request({
        url: 'offence/offenceList',
        method: 'get',
        params: params
    });
}

export function offenceReport() {
    return request({
        url: 'offence/offenceReport',
        method: 'get',
    });
}

export function freckleCode(params) {
    return request({
        url: 'offence/offenceInfo/freckleCode',
        method: 'get',
        params: params
    });
}
export function freckleCode2022(params) {
    return request({
        url: 'offence2022/offenceInfo/freckleCode',
        method: 'get',
        params: params
    });
}

export function tbxf(params) {
    return request({
        url: 'smzq/tbxf',
        method: 'get',
        params: params
    });
}

export function xjtb(params) {
    return request({
        url: 'smzq/xjtb',
        method: 'get',
        params: params
    });
}

export function nysh(params) {
    return request({
        url: 'smzq/nysh',
        method: 'get',
        params: params
    });
}

export function smzqjd(params) {
    return request({
        url: 'smzq/smzqjd',
        method: 'get',
        params: params
    });
}

export function wyhc(params) {
    return request({
        url: 'smzq/wyhc',
        method: 'get',
        params: params
    });
}

export function wfzg(params) {
    return request({
        url: 'problemPatch/wfzg',
        method: 'get',
        params: params
    });
}

export function wzgqk(params) {
    return request({
        url: 'problemPatch/wzgqk',
        method: 'get',
        params: params
    });
}

export function rhtzWjjList(params) {
    return request({
        url: 'rhtzWjj/rhtzWjjList',
        method: 'get',
        params: params
    });
}
export function smzqshjd(params) {
    return request({
        url: 'smzq/smzqshjd',
        method: 'get',
        params: params
    });
}

export function getInfoById(params) {
    return request({
        url: 'problemPatch/getInfoById',
        method: 'get',
        params: params
    });
}
export function problemByType(params) {
    return request({
        url: 'channelAnswer/problemByType',
        method: 'get',
        params: params
    });
}
export function spotDetails(params) {
    return request({
        url: 'offence/spotDetails/freckleCode',
        method: 'get',
        params: params
    });
}

export function wordReport(params) {
    return request({
        url: 'newAndOld/newAndOldExportList',
        method: 'get',
        params: params
    });
}


export function rhtzFile(formData) {
    return request({
        url: 'rhtzWjj/upload/rhtzFile',
        method: 'post',
        data: formData,
    });
}

export function rhtzWjjInfo(params) {
    return request({
        url: 'rhtzWjj/rhtzWjjInfo',
        method: 'get',
        params: params
    });
}
export function rhtzWjjInfo2023(params) {
    return request({
        url: 'rhtzWjj/rhtzWjjInfo2023',
        method: 'get',
        params: params
    });
}
export function rhtzWjjInfo2022(params) {
    return request({
        url: 'rhtzWjj/rhtzWjjInfo2022',
        method: 'get',
        params: params
    });
}
export function rhtzWjjupdate(data) {
    return request({
        url: 'rhtzWjj/update',
        method: 'put',
        data: data
    });
}

export function rhtzBath(params) {
    return request({
        url: 'rhtz/rhtzBath',
        method: 'get',
        params: params
    });
}

export function standingBook(formData) {
    return request({
        url: 'rhtzWjj/upload/standingBook',
        method: 'post',
        data: formData,
    });
}
export function standingBook2023(formData) {
    return request({
        url: 'rhtzWjj/upload/standingBook2023',
        method: 'post',
        data: formData,
    });
}
export function standingBook2022(formData) {
    return request({
        url: 'rhtzWjj/upload/standingBook2022',
        method: 'post',
        data: formData,
    });
}
export function tentative(params) {
    return request({
        url: 'rhtzWjj/deletet/tentative',
        method: 'get',
        params: params
    });
}

export function addRhtzByBatch(params) {
    return request({
        url: 'rhtz/addRhtzByBatch',
        method: 'get',
        params: params
    });
}

export function delectRhtz(params) {
    return request({
        url: 'rhtz/delectRhtz',
        method: 'get',
        params: params
    });
}

export function areaWorkList(params) {
    return request({
        url: 'AreaWork/areaWorkList',
        method: 'get',
        params: params
    });
}

export function XzjsydComboBox() {
    return request({
        url: 'WorkReport/XzjsydComboBox',
        method: 'get',
    });
}

export function exportexcelList(params) {
    return request({
        url: 'excel/exportList',
        method: 'get',
        params: params
    });
}

export function quarterlyVerify(params) {
    return request({
        url: 'quarterlyVerify/wordReport',
        method: 'get',
        params: params
    });
}

export function updateAnnexInfo(params) {
    return request({
        url: 'annexUpload/updateAnnexInfo',
        method: 'get',
        params: params
    });
}

export function operation2024(params) {
    return request({
        url: 'allData/operation/log',
        method: 'get',
        params: params
    });
}
export function allDatlista(params) {
    return request({
        url: 'allData/list',
        method: 'get',
        params: params
    });
}
export function allDatlista2023(params) {
    return request({
        url: 'allData2023/list',
        method: 'get',
        params: params
    });
}
export function importWyhc(formData) {
    return request({
        url: 'wyhc/importWyhc',
        method: 'post',
        data: formData,

    });
}
export function issuedimportXftb(formData) {
    return request({
        url: 'issued/tb/importXftb',
        method: 'post',
        data: formData,

    });
}
export function updateQbtb2024(formData) {
    return request({
        url: 'qbtb/import/updateQbtb',
        method: 'post',
        data: formData,

    });
}
export function importQbtb(formData) {
    return request({
        url: 'qbtb/importQbtb',
        method: 'post',
        data: formData,

    });
}

export function interveneimport(formData) {
    return request({
        url: 'qbtb/import/intervene/tb',
        method: 'post',
        data: formData,

    });
}
export function importQbtb2023(formData) {
    return request({
        url: 'qbtb2023/importQbtb',
        method: 'post',
        data: formData,

    });
}

export function portproblem(params) {
    return request({
        url: 'allData/problem/export',
        method: 'get',
        params: params
    });
}
export function portproblem2023(params) {
    return request({
        url: 'allData2023/problem/export',
        method: 'get',
        params: params
    });
}
export function snapdateallData(params) {
    return request({
        url: 'allData/snapdate',
        method: 'get',
        params: params
    });
}

export function rhtzByFreckleCode(params) {
    return request({
        url: 'allData/rhtzByFreckleCode',
        method: 'get',
        params: params
    });
}
export function rhtzByFreckleCode2023(params) {
    return request({
        url: 'allData2023/rhtzByFreckleCode',
        method: 'get',
        params: params
    });
}
export function specialAnnex(params) {
    return request({
        url: 'specialAnnex/AnnexList',
        method: 'get',
        params: params
    });
}

export function updateProblemPatch(data) {
    return request({
        url: 'problemPatch/updateProblemPatch',
        method: 'put',
        data: data
    });
}
export function updateOutsideCheck(data) {
    return request({
        url: 'fieldCheck/updateOutsideCheck',
        method: 'put',
        data: data
    });
}

export function pictureList(params) {
    return request({
        url: 'allData/pictureList',
        method: 'get',
        params: params
    });
}
export function wyhcpictureList(params) {
    return request({
        url: 'wyhc/pictureList',
        method: 'get',
        params: params
    });
}
export function pictureList2023(params) {
    return request({
        url: 'allData2023/pictureList',
        method: 'get',
        params: params
    });
}

export function DropdownBoXContent() {
    return request({
        url: 'DropdownBox/DropdownBoXContent',
        method: 'get',
    });
}

export function jsc2024(data) {
    return request({
        url: 'jsc2024/addJsc',
        method: 'post',
        data: data,

    });
}

export function comList(params) {
    return request({
        url: 'jsc2024/computeList',
        method: 'get',
        params: params
    });
}

export function remarksjsc2024(params) {
    return request({
        url: 'jsc2024/remarks',
        method: 'get',
        params: params
    });
}
// export function remarksjsc2022(params) {
//     return request({
//         url: 'jsc2022/remarks',
//         method: 'get',
//         params: params
//     });
// }
export function remarksjsc2023(params) {
    return request({
        url: 'jsc/remarks',
        method: 'get',
        params: params
    });
}
export function remarks2022(params) {
    return request({
        url: 'jsc2022/remarks',
        method: 'get',
        params: params
    });
}
export function importJzjz(formData) {
    return request({
        url: 'jzjz/importJzjz',
        method: 'post',
        data: formData,

    });
}

export function exportList2024(params) {
    return request({
        url: 'excel2024/exportList2024',
        method: 'get',
        params: params,

    });
}

export function computeListjsc2024(params) {
    return request({
        url: 'jsc2024/computeList',
        method: 'get',
        params: params,
    });
}
export function computeListjsc2023(params) {
    return request({
        url: 'jsc/computeList',
        method: 'get',
        params: params,
    });
}
export function listdownload() {
    return request({
        url: 'download/list',
        method: 'get',
    });
}
export function listdownload2023() {
    return request({
        url: 'download/list2023',
        method: 'get',
    });
}
export function exportXttb2024(params) {
    return request({
        url: 'excel2024/exportXttb2024',
        method: 'get',
        params: params,

    });
}

export function listwyhc(params) {
    return request({
        url: 'wyhc/list',
        method: 'get',
        params: params,
    });
}

export function wyhcBylandCode(params) {
    return request({
        url: 'wyhc/wyhcBylandCode',
        method: 'get',
        params: params,
    });
}
export function wyhcBylandCode2023(params) {
    return request({
        url: 'wyhc2023/wyhcBylandCode',
        method: 'get',
        params: params,
    });
}
export function wyhcBylandCode2022(params) {
    return request({
        url: 'wyhc2022/wyhcBylandCode',
        method: 'get',
        params: params,
    });
}
export function exportBylandCodewyhc(params) {
    return request({
        url: 'wyhc/exportBylandCode',
        method: 'get',
        params: params,
    });
}
export function exportBylandCodewyhc2023(params) {
    return request({
        url: 'wyhc2023/exportBylandCode',
        method: 'get',
        params: params,
    });
}
export function qbtbList(params) {
    return request({
        url: 'qbtb/qbtbList',
        method: 'get',
        params: params,
    });
}
export function qbtbListqbtb2023(params) {
    return request({
        url: 'qbtb2023/qbtbList',
        method: 'get',
        params: params,
    });
}
export function JzjzList(params) {
    return request({
        url: 'jzjz/JzjzList',
        method: 'get',
        params: params,
    });
}

export function jzjzByfreckleCode(params) {
    return request({
        url: 'jzjz/jzjzByfreckleCode',
        method: 'get',
        params: params,
    });
}

export function jzjzupdate(data) {
    return request({
        url: 'jzjz/update',
        method: 'put',
        data: data,
    });
}
export function jzjzupdatejzym(data) {
    return request({
        url: 'jzjz/update/jzym',
        method: 'put',
        data: data,
    });
}
export function wzgtb(data) {
    return request({
        url: 'wzgwttb/update/wzgtb',
        method: 'put',
        data: data,
    });
}
export function shhqkExport(params) {
    return request({
        url: 'allData/shhqkExport',
        method: 'get',
        params: params,
    });
}
export function shhqkExport2023(params) {
    return request({
        url: 'allData2023/shhqkExport',
        method: 'get',
        params: params,
    });
}
export function qbdkExport2023(params) {
    return request({
        url: 'qbtb2023/qbdkExport',
        method: 'get',
        params: params,
    });
}
export function deleteId02(id) {
    const idsString = id.join(',');
    return request({
        url: `download/delete`,
        method: 'delete',
        params: { id: idsString },
    });
}

export function fileList02(id) {
    const idsString = id.join(',');
    return request({
        url: 'fileList/delete',
        method: 'delete',
        params: { id: idsString },
    });
}
export function jzjzdelete(id) {
    const idsString = id.join(',');
    return request({
        url: 'jzjz/delete/id',
        method: 'get',
        params: { id: idsString },
    });
}
export function deleteId(remarks) {
    return request({
        url: `jsc2024/deleteId?remarks=${encodeURIComponent(remarks)}`,
        method: 'delete',
    });
}
export function deleteId2023(remarks) {
    return request({
        url: `jsc/deleteId?remarks=${encodeURIComponent(remarks)}`,
        method: 'delete',
    });
}

export function channelAnswer2024(id) {
    return request({
        url: `channelAnswer/delete/hf?id=${encodeURIComponent(id)}`,
        method: 'delete',
    });
}
export function PolicyDocumentnotice2024(id) {
    return request({
        url: `PolicyDocument/delete/notice?id=${encodeURIComponent(id)}`,
        method: 'delete',
    });
}
export function PolicyDocumentnoticewt2024(id) {
    return request({
        url: `channelAnswer/delete/wt?id=${encodeURIComponent(id)}`,
        method: 'delete',
    });
}
export function deleteId2022(remarks) {
    return request({
        url: `jsc2022/deleteId?remarks=${encodeURIComponent(remarks)}`,
        method: 'delete',
    });
}
export function qbdkBylandcode(params) {
    return request({
        url: 'qbtb/qbdkBylandcode',
        method: 'get',
        params: params,
    });
}
export function qbdkBylandcode2023(params) {
    return request({
        url: 'qbtb2023/qbdkBylandcode',
        method: 'get',
        params: params,
    });
}
export function qbdkExport(params) {
    return request({
        url: 'qbtb/qbdkExport',
        method: 'get',
        params: params,
    });
}


export function jscEchartsexportTbJscEcharts(params) {
    return request({
        url: 'jscEcharts/exportTbJscEcharts',
        method: 'get',
        params: params,
    });
}
export function offencemap(params) {
    return request({
        url: 'offence/map',
        method: 'get',
        params: params,
    });
}

export function screenjzorne(params) {
    return request({
        url: 'jzjz/screen/jzorne',
        method: 'get',
        params: params,
    });
}
export function offencemap2022(params) {
    return request({
        url: 'offence2022/map',
        method: 'get',
        params: params,
    });
}
export function smzqallData(params) {
    return request({
        url: 'allData/smzq',
        method: 'get',
        params: params,
    });
}
export function smzqallData2023(params) {
    return request({
        url: 'allData2023/smzq',
        method: 'get',
        params: params,
    });
}
export function exportRhJscEcharts(params) {
    return request({
        url: 'jscEcharts/exportRhJscEcharts',
        method: 'get',
        params: params,
    });
}
export function exportRhJscEcharts2023(params) {
    return request({
        url: 'jscEcharts2023/exportRhJscEcharts2023',
        method: 'get',
        params: params,
    });
}

export function exportTbJscEcharts(params) {
    return request({
        url: 'jscEcharts/exportTbJscEcharts',
        method: 'get',
        params: params,
    });
}
export function exportTbJscEcharts2023(params) {
    return request({
        url: 'jscEcharts2023/exportTbJscEcharts2023',
        method: 'get',
        params: params,
    });
}

export function exportBylandCode(params) {
    return request({
        url: 'wyhc/exportBylandCodeList',
        method: 'get',
        params: params,

    });
}
export function exportBylandCode2023(params) {
    return request({
        url: 'wyhc2023/exportBylandCodeList',
        method: 'get',
        params: params,

    });
}

export function hcrwlist2024() {
    return request({
        url: 'jzjz/hcpcjsj/drop',
        method: 'get',

    });
}
export function hcrwlist2023(params) {
    return request({
        url: 'wyhc2023/list',
        method: 'get',
        params: params,
    });
}
export function hcrwaddCheckTask(data) {
    return request({
        url: 'hcrw/addCheckTask',
        method: 'post',
        data: data,
    });
}

export function tbByHcrwmc(params) {
    return request({
        url: 'jzjz/tbByHcrwmc',
        method: 'get',
        params: params,

    });
}

export function hcpcjsjwyhc(params) {
    return request({
        url: 'wyhc/hcpcjsj',
        method: 'get',
        params: params,

    });
}
export function hcrwremoveCheckTask(data) {
    return request({
        url: 'hcrw/removeCheckTask',
        method: 'put',
        data: data,
    });
}

export function PolicyDocument2024(data) {
    return request({
        url: 'PolicyDocument/put/notice',
        method: 'put',
        data: data,
    });
}
export function batchAddXhtb(formData) {
    return request({
        url: 'jzjz/batchAddXhtb',
        method: 'post',
        data: formData
    });
}

export function exportXhtbjzjz(params) {
    return request({
        url: 'jzjz/exportXhtb',
        method: 'get',
        params: params,
    });
}

export function ysjlList() {
    return request({
        url: 'wyhc/ysjlList',
        method: 'get',

    });
}
export function ysjlList2023() {
    return request({
        url: 'wyhc2023/ysjlList2023',
        method: 'get',

    });
}
export function specialAnnexupload(formData) {
    return request({
        url: 'specialAnnex/upload',
        method: 'post',
        data: formData,

    });
}
export function addNotice2024(formData) {
    return request({
        url: 'PolicyDocument/addNotice',
        method: 'post',
        data: formData,

    });
}
export function addPolicyFile2024(formData) {
    return request({
        url: 'PolicyDocument/addPolicyFile',
        method: 'post',
        data: formData,

    });
}
export function jscRh(params) {
    return request({
        url: 'jsc2024/jscRh',
        method: 'get',
        params: params,
    });
}
export function jscRh2023(params) {
    return request({
        url: 'jsc/jscRh',
        method: 'get',
        params: params,
    });
}
export function hcglTree() {
    return request({
        url: 'tree/hcglTree',
        method: 'get',

    });
}

export function generateProvince(params) {
    return request({
        url: 'generateProvince/xzjsyd',
        method: 'get',
        params: params,
    });
}

export function count(params) {
    return request({
        url: 'szdp/count',
        method: 'get',
        params: params,
    });
}

export function PolicyDocument(params) {
    return request({
        url: 'PolicyDocument/list',
        method: 'get',
        params: params,
    });
}

export function PolicyDocumenturl(params) {
    return request({
        url: 'PolicyDocument/url/id',
        method: 'get',
        params: params,
    });
}

export function problemModule() {
    return request({
        url: 'channelAnswer/problemModule',
        method: 'get',

    });
}

export function channelAnswermodule(params) {
    return request({
        url: 'channelAnswer/module/type',
        method: 'get',
        params: params,
    });
}

export function probleList(params) {
    return request({
        url: 'channelAnswer/probleList',
        method: 'get',
        params: params,
    });
}

export function channelAnswerroblem(params) {
    return request({
        url: 'channelAnswer/roblem/name',
        method: 'get',
        params: params,
    });
}
export function exportjzjz(params) {
    return request({
        url: 'jzjz/export/jzjz',
        method: 'get',
        params: params,
    });
}

export function exportlist(params) {
    return request({
        url: 'fileList/jzjz/list',
        method: 'get',
        params: params,
    });
}
export function replyProblem(formData) {
    return request({
        url: 'channelAnswer/replyProblem',
        method: 'post',
        data: formData,
    });
}



export function raiseProblemr(formData) {
    return request({
        url: 'channelAnswer/raiseProblem',
        method: 'post',
        data: formData,
    });
}


// * 计算报告模块

export function generateProvince2023xzjsyd2023(params) {
    return request({
        url: 'generateProvince2023/xzjsyd2023',
        method: 'get',
        params: params,
    });
}

export function exportList2023(params) {
    return request({
        url: 'excel2023/exportList2023',
        method: 'get',
        params: params,
    });
}
export function exportXttb2023(params) {
    return request({
        url: 'excel2023/exportXttb2023',
        method: 'get',
        params: params,
    });
}

// * 是否涉及秦岭列表
export function sfql2023(params) {
    return request({
        url: 'special/sfql',
        method: 'get',
        params: params,
    });
}
export function sfql2022(params) {
    return request({
        url: 'special2022/sfql',
        method: 'get',
        params: params,
    });
}
// 
// * 是否涉及长江黄河
export function sfsjcjhh2023(params) {
    return request({
        url: 'special/sfsjcjhh',
        method: 'get',
        params: params,
    });
}
export function sfsjcjhh2022(params) {
    return request({
        url: 'special2022/sfsjcjhh',
        method: 'get',
        params: params,
    });
}

//  * 挖沙采石
export function wscs2023(params) {
    return request({
        url: 'special/wscs',
        method: 'get',
        params: params,
    });
}
export function wscs2022(params) {
    return request({
        url: 'special2022/wscs',
        method: 'get',
        params: params,
    });
}
//   * 矿产图斑台账
export function kctb2023(params) {
    return request({
        url: 'special/kctb',
        method: 'get',
        params: params,
    });
}
export function kctb2022(params) {
    return request({
        url: 'special2022/kctb',
        method: 'get',
        params: params,
    });
}
export function offenceList2023(params) {
    return request({
        url: 'offence2023/offenceList',
        method: 'get',
        params: params,
    });
}

export function offenceReport2023(params) {
    return request({
        url: 'offence2023/offenceReport',
        method: 'get',
        params: params,
    });
}

export function smzqjd2023(params) {
    return request({
        url: 'offence2023/smzqjd',
        method: 'get',
        params: params,
    });
}

export function freckleCode2023(params) {
    return request({
        url: 'offence2023/offenceInfo/freckleCode',
        method: 'get',
        params: params,
    });
}

export function spotDetails2023(params) {
    return request({
        url: 'offence2023/spotDetails/freckleCode',
        method: 'get',
        params: params,
    });
}


export function offence2023map(params) {
    return request({
        url: 'offence2023/map',
        method: 'get',
        params: params,
    });
}
// 2022年

export function list2022(params) {
    return request({
        url: 'allData2022/list',
        method: 'get',
        params: params,
    });
}
export function export2022(params) {
    return request({
        url: 'allData2022/problem/export',
        method: 'get',
        params: params,
    });
}

export function rhtzByFreckleCode2022(params) {
    return request({
        url: 'allData2022/rhtzByFreckleCode',
        method: 'get',
        params: params,
    });
}
export function pictureList2022(params) {
    return request({
        url: 'allData2022/pictureList',
        method: 'get',
        params: params,
    });
}

export function shhqkExport2022(params) {
    return request({
        url: 'allData2022/shhqkExport',
        method: 'get',
        params: params,
    });
}

export function smzq2022(params) {
    return request({
        url: 'allData2022/smzq',
        method: 'get',
        params: params,
    });
}

export function importQbtb2022(params) {
    return request({
        url: 'qbtb2022/importQbtb',
        method: 'get',
        params: params,
    });
}

export function qbtbList2022(params) {
    return request({
        url: 'qbtb2022/qbtbList',
        method: 'get',
        params: params,
    });
}

export function qbdkExport2022(params) {
    return request({
        url: 'qbtb2022/qbdkExport',
        method: 'get',
        params: params,
    });
}

export function qbdkBylandcode2022(params) {
    return request({
        url: 'qbtb2022/qbdkBylandcode',
        method: 'get',
        params: params,
    });
}

export function xzjsyd2022(params) {
    return request({
        url: 'generateProvince2022/xzjsyd2022',
        method: 'get',
        params: params,
    });
}

export function exportList2022(params) {
    return request({
        url: 'excel2022/exportList2022',
        method: 'get',
        params: params,
    });
}

export function exportXttb2022(params) {
    return request({
        url: 'excel2022/exportXttb2022',
        method: 'get',
        params: params,
    });
}

export function exportRhJscEcharts2022(params) {
    return request({
        url: 'jscEcharts2022/exportRhJscEcharts2022',
        method: 'get',
        params: params,
    });
}
export function exportTbJscEcharts2022(params) {
    return request({
        url: 'jscEcharts2022/exportTbJscEcharts2022',
        method: 'get',
        params: params,
    });
}

export function addJsc2022(data) {
    return request({
        url: 'jsc2022/addJsc',
        method: 'post',
        data: data,
    });
}

export function computeList2022(params) {
    return request({
        url: 'jsc2022/computeList',
        method: 'get',
        params: params,
    });
}

export function jscListjsc2022(params) {
    return request({
        url: 'jsc2022/jscList',
        method: 'get',
        params: params,
    });
}



export function jscRh2022(params) {
    return request({
        url: 'jsc2022/jscRh',
        method: 'get',
        params: params,
    });
}

export function importWyhc2022(params) {
    return request({
        url: 'wyhc2022/importWyhc',
        method: 'get',
        params: params,
    });
}
export function listWyhc2022(params) {
    return request({
        url: 'wyhc2022/list',
        method: 'get',
        params: params,
    });
}

export function exportBylandCodeList2022(params) {
    return request({
        url: 'wyhc2022/exportBylandCodeList',
        method: 'get',
        params: params,
    });
}
export function exportBylandCode2022(params) {
    return request({
        url: 'wyhc2022/exportBylandCode',
        method: 'get',
        params: params,
    });
}
export function ysjlList2022(params) {
    return request({
        url: 'wyhc2022/ysjlList2022',
        method: 'get',
        params: params,
    });
}

export function downloadlist2022(params) {
    return request({
        url: 'download/list2022',
        method: 'get',
        params: params,
    });
}

export function fileListlist2022(params) {
    return request({
        url: 'fileList/list2022',
        method: 'get',
        params: params,
    });
}

export function tdwpId2022(params) {
    return request({
        url: 'TdwpWjj/tdwpId2022',
        method: 'get',
        params: params,
    });
}

export function tdwpFile2022(formData) {
    return request({
        url: 'TdwpWjj/upload/tdwpFile2022',
        method: 'post',
        data: formData,
    });
}

export function tdwpFileInfo2022(params) {
    return request({
        url: 'TdwpWjj/tdwpFileInfo2022',
        method: 'get',
        params: params,
    });
}

export function offenceList2022(params) {
    return request({
        url: 'offence2022/offenceList',
        method: 'get',
        params: params,
    });
}

export function offenceReport2022(params) {
    return request({
        url: 'offence2022/offenceReport',
        method: 'get',
        params: params,
    });
}

export function smzqjd2022(params) {
    return request({
        url: 'offence2022/smzqjd',
        method: 'get',
        params: params,
    });
}

export function sfql2024(params) {
    return request({
        url: 'special2024/sfql',
        method: 'get',
        params: params,
    });
}

export function sfsjcjhh2024(params) {
    return request({
        url: 'special2024/sfsjcjhh',
        method: 'get',
        params: params,
    });
}


export function wscs2024(params) {
    return request({
        url: 'special2024/wscs',
        method: 'get',
        params: params,
    });
}

export function kctb2024(params) {
    return request({
        url: 'special2024/kctb',
        method: 'get',
        params: params,
    });
}

export function smzqjd2024(params) {
    return request({
        url: 'offence/smzqjd',
        method: 'get',
        params: params,
    });
}

export function daglSdsj2022(params) {
    return request({
        url: 'jsc2022/daglSdsj',
        method: 'get',
        params: params,
    });
}
export function daglSdsj(params) {
    return request({
        url: 'jsc/daglSdsj',
        method: 'get',
        params: params,
    });
}
export function daglSdsj2024(params) {
    return request({
        url: 'jsc2024/daglSdsj',
        method: 'get',
        params: params,
    });
}

export function notice2024(params) {
    return request({
        url: 'PolicyDocument/list/notice',
        method: 'get',
        params: params,
    });
}

export function PolicyDocumentlist2024(params) {
    return request({
        url: 'PolicyDocument/list',
        method: 'get',
        params: params,
    });
}

export function probleList2024(params) {
    return request({
        url: 'channelAnswer/probleList',
        method: 'get',
        params: params,
    });
}

export function DropdownBoxWfxw() {
    return request({
        url: 'DropdownBox/DropdownBoxWfxw',
        method: 'get',

    });
}
export function DropdownBoxWscs() {
    return request({
        url: 'DropdownBox/DropdownBoxWscs',
        method: 'get',

    });
}

export function DropdownBoxKctb() {
    return request({
        url: 'DropdownBox/DropdownBoxKctb',
        method: 'get',

    });
}

export function szdpTwocount(params) {
    return request({
        url: 'szdpTwo/count',
        method: 'get',
        params: params,
    });
}

export function userPhotofind(params) {
    return request({
        url: 'userPhoto/find',
        method: 'get',
        params: params,
    });
}


export function userPhotoupdate(params) {
    return request({
        url: 'userPhoto/update',
        method: 'get',
        params: params,
    });
}

export function userPhotofindAll(params) {
    return request({
        url: 'userPhoto/findAll',
        method: 'get',
        params: params,
    });
}
// findByLandCode: `${serverIP}/freckle/problem/findByCode`,
// findByLandCodeQb: `${serverIP}/freckle/findByCode`,
export function findByLandCode(params) {
    return request({
        url: 'freckle/problem/findByCode',
        method: 'get',
        params: params,
    });
}
export function findByLandCodeQb(params) {
    return request({
        url: 'freckle/findByCode',
        method: 'get',
        params: params,
    });
}
export function special2024sfql(params) {
    return request({
        url: 'special2024/export/sfql',
        method: 'get',
        params: params,
    });
}
export function special2024cjhh(params) {
    return request({
        url: 'special2024/export/cjhh',
        method: 'get',
        params: params,
    });
}
export function special2024wscs(params) {
    return request({
        url: 'special2024/export/wscs',
        method: 'get',
        params: params,
    });
}
export function special2024kctb(params) {
    return request({
        url: 'special2024/export/kctb',
        method: 'get',
        params: params,
    });
}
export function special2024fileList(params) {
    return request({
        url: 'special2024/fileList/2024',
        method: 'get',
        params: params,
    });
}

export function special2022kctb(params) {
    return request({
        url: 'special2022/export/kctb',
        method: 'get',
        params: params,
    });
}

export function special2022(params) {
    return request({
        url: 'special2022/fileList/2022',
        method: 'get',
        params: params,
    });
}

export function special2022wscs(params) {
    return request({
        url: 'special2022/export/wscs',
        method: 'get',
        params: params,
    });
}
export function special2022cjhh(params) {
    return request({
        url: 'special2022/export/cjhh',
        method: 'get',
        params: params,
    });
}
export function special2022sfql(params) {
    return request({
        url: 'special2022/export/sfql',
        method: 'get',
        params: params,
    });
}

export function specialsfql(params) {
    return request({
        url: 'special/export/sfql',
        method: 'get',
        params: params,
    });
}

export function specialsfql2023(params) {
    return request({
        url: 'special/fileList/2023',
        method: 'get',
        params: params,
    });
}
export function specialsfql2023wscs(params) {
    return request({
        url: 'special/export/cjhh',
        method: 'get',
        params: params,
    });
}
export function specialsfql2023wscss(params) {
    return request({
        url: 'special/export/wscs',
        method: 'get',
        params: params,
    });
}

export function specialsfql2023kctb(params) {
    return request({
        url: 'special/export/kctb',
        method: 'get',
        params: params,
    });
}

export function ReportDetails() {
    return request({
        url: 'offence/ReportDetails',
        method: 'get',

    });
}

export function wzgUrl() {
    return request({
        url: 'wzgwttb/wzgUrl',
        method: 'get',

    });
}
export function all2021_18(params) {
    return request({
        url: 'all2021_18/tb',
        method: 'get',
        params: params,
    });
}

export function all2021_18dk(params) {
    return request({
        url: 'all2021_18/dk',
        method: 'get',
        params: params,
    });
}
export function all2021_18wf(params) {
    return request({
        url: 'all2021_18/wf',
        method: 'get',
        params: params,
    });
}

export function DropdownWfer() {
    return request({
        url: 'all2021_18/DropdownWf',
        method: 'get',
    });
}

export function DropdownTb() {
    return request({
        url: 'all2021_18/DropdownTb',
        method: 'get',
    });
}

export function advicelist(params) {
    return request({
        url: 'advice/list',
        method: 'get',
        params: params,
    });
}

export function addAdvice(formData) {
    return request({
        url: 'advice/addAdvice',
        method: 'post',
        data: formData,
    });
}
export function updateAdvice(data) {
    return request({
        url: 'advice/updateAdvice',
        method: 'put',
        data: data,
    });
}

export function nysh2024(params) {
    return request({
        url: 'nysh2024/rh/nysh2024',
        method: 'get',
        params: params,
    });
}

export function DropdownBoxSdsj() {
    return request({
        url: 'DropdownBox/DropdownBoxSdsj',
        method: 'get',

    });
}

export function exportwyhc(params) {
    return request({
        url: 'wyhc/export',
        method: 'get',
        params: params,
    });
}

export function wyhcListwyhc() {
    return request({
        url: 'wyhc/wyhcList/2024',
        method: 'get',

    });
}
export function buttonall(params) {
    return request({
        url: 'button/all',
        method: 'get',
        params: params,
    })
}

export function wzgwttblist(params) {
    return request({
        url: 'wzgwttb/list',
        method: 'get',
        params: params,
    })
}

export function DropWzgtb(params) {
    return request({
        url: 'wzgwttb/DropWzgtb',
        method: 'get',
        params: params,
    })
}

export function wzgwttbexport(params) {
    return request({
        url: 'wzgwttb/export',
        method: 'get',
        params: params,
    })
}
export function fileListwzg(params) {
    return request({
        url: 'fileList/wzg/list',
        method: 'get',
        params: params,
    })
}

export function wzgByLandcode(params) {
    return request({
        url: 'wzgwttb/wzgByLandcode',
        method: 'get',
        params: params,
    })
}

export function fileListwftb(params) {
    return request({
        url: 'special2024/fileList/ql/wftb',
        method: 'get',
        params: params,
    })
}

export function fileListexport(params) {
    return request({
        url: 'special2024/export/ql/stbh',
        method: 'get',
        params: params,
    })
}
export function rhtzwttb(params) {
    return request({
        url: 'allData/get/rhtz/wttb',
        method: 'get',
        params: params,
    })
}
export function rhtzwttbexport(params) {
    return request({
        url: 'allData/export/rhtz/wttb',
        method: 'get',
        params: params,
    })
}

export function special202cjhh(params) {
    return request({
        url: 'special2024/fileList/ql/stbh',
        method: 'get',
        params: params,
    })
}

export function special202zdqy(params) {
    return request({
        url: 'special2024/export/ql/wftb',
        method: 'get',
        params: params,
    })
}

export function special202stbh(params) {
    return request({
        url: 'special2024/export/ql/stbh',
        method: 'get',
        params: params,
    })
}

export function specialcjhh(params) {
    return request({
        url: 'special2024/fileList/cjhh/zdqy',
        method: 'get',
        params: params,
    })
}

export function specialcjhhexport(params) {
    return request({
        url: 'special2024/export/cjhh/zdqy',
        method: 'get',
        params: params,
    })
}
export function gdbhb() {
    return request({
        url: 'generate/gdbhb',
        method: 'get',
    })
}

export function issuedlist(params) {
    return request({
        url: 'issued/tb/list',
        method: 'get',
        params: params,
    })
}

export function issuedexport() {
    return request({
        url: 'fileList/xftb/list',
        method: 'get',
    })
}
export function issuedexporter(params) {
    return request({
        url: 'issued/tb/export',
        method: 'get',
        params: params,
    })
}

export function DropdownBoxXftb(params) {
    return request({
        url: 'DropdownBox/DropdownBoxXftb',
        method: 'get',
        params: params,
    })
}

export function issuedid(params) {
    return request({
        url: 'issued/tb/id',
        method: 'get',
        params: params,
    })
}

export function listactual(params) {
    return request({
        url: 'actual/list',
        method: 'get',
        params: params,
    })
}

export function sjupdate(data) {
    return request({
        url: 'actual/update',
        method: 'put',
        data: data,
    })
}

export function wzgwttbadd(data) {
    return request({
        url: 'wzgwttb/add/glqInfo',
        method: 'post',
        data: data,
    })
}
export function sjyrtadd(data) {
    return request({
        url: 'actual/add',
        method: 'post',
        data: data,
    })
}
export function tdwpzfjcreport(params) {
    return request({
        url: 'issued/tb/tdwpzfjc/report',
        method: 'get',
        params: params,
    })
}

export function rectification() {
    return request({
        url: 'generate/rectification/report',
        method: 'get',

    })
}
export function glq2024report(params) {
    return request({
        url: 'glq2024/glq/report',
        method: 'get',
        params: params,
    })
}

export function wzgwttbglq(params) {
    return request({
        url: 'wzgwttb/wzg/glq',
        method: 'get',
        params: params,
    })
}

export function wzgwttbids(ids) {
    const idsString = ids
    return request({
        url: `wzgwttb/delete/ids`,
        method: 'delete',
        params: { ids: idsString },
    });
}
export function actualids(ids) {
    const idsString = ids
    return request({
        url: `actual/delete/ids`,
        method: 'delete',
        params: { ids: idsString },
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
