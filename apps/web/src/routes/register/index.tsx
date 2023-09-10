import logo from '@/assets/Logo.svg'
import { Form } from './form'

export function Register() {
  return (
    <div className='flex flex-1 border border-solid rounded-md h-96 bg-neutral-900 border-neutral-600'>
      <div className='flex flex-1 p-12'>
        <Form />
      </div>
      <div className='flex flex-col justify-between flex-1 p-10 bg-neutral-800'>
        <span className='flex gap-2'>
          <img src={logo} alt='Logo' className='w-6 h-6' />
          <b className='font-bold'>university automation</b>
        </span>

        <b className='font-bold'>Ferramenta para automatizar afazeres da sua universidade</b>
      </div>
    </div>
  )
}
