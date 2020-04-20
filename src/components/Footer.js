import React, { Component } from 'react'
import Logo from '../HotBeansLogo.svg'
import {Link} from 'react-router-dom'

const CurrentYear = new Date().getFullYear()

export default class Footer extends Component {
    render() {
        return (
            <footer className="container py-5">
                <div className="row">
                    <div className="col-12 col-md">
                        <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
                        <small className="d-block mb-3 text-muted">© 2017-{CurrentYear}</small>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Features</h5>
                        <ul className="list-unstyled text-small">
                            <li><Link to='/' className="text-muted">Home</Link></li>
                            <li><Link to='/products' className="text-muted">Store</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Resources</h5>
                        <ul className="list-unstyled text-small">
                            <li><Link to='/' className="text-muted">Home</Link></li>
                            <li><Link to='/products' className="text-muted">Store</Link></li>
                        </ul>
                    </div>
                </div>
            </footer>
        )   
    }
}
