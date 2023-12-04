import './index.css'

export default function Header() {
  return (
    <header className="header flex-row">
      <div className="header-title-div flex-row center">
        <img className="header-title-div-logo" src="/logo.png" alt="hospital logo" />

        <span>HMS</span>
      </div>
    </header>
  )
}
