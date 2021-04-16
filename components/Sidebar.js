import sidebarStyles from '../styles/Sidebar.module.css'
import Link from 'next/link'
import {FaPhoneAlt} from 'react-icons/fa'
import {SidebarContext} from '../components/SidebarContext'
import {useContext, useEffect, useRef} from 'react'

const Sidebar = () => {
  const [active, setActive] = useContext(SidebarContext);
  const sidebarRef=useRef();

  const handleClick = () => {
    setActive(false)
  }

  useEffect(()=>{
    document.addEventListener('mousedown', (event)=>{
        if(!sidebarRef.current.contains(event.target)){
          setActive(()=>false);
        }
    });
  });

  return (
    <div ref={sidebarRef} className=
      { 
        `${sidebarStyles.section} ${active ? sidebarStyles.active : sidebarStyles.inactive}`
      }
      
    >
      <div className={sidebarStyles.container}>
        <div className={sidebarStyles.sidebar}>
          <Link href='/'><img onClick={handleClick} src="brand-logo-transparent.svg" alt="brand-logo" /></Link>
          <ul className={sidebarStyles.sidebarMenu}>
            <li onClick={handleClick}><Link href="/" >Home</Link></li>
            <li onClick={handleClick} ><Link href="/products" >Products & Services</Link></li>
            <li className={sidebarStyles.quote} onClick={handleClick}><Link href="/quote" >GET A QUOTE</Link></li>
            <li className={sidebarStyles.phone} onClick={handleClick}><Link href='tel:(855) 780-3061' ><div><FaPhoneAlt />(855) 780-3061</div></Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
