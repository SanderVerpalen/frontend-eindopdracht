import React from "react";


function PageContainer({children}) {
    return (
        <section className="outer-container">
            <div className="inner-container">
                {children}
            </div>
        </section>
    )
}

export default PageContainer;