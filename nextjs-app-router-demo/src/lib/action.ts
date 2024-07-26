'use server' // Server Action

import { redirect } from 'next/navigation'

export async function createAnswer(formData: FormData) {
  for (const key of formData.keys()) {
    console.log(key, formData.get(key))
  }

  // formData 提交到服务端

  // 跳转
  redirect('/success')
}
