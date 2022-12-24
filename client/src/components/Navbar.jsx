import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CustomButton } from './'
import { logo, menu, search, thirdweb } from '../assets'
import { navlinks } from '../constants'
import { useStateContext } from '../context'

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#222228]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
        {!isActive ? (
            <img src={imgUrl} className="w-1/2 h-1/2" />
        ) : (
            <img src={imgUrl} className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
        )}
    </div>
)

const Navbar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    const [toggleDrawer, setToggleDrawer] = useState(false)
    const { connect, address } = useStateContext();

  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
        <div className='lg:flex-1 flex-row flex max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#16161a] rounded-[20px]'>
            <input type="text" placeholder='Search for campaigns' className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none' />
            <div className='w-[72px] h-full rounded-[20px] bg-[#9A9AEB] flex justify-center items-center cursor-pointer'>
                <img src={search} className="w-[15px] h-[15px] object-contain" />
            </div>
        </div>
        <div className='sm:flex hidden flex-row justify-end gap-4'>
            <CustomButton 
                btnType="button" 
                title={address ? 'Create a campaign' : 'Connect'}
                styles={address ? 'bg-[#9A9AEB]' : 'bg-[#FF69B4]'}
                handleClick={() => {
                    if(address) navigate('create-campaign')
                    else connect();
                }}
                />
                <Link to="/profile">
                    <div className='w-[52px] h-[52px] rounded-full bg-[#16161a] flex justify-center items-center cursor-pointer'>
                        <img src={thirdweb} className="w-[60%] h-[60%] object-contain" />
                    </div>
                </Link>
        </div>

        {/* Small screen navigation */}

        <div className='sm:hidden flex justify-between relative items-center'>
            <div className='w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
            <Link to="/">
                <Icon styles="w-[52px] h-[52px] bg-[#222228]" imgUrl={logo} />
            </Link>
            </div>
            <img 
                src={menu} 
                className="w-[22px] h-[22px] object-contain"
                onClick={() => setToggleDrawer((prev) => !prev)}
            />
            <div className={`absolute top-[60px] right-0 left-0 bg-[#16161a] z-10 shadow-secondary rounded-[20px] py-6 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
                <ul className='mb-4'> 
                    {navlinks.map((Link) => (
                        <li
                            key={Link.name}
                            className={`flex p-4 ${isActive === Link.name && 'bg-[#222228]'}`}
                            onClick={() => {
                                setIsActive(Link.name);
                                setToggleDrawer(false);
                                navigate(Link.link)
                            }}
                        >
                            <img 
                                src={Link.imgUrl} 
                                className={`w-[20px] h-[20px] object-contain ${isActive === Link.name ? 'grayscale-0' : 'grayscale'}`}
                                />
                            <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === Link.name ? 'text-[#9A9AEB]' : 'text-[#808191]'}`}>
                              {Link.name}  
                            </p>
                        </li>
                    ))}
                </ul>
                <div className='flex mx-4'>
                <CustomButton 
                    btnType="button" 
                    title={address ? 'Create a campaign' : 'Connect'}
                    styles={address ? 'bg-[#9A9AEB]' : 'bg-[#FF69B4]'}
                    handleClick={() => {
                    if(address) navigate('create-campaign')
                    else connect();
                }}
                />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar