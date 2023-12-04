import Button from '@/components/ui/button'

import './index.css'

import { logoutSelfUser } from '@/provider/selftUserSlice'
import store from '@/provider/store'
import { removeJWTToken } from '@/util'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const { selfUser } = store.getState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const path = selfUser?.user?.privilege || ''

  const handleLogout = () => {
    removeJWTToken()

    dispatch(logoutSelfUser)
    navigate(0)
  }

  return (
    <header className="header">
      <Link to={'/'} className="header-title-div flex-row">
        <img className="header-title-div-logo" src="/logo.png" alt="hospital logo" />

        <span>HMS</span>
      </Link>

      <div className="header-btn">
        <Link to={`/u/${path}`}>
          <Button>
            <img
              className="header-btn-icons"
              src="/icons/user-logo.svg"
              alt="profile logo"
            />
          </Button>
        </Link>

        <Button type="important" onClick={handleLogout}>
          <img
            style={{ padding: '9px' }}
            className="header-btn-icons"
            src="/icons/exit.svg"
            alt="profile logo"
          />
        </Button>
      </div>
    </header>
  )
}
