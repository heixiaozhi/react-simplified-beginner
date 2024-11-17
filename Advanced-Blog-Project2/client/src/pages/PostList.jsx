import { Form, Link, useLoaderData } from 'react-router-dom'
import { getPosts } from '../api/posts'
import { getUsers } from '../api/users'
import { PostCard } from '../components/PostCard'
import { FormGroup } from '../components/FormGroup'
import { useEffect, useRef } from 'react'

function PostList() {
  const {
    posts,
    users,
    searchParams: { query, userId },
  } = useLoaderData()

  const queryRef = useRef()
  const userIdRef = useRef()

  // 同步url的params到ref中
  useEffect(() => {
    // 就是当你回到<=上次访问可以给"" 正确显示过滤菜单
    // query || '' 因为第一次值是null 所以赋值一个''正常显示
    queryRef.current.value = query || ''
    userIdRef.current.value = userId || ''
  }, [query, userId])

  return (
    <>
      <h1 className='page-title'>
        Posts
        <div className='title-btns'>
          <Link className='btn btn-outline' to='/posts/new'>
            New
          </Link>
        </div>
      </h1>
      {/* method=post 触发action 默认get */}
      <Form method='get' className='form mb-4'>
        <div className='form-row'>
          <FormGroup className='form-group'>
            <label htmlFor='query'>Query</label>
            <input type='search' name='query' id='query' ref={queryRef} />
          </FormGroup>
          <FormGroup className='form-group'>
            <label htmlFor='userId'>Author</label>
            <select type='search' name='userId' id='userId' ref={userIdRef}>
              <option value=''>Any</option>
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                )
              })}
            </select>
          </FormGroup>
          <button className='btn'>Filter</button>
        </div>
      </Form>
      <div className='card-grid'>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  )
}

async function loader({ request: { signal, url } }) {
  // new URL() 是将url参数传入, 它用于解析和操作 URL。
  // .searchParams 是 URL 对象的一个属性，返回一个 URLSearchParams 对象，这个对象提供了操作 URL 查询参数的方法。
  const searchParams = new URL(url).searchParams
  const query = searchParams.get('query')
  const userId = searchParams.get('userId')
  const paramsObj = { q: query }

  // 当过滤时，userId= Any 的话就是不传入查询 或者 设置为null即可
  if (userId !== '') paramsObj.userId = userId

  // 当params中的参数等于null时，它就不会将该参数加入到请求路径中
  const posts = getPosts({
    signal,
    params: paramsObj,
  })
  const users = getUsers({ signal })
  return {
    posts: await posts,
    users: await users,
    searchParams,
  }
}

export const postListRoute = {
  loader,
  element: <PostList />,
}
