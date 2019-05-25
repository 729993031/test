import React, { Component, Fragment } from 'react';
import { Input, Button, Switch, Modal } from 'antd/lib/index';
import { connect } from 'dva/index';
import Styles from './GetQuns.less';

function Header() {
  return (
    <div className={Styles.header}>
      <div className={Styles.headerTitle}>群管理</div>
    </div>
  );
}

/*
 *弹出框的底部
 */
function ModalFooter({ dispatch }) {
  return (
    <div className={Styles.footerWrapper}>
      <Button
        className={Styles.modalCancelButton}
        onClick={() => dispatch({ type: 'getQuns/closeModal' })}
      >
        取消
      </Button>
      <Button
        className={Styles.modalAffirmButton}
        type="primary"
        onClick={() =>
          dispatch({
            type: 'getQuns/updateQuns',
          })
        }
      >
        确认
      </Button>
    </div>
  );
}
/*
 *更新关联机器人弹出框
 *
 */
function UpdateModal({ visible, dispatch, data }) {
  return (
    <Modal
      title="提示"
      visible={visible}
      centered
      wrapClassName={Styles.modalWrapper}
      onCancel={() => dispatch({ type: 'getQuns/closeModal' })}
      footer={<ModalFooter dispatch={dispatch} data={data} />}
    >
      <div className={Styles.modalContent}>
        <div>群关联机器人，20元/月</div>
        <div>请确认是否关联？</div>
      </div>
    </Modal>
  );
}
/*
 头部输入栏
 */
function SearchHeader({ dispatch }) {
  return (
    <div className={Styles.searchHeader}>
      <Input
        placeholder="请输入商品名称"
        size="large"
        onChange={event =>
          dispatch({
            type: 'getQuns/searchCache',
            input: event.target.value,
          })
        }
        className={Styles.inputBar}
      />
      <Button onClick={() => dispatch({ type: 'getQuns/search' })} className={Styles.searchButton}>
        查询
      </Button>
    </div>
  );
}
/*
 * 群展示列表
 * */
function MessageList({ data, dispatch }) {
  return (
    <div className={Styles.messageList}>
      <SearchHeader dispatch={dispatch} />
      {data.map(({ avatarUrl, name, isLinkShop, isIntelliChat, id }, index) => (
        <Fragment key={id}>
          <MessageItem
            dispatch={dispatch}
            id={id}
            avatarUrl={avatarUrl}
            name={name}
            isLinkShop={isLinkShop}
            index={index}
            isIntelliChat={isIntelliChat}
          />
        </Fragment>
      ))}
    </div>
  );
}

/**
 * 群展示项目
 * @param {number}index 数组索引
 * @param {string}avatarUrl 群组图片
 * @param {string}name 群组名
 * @param {number}isLinkShop 是否关联商店
 * @param {number}isIntelliChat 是否关联机器人
 * @returns {*}
 * @constructor
 */
function MessageItem({ index, avatarUrl, name, isLinkShop, isIntelliChat, dispatch, id }) {
  return (
    <div className={Styles.item}>
      <div className={Styles.messageItem}>
        <div className={Styles.messageIndex}>{index + 1}</div>
        <img className={Styles.messagePhoto} src={avatarUrl} alt={name} />
        <div className={Styles.messageName}>{name}</div>
      </div>
      <div style={{ display: 'flex' }}>
        <div className={Styles.switchItem}>
          <div className={Styles.switchName}>关联店铺</div>
          <Switch
            checked={!!isLinkShop}
            size="small"
            className={Styles.switchButton}
            onChange={value =>
              value
                ? dispatch({
                    type: 'getQuns/openModal',
                    payload: {
                      index,
                      id,
                      switchData: {
                        togetherData: { isLinkShop },
                        nextData: { isLinkShop: isLinkShop === 0 ? 1 : 0 },
                      },
                    },
                  })
                : null
            }
          />
          {isLinkShop ? '开' : '关'}
        </div>
        <div className={Styles.switchItem}>
          <div className={Styles.switchName}>关联机器人</div>
          <Switch
            checked={!!isIntelliChat}
            size="small"
            className={Styles.switchButton}
            onClick={null}
            onChange={value =>
              value
                ? dispatch({
                    type: 'getQuns/openModal',
                    payload: {
                      index,
                      id,
                      switchData: {
                        togetherData: { isIntelliChat },
                        nextData: { isIntelliChat: isIntelliChat === 0 ? 1 : 0 },
                      },
                    },
                  })
                : null
            }
          />
          {isIntelliChat ? '开' : '关'}
        </div>
      </div>
    </div>
  );
}

@connect(({ getQuns }) => ({
  getQuns,
}))
class GetQuns extends Component {
  // eslint-disable-next-line no-useless-constructor

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'getQuns/fetch',
      payload: {
        pageSize: 10,
        pageNo: 1,
        q: '{}',
      },
    });
  }

  render() {
    const { getQuns, dispatch } = this.props;
    return (
      <div>
        <Header />
        <UpdateModal dispatch={dispatch} visible={getQuns.visible} data={getQuns} />
        {getQuns.data ? <MessageList {...getQuns} dispatch={dispatch} /> : null}
      </div>
    );
  }
}

export default GetQuns;
