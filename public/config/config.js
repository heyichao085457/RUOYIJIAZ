// 服务接口IP配置
import axios from "axios";
const serverIP = "http://124.114.203.222:8084/wpzf";
// const serverIP = "http://192.168.2.37:8085";
const config = {
  // 个人中心url
  url: {
    // 登录，
    Login: `${serverIP}/login`,
    //行政区划查询
    areas: `${serverIP}/freckle/problem/areas`,
    //问题图斑管理 查询所有
    allWTTB: `${serverIP}/freckle/problem/page/all`,
    //问题类型查询
    getProblemTypes: `${serverIP}/freckle/problem/problemTypes`,
    //地块监测变化 查询所有
    allDTJC: `${serverIP}/land/monitor/findPage`,
    //问题图斑 根据地块编号查询单条地块
    findByLandCode: `${serverIP}/freckle/problem/findByCode`,
    findByLandCodeQb: `${serverIP}/freckle/findByCode`,

    //根据id查询外业核查对象信息
    problemPatchId: `${serverIP}/problemPatch/getInfoById`,
    //销号
    cancel: `${serverIP}/freckle/problem/cancel`,
    //根据地块编号、日期范围查询 监测变化
    jcbh: `${serverIP}/land/monitor/findByCode`,
    //用户查询
    userList: `${serverIP}/user/list`,
    //根据id删除用户
    deleteById: `${serverIP}/user/deleteById`,
    //启用(0)/禁用(1)
    changeState: `${serverIP}/user/changeState`,
    //保存用户
    saveUser: `${serverIP}/user/save`,
    //用户查询
    findById: `${serverIP}/user/findById`,
    //保存数据单权限
    saveDataRoles: `${serverIP}/user/saveDataRoles`,
    //保存菜单单权限
    saveMenuRoles: `${serverIP}/user/saveMenuRoles`,
    //查询数据、菜单、功能权限
    allRoles: `${serverIP}/user/allRoles`,
    //重置密码
    resetPwd: `${serverIP}/user/resetPwd`,
    //导出问题图斑
    exportWTTB: `${serverIP}/freckle/problem/export`,
    //导出全部图斑
    exportQBTB: `${serverIP}/freckle/export`,
    //地块监测变化
    exportJCBH: `${serverIP}/land/monitor/export`,
    //修改密码
    updatePassword: `${serverIP}/user/updatePassword`,
    //大屏展示
    dpzs: `${serverIP}/search/count`,
    //生成工作报告
    scbg: `${serverIP}/work/report/create`,
    //报告类型
    bglx: `${serverIP}/work/report/types`,
    //报告行政区划
    bg_xzqh: `${serverIP}/work/report/areas`,
    //筛选条件查询
    options: `${serverIP}/freckle/options`,
    //全部图斑
    freckleAll: `${serverIP}/freckle/page/all`,
    //生命周期
    lifeCycle: `${serverIP}/freckle/lifeCycle`,
    //所有可选的影像
    userPhoto: `${serverIP}/userPhoto/findAll`,
    //根据用户id查询用户的默认影像配置
    userPhotoFind: `${serverIP}/userPhoto/find`,
    //保存选择
    userPhotoUpdate: `${serverIP}/userPhoto/update`,
    //字典数据查询
    dataList: `${serverIP}/wpzfDictData/list`,
    //新增字典数据
    addDictData: `${serverIP}/wpzfDictData/add`,
    //更新数据查询
    updateDictData: `${serverIP}/wpzfDictData/update`,
    //删除字典数据
    dateleDictData: `${serverIP}/wpzfDictData/zdId`,
    //删除字典数据
    DictDataById: `${serverIP}/wpzfDictData/id`,
    //问题图斑信息数据查询
    // addProblemPatch: `${serverIP}/problemPatch/problemPatchList`,
    addProblemPatch: `${serverIP}/problemPatch/ProblemSpotList`,
    //全部图斑-添加至问题图斑台账
    addWttbTz: `${serverIP}/problemPatch/addProblemPatch`,
    //全部问题图斑 修改图斑信息
    updateWttb: `${serverIP}/problemPatch/update`,
    //批量修改问题图斑信息
    updateWttbList: `${serverIP}/problemPatch/updateProblemPatch`,
    //实际用途下拉框
    checkList: `${serverIP}/problemPatch/actualUserList`,
    //批量导入
    batchImport: `${serverIP}/problemPatch/batchImport`,
    //图斑外业照片
    // getImageInfoByLandCode: `${serverIP}/imageUpload/getImageInfoById`,
    exportImpot: `${serverIP}/freckle/problem/export`,
    //文件上传
    upload: `${serverIP}/annexUpload/upload`,
    //附件管理编辑
    updateAnnexInfo: `${serverIP}/annexUpload/updateAnnexInfo`,
    tbxf: `${serverIP}/smzq/tbxf`,
    xjtb: `${serverIP}/smzq/xjtb`,
    nysh: `${serverIP}/smzq/nysh`,
    smzqjd: `${serverIP}/smzq/smzqjd`,
    wyhc: `${serverIP}/smzq/wyhc`,
    wyhc: `${serverIP}/smzq/wyhc`,
    //违法图斑整改情况
    wfzg: `${serverIP}/problemPatch/wfzg`,
    //违法图斑未整改情况
    wzgqk: `${serverIP}/problemPatch/wzgqk`,
    //字典
    wpzfDictData: `${serverIP}/wpzfDictData/list`,
    zdLx: `${serverIP}/wpzfDictData/zdLx`,
    updateLx: `${serverIP}/wpzfDictData/updateLx`,
    list: `${serverIP}/hcrw/list`,
    addCheckTask: `${serverIP}/hcrw/addCheckTask`,
    updateCheckTask: `${serverIP}/hcrw/updateCheckTask`,
    addNr: `${serverIP}/wpzfDictData/addNr`,
    updateNr: `${serverIP}/wpzfDictData/updateNr`,
    smzqshjd: `${serverIP}/smzq/smzqshjd`,
    export: `${serverIP}/excel/exportList`,
    download: `${serverIP}/download/list`,
    tree: `${serverIP}/wpzfDictData/tree`,
    addJsc: `${serverIP}/jsc/addJsc`,
    computeList: `${serverIP}/jsc/computeList`,
    jscId: `${serverIP}/jsc/jscId`,
    removeNr: `${serverIP}/wpzfDictData/removeNr`,
    removeCheckTask: `${serverIP}/hcrw/removeCheckTask`,
    listfileList: `${serverIP}/fileList/list`,
    archivesName: `${serverIP}/archives/archivesName`,
    archivesByUploadBy: `${serverIP}/archives/archivesByUploadBy`,



  },
  //地图内容
  map: {
    styles: {}
  },
  user: {
    funIds: [],
  }
};

axios.interceptors.request.use(
  config => {
    config.baseURL = serverIP;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


export default config;
