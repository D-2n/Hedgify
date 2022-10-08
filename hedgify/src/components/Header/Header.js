import { useNavigate } from 'react-router-dom'
import { header } from '../../constants'  
import './Header.css'

const Header = ({ account, setAccount }) => {

  const navigage = useNavigate();

  const { title } = header
  return (
    <header className='center'>
      <h3>
        <button type="button" className='link_wallet' onClick={() => {
          navigage(`  /`)
        }}>{title}</button>
      </h3>
    </header>
  )
}

export default Header
