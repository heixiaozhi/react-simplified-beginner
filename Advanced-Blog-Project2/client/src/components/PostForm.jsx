import { Form, Link } from 'react-router-dom'
import { FormGroup } from './FormGroup.jsx'

// props 解构给个默认值{}防止不传时错误
// 在 JavaScript 中，函数的默认参数仅在传入 undefined 或没有传参时生效。
// {}.属性 等于 undefined
export function PostForm({
  users,
  isSubmitting,
  defaultValues = {},
  errorMessage = {},
}) {

  return (
    <>
      <Form method='post' className='form'>
        <div className='form-row'>
          <FormGroup error={errorMessage.title}>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              defaultValue={defaultValues.title}
            />
          </FormGroup>
          <FormGroup error={errorMessage.userId}>
            <label htmlFor='userId'>Author</label>
            <select
              name='userId'
              id='userId'
              defaultValue={defaultValues.userId}
            >
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                )
              })}
            </select>
          </FormGroup>
        </div>
        <div className='form-row'>
          <FormGroup error={errorMessage.body}>
            <label htmlFor='body'>Body</label>
            <textarea
              name='body'
              id='body'
              defaultValue={defaultValues.body}
            ></textarea>
          </FormGroup>
        </div>
        <div className='form-row form-btn-row'>
          <Link className='btn btn-outline' to='..'>
            Cancel
          </Link>
          <button disabled={isSubmitting} className='btn'>
            {isSubmitting ? 'saving' : 'save'}
          </button>
        </div>
      </Form>
    </>
  )
}

export function validateForm({ title, userId, body }) {
  const errors = {}
  if (title === '') {
    errors.title = 'Title is required'
  }
  if (userId === '') {
    errors.userId = 'User is required'
  }
  if (body === '') {
    errors.body = 'Body is required'
  }
  return errors
}
