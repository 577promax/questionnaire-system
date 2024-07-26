import { getOneQuestionData } from '@/lib/data'
import { createAnswer } from '@/lib/action'
import QuestionInput from '@/components/QuestionInput'
import QuestionCheckbox from '@/components/QuestionCheckbox'

interface Props {
  params: {
    id: string
  }
}

export default async function OneBlog({ params }: Props) {
  const { id: questionId } = params
  const resData = await getOneQuestionData(questionId)

  const inputProps = { title: '标题1', placeholder: '请输入标题' }
  const checkboxPros = {
    title: '多选标题',
    list: [
      { value: 'item1', text: '选项1', checked: true },
      { value: 'item2', text: '选项2', checked: false },
      { value: 'item3', text: '选项3', checked: false },
    ],
    isVertical: false,
  }

  return (
    <div>
      <h3>{resData.data.title}</h3>

      <form action={createAnswer}>
        <input type="hidden" name="questionId" value={questionId}></input>

        <QuestionInput fe_id="c1" props={inputProps} />
        <QuestionCheckbox fe_id="c2" props={checkboxPros} />

        <button type="submit">提交</button>
      </form>

      {/* <p>One Blog {questionId}</p> */}
      {/* <div>{JSON.stringify(resData)}</div> */}
    </div>
  )
}
