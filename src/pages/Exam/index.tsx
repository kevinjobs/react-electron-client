import React from 'react';
import { ipcRenderer } from 'electron';
import './exam.scss';
import { Tree, Button, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import {
  QuestionBankType,
  QuestionType
} from './quesTypes';
import QuesPanel from './QuesPanel';

const Exam: React.FC = () => {
  
  const [bank, setBank] = React.useState<QuestionBankType>();
  const [bankPath, setBankPath] = React.useState('');
  const [currentQues, setCurrentQues] = React.useState<QuestionType[]>();
  const [isQuestionPanelVisible, setIsQuestionPanelVisible] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const readBank = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    ipcRenderer.send('bank', 'read', null);
    ipcRenderer.on('bank-read-reply', (event, bankPath, bankData) => {
      setBankPath(bankPath);
      setBank(bankData);
    })
  }

  const onSelect = (selectedKeys: any, e: any) => {
    const title = e.node.title;
    const key = e.node.key;
    const keyArr = key.split('-')

    switch(keyArr.length) {
      case 1:
        ipcRenderer.send('question', 'read-by-title', 'subject', title);
        break;
      case 2:
        ipcRenderer.send('question', 'read-by-title', 'chapter', title);
        break;
      case 3:
        ipcRenderer.send('question', 'read-by-title', 'section', title);
        break;
      default:
        break;
    }

    ipcRenderer.on('ques-read-by-title-reply', (err, data) => {
      // 监听主进程返回的问题
      setCurrentQues(data);
    });

    setIsQuestionPanelVisible(true);
  }

  React.useEffect(() => {
    ipcRenderer.send('bank', 'read', 'default');
    ipcRenderer.on('bank-read-reply', (event, bankPath, data) => {
      // 监听主进程返回的json题库文件
      setBankPath(bankPath);
      setBank(data);
    })
  }, [])

  return(
    <div className="Exam">
      <div className="Exam__header">
        <Button onClick={readBank} type="primary">打开题库</Button>
      </div>
      <div className="Exam__subjects-views">
        <h2 className="Exam__subjects-views__title">当前题库：<b>{bank?.title}</b></h2>
        <p style={{width:'100%'}}>当前文件路径: {bankPath}</p>
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          onSelect={onSelect}
          treeData={bank?.subjects}
        />
      </div>
      <QuesPanel
        onClose={e => setIsModalVisible(true)}
        visible={isQuestionPanelVisible}
        questions={currentQues as QuestionType[]}
      />
      <Modal
        title="退出确定"
        visible={isModalVisible}
        onOk={e => {
          setIsQuestionPanelVisible(false);
          setIsModalVisible(false);
        }}
        onCancel={e => setIsModalVisible(false)}
      >你确定要退出本次答题吗？答题未完成记录将不保存。</Modal>
    </div>
  )
}

export default Exam;