import React from 'react';
import Header from './Header';
import './styles.scss';
import ErrorBoundary from '../ErrorBoundary'

const Layout = (props) => {
    return (
        <>
            <Header />
            <div id="layout" data-testid="layout">
                <main data-testid="content">
                    <ErrorBoundary>
                        {props.children}
                    </ErrorBoundary>
                </main>
            </div>
        </>
    )
}

export default Layout;