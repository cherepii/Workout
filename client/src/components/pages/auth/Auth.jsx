import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from "../../../hooks/useAuth"
import {useMutation} from "react-query"
import $api from '../../../api/api'

import Layout from '../../common/layout/Layout'
import Button from '../../ui/button/Button'
import Field from '../../ui/field/Field'

import authBg from "../../../images/bg-auth.png"
import styles from "./Auth.module.scss"
import Alert from '../../ui/alert/Alert'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState([])
  const [type, setType] = useState('auth')
  const {setIsAuth} = useAuth()
  const navigate = useNavigate()

  const loginHandler = (token) => {
    localStorage.setItem('token', token)

    setIsAuth(true)
    navigate('/')

    setEmail('')
    setPassword('')
  } 

  const {mutate: register, isLoading, error} = useMutation('Registration', 
  () => $api({
    type: 'POST',
    body: {email, password},
    url: '/users',
    auth: false
  }), {
    onSuccess(data){
      loginHandler(data.token)
    }
  })

  const {mutate: auth, isLoading: isAuthLoading, error: authError} = useMutation('Auth', 
  () => $api({
    type: 'POST',
    body: {email, password},
    url: '/users/login',
    auth: false
  }), {
    onSuccess(data){
      loginHandler(data.token)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if(type === 'auth'){
      auth()
    }else {
      register()
    }
  }

  return (
    <>
      <Layout height='356px' bgImage={authBg} heading='auth and registration'/>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          {error && <Alert type='error' text={error}/>}
          {authError && <Alert type='error' text={authError}/>}
          {(isLoading || isAuthLoading) && <p>loading...</p>}
          <Field 
            type='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder='Enter email'
            required
          />

          <Field 
            type='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder='Enter password'
            required
          />

          <div className={styles.wrapperBtn}>
            <Button text='Log in' onButtonClick={() => setType('auth')}/>
            <Button text='Log up' onButtonClick={() => setType('reg')}/>
          </div>

        </form>
      </div>
    </>
  )
}

export default Auth