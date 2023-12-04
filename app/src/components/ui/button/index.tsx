import './index.css'

type Props = {
  children?: React.ReactNode
  type?: 'normal' | 'important'
}

export default function Button({ children, type = 'normal' }: Props) {
  return <button className={`btn ${type}`}>{children}</button>
}
