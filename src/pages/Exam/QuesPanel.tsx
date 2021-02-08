import React from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import {
  QuestionType,
  QuestionAnswerType,
  QuestionStatType
} from './quesTypes';

interface QuesPanelProps {
  questions: QuestionType[],
  visible?: boolean,
  onClose?: React.MouseEventHandler<HTMLElement>
}

const defaultAnswers: QuestionAnswerType[] = [
  {
    content: 'no answer',
    isRight: false
  }
]

const defaultStat: QuestionStatType = {
  timeSpent: [],
  rightTimes: 0
}

const defaultQues: QuestionType = {
  id: 9999999,
  stem: `No Stem`,
  type: 1,
  answers: defaultAnswers,
  stat: defaultStat
}

const QuesPanel: React.FC<QuesPanelProps> = (props: QuesPanelProps) => {
  const [index, setIndex] = React.useState(0);
  const [second, setSecond] = React.useState(0);
  const [pasue, setPasue] = React.useState(false);

  const timer: any = React.useRef();

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    const { onClose } = props;
    if (onClose) {
      (onClose as React.MouseEventHandler<HTMLElement>)(e);
    };
  }

  const onSelect = (e: any) => {
    e.preventDefault();
    const index = e.target.attributes.getNamedItem('data-index').value;
    setIndex(parseInt(index));
  }

  const startTimer = () => {
    timer.current = setInterval(() => {
      setSecond(n => {return n + 1})
    }, 1000)
  }

  const clearTimer = () => {
    clearInterval(timer.current);
  }

  const question: QuestionType = props.questions![index];
  const questionTypeConverter = ['单选题','多选题','不定项']

  React.useEffect(() => {
    // set the index to 0 when panel is hidden.
    if (!props.visible) {
      setIndex(0);
      setSecond(0);
    }
  }, [props.visible]);

  React.useEffect(() => {
    if (!pasue) startTimer();
    else clearTimer();
    return () => clearTimer();
  });

  React.useEffect(() => {
    setSecond(0);
    setPasue(false);
  }, [index]);

  return(
    <div
      className="Exam__question-panel mask-1"
      style={{display: props.visible ? '' : 'none'}}
    >
      <div className="Exam__question-panel__card shadow-5" onClick={e => e.stopPropagation()}>
        <div className="Exam__question-panel__card-left">
          <div className="Exam__question-panel__card-left__header">
            <span>{question?.id}</span>
            <span className="tag-1">{questionTypeConverter[question?.type-1]}</span>
            <span className="tag-2">
              {
                question?.subject?.title + ' / '
                + question?.chapter?.title + ' / '
                + question?.section?.title
              }
            </span>
          </div>
          <div className="Exam__question-panel__card-left__content no-scroll-bar">
            <p dangerouslySetInnerHTML={{__html: question?.stem }}></p>
          </div>
          <div className="Exam__question-panel__card-left__answer no-scroll-bar">
            {
              question?.answers?.map((answer, index) => {
                return(
                  <div
                    className="Exam__question-panel__card-left__answer__item"
                    key={index}
                  >
                    <span>{String.fromCharCode(index + 65)}</span>
                    <span
                      dangerouslySetInnerHTML={{__html: answer.content}}
                      style={{display:'inline-block',marginLeft:10}}
                    ></span>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="Exam__question-panel__card-right">
          <div className="Exam__question-panel__card-right__close" onClick={handleClose}>
            <CloseOutlined />
          </div>
          <div className="Exam__question-panel__card-right__stat">
            <div>本题用时: {second} 秒</div>
            <Button
              onClick={e => setPasue(!pasue)}
              type={pasue ? 'primary' : 'default'}
            >
              { pasue ? '继续' : '暂停'}
            </Button>
          </div>
          <div className="Exam__question-panel__card-right__index">
            <h3 style={{textAlign:'center'}}>Index</h3>
            {
              props.questions.map((_, i) => {
                return(
                  <span
                    key={i}
                    data-index={i}
                    onClick={onSelect}
                    className={classnames({
                      'Exam__question-panel__card-right__index__item': true,
                      'selected': i === index ? true : false
                    })}
                  >
                    {i + 1}
                  </span>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

QuesPanel.defaultProps = {
  questions: [defaultQues]
}

export default QuesPanel;