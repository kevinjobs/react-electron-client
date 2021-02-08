import { DataNode } from "antd/lib/tree";

export interface QuestionType {
  id: number,
  stem: string,
  type: number,
  subject?: DataNode,
  chapter?: DataNode,
  section?: DataNode,
  answers: QuestionAnswerType[],
  stat: QuestionStatType
}

export interface QuestionStatType {
  timeSpent: number[],
  rightTimes: number
}

export interface QuestionAnswerType {
  content: string,
  isRight: boolean
}

export interface QuestionBankType {
  version: string,
  author: string,
  createTime: string,
  updateTime: string,
  title: string,
  type: string,
  subjects: DataNode[]
}