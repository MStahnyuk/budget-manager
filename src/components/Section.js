import React from 'react';
import Main from "./Main";
import Aside from "./Aside";

export function Section() {
    return(
        <section>
            <Aside/>
            <Main/>
        </section>
    );
}