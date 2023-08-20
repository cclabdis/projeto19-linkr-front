import Header from "./header";
import SideBar from "./sideBar";

export default function TemplatePage({children}){
    return(
        <>
            <Header/>
            {children}
        </>
    )
}