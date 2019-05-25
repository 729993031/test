import { queryQuns, updateQuns } from '../api.js';

export default {
  namespace: 'getQuns',
  /*
   * targetId 通过switch按钮打开弹窗的当前项目的ID
   * targetIndex 打开当前弹框的项目位于数组的索引
   * visible 弹窗显隐
   * searchCache 缓存输入栏数据
   * switchData 切换按钮的数据
   */
  state: {
    data: null,
    searchCache: '',
    visible: false,
    targetId: 0,
    targetIndex: 0,
    switchData: {},
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *search() {
      /*
       * 预留查询商品名称接口
       * */
    },
    *updateQuns(_,{ put,select, call ,}) {
      const {targetId,switchData:{togetherData}}=yield select(state => state.getQuns);
      yield put({
        type: 'updateRobot',
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    searchCache(state, action) {
      return {
        ...state,
        searchCache: action.input,
      };
    },
    openModal(state, action) {
      return {
        ...state,
        targetId: action.payload.id,
        switchData: action.payload.switchData,
        targetIndex: action.payload.index,
        visible: true,
      };
    },
    closeModal(state) {
      return {
        ...state,
        visible: false,
      };
    },
    /*
     * 更新关联选项
     * */
    updateRobot(state) {
      const copyState = JSON.parse(JSON.stringify(state));
      copyState.data[state.targetIndex] = {
        ...copyState.data[state.targetIndex],
        ...copyState.switchData.nextData,
      };
      copyState.visible = false;
      return {
        ...copyState,
      };
    },
  },
};
