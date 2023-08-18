import Header from "./header";
import SideBar from "./sideBar";

export default function TemplatePage({title, hasPublishBox, children}){
    return(
        <>
            <Header/>
                <div>{title}</div>
                {(hasPublishBox) && <div>Publish Box</div>}
                {children}
        </>
    )
}