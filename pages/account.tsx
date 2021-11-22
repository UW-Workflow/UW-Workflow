import { MainContainer } from "../components/MainContainer";
import {Nav, NavItem,NavLink} from 'reactstrap'
export default function YourAccount(){
    return (
        <MainContainer>
            <div className="mt-6 pl-20 w-1">
                <div>
                    <p className="mb-4 text-lg font-bold">Your Account</p>
                </div>
                <div className="mb-20">
                    <div className="flex">
                        <ul className="flex">
                            <li className="p-4 border-b-2 border-transparent hover:border-blue-active hover:text-gray-500">
                                <a className="font-medium text-black-500 " href="#">Profile</a>
                            </li>
                            <li className="p-4 border-b-2 border-transparent hover:border-blue-active hover:text-gray-500">
                                <a className="font-medium text-black-500 " href="#">Bookmarks</a>
                            </li>
                            <li className="p-4 border-b-2 border-transparent hover:border-blue-active hover:text-gray-500">
                                <a className="font-medium text-black-500" href="#">Password</a>
                            </li>
                        </ul>
                        <div className="bg-logout-bg text-logout-text font-semibold rounded-xl py-2 px-8 flex items-center space-x-2 ml-auto mr-20 mb-4 border-2 border-transparent hover:border-gray-200">
                            <img src="Logout.svg"></img>
                            <span>Log out</span>
                        </div>
                    </div>
                    <hr className="mr-20"/>
                </div>
                {/* self-center bg-gradient-2 filter rounded-full blur-huge h-gradient-2-circle w-gradient-2-circle -ml-auto */}
            </div>
            <div className="flex flex-row">
                <div className="self-center bg-gradient-2 filter blur-huge px-10 py-16 mt-10 flex-grow"></div>
                <div className="flex border-2 flex-grow">
                    <div className="w-1/3 bg-gray-400 h-12"></div>
                    <div className="w-1/3 bg-gray-500 h-12"></div>
                    <div className="w-1/3 bg-gray-400 h-12"></div>
                </div>
                <div className="self-center bg-gradient-3 filter blur-huge px-10 py-16 mt-10 flex-grow"></div>
            </div>
        </MainContainer>
    )
}