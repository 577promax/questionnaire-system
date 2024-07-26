export async function getOneQuestionData(id: string) {
  const res = await fetch(`http://localhost:3005/api/question/${id}`) // 启动 nest.js 服务端
  return res.json()
}
