import models from '../models/getQuns';

const state= {
    data: null,
    searchCache: '',
    visible: false,
    targetId: 0,
    targetIndex: 0,
    switchData: {},
  };
describe('测试评论列表项组件', () => {
  it('test',()=>{
    const {save} =models.reducers;
    expect(save(state,{payload:[1,2,3]})).toEqual({
      data: [1,2,3,4],
      searchCache: '',
      visible: false,
      targetId: 0,
      targetIndex: 0,
      switchData: {},
    })
  })
  // 这是jest的玩法，推荐用这种
})
