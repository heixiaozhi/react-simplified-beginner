import { getUsers } from '../api/users'
import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom'
import { addPosts } from '../api/posts'
import { PostForm, validateForm } from '../components/PostForm'

function NewPost() {
  const users = useLoaderData()
  const { state } = useNavigation()
  // 如果action没返回值则是 undefined
  const errors = useActionData()
  const isSubmitting = state === 'submitting'

  return (
    <>
      <h1 className='page-title'>New Post</h1>
      <PostForm
        users={users}
        isSubmitting={isSubmitting}
        errorMessage={errors}
      />
    </>
  )
}

const loader = async ({ request }) => {
  const users = await getUsers({ signal: request.signal })
  return users
}

const action = async ({ request }) => {
  const formData = await request.formData()
  const title = formData.get('title')
  const userId = formData.get('userId')
  const body = formData.get('body')

  const errors = validateForm({ title, userId, body })
  // Object.keys 返回属性数组
  // 属性 in obj 判断对象是否有属性 等价于obj.hasOwnProperty
  if (Object.keys(errors).length > 0) {
    return errors
  }

  const post = await addPosts(
    { title, userId, body },
    {
      signal: request.signal,
    }
  )

  return redirect(`/posts/${post.id}`)
}

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
}
