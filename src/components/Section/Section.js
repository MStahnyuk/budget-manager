import React from 'react';
import Aside from '../Aside/Aside';
import Main from '../Main/Main';
import './Section.scss';

export function Section() {
    return (
        <section>
            <Aside />
            <Main />
        </section>
    );
}