"use client"

import Link from 'next/link'
// this goong to allw us going to the other pages of  our application '
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Provider from './Provider';
// these great utility function s are going to make the signin an signup flow incredibly simple 


const Nav = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null);
    // useState snippet 
    const [ToggleDropDown, setToggleDropDown] = useState(false);
    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setProviders();
    }, [])
    return (
        <nav className=' flex-between w-full mb-16 pt-3 '>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image src="/assets/images/logo.svg" alt='Promptpia Logo' width={30} height={30} className=' object-contain' />
                <p className='log_text '>Promptopia</p>
            </Link>

            {/* Desktop  navigation  */}
            <div className='sm:flex hidden'>
                {isUserLoggedIn ? (
                    <div className=' flex gap-3 md:gap-5 '>
                        <Link
                            href="/create-prompt  "
                            className='black_btn'>
                            Create  Post
                        </Link>
                        <button
                            type='button'
                            onClick={signOut}
                            className='outline_btn'
                        >
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image src='/assets/images/logo.svg'
                                width={37}
                                height={37}
                                className=' rounded-full'
                                alt='profile'

                            />
                        </Link>

                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn '
                            >
                                SignIn
                            </button>
                        ))}
                    </>
                )}
            </div>
            {/* mobile navigation  */}
            <div className='sm:hidden flex relative'>
                {isUserLoggedIn ? (
                    <div className='flex '>
                        <Image src='/assets/images/logo.svg'
                            width={37}
                            height={37}
                            className=' rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropDown((prev) =>
                                !prev
                            )}
                        />
                        {ToggleDropDown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropDown(false)
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    SignOut
                                </button>
                            </div>
                        )}

                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn '
                            >
                                SignIn
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
