import { Link } from "@tanstack/react-router";
import Url from "../components/Url";

const Homepage = () => {
    return (
        <div>
            <div className="w-full">
                <nav>
                    <ul className="flex justify-evenly items-center bg-[#634530] text-white p-5">
                        <Link to='/'><li>HOME</li></Link>
                        <Link to='/auth'>
                        <li>LOGIN</li>
                        </Link>
                    </ul>
                </nav>
            </div>
            <Url />
        </div>
    );
};

export default Homepage;
