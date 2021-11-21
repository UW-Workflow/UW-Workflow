import { MainContainer } from "../components/MainContainer";
import {Nav, NavItem,NavLink} from 'reactstrap'
export default function YourAccount(){
    return (
        <MainContainer>
            <div className="mt-6 ml-20 w-1">
                <div>
                    <p className="mb-4 text-lg font-bold">Your Account</p>
                </div>
                <ul className="flex">
                    <li className="mr-6">
                        <a className="text-blue-500 hover:text-blue-800" href="#">Profile</a>
                    </li>
                    <li className="mr-6">
                        <a className="text-blue-500 hover:text-blue-800" href="#">Bookmarks</a>
                    </li>
                    <li className="mr-6">
                        <a className="text-blue-500 hover:text-blue-800" href="#">Password</a>
                    </li>
                </ul>
                <hr className="mr-20"/>
            </div>
        </MainContainer>
    )
}