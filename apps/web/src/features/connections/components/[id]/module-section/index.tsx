import { PropsWithChildren } from 'react'

function Header(props: PropsWithChildren) {
  return (
    <div className='relative flex flex-col flex-1 gap-2 md:items-center md:flex-row'>
      {props.children}
    </div>
  )
}

function Title(props: PropsWithChildren) {
  return (
    <h2 className='text-xl font-bold md:text-2xl text-neutral-100'>
      {props.children}
    </h2>
  )
}

function Subtitle(props: PropsWithChildren) {
  return <span className='text-sm text-muted-foreground'>{props.children}</span>
}

function Options(props: PropsWithChildren) {
  return (
    <div className='absolute top-0 right-0 flex items-center gap-2 ml-auto'>
      {props.children}
    </div>
  )
}

function ModuleSection(props: PropsWithChildren) {
  return (
    <section className='flex flex-col gap-4 p-2 border border-solid rounded-lg md:p-4 bg-neutral-900 border-neutral-800'>
      {props.children}
    </section>
  )
}

function Card(props: PropsWithChildren) {
  return (
    <div className='flex flex-col gap-2 p-3 border border-solid rounded-lg select-none min-w-[17rem] flex-1 bg-neutral-900 border-neutral-800'>
      {props.children}
    </div>
  )
}

function CardTitle(props: PropsWithChildren) {
  return (
    <h3 className='flex items-center justify-between text-md text-neutral-100'>
      {props.children}
    </h3>
  )
}

function CardIcon(props: PropsWithChildren) {
  return (
    <div className='flex items-center justify-center'>{props.children}</div>
  )
}

function CardValue(props: PropsWithChildren) {
  return (
    <span className='text-3xl font-bold text-neutral-100'>
      {props.children}
    </span>
  )
}

function CardSubtitle(props: PropsWithChildren) {
  return <span className='text-sm text-muted-foreground'>{props.children}</span>
}

function Body(props: PropsWithChildren) {
  return <div className='flex flex-col gap-2'>{props.children}</div>
}

function CardRow(props: PropsWithChildren) {
  return (
    <div className='flex flex-row gap-2 overflow-auto'>{props.children}</div>
  )
}

ModuleSection.Header = Header
ModuleSection.Title = Title
ModuleSection.Subtitle = Subtitle
ModuleSection.Options = Options
Card.Title = CardTitle
Card.Icon = CardIcon
Card.Value = CardValue
Card.Subtitle = CardSubtitle
Card.Row = CardRow
ModuleSection.Card = Card
ModuleSection.Body = Body

export { ModuleSection }
