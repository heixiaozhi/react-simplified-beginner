import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom'
import { getUsers } from '../api/users'
import { getPost, updatePost } from '../api/posts'
import { PostForm, validateForm } from '../components/PostForm'

function EditPost() {
  const { users, post } = useLoaderData()
  const { state } = useNavigation()
  const errors = useActionData()
  const isSubmitting = state === 'submitting'



  return (
    <>
      <h1 className='page-title'>edit post</h1>
      {/* props true值可以只写变量名 */}
      <PostForm
        users={users}
        defaultValues={post}
        isSubmitting={isSubmitting}
        errorMessage={errors}
      />
    </>
  )
}

const loader = async ({ request, params }) => {
  const users = getUsers({ params: request.signal })
  const post = getPost(params.postId, { params: request.signal })
  return { users: await users, post: await post }
}

const action = async ({ request, params }) => {
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

  const post = await updatePost(
    params.postId,
    { title, userId, body },
    {
      signal: request.signal,
    }
  )

  return redirect(`/posts/${post.id}`)
}

export const editPostRoute = {
  action,
  loader,
  element: <EditPost />,
}
