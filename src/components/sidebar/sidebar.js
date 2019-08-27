import React from 'react'
import './index.css'
import Header from '../header/header'
import styled from 'styled-components'
import TableBanner from '../banner/table/tableBanner';
class SideBar extends React.Component {
    constructor() {
        super()
        this.state = {
            mobileView: false,
            showSidebar: true,
        };
    }
    updateViewState = () => {
        if (!this.state.mobileView && document.documentElement.clientWidth < 768) {
            this.setState({
                mobileView: true,
                showSidebar: false,
            });
        } else if (document.documentElement.clientWidth > 1024) {
            this.setState({
                mobileView: false,
                showSidebar: true,
            });
        }
    }
    toggleSideBar = () => {
        this.setState({
            showSidebar: !this.state.showSidebar
        });
    }
    componentWillMount() {
        this.updateViewState();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateViewState)
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateViewState)
    }
    render() {
        let containerClass = 'container';
        if (this.state.mobileView) containerClass = containerClass + ' mobileview';
        return (
            <div className={containerClass}>
                <ContainerHead>
                    <Header />
                </ContainerHead>
                {
                    this.state.showSidebar &&
                    <ContainerSideBar >
                        side
            </ContainerSideBar>
                }
                <ContainerContent>
                        main
                </ContainerContent>
            </div>);
    }
}

// const Contauner = styled.div`
//     display: grid;
//     grid-template-columns: 0.30fr 0.70fr;
//     grid-template-rows: auto;
//     grid-template-areas: "header header" "sidebar main";
// `

const ContainerHead = styled.div`
    grid-area: header;
 `
const ContainerSideBar = styled.div`
    grid-area: sidebar;
    background-color: red;
`

const ContainerContent = styled.div`
    grid-area: main
    background-color: green;
`
export default SideBar