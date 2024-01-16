import { Link } from "react-router-dom";
import styles from "./Land.module.css"

const Landing = () => {

    return (
        <div className={styles.contain}>


            <Link to='/home'>
                <button>GET IN</button>
            </Link>
        </div>
    )
}
export default Landing;