'use client'

// 客户端组件：交互，useState，useEffect，DOM 事件，浏览器 API

import React, { FC, useState, useEffect } from 'react'
import { produce, enableMapSet } from 'immer'
import styles from './QuestionCheckbox.module.css'

enableMapSet()

type PropsType = {
  fe_id: string
  props: {
    title: string
    list: Array<{
      value: string
      text: string
      checked: boolean
    }>
    isVertical: boolean
  }
}

const QuestionCheckbox: FC<PropsType> = ({ fe_id, props }) => {
  const { title, list = [], isVertical = false } = props

  // 存储选中的 values
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set())
  useEffect(() => {
    list.forEach((item) => {
      const { value, checked } = item
      if (checked) {
        // setSelectedValues(prevValues => new Set(prevValues.add(value)))
        setSelectedValues(produce((draft) => draft.add(value)))
      }
    })
  }, [list])

  // 切换 checkbox
  function toggleChecked(value: string) {
    if (selectedValues.has(value)) {
      // 已选中，则取消选择
      setSelectedValues(
        produce((draft) => {
          draft.delete(value)
        })
      )
    } else {
      // 为选中，则增加选择
      setSelectedValues(
        produce((draft) => {
          draft.add(value)
        })
      )
    }
  }

  return (
    <>
      <p>{title}</p>

      {/* 记录选中的 value ，以便  form 提交 */}
      <input
        type="hidden"
        name={fe_id}
        value={Array.from(selectedValues).toString()}
      />

      <ul className={styles.list}>
        {list.map((item) => {
          const { value, text } = item

          // 根据 isVertical 生成 className
          let className
          if (isVertical) className = styles.verticalItem
          else className = styles.horizontalItem

          return (
            <li key={value} className={className}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedValues.has(value)}
                  onChange={() => toggleChecked(value)}
                />
                {text}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default QuestionCheckbox
