import { useState } from 'react'
import { useMutation } from 'react-query'
import cl from "classnames"
import $api from '../../../../api/api'

import Layout from '../../../common/layout/Layout'
import Button from '../../../ui/button/Button'
import Field from '../../../ui/field/Field'
import Alert from '../../../ui/alert/Alert'

import createBg from "../../../../images/bg-create.png"
import styles from "./NewExercise.module.scss"

const images = [
  'chest', 'shoulders', 'biceps', 'legs', 'hit'
]


const NewExercise = () => {
  const [name, setName] = useState('')
  const [times, setTimes] = useState(3)
  const [imageName, setImageName] = useState('chest')

  const {mutate: create, isLoading, isSuccess, error} = useMutation('Exercise', 
  () => $api({
    url: '/exercises',
    body: {name, times, imageName},
    type: 'POST'
  }), {
    onSuccess() {
      setName('')
      setTimes(3)
      setImageName('chest')
    }
  }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    create()
  }

  return (
    <>
      <Layout bgImage={createBg} heading='Создание нового упражнения'/>
      <div className='wrapper' style={{maxWidth: 360}}>
        {error && <Alert type='error' text={error}/>}
        {isSuccess && <Alert text='Упражнения создано успешно !'/>}
        {isLoading && <p>loading...</p>}
        <form onSubmit={handleSubmit}>
          <Field 
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder='Введите название'
          />
          <Field 
            onChange={e => setTimes(e.target.value)}
            value={times}
            placeholder='Введите количество подходов'
          />
          <div className={styles.images}>
            {images.map(image => (
              <img 
                key={`exercise key ${image}`}
                src={`/uploads/exercises/${image}.svg`} 
                alt="body"
                className={cl({
                  [styles.active]: imageName === image
                })}
                onClick={() => setImageName(image)}
              />
            ))}
          </div>

          <Button text='Создать' />
        </form>
      </div>
    </>
  )
}

export default NewExercise