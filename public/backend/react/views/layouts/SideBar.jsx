import React from 'react'
import SingleLink from './components/SingleLink'
import DropDownLink from './components/DropDownLink'

function SideBar() {

    const handleSubmit = ()=>{
        return window.confirm('Are you sure?')
    }

    return (
        <nav>
            <ul>
                <SingleLink to={'/'} text={'Dashboard'} icon={'monitoring'}></SingleLink>

                <li>
                    <DropDownLink text={'User Management'} icon={'manage_accounts'}></DropDownLink>
                    <ul>
                        <SingleLink to={'/user'} text={'users'} icon={'trip_origin'}></SingleLink>
                       
                        <SingleLink to={'/user1'} text={'users1'} icon={'trip_origin'}></SingleLink>
                       
                        <SingleLink to={'/user2'} text={'users2'} icon={'trip_origin'}></SingleLink>
                       
                    </ul>
                </li>
            </ul>
            <div className='logout_button'>
                <form onSubmit={handleSubmit} method='POST' action='/logout' >
                    <button>Logout</button>
                </form>
            </div>
        </nav>
    )
}

export default SideBar