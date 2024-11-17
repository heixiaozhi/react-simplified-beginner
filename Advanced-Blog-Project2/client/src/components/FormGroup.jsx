// props children 传递子内容
export function FormGroup({ children, error }) {
  // 对象没属性没有返回undefined null == undefind
  // 有值说明不等于null
  return (
    <>
      <div className={`form-group ${error != null ? 'error' : 'form-group'}`}>
        {children}
        {error != null && <div className='error-message'>{error}</div>}
      </div>
    </>
  )
}
