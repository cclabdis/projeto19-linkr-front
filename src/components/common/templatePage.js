import Header from "./header";
import SideBar from "./sideBar";

export default function TemplatePage({ hasPublishBox, children}){
    return(
        <>
            <Header/>
                {(hasPublishBox) && <div>Publish Box</div>}
                {children}
        </>
    )
}