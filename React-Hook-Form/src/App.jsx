import {FormGroup} from "./FormGroup"
import ReactSelect from "react-select"
import {useRef, useState} from "react"
import "./styles.css"
import {checkCountry, checkEmail, checkPassword} from "./validators"
import {useController, useForm} from "react-hook-form";

const COUNTRY_OPTIONS = [
  {label: "United States", value: "US"},
  {label: "India", value: "IN"},
  {label: "Mexico", value: "MX"},
]

function App() {
  // register 注册并绑定元素响应式
  // handleSubmit 表单提交函数
  // 嵌套解构error 表单验证的错误信息
  // controller 管理非原始组件受控制 control
  const {register, control, handleSubmit, formState: {errors}} = useForm()

  const {field: countryField} = useController({
    name: "country",
    control,
    rules: {
      required: {value: true, message: "required"},
    }
  })

  function onSubmit(data) {
    // data 表示表单中的信息
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <FormGroup errorsMessage={errors.email?.message}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input className="input" type="email" id="email" {...register("email", {
          required: {value: true, message: "required"},
          validate: (value) => {
            if (!value.endsWith("@webdevsimplified.com")) {
              return "Must end with @webdevsimplified.com"
            }
          },
        })} />
      </FormGroup>
      <FormGroup errorsMessage={errors.password?.message}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          {...register("password", {
            required: {value: true, message: "required"},
            minLength: {value: 10, message: "Must be at least 10 characters"},
            validate: {
              // 可以使用对象形式和函数形式
              hasLowerCase: value => {
                if (!value.match(/[a-z]/)) {
                  return "Must include at least 1 lowercase letter"
                }
              },
              hasUpperCase: value => {
                if (!value.match(/[A-Z]/)) {
                  return "Must include at least 1 uppercase letter"
                }
              },
              hasNumber: value => {
                if (!value.match(/[0-9]/)) {
                  return "Must include at least 1 number"
                }
              },
            }
          })}
        />
      </FormGroup>
      <FormGroup errorsMessage={errors.country?.message}>
        <label className="label" htmlFor="country">
          Country
        </label>
        <ReactSelect
          isClearable
          classNamePrefix="react-select"
          id="country"
          options={COUNTRY_OPTIONS}
          {...countryField}
        />
      </FormGroup>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  )
}

export default App
